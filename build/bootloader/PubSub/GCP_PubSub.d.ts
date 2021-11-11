import IMessage from "../../Models/IMessage";
declare class GCP_PubSub {
    private pubSubClient;
    private subClient;
    constructor();
    /** Pushes messages to Pub/Sub and returns the count of messages published. */
    pushMessages: (topicName: string, messages: Array<IMessage>) => Promise<string>;
    /** Pulls messages (synchronously) from a subscription and acknowledges back to GCP. Maximum 500 messages can be pulled at once. */
    pullMessages: (subscriptionName: string) => Promise<Array<IMessage>>;
}
declare const _default: GCP_PubSub;
export default _default;
