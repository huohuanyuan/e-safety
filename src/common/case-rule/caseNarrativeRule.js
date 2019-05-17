let rules = [
    {

        isRepeat: false,
        data: [
            { itemId: 'LABEL_NR_NARRATIVE_CASE_SUMMARY', span: 24 },
            { itemId: 'NR_NARRATIVE', span: 24 },
            { itemId: 'NR_REPORTER', span: 24 },
            { itemId: 'LABEL_NR_SENDERS_DIAGNOSIS', span: 24 },
        ]
    },
    {

        isRepeat: true,
        list: [
            {
                deleted: false,
                isNew: true,
                data: [
                    { itemId: 'DIA_MEDDRA_VER', span: 12},
                    { itemId: 'DIA_MEDDRA_LLT', span: 12},
                ]
            },

        ],
        base: [//块
            { itemId: 'DIA_MEDDRA_VER', span: 12},
            { itemId: 'DIA_MEDDRA_LLT', span: 12},
        ]
    },
    {

        isRepeat: false,
        data: [
            { itemId: 'NR_SENDER', span: 24 },
            { itemId: 'LABEL_NR_CASE_SUMMARY', span: 24 },
        ]
    },
    {

        isRepeat: true,
        list: [
            {
                deleted: false,
                isNew: true,
                data: [
                    { itemId: 'NAT_RPT_COMMENT', span: 12},
                    { itemId: 'NAT_RPT_COMMENT_LANG', span: 12},
                ]
            },

        ],
        base: [//块
            { itemId: 'NAT_RPT_COMMENT', span: 12},
            { itemId: 'NAT_RPT_COMMENT_LANG', span: 12},
        ]
    }
]
export default rules;
