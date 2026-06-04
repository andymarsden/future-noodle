export const qriosFormSpanishFlow = {
    id: "qrios_form_spanish",

   steps: [
    {
        index: 0,
        id: "hub",
        question: "### Detalles\n\n\n---\n\n\nEstas preguntas nos ayudan a comprender dónde y cuándo tiene lugar la conversación, y qué llevó a la persona a acudir hoy. También nos indican si se trata de una primera visita relacionada con un asunto o si forma parte de una situación continua, lo que nos ayuda a comprender cómo y cuándo se accede al apoyo.\n\n\n---\n\n\n **Preguntas**\n\n¿A qué centro asistió?",
        options: ["[a] Chester -Tomorrows Women", "[b] Chester Blacon", "[c] Chester City Centre", "[d] Ellesmere Port", "[e] Frodsham", "[f] Helsby", "[g] Lache", "[h] Malpas", "[i] Neston", "[j] Northwich", "[k] Tarporley", "[l] Winsford"]
    },
    {
        index: 1,
        id:"when_attended",
        question: "¿Cuándo asistió al punto de atención?"
    },
    {
        index: 2,
        id:"reason_for_visit",
        question: "¿Qué le ha traído hoy al punto de atención?"
    },
    {
        index: 3,
        id:"first_visit",
        question: "¿Es esta su primera visita al punto de atención por este asunto?",
        options: ["[a] Sí", "[b] No"]
    },
    {
        index: 4,
        id:"demographics_age_band",
        question: "### Sobre usted\n\n\n---\n\n\nEstas preguntas nos ayudan a comprender a quién estamos llegando y a quién podríamos no estar llegando. Al recopilar información sencilla y no identificable, podemos asegurarnos de que el apoyo llegue a personas de todos los orígenes, edades y comunidades.\n\n\nTambién nos ayuda a identificar patrones de necesidad y acceso para mejorar nuestros servicios y hacerlos más inclusivos.\n\n\nNo tiene que responder a todo; solo aquello con lo que se sienta cómodo compartiendo.\n\n\nNunca recopilamos nombres, direcciones completas ni ningún dato que pueda identificarle.\n\n\n---\n\n\n **Preguntas** \n\n\n¿Cuál es su grupo de edad?",
        options: ["[a] 0-9", "[b] 10-17", "[c] 18-29", "[d] 30-39", "[e] 40-49", "[f] 50-59", "[g] 60-69", "[h] 70-79", "[i] 80-89", "[j] 90+"]
    },
    {
        index: 5,
        id:"demographics_postcode",
        question: "¿Cuál es su código postal?"
    },
    {
        index: 6,
        id:"demographics_gender",
        question: "¿Cómo describiría su género?",
        options: ["[a] Hombre", "[b] Mujer", "[c] No binario", "[d] Prefiero no decirlo"]
    },
    {
        index: 7,
        id:"demographics_disability",
        question: "¿Se considera una persona con discapacidad?",
        options: ["[a] Sí", "[b] No"]
    },
    {
        index: 8,
        id:"demographics_care_for_children",
        question: "¿Tiene a su cargo el cuidado de niños?",
        options: ["[a] No", "[b] Sí - Edad preescolar", "[c] Sí - Edad de educación primaria", "[d] Sí - Edad de educación secundaria"]
    },
    {
        index: 9,
        id:"demographics_ethnicity",
        question: "¿Cómo describiría su origen étnico?",
        options: ["[a] Blanco", "[b] Grupos étnicos mixtos / múltiples", "[c] Asiático / Asiático británico", "[d] Negro / Africano / Caribeño / Negro británico", "[e] Otro grupo étnico"]
    },
    {
        index: 10,
        id:"demographics_ethnicity_detail",
        question: "¿Le gustaría proporcionar más información sobre su origen étnico?"
    },
    {
        index: 11,
        id:"demographics_referral",
        question: "¿Dónde supo de nosotros?"
    },
    {
        index: 12,
        id:"wellbeing_coping",
        question: "### Bienestar\n\n\n---\n\n\nEstas preguntas nos ayudan a comprender el panorama general: cómo se siente una persona en su día a día, qué tan conectada y en control se siente, y qué podría ayudar a mejorar su situación.\n\n\nEl bienestar no depende de una sola cosa; está influido por nuestras relaciones, nuestra sensación de seguridad, el grado de elección que tenemos y la facilidad para realizar las actividades que disfrutamos.\n\n\nLas respuestas a estas preguntas nos ayudarán a orientar el apoyo de la manera adecuada y a identificar dónde debemos centrar nuestros esfuerzos. También nos permiten demostrar el valor y el impacto de nuestro trabajo cuando marca una diferencia en la vida de las personas.\n\n\n---\n\n\n **Preguntas** \n\n\n¿Qué tan bien ha afrontado los desafíos cotidianos?",
        options: ["[a] En absoluto", "[b] Ligeramente", "[c] Algo", "[d] Bastante", "[e] Mayormente", "[f] Completamente"]
    },
    {
        index: 13,
        id:"wellbeing_connected",
        question: "¿Qué tan conectado se siente con las personas importantes para usted?",
        options: ["[a] En absoluto", "[b] Ligeramente", "[c] Algo", "[d] Bastante", "[e] Mayormente", "[f] Completamente"]
    },
    {
        index: 14,
        id:"wellbeing_control",
        question: "¿Cuánto control siente que tiene sobre su vida?",
        options: ["[a] En absoluto", "[b] Ligeramente", "[c] Algo", "[d] Bastante", "[e] Mayormente", "[f] Completamente"]
    },
    {
        index: 15,
        id:"wellbeing_safe",
        question: "¿Qué tan seguro se siente en su hogar o comunidad?",
        options: ["[a] En absoluto", "[b] Ligeramente", "[c] Algo", "[d] Bastante", "[e] Mayormente", "[f] Completamente"]
    },
    {
        index: 16,
        id:"wellbeing_support",
        question: "¿Qué tan fácil le resulta acceder al apoyo que necesita para hacer las cosas que disfruta?",
        options: ["[a] En absoluto", "[b] Ligeramente", "[c] Algo", "[d] Bastante", "[e] Mayormente", "[f] Completamente"]
    },
    {
        index: 17,
        id:"wellbeing_satisfaction",
        question: "En general, ¿qué tan satisfecho está con su vida?",
        options: ["[0] - En absoluto", "[1]", "[2]", "[3]", "[4]", "[5]", "[6]", "[7]", "[8]", "[9]", "[10] - Completamente"]
    },
    {
        index: 18,
        id:"next_steps",
        question: "### Próximos pasos\n\n\n---\n\n\nEsta sección sirve para registrar cualquier acción acordada durante la conversación. Es una oportunidad para reflexionar sobre las respuestas relacionadas con el bienestar y decidir conjuntamente qué podría ayudar a mejorar la situación de la persona o resolver el problema planteado.\n\n\nLos próximos pasos pueden incluir la conexión con apoyos locales, el acceso a información o servicios, o la presentación a otros servicios o entidades colaboradoras. Deben ser claros, alcanzables y acordados conjuntamente con la persona siempre que sea posible.\n\n\n---\n\n\n **Preguntas** \n\n\nPor favor, registre únicamente las acciones acordadas o notas generales; no deben registrarse datos personales ni información identificativa.",
        options: [
            "[a] Se ofreció información, asesoramiento y orientación",
            "[b] Derivación a una actividad comunitaria",
            "[c] Derivación a profesionales de salud",
            "[d] Derivación a servicios sociales para adultos",
            "[e] Conexión con servicios de vivienda",
            "[f] Conexión con otro servicio municipal",
            "[g] Invitado a regresar",
            "[h] No se requiere ninguna otra acción - caso cerrado",
            "[i] Otro"
        ]
    },
    {
        index: 19,
        id:"experience_venue",
        question: "### Experiencia\n\n\n---\n\n\nEstas preguntas nos ayudan a comprender cómo fue la experiencia de la persona que asistió: qué funcionó bien y qué podría mejorarse.\n\n\nEsta opinión es importante. Nos ayuda a garantizar que los centros sean acogedores, accesibles y útiles, y que todas las personas reciban el servicio y el apoyo que esperan y necesitan de una manera adecuada para ellas.\n\n\n---\n\n\n **Preguntas** \n\n\n¿Qué tan adecuado le pareció el lugar?",
        options: ["[a] En absoluto", "[b] Ligeramente", "[c] Algo", "[d] Bastante", "[e] Mayormente", "[f] Completamente"]
    },
    {
        index: 20,
        id:"experience_welcome",
        question: "¿Se sintió bienvenido?",
        options: ["[a] En absoluto", "[b] Ligeramente", "[c] Algo", "[d] Bastante", "[e] Mayormente", "[f] Completamente"]
    },
    {
        index: 21,
        id:"experience_accessibility",
        question: "¿Qué tan fácil le resultó llegar aquí hoy?",
        options: ["[a] En absoluto", "[b] Ligeramente", "[c] Algo", "[d] Bastante", "[e] Mayormente", "[f] Completamente"]
    },
    {
        index: 22,
        id:"experience_info",
        question: "¿Recibió la información, orientación o asesoramiento que necesitaba?",
        options: ["[a] En absoluto", "[b] Ligeramente", "[c] Algo", "[d] Bastante", "[e] Mayormente", "[f] Completamente"]
    },
    {
        index: 23,
        id:"experience_outcome",
        question: "¿Quedó satisfecho con el resultado de su visita?",
        options: ["[a] En absoluto", "[b] Ligeramente", "[c] Algo", "[d] Bastante", "[e] Mayormente", "[f] Completamente"]
    },
    {
        index: 24,
        id:"experience_recommend",
        question: "¿Recomendaría este centro a alguien en una situación similar?",
        options: ["[a] En absoluto", "[b] Ligeramente", "[c] Algo", "[d] Bastante", "[e] Mayormente", "[f] Completamente"]
    }
]};