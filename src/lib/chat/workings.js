import { generateId, wait } from "$lib/utils";
import { intent } from "./intent/engine";
import {Message } from "$lib/classes/Message";

// a message sould have content

export const chat = {
    message: {
        async create(data = {}) {
            return new Message(data);
        },

        async send({ message } = {}) {
            if(!message.activeFlow) {

                if (!message?.content) {
                    return chat.message.create({content: { text: "Please enter a message." },role: "assistant",activeFlow: message?.activeFlow ?? null,conversationId: message?.conversationId ?? null  });
                }

                const response = await intent.detect(message.content.text);

                const content = response.success ? response.content?.text || "" : response.error?.message || "Something went wrong.";

                return chat.message.create({content: { text: content },role: "assistant",activeFlow: response.content?.activeFlow,conversationId: message?.conversationId ?? null});
            }
            else
            {
                return chat.message.create({content: { text: "Flow mode is not implemented yet." },role: "assistant",activeFlow: message?.activeFlow ?? null,conversationId: message?.conversationId ?? null  });
            }

        },
    },

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