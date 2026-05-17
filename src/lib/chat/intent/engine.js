//intent engine
import { rules } from "./rules.js";

export const intent = {

    async detect(text) {
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
                content: response
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