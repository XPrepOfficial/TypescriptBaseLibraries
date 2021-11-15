"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SQSConnection_1 = __importDefault(require("./SQSConnection"));
const client_sqs_1 = require("@aws-sdk/client-sqs");
class SQSOperations {
    constructor() {
        this.getAllQueuesAsync = () => __awaiter(this, void 0, void 0, function* () {
            return this.connObject.send(new client_sqs_1.ListQueuesCommand({}));
        });
        this.createQueueAsync = (queueName) => __awaiter(this, void 0, void 0, function* () {
            const params = {
                QueueName: queueName
            };
            return this.connObject.send(new client_sqs_1.CreateQueueCommand(params));
        });
        this.getQueueURLAsync = (queueName) => __awaiter(this, void 0, void 0, function* () {
            const params = {
                QueueName: queueName
            };
            return this.connObject.send(new client_sqs_1.GetQueueUrlCommand(params));
        });
        this.sendMessageOnQueueAsync = (queueURL, messageBody) => __awaiter(this, void 0, void 0, function* () {
            const params = {
                MessageBody: messageBody,
                QueueUrl: queueURL
            };
            return this.connObject.send(new client_sqs_1.SendMessageCommand(params));
        });
        this.receiveMessageFromQueue = (queueURL, numberOfMessages) => __awaiter(this, void 0, void 0, function* () {
            const params = {
                MaxNumberOfMessages: numberOfMessages,
                QueueUrl: queueURL
            };
            return this.connObject.send(new client_sqs_1.ReceiveMessageCommand(params));
        });
        this.connObject = SQSConnection_1.default.connectionObject;
    }
}
exports.default = SQSOperations;
