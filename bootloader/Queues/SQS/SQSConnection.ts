import {SQSClient} from  "@aws-sdk/client-sqs";

class SQSConnection
{
    private static _instance : SQSConnection;
    static connectionObject: SQSClient;

    private constructor(){}

    static getQueueConnection(region: string, accessKeyId: string, secretAccessKey: string): void
    {
        try
        {
            if(!this._instance){
                this._instance = new SQSConnection();
            }
            this.connectionObject = new SQSClient({region: region, credentials: {accessKeyId: accessKeyId, 
            secretAccessKey: secretAccessKey }});
        }
        catch(e){
            throw (e as Error).message;
        }
    }
}

export default SQSConnection;