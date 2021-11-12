import RedisConnection from './RedisConnection';
import redis from 'redis';


class RedisOperations{
    private connObject : redis.RedisClient;

    constructor(){
        this.connObject = RedisConnection.connectionObject;
    }

    addAsync = async(key:string, value: string): Promise<any> => {
        try{
            return this.connObject.set(key, value);
        }
        catch(e){
            throw (e as Error).message;
        }
    }

    getAsync = async(key: string) : Promise<any> => {
        return new Promise((resolve, reject) => {
            this.connObject.get(key, (err, data)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(data);
                }
            });
        });
    }
}

export default RedisOperations;