import {PubSub} from "@google-cloud/pubsub";
import {v1} from "@google-cloud/pubsub";
import { SubscriberClient } from "@google-cloud/pubsub/build/src/v1";
import IMessage from "../../Models/IMessage";
import * as dotenv from 'dotenv';

class GCP_PubSub
{
    private pubSubClient : PubSub;
    private subClient : v1.SubscriberClient;

    constructor(){
        dotenv.config();
        if(!process.env.GCP_ProjectId){
            throw new Error("GCP_ProjectId is required in env file for GCP Connection.");
        }

        this.pubSubClient = new PubSub({projectId: process.env.GCP_ProjectId});
        this.subClient = new SubscriberClient({projectId: process.env.GCP_ProjectId});
    }
    
    /** Pushes messages to Pub/Sub and returns the count of messages published. */
    pushMessages = async(topicName: string, messages: Array<IMessage>) : Promise<string> => {
        try
        {
            let publishedMessageCount:number = 0;
            messages.forEach(async (message: IMessage) => {
                const data = Buffer.from(JSON.stringify(message));
                let customAttribute= null;

                if(message.messageType !== null){
                    customAttribute = {
                        type: message.messageType
                    }
                }

                let messageId:string = '';
                if(customAttribute){
                    messageId = await this.pubSubClient.topic(topicName).publish(data, customAttribute!);
                }
                else{
                    messageId = await this.pubSubClient.topic(topicName).publish(data);
                }
                publishedMessageCount++;
            });
            return `${publishedMessageCount} message/s published successfully!`;
        }
        catch(e){
            throw (e as Error).message;
        }        
    }

    /** Pulls messages (synchronously) from a subscription and acknowledges back to GCP. Maximum 500 messages can be pulled at once. */
    pullMessages = async(subscriptionName: string) : Promise<Array<IMessage>> => {
        try
        {
            let messages: Array<IMessage> = [];

            const subscription = this.subClient.subscriptionPath(
                process.env.GCP_ProjectId!,
                subscriptionName
            );        
    
            const request = {
                subscription: subscription,
                maxMessages: 500,
            };

            const [response] = await this.subClient.pull(request);
            let ackIds = [];
            for (const message of response.receivedMessages!) 
            {
                const messageDataObj = <IMessage> JSON.parse(message.message!.data!.toString());
                messages.push(messageDataObj);
                ackIds.push(message.ackId);
            }

            if (ackIds.length !== 0) {
                const ackRequest : any = {
                  subscription: subscription,
                  ackIds: ackIds,
                };
                await this.subClient.acknowledge(ackRequest);
            }
            return messages;
        }
        catch(e){
            throw (e as Error).message;
        }
    }
}

export default new GCP_PubSub;