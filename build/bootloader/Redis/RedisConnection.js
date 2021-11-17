"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
class RedisConnection {
    static getRedisConnection(port, host) {
        try {
            if (!this._instance) {
                this._instance = new RedisConnection();
            }
            this.connectionObject = redis_1.default.createClient(port, host);
            this.connectionObject.on('connect', function () {
                console.log("Redis connection established successfully.");
            });
            this.connectionObject.on('error', function () {
                throw new Error("Cannot connect to Redis Server");
            });
        }
        catch (e) {
            throw e.message;
        }
    }
}
exports.default = RedisConnection;
