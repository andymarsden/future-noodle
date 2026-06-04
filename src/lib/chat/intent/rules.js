//intent rules
export const rules = [
    {
        id: "echo",
        permissions: ["staff"],

        match(text) {
            return text === "/echo" || text.startsWith("/echo ");
        },

        extract(text) {
            return {
                message: text.replace(/^\/echo\s*/, "")
            };
        },

        async run({ message }) {
            return {
                content: {
                    text: message || "Echo mode active. Type /echo followed by text to repeat it."
                },
                options: [],
                type: "echo"
            };
        }
    },
    {
        id: "qrios-startup",
        permissions: ["staff"],

        match(text) {
            return text === "/qrios-startup" || text.startsWith("/qrios-startup ");
        },

        extract(text) {
            return {
                message: text.replace(/^\/qrios-startup\s*/, "")
            };
        },

        async run({ message }) {
            return {
                content: {
                    text: message || "Qrios startup mode active. Type /qrios-startup followed by text to start."
                },
                options: [
                    { id: "qrios", label: "New form", value: "qrios" },
                    { id: "vegetarian", label: "Vegetarian", value: "vegetarian" },
                    { id: "gluten_free", label: "Gluten-Free", value: "gluten_free" },
                    { id: "none", label: "No Preferences", value: "none", button_type: "fancy" }
                ],
                type: "qrios-startup"
            };
        }
    },
    {
        id: "timestamp",
        permissions: ["staff"],

        aliases: [
            "/time",
            "time"
        ],

        match(text) {
            return this.aliases.some(alias =>
                text.startsWith(alias)
            );
        },

        async run() {
            return {
                text: new Date().toISOString()
            };
        }
    },

    {
        id: "play-music",
        permissions: ["staff"],
        match(text) {
            return text.startsWith("play ");
        },

        extract(text) {
            return {
                query: text.replace(/^play\s+/, "")
            };
        },

        async run({ query }) {
            return {
                text: `Playing ${query}`
            };
        }
    }
    ,
    {
        id: "start-qrios",
        permissions: ["staff"],
        match(text) {
            return text.startsWith("qrios");
        },

        extract(text) {
            return {
                query: text.replace(/^qrios\s+/, "")
            };
        },

        async run({ query }) {
            return {
                text: `qrios ${query}`,
                activeFlow: {id:"onboard"}
            };
        }
    },
    {
        id: "rugby-flow",
        permissions: ["staff"],
        match(text) {
            return text.startsWith("rugby");
        },

        extract(text) {
            return {
                //query: text.replace(/^qrios\s+/, "")
            };
        },

        async run({ query }) {
            return {
                //text: `qrios ${query}`,
                activeFlow: {id:"rugby"}
            };
        }
    }
];