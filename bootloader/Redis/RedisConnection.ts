import redis from 'redis';

class RedisConnection
{
    private static _instance : RedisConnection;
    static connectionObject: redis.RedisClient;

    static getRedisConnection(port: number, host: string): void
    {
    try
    {
        if(!this._instance){
            this._instance = new RedisConnection();
        }
        this.connectionObject = redis.createClient(port , host);
        this.connectionObject.on('connect', function() {
            console.log("Redis connection established successfully.");
        });    
    }
    catch(e){
            throw (e as Error).message;
        }
    }
}

export default RedisConnection;
