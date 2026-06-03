export const onboardCommands = {
    async capitalise(text) {
        return String(text.answer ?? "").toUpperCase();
    },
}