//intent rules
export const rules = [
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
    }
];