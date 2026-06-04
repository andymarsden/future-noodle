import * as chrono from "chrono-node";

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
};