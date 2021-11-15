import SQSConnection from "./SQSConnection";
import {SQSClient, ListQueuesCommand, CreateQueueCommand, GetQueueUrlCommand, SendMessageCommand, ReceiveMessageCommand} from "@aws-sdk/client-sqs";

class SQSOperations
{
    private connObject : SQSClient;

    constructor(){
        this.connObject = SQSConnection.connectionObject;
    }

    getAllQueuesAsync = async(): Promise<any> => {
        return this.connObject.send(new ListQueuesCommand({}));
    }

    createQueueAsync = async(queueName: string): Promise<any> => {
        const params = {
            QueueName: queueName
        };
        return this.connObject.send(new CreateQueueCommand(params));
    }

    getQueueURLAsync = async(queueName: string) : Promise<any> => {
        const params = {
            QueueName: queueName
        };
        return this.connObject.send(new GetQueueUrlCommand(params));
    }

    sendMessageOnQueueAsync = async(queueURL: string, messageBody: string) : Promise<any> => {
        const params = {
            MessageBody: messageBody,
            QueueUrl: queueURL
        };
        return this.connObject.send(new SendMessageCommand(params));
    }

    receiveMessageFromQueue = async(queueURL: string, numberOfMessages: number) : Promise<any> => {
        const params = {
            MaxNumberOfMessages: numberOfMessages,
            QueueUrl: queueURL
        };
        return this.connObject.send(new ReceiveMessageCommand(params));
    }
}

export default SQSOperations;
