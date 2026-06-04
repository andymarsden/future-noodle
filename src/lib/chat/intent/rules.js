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