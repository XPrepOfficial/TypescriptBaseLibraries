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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pubsub_1 = require("@google-cloud/pubsub");
const v1_1 = require("@google-cloud/pubsub/build/src/v1");
const dotenv = __importStar(require("dotenv"));
class GCP_PubSub {
    constructor() {
        /** Pushes messages to Pub/Sub and returns the count of messages published. */
        this.pushMessages = (topicName, messages) => __awaiter(this, void 0, void 0, function* () {
            try {
                let publishedMessageCount = 0;
                messages.forEach((message) => __awaiter(this, void 0, void 0, function* () {
                    const data = Buffer.from(JSON.stringify(message));
                    let customAttribute = null;
                    if (message.messageType !== null) {
                        customAttribute = {
                            type: message.messageType
                        };
                    }
                    let messageId = '';
                    if (customAttribute) {
                        messageId = yield this.pubSubClient.topic(topicName).publish(data, customAttribute);
                    }
                    else {
                        messageId = yield this.pubSubClient.topic(topicName).publish(data);
                    }
                    publishedMessageCount++;
                }));
                return `${publishedMessageCount} message/s published successfully!`;
            }
            catch (e) {
                throw e.message;
            }
        });
        /** Pulls messages (synchronously) from a subscription and acknowledges back to GCP. Maximum 500 messages can be pulled at once. */
        this.pullMessages = (subscriptionName) => __awaiter(this, void 0, void 0, function* () {
            try {
                let messages = [];
                const subscription = this.subClient.subscriptionPath(process.env.GCP_ProjectId, subscriptionName);
                const request = {
                    subscription: subscription,
                    maxMessages: 500,
                };
                const [response] = yield this.subClient.pull(request);
                let ackIds = [];
                for (const message of response.receivedMessages) {
                    const messageDataObj = JSON.parse(message.message.data.toString());
                    messages.push(messageDataObj);
                    ackIds.push(message.ackId);
                }
                if (ackIds.length !== 0) {
                    const ackRequest = {
                        subscription: subscription,
                        ackIds: ackIds,
                    };
                    yield this.subClient.acknowledge(ackRequest);
                }
                return messages;
            }
            catch (e) {
                throw e.message;
            }
        });
        dotenv.config();
        if (!process.env.GCP_ProjectId) {
            throw new Error("GCP_ProjectId is required in env file for GCP Connection.");
        }
        this.pubSubClient = new pubsub_1.PubSub({ projectId: process.env.GCP_ProjectId });
        this.subClient = new v1_1.SubscriberClient({ projectId: process.env.GCP_ProjectId });
    }
}
exports.default = new GCP_PubSub;
