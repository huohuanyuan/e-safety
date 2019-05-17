
let rules = [
    {

        isRepeat: false,
        data: [
            { itemId: 'LABEL_DM_PAT_INFO', span: 24 ,tag:"H1" },
            { itemId: 'DM_SUBJ_INIT', span: 12 },
            { itemId: 'LABEL_DM_PAT_MED_RECORD', span: 24 },
            { itemId: 'DM_GP_MED_REC_NO', span: 12 },
            { itemId: 'DM_SP_MED_REC_NO', span: 12 }, 
            { uiType: "LINE", span: 24 },     
            { itemId: 'DM_HP_MED_REC_NO', span: 12 },
            { itemId: 'DM_INV_NO', span: 12 },
            { itemId: 'LABEL_DM_AGE_INFORMATION', span: 24 },
            { itemId: 'DM_BRTHDTC', span: 12 },
            { itemId: 'DM_AGE_GROUP', span: 12 },
            { uiType: "LINE", span: 24 },  
            { itemId: 'DM_AGE', span: 12 },
            { itemId: 'DM_AGEU', span: 12 },
            { uiType: "LINE", span: 24 },  
            { itemId: 'DM_GEST_PERIOD', span: 12 },
            { itemId: 'DM_GEST_PERIODU', span: 12 },
            { uiType: "LINE", span: 24 },  
            { itemId: 'DM_WEIGHT', span: 12 },
            { itemId: 'DM_HEIGHT', span: 12 },
            { uiType: "LINE", span: 24 },  
            { itemId: 'DM_SEX', span: 12 },
            { itemId: 'DM_MENSDTC', span: 12 },
            { uiType: "LINE", span: 24 },  
            { itemId: 'DM_DTHDTC', span: 12 },
            { itemId: 'LABEL_DM_CAUSE_OF_DEATH', span: 24 },
        ]
    },
    {

        isRepeat: true,
        list: [
            {
                deleted: false,
                isNew: true,
                data: [
                    { itemId: 'DRP_MEDDRA_VER', span: 12},
                    { itemId: 'DRP_MEDDRA_LLT', span: 12},
                    { itemId: 'DRP_COMMENT', span: 12}
                ]
            },

        ],
        base: [//块
            { itemId: 'DRP_MEDDRA_VER', span: 12},
            { itemId: 'DRP_MEDDRA_LLT', span: 12},
            { itemId: 'DRP_COMMENT', span: 12}
        ]
    },
    {

        isRepeat: false,
        data: [

            { itemId: 'DM_AUTOPSY', span: 12 },
            { itemId: 'LABEL_DM_AUTOPSY_CAUSE_OF_DEATH', span: 24 },

        ]
    },
    {
        isRepeat: true,
        list: [
            {
                deleted: false,
                isNew: true,
                data: [
                    { itemId: 'DPS_MEDDRA_VER', span: 12 },
                    { itemId: 'DPS_MEDDRA_LLT', span: 12 },
                    { itemId: 'DPS_DTH_REAS', span: 24}
                ]
            },
        ],
        base: [
            { itemId: 'DPS_MEDDRA_VER', span: 12},
            { itemId: 'DPS_MEDDRA_LLT', span: 12},
            { itemId: 'DPS_DTH_REAS', span: 24}
        ]
    },
    {

        isRepeat: false,
        data: [
            { itemId: 'LABEL_DM_FOR_A_PATIENT', span: 24 },
            { itemId: 'DM_PARENT_ID', span: 12 },
            { itemId: 'DM_BIRTH_PARENT', span: 12 },
            { itemId: 'LABEL_DM_AGE_OF_PARENT', span: 24 },
            { itemId: 'DM_AGE_PARENT', span: 12 },
            { itemId: 'DM_AGEU_PARENT', span: 12 },
            { itemId: 'DM_MENSDTC_PARENT', span: 12 },
            { itemId: 'DM_WEIGHT_PARENT', span: 12 },
            { itemId: 'DM_HEIGHT_PARENT', span: 12 },
            { itemId: 'DM_SEX_PARENT', span: 12 },
            { itemId: 'LABEL_DM_RELEVANT_MED_HISTORY', span: 24 },
        ]
    },
    {
        isRepeat: true,
        list: [
            {
                deleted: false,
                isNew: true,
                data: [
                    { itemId: 'MHP_MEDDRA_VER', span: 12 },
                    { itemId: 'MHP_MEDDRA_LLT', span: 12},
                    { itemId: 'MHP_STDTC', span: 12},
                    { itemId: 'MHP_CONT', span: 12 },
                    { itemId: 'MHP_ENDTC', span: 12},
                    { itemId: 'MHP_COMMENT', span: 12 },
                ],
            }
        ],
        base: [
            { itemId: 'MHP_MEDDRA_VER', span: 12},
            { itemId: 'MHP_MEDDRA_LLT', span: 12},
            { itemId: 'MHP_STDTC', span: 12 },
            { itemId: 'MHP_CONT', span: 12 },
            { itemId: 'MHP_ENDTC', span: 12 },
            { itemId: 'MHP_COMMENT', span: 12 },
        ]
    },
    {
        isRepeat: false,
        data: [
            { itemId: 'DM_MH_DETAIL_PARENT', span: 24 },
            { itemId: 'LABEL_DM_DRUG_HISTORY_OF_PARENT', span: 24 },
        ]
    },
    {
        isRepeat: true,
        list: [
            {
                deleted: false,
                isNew: true,
                data: [
                    { itemId: 'DHP_DRUG_NAME', span: 24 },
                    { itemId: 'DHP_MPID_VER', span: 12 },
                    { itemId: 'DHP_MPID', span: 12 },
                    { itemId: 'DHP_PHPID_VER', span: 12 },
                    { itemId: 'DHP_PHPID', span: 12 },
                    { itemId: 'DHP_STDTC', span: 12 },
                    { itemId: 'DHP_ENDTC', span: 12 },
                    { itemId: 'DHP_MEDDRA_VER_IND', span: 12 },
                    { itemId: 'DHP_MEDDRA_LLT_IND', span: 12 },
                    { itemId: 'DHP_MEDDRA_VER_AE', span: 12 },
                    { itemId: 'DHP_MEDDRA_LLT_AE', span: 12 },
                ]
            }
        ],
        base: [
            { itemId: 'DHP_DRUG_NAME', span: 24 },
            { itemId: 'DHP_MPID_VER', span: 12 },
            { itemId: 'DHP_MPID', span: 12 },
            { itemId: 'DHP_PHPID_VER', span: 12 },
            { itemId: 'DHP_PHPID', span: 12 },
            { itemId: 'DHP_STDTC', span: 12 },
            { itemId: 'DHP_ENDTC', span: 12 },
            { itemId: 'DHP_MEDDRA_VER_IND', span: 12 },
            { itemId: 'DHP_MEDDRA_LLT_IND', span: 12 },
            { itemId: 'DHP_MEDDRA_VER_AE', span: 12 },
            { itemId: 'DHP_MEDDRA_LLT_AE', span: 12 },
        ]
    }
]
export default rules;
