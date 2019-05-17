
let rules = [
    {

        isRepeat: false,
        data: [
            { itemId: 'LABEL_SI_STUDY_IDENTIFICATION', span: 24, tag: "H1" },
            { itemId: 'LABEL_SI_STUDY_REGISTRATION', span: 24 },

        ]
    },
    {

        isRepeat: true,
        list: [
            {
                deleted: false,
                isNew: true,
                data: [
                    { itemId: 'STD_REG_NO', span: 12},
                    { itemId: 'STD_REG_COUNTRY', span: 12},
                ]
            },

        ],
        base: [//块
            { itemId: 'STD_REG_NO', span: 12 },
            { itemId: 'STD_REG_COUNTRY', span: 12 },
        ]

    },
    {

        isRepeat: false,
        data: [
            { itemId: 'STD_NAME', span: 12 },
            { itemId: 'STD_SPN_NO', span: 12 },
            { itemId: 'STD_REACTION_TYPE', span: 24 }
        ]
    }
]
export default rules;
