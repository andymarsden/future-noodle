import * as chrono from "chrono-node";
const POSTCODE_LOOKUP_API = "https://infojam.app.n8n.cloud/webhook/8b3f24d0-1cfd-457f-ab50-431eb33ab5df";
export const utilCommands = {
    async textToDate(text) {

        const value = text?.answer?.trim();

        if (!value) {
            return null;
        }

        const parsedDate = chrono.parseDate(value);

        if (!parsedDate) {
            return null;
        }

        return parsedDate.toISOString().slice(0, 10);
    },

    async getPostcodeInfo(payload) {
console.log("getPostcodeInfo command called with payload:", payload);

        //Get the postcode from the API
        //TODO This should actually go in actions, but I'm putting it here for simplicity

        let postcode = { "postcode": `${payload.answer}` };

        //clean postcode by removing spaces and making uppercase
        //postcode.postcode = postcode.postcode.replace(/\s/g, "").toUpperCase();

        const response = await fetch(POSTCODE_LOOKUP_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postcode)
        });

        let responseBody = null;

        try {
            responseBody = await response.clone().json();
        } catch {
            responseBody = null;
        }

        let userAnswer = {};

        userAnswer.pre_text = `You entered the postcode: **${payload.answer}**., I have saved the ward of **${responseBody.admin_ward}** rather than the postcode itself.\n\n`;
        userAnswer.data = responseBody.admin_ward;
        return userAnswer;
    }
};