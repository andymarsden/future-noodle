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
                    text: message || "Welcome to QRIOS what would you like to do today?"
                },
                options: [
                    { id: "qrios", label: "New form", value: "qrios" },
                    { id: "vegetarian", label: "Follow Up", value: "/follow-up" },
                    { id: "gluten_free", label: "Nuevo formulario", value: "/nuevo-formulario" },
                    { id: "none", label: "View Data", value: "/view_data", button_type: "fancy" }
                ],
                type: "qrios-startup"
            };
        }
    },

{
        id: "qrios-followup",
        permissions: ["staff"],

        match(text) {
            return text === "/qrios-followup" || text.startsWith("/qrios-followup ");
        },

        extract(text) {
            return {
                message: text.replace(/^\/qrios-followup\s*/, "")
            };
        },

        async run({ message }) {
            return {
                content: {
                    text: message || "Welcome back to QRIOS! What would you like to do today?"
                },
                options: [
                    { id: "qrios", label: "New form", value: "qrios" },
                    { id: "vegetarian", label: "Follow Up", value: "/follow-up", button_type: "fancy" },
                ]
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
                //activeFlow: {id:"onboard"} qrios_form
                activeFlow: {id:"qrios_form"}
            };
        }
    },

 {
        id: "start-qrios-spanish",
        permissions: ["staff"],
        match(text) {
            return text.startsWith("/nuevo-formulario");
        },

        extract(text) {
            return {
                query: text.replace(/^\/nuevo-formulario\s*/, "")
            };
        },

        async run({ query }) {
            return {
                text: `qrios ${query}`,
                //activeFlow: {id:"onboard"} qrios_form
                activeFlow: {id:"qrios_form_spanish"}
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