import * as chrono from "chrono-node";
const POSTCODE_LOOKUP_API = "https://infojam.app.n8n.cloud/webhook/8b3f24d0-1cfd-457f-ab50-431eb33ab5df";
const TEXT_CLASSIFICATION_API = "https://infojam.app.n8n.cloud/webhook/c2094744-fe0d-4764-9b1e-cf11e06f0387";
const ADVICE_API = "https://infojam.app.n8n.cloud/webhook/81e0373b-b53c-42b9-9049-ddb66e5a0dcf";
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

    async classifyText(payload) {
        console.log("classifyText command called with payload:", payload);

        const text = `${payload.answer || payload.text || ""}`.trim();

        if (!text) {
            return "";
        }

        try {
            const response = await fetch(TEXT_CLASSIFICATION_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error(`Text classification failed with status ${response.status}`);
            }

            const responseBody = await response.json();
            const tags = Array.isArray(responseBody?.tags) ? responseBody.tags : [];
            return tags.join(", ");
        } catch (error) {
            console.warn("classifyText failed:", error);
            return "";
        }
    },

    async getAdvice(payload) {
        console.log("getAdvice command called with payload:", payload);

        const text = `${payload.answer || payload.text || ""}`.trim();

        if (!text) {
            return "";
        }

        try {
            const response = await fetch(ADVICE_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error(`Advice request failed with status ${response.status}`);
            }

            let advice = "";
            const contentType = response.headers.get("content-type") || "";

            if (contentType.includes("application/json")) {
                const responseBody = await response.json();
                advice = typeof responseBody?.advice === "string"
                    ? responseBody.advice
                    : typeof responseBody?.result === "string"
                        ? responseBody.result
                        : JSON.stringify(responseBody);
            } else {
                advice = await response.text();
            }
const rtext = `${payload.answer || payload.text || ""}`.trim();
            return {
                pre_text: "Some advice: \n" + JSON.parse(advice.trim()).advise + "\n\n",
                data: rtext +"\n\n tags: " + await utilCommands.classifyText(payload),
            };
        } catch (error) {
            console.warn("getAdvice failed:", error);
            return {
                pre_text: "Some advice: \nUnable to retrieve advice.",
                data: "",
            };
        }
    },

    async getPostcodeInfo(payload) {
        console.log("getPostcodeInfo command called with payload:", payload);

        const postcode = { postcode: `${payload.answer}` };

        try {
            const response = await fetch(POSTCODE_LOOKUP_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postcode),
            });

            if (!response.ok) {
                throw new Error(`Postcode lookup failed with status ${response.status}`);
            }

            const responseBody = await response.json();
            const ward = responseBody?.admin_ward;

            if (ward) {
                return {
                    pre_text: `You entered the postcode: **${payload.answer}**. I have saved the ward of **${ward}** rather than the postcode itself.\n\n`,
                    data: ward,
                };
            }

            return {
                pre_text: `Unable to resolve the postcode. Saving the entered value instead.`,
                data: payload.answer,
            };
        } catch (error) {
            console.warn("getPostcodeInfo failed, falling back to raw postcode:", error);
            return {
                pre_text: `Unable to resolve the postcode. Saving the entered value instead.`,
                data: payload.answer,
            };
        }
    }
};