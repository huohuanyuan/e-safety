let rules = [
    {

        isRepeat: false,
        data: [
            { itemId: 'LABEL_CI_IDENTIFICATION_OF_CSR', span: 24 },
            { itemId: 'CASE_NO', span: 24 },
            { itemId: 'CASE_REG_TIME', span: 12 },
            { itemId: 'CASE_RPT_TYPE', span: 12 },
            { itemId: 'CASE_RECON_DTC', span: 12 },
            { itemId: 'CASE_RECENT_DTC', span: 12 },
            { itemId: 'LABEL_CI_ADDITIONAL_DOCUMENTS', span: 24 },
            { itemId: 'CASE_ADD_DOC', span: 12 },
            { itemId: 'LABEL_CI_DOCUMENTS', span: 24 },
        ]
    },
    {

        isRepeat: true,
        list: [
            {
                deleted: false,
                isNew: true,
                data: [
                    { itemId: 'DOC_HELD', span: 12 },
                    { itemId: 'DOC_FILE_CONTENT', span: 12 },
                ]
            },

        ],
        base: [//块
            { itemId: 'DOC_HELD', span: 12 },
            { itemId: 'DOC_FILE_CONTENT', span: 12 },
        ]
    },
    {

        isRepeat: false,
        data: [
            { itemId: 'CASE_EXPEDIT', span: 12 },
            { itemId: 'LABEL_CI_UNIQUE_CASE_ID', span: 24 },
            { itemId: 'CASE_FIRST_SENDER', span: 12 },
            { itemId: 'LABEL_CI_OTHER_CASE_IDENTIFIERS', span: 24 },
            { itemId: 'CASE_OTHER_NO', span: 12 },
            { itemId: 'LABEL_CI_SOURCES_OF_THE_CASE', span: 24 },
        ]
    },
    {

        isRepeat: true,
        list: [
            {
                deleted: false,
                isNew: true,
                data: [
                    { itemId: 'SRC_SOURCE', span: 12},
                    { itemId: 'SRC_CASE_NO', span: 12},
                ]
            },

        ],
        base: [//块
            { itemId: 'SRC_SOURCE', span: 12},
            { itemId: 'SRC_CASE_NO', span: 12},
        ]
    },
    {

        isRepeat: false,
        data: [
            { itemId: 'LABEL_CI_REF_CASE_NO', span: 24 },
        ]
    },
    {

        isRepeat: true,
        list: [
            {
                deleted: false,
                isNew: true,
                data: [
                    { itemId: 'REF_CASE_NO', span: 24},
                ]
            },

        ],
        base: [//块
            { itemId: 'REF_CASE_NO', span: 24},
        ]
    },
    {

        isRepeat: false,
        data: [
            { itemId: 'CASE_RPT_NULL', span: 12 },
            { itemId: 'CASE_RPT_NULL_REAS', span: 12 },
        ]
    }
]
export default rules;
