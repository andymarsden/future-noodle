//intent engine
import { Message } from "$lib/classes/Message";
import { rules } from "./rules.js";

function normalizeOptions(options) {
    if (!Array.isArray(options)) return [];

    return options.map((option, index) => ({
        id: option?.id ?? `${index}`,
        label: option?.label ?? option?.text ?? option?.value ?? option?.id ?? "",
        value: option?.value ?? option?.id ?? option?.text ?? option?.label ?? "",
        button_type: option?.button_type,
        ...option,
    }));
}

//Converts various response formats into a standardized Message instance
function toMessage(response, conversationId) {
    if (response instanceof Message) {
        return response;
    }

    if (response && typeof response === "object" && "content" in response) {
        return new Message({
            ...response,
            conversationId: response.conversationId ?? conversationId ?? "intent",
            content: response.content ?? { text: "" },
            role: response.role ?? "assistant",
            activeFlow: response.activeFlow ?? null,
            options: normalizeOptions(response.options),
        });
    }

    return new Message({
        conversationId: conversationId ?? "intent",
        role: "assistant",
        content: typeof response === "object" && response !== null ? response : { text: response ?? "" },
        activeFlow: response?.activeFlow ?? null,
        options: normalizeOptions(response?.options),
    });
}

export const intent = {

    async detect(text, conversationId = null) {
        const normalized = text.trim().toLowerCase();

        const intent = rules.find(intent =>
            intent.match(normalized)
        );
 
        if (!intent) {
            return {
                success: false,
                error: {
                    code: "INTENT_EXECUTION_FAILED",
                    message: "Sorry, I don't understand that command."
                },
                intent: null,
                payload: null,
                content: null
            };
        }

        const payload = intent.extract ? intent.extract(normalized): {};

        try {
            const response = await intent.run(payload);
            return {
                success: true,
                error: null,
                intent: intent.id,
                payload,
                content: toMessage(response, conversationId)
            };
        } catch (error) {
            return {
                success: false,
                error: {
                    code: "INTENT_EXECUTION_FAILED",
                    message: error.message
                },
                intent: null,
                payload: null,
                content: null
            };
        }


    }
}
//https://chatgpt.com/c/6a08cee3-c7e0-83eb-a914-56d4bc9c0fed

// async detect(text) {

//         const normalized = text.trim().toLowerCase();

//         const matchedIntent = rules.find(intentRule =>
//             intentRule.match(normalized)
//         );

//         if (!matchedIntent) {
//             return {
//                 success: false,
//                 error: {
//                     code: "INTENT_NOT_FOUND",
//                     message: "No matching intent found"
//                 },
//                 intent: null,
//                 payload: null,
//                 response: null
//             };
//         }

//         try {

//             const payload = matchedIntent.extract
//                 ? matchedIntent.extract(normalized)
//                 : {};

//             const response = await matchedIntent.run(payload);

//             return {
//                 success: true,
//                 error: null,
//                 intent: matchedIntent.id,
//                 payload,
//                 response
//             };

//         } catch (error) {

//             return {
//                 success: false,
//                 error: {
//                     code: "INTENT_EXECUTION_FAILED",
//                     message: error.message
//                 },
//                 intent: matchedIntent.id,
//                 payload: null,
//                 response: null
//             };
//         }
//     }
// };

// const result = await intent.detect(text);

// if (!result.success) {

//     if (result.error.code === "INTENT_NOT_FOUND") {
//         return aiIntentResolver(text);
//     }

//     return {
//         text: "Something went wrong."
//     };
// }

// return result.response;