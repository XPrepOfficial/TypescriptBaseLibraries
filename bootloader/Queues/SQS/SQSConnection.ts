import {SQSClient} from  "@aws-sdk/client-sqs";
import * as dotenv from 'dotenv';

class SQSConnection
{
    private static _instance : SQSConnection;
    static connectionObject: SQSClient;

    private constructor(){
        dotenv.config();
        if(!process.env.AWS_ACCESS_KEY_ID){
            throw new Error("AWS_ACCESS_KEY_ID is required in env file for AWS-SQS Connection.");
        }

        if(!process.env.AWS_SECRET_ACCESS_KEY){
            throw new Error("AWS_SECRET_ACCESS_KEY is required in env file for AWS-SQS Connection.");
        }

        if(!process.env.AWS_REGION){
            throw new Error("AWS_REGION is required in env file for AWS-SQS Connection.");
        }
    }

    static getQueueConnection(): void
    {
        try
        {
            if(!this._instance){
                this._instance = new SQSConnection();
            }
            this.connectionObject = new SQSClient({region: process.env.AWS_REGION, credentials: {accessKeyId: process.env.AWS_ACCESS_KEY_ID!, 
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!}});
        }
        catch(e){
            throw (e as Error).message;
        }
    }
}

export default SQSConnection;