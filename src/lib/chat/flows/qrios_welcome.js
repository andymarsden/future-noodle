export const qriosWelcomeFlow = {
    id: "qrios_welcome",
    name: "Qrios Welcome Flow",
    description: "A welcome flow for Qrios",
    steps: [
        {
            id: "welcome",
            index: 0,
            name: "Welcome Step",
            question: "Welcome to Qrios what would you like to do?",
            description: "Greet the user and introduce the onboarding process.",
            options: [
                { id: "qrios", text: "New form" },
                { id: "vegetarian", text: "Vegetarian" },
                { id: "gluten_free", text: "Gluten-Free" },
                { id: "none", text: "No Preferences", button_type:"fancy" }
            ],

        }]
}