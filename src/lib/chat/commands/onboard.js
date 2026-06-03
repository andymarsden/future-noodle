export const onboardCommands = {
    async capitalise(text) {
        return String(text.answer ?? "").toUpperCase();
    },
    async validateWelcome(text) {
        const valid = text.answer.toLowerCase().includes("noodle");
        if (!valid) {
            throw new Error("Please mention 'noodle' to proceed.");
        }
        return true;
    }
}