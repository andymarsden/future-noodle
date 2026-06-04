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
                { id: "none", text: "No Preferences", button_type:"fancy" }
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
        },
        {        id: "cooking_frequency",
            index: 3,
            name: "Cooking Frequency",
            question: "### Details\n\n\n---\n\n\nThese questions help us understand where and when the conversation is happening, and what brought someone here today. They also tell us whether this is a first visit about an issue or part of something ongoing, which helps us understand how and when support is being accessed.\n\n---\n\n **Questions**\n\nWhich hub did you attend?",
            description: "Understand the user's cooking habits to suggest suitable recipes.",
            options: [
                { id: "daily", text: "Daily" },
                { id: "a_few_times_a_week", text: "A few times a week" },
                { id: "weekly", text: "Weekly" },
                { id: "rarely", text: "Rarely" }
            ]
}
    
    ]
};
