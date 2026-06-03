export const onboardFlow = {
    id: "onboard",
    name: "Onboarding Flow",
    description: "A flow to onboard new users and gather information about their preferences.",
    steps: [
        {
            id: "welcome",
            index: 0,
            name: "Welcome Step",
            question: "Welcome to Future Noodle! Let's get started with a few questions to personalize your experience.",
            description: "Greet the user and introduce the onboarding process.",
            options: [],
            next_step: "dietary_preferences",
            validation:"onboard.validateWelcome"
        },
        {
            id: "dietary_preferences",
            index: 1,
            name: "Dietary Preferences",
            question: "Do you have any dietary preferences or restrictions we should know about?",
            description: "Ask the user about their dietary preferences to tailor recipe suggestions.",
            options: [
                { id: "vegan", text: "Vegan" },
                { id: "vegetarian", text: "Vegetarian" },
                { id: "gluten_free", text: "Gluten-Free" },
                { id: "none", text: "No Preferences" }
            ],
            transform: "onboard.capitalise",
        },
        {
            id: "cuisine_preferences",
            index: 2,
            name: "Cuisine Preferences",
            question: "What type of cuisine do you enjoy the most?",
            description: "Gather information about the user's favorite cuisines to provide better recommendations.",
            options: [
                { id: "italian", text: "Italian" },
                { id: "mexican", text: "Mexican" },
                { id: "chinese", text: "Chinese" },
                { id: "indian", text: "Indian" },
                { id: "american", text: "American" },
                { id: "other", text: "Other" }
            ]
        }]
};
