export const onboardCommands = {
    async capitalise(text) {
        console.log("Capitalising", text);
        return String(text.answer ?? "").toUpperCase();
    },
    async validateWelcome(text) {
        const valid = text.answer.toLowerCase().includes("noodle");
        if (!valid) {
            throw new Error("Please mention 'noodle' to proceed.");
        }
        return true;
    },
    async updateConversationRoute({ conversationId } = {}) {
        console.log("Updating conversation route with ID:", conversationId);
        if (!conversationId || typeof window === "undefined") {
            return conversationId;
        }

        const nextPath = `/app/${conversationId}`;

        if (window.location.pathname !== nextPath) {
            window.history.replaceState(window.history.state, "", nextPath);
        }

        return conversationId;
    },
}