export const barnsleyFlow = {
    id: "barnsley",
    name: "Barnsley Search Flow",
    description: "Barnsley search flow",
    steps: [
        {
            id: "barnsley",
            index: 0,
            name: "barnsley",
            question: "What can we help you with today?",
            command: "util.getBarnsleySearch",
        },
        {
            id: "feedback",
            index: 1,
            name: "feedback",
            question: "Thanks for using the search tool. Please leave us feedback below",
            options:["Useful", "Not Useful"],
        }
    ]
}