//chat workings

import { generateId, wait } from "$lib/utils";
import { intent } from "./intent/engine";
import {Message } from "$lib/classes/Message";
import { flowRegistry } from "$lib/chat/flows/engine";
import { executeCommand } from "$lib/chat/commands/execute";
import { saveConversationMemory } from "$lib/services/conversation-memory";

export const chat = {
    message: {
        async send({ message } = {}) {
            await wait(500); //simulate thinking time

            if(!message.activeFlow) {

                //Nice! This is because the message is interactive.
                message.isValidated = true;
                //message.content.text = "This changed?";
                
                
                if (!message?.content) {
                    return new Message({content: { text: "Please enter a message." },role: "assistant",activeFlow: message?.activeFlow ?? null,conversationId: message?.conversationId ?? null  });
                }
 
                const response = await intent.detect(message.content.text, message?.conversationId ?? null);

                //TODO no intent - try AI response? or just default answer? maybe a fallback intent that always matches?

                const assistantMessage = response.content instanceof Message
                    ? response.content
                    : new Message({
                        content: response.content ?? { text: "" },
                        role: "assistant",
                        activeFlow: response.content?.activeFlow ?? null,
                        conversationId: message?.conversationId ?? null,
                        options: response.content?.options ?? [],
                    });

                //did the intent trigger an flow?
                if (assistantMessage.activeFlow) {
                    return await flow.start(assistantMessage.activeFlow.id, assistantMessage.conversationId ?? null);
                }

                return assistantMessage;
            }
            else
            {
                return await flow.process(message.activeFlow, message.content.text, message?.conversationId ?? null, message);
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



function normalizeOptions(step) {
    if (!Array.isArray(step?.options)) return [];

    return step.options.map((option, index) => {
        if (typeof option === "string") {
            return {
                id: `${step.id || "option"}-${index}`,
                label: option,
                value: option,
            };
        }

        return {
            id: option.id || `${step.id || "option"}-${index}`,
            label: option.label || option.text || option.value || option.id || "Option",
            value: option.value || option.text || option.id || option.label || "",
            button_type: option.button_type,
        };
    });
}

export const flow = {

    getById(flowId) {
        return flowRegistry[flowId];
    },
    async process(activeFlow, userInput, conversationId, userMessage) {
        //TODO process the flow based on the current step and user input


        //Validate
        //Save current step's answer to DB or state management (not implemented yet)
        //Determine next step based on user input and flow definition (for simplicity, we just go to the next step in the array)
        //In a real implementation, you would have more complex logic here to handle different types of questions, branching flows, etc.


        //FROM AI
        // const currentStepId = activeFlow.current_step;
        // const currentStep = activeFlow.steps?.find(s => s.id === currentStepId);

        // if (currentStep) {
        //     currentStep.answer = userInput;
        // }

        // activeFlow.answers = {
        //     ...(activeFlow.answers || {}),
        //     [currentStepId]: userInput
        // };

        // console.log("answers", activeFlow.answers);
        const currentStepId = activeFlow.current_step;
        const currentStep = activeFlow.steps?.find(s => s.id === currentStepId);

        if (!currentStep) {
            return new Message({content: { text: "This flow step could not be found." },role: "assistant",activeFlow: activeFlow,conversationId: conversationId  });
        }
        currentStep.answer = userInput; 
        
        //#region Validate and transform
        //TODO Something.validate
        if (currentStep?.validation) {
            try {
                await executeCommand(currentStep.validation, {
                    answer: userInput,
                    stepId: currentStep.id,
                    step: currentStep,
                    flow: activeFlow,
                });
                userMessage.isValidated = true;
            } catch (error) {
                userMessage.isValidated = false;
                return new Message({
                    content: { text: error?.message || "Your answer did not pass validation." },
                    role: "assistant",
                    activeFlow: activeFlow,
                    conversationId: conversationId,
                });
            }
        } else {
            userMessage.isValidated = true;
        }
        //TODO Something.transform
        if (currentStep?.transform) {
            const transformedAnswer = await executeCommand(currentStep?.transform, {
                answer: currentStep.answer,
                stepId: currentStep.id,
            });
            console.log('User Message',userMessage);
            console.log('Transformed Answer',transformedAnswer);
            userMessage.content.text = transformedAnswer;
        }
        //#endregion
        


        let commandResult = null;

        if (currentStep?.command) {
            commandResult = await executeCommand(currentStep.command, {
                answer: currentStep.answer,
                stepId: currentStep.id,
                step: currentStep,
                flow: activeFlow,
            });
        }

        const nextStep = this.getNextStep(activeFlow.id, activeFlow.current_step);

        //#region If no next step, end the flow and save summary to memory
        if (!nextStep) {
            const summary = buildFlowSummary(activeFlow);
            const savedMemory = saveConversationMemory({
                id:conversationId,
                flowId: activeFlow?.id ?? null,
                flowName: activeFlow?.name ?? null,
                summary,
                answers: (activeFlow?.steps ?? []).filter((step) => typeof step.answer !== "undefined" && step.answer !== null).map((step) => ({
                    id: step.id,
                    name: step.name || step.id,
                    answer: step.answer,
                })),
            });

            return new Message({
                content: {
                    text: `This flow is finished.\n\nSummary saved to temporary memory with ID ${savedMemory.id}.\n\n${summary}`,
                },
                role: "assistant",
                activeFlow: null,
                conversationId,
                memoryId: savedMemory.id,
                summary,
            });
        }
        //#endregion

        activeFlow.current_step = nextStep.id;

        //transform step:
        //validate:
        //action:


console.log("Command Result", commandResult);
        const messageText = typeof commandResult?.pre_text === "string" && commandResult.pre_text.trim().length > 0
            ? `${commandResult.pre_text.trim()}\n\n${nextStep.question}`
            : nextStep.question;

if(commandResult?.data){
    userMessage.content.text = commandResult.data;
}

        return new Message({
            content: { text: messageText },
            role: "assistant",
            activeFlow,
            conversationId,
            options: normalizeOptions(nextStep),
        });
    },
    getNextStep(flowId, currentStepId) {
        let activeFlow = this.getById(flowId);
        if(!activeFlow) return null;

        //TODO i think we need better next step logic here, but for now we just return the next step in the array
        let currentIndex = activeFlow.steps.findIndex(s => s.id === currentStepId);
        if(currentIndex === -1) return null;

        return activeFlow.steps[currentIndex + 1] || null;
    },
    async start(id, conversationId) {

        let activeFlow = this.getById(id);
        activeFlow.current_step = activeFlow.steps[0].id;

        if (conversationId) {
            await executeCommand("onboard.updateConversationRoute", { conversationId });
        }

        let messageText = activeFlow.steps[0].question;


        return new Message({
            content: { text: messageText },
            role: "assistant",
            activeFlow,
            conversationId,
            options: normalizeOptions(activeFlow.steps[0]),
        });
    }

}


function buildFlowSummary(activeFlow) {
    const answers = (activeFlow?.steps ?? [])
        .filter((step) => typeof step?.answer !== "undefined" && step.answer !== null && String(step.answer).trim() !== "")
        .map((step) => `- ${step.name || step.id}: ${String(step.answer)}`);

    const headline = `Flow "${activeFlow?.name || activeFlow?.id || "conversation"}" completed.`;
    const details = answers.length ? answers.join("\n") : "- No answers were captured in the flow.";

    return `${headline}\n\n${details}`;
}