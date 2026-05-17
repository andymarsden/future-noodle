import { generateId, wait } from "$lib/utils";
import { intent } from "./intent/engine";

export const chat = {
    message: {
        async create({ id = generateId(), content = "", role = "user", state = "pending", conversationId = "", activeFlow = null } = {}) {
            return { id, content, role, state, conversationId, activeFlow };
        },

        async send({ message } = {}) {
            //await wait(1000);

            //Decide what to do. if no active flow work out the intent and find a flow to trigger, if active flow, send the message to the flow and get the response. For now we will just return a dummy response after a delay.

            if (!message?.content) {
                return chat.message.create({
                    content: "Please enter a message.",
                    role: "assistant",
                    activeFlow: message?.activeFlow ?? null
                });
            }

            const response = await intent.detect(message.content);

            const content = response.success ? response.response?.text || "" : response.error?.message || "Something went wrong.";

            return chat.message.create({
                content,
                role: "assistant",
                activeFlow: message.activeFlow
            });
        },
    },

    //TODO - addMessageToList should be in a separate file, as it is not related to chat, but rather to the way we manage messages in the UI. We can move it to a utils file or something like that.
    //TODO - Think about renaming
    async addMessageToList(messages, ...newMessages) {
        return messages = [...messages, ...newMessages];
    },

    async updateMessage(messages, message, messageId) {
        //Replaces a message by id
        return messages = messages.map(m => {
            if (m.id === messageId) {
                return { ...m, ...message };
            }
            return m;
        });
    }
}


export const flow = {

    async getFlowById(flowId) {
        //
    },

}