//chat workings

import { generateId, wait } from "$lib/utils";
import { intent } from "./intent/engine";
import {Message } from "$lib/classes/Message";
import { flowRegistry } from "$lib/chat/flows/engine";

export const chat = {
    message: {
        async send({ message } = {}) {
            await wait(500); //simulate thinking time
            if(!message.activeFlow) {

                if (!message?.content) {
                    return new Message({content: { text: "Please enter a message." },role: "assistant",activeFlow: message?.activeFlow ?? null,conversationId: message?.conversationId ?? null  });
                }
 
                const response = await intent.detect(message.content.text);

                //TODO no intent - try AI response? or just default answer? maybe a fallback intent that always matches?

                //did the intent trigger an flow?
                if(response.content?.activeFlow)
                {
                    return flow.start(response.content.activeFlow.id, message?.conversationId ?? null);
                }
                else
                {
                    const text = response.success ? response.content?.text || "" : response.error?.message || "Something went wrong.";
                
                    return new Message({content: { text: text },role: "assistant",activeFlow: response.content?.activeFlow,conversationId: message?.conversationId ?? null});
                }
            }
            else
            {
                return await flow.process(message.activeFlow, message.content.text, message?.conversationId ?? null);
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

    getById(flowId) {
        return flowRegistry[flowId];
    },
    async process(activeFlow, userInput, conversationId) {
        //TODO process the flow based on the current step and user input


        //Validate
        //Save current step's answer to DB or state management (not implemented yet)
        //Determine next step based on user input and flow definition (for simplicity, we just go to the next step in the array)
        //In a real implementation, you would have more complex logic here to handle different types of questions, branching flows, etc.

        let nextStep = this.getNextStep(activeFlow.id, activeFlow.current_step);
        activeFlow.current_step = nextStep.id;
        //let messageText = `The questions is ${nextStep.question},  You are in ${activeFlow.id}, currently at step ${activeFlow.current_step }. You said: ${userInput}.`;

        return new Message({content: { text: nextStep.question },role: "assistant",activeFlow: activeFlow,conversationId: conversationId  });
    },
    getNextStep(flowId, currentStepId) {
        let activeFlow = this.getById(flowId);
        if(!activeFlow) return null;

        //TODO i think we need better next step logic here, but for now we just return the next step in the array
        let currentIndex = activeFlow.steps.findIndex(s => s.id === currentStepId);
        if(currentIndex === -1) return null;

        return activeFlow.steps[currentIndex + 1] || null;
    },
    start(id, conversationId) {

        let activeFlow = this.getById(id);
        activeFlow.current_step = activeFlow.steps[0].id;

        let messageText = activeFlow.steps[0].question;
        return new Message({content: { text: messageText },role: "assistant",activeFlow: activeFlow,conversationId: conversationId  });
    }

}