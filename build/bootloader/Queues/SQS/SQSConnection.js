"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_sqs_1 = require("@aws-sdk/client-sqs");
const dotenv = __importStar(require("dotenv"));
class SQSConnection {
    constructor() {
        dotenv.config();
        if (!process.env.AWS_ACCESS_KEY_ID) {
            throw new Error("AWS_ACCESS_KEY_ID is required in env file for AWS-SQS Connection.");
        }
        if (!process.env.AWS_SECRET_ACCESS_KEY) {
            throw new Error("AWS_SECRET_ACCESS_KEY is required in env file for AWS-SQS Connection.");
        }
        if (!process.env.AWS_REGION) {
            throw new Error("AWS_REGION is required in env file for AWS-SQS Connection.");
        }
    }
    static getQueueConnection() {
        try {
            if (!this._instance) {
                this._instance = new SQSConnection();
            }
            this.connectionObject = new client_sqs_1.SQSClient({ region: process.env.AWS_REGION, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } });
        }
        catch (e) {
            throw e.message;
        }
    }
}
exports.default = SQSConnection;
