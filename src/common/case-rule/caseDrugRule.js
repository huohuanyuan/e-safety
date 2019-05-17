let rules = {};
//table
rules.listRule = {
    title: {
        itemId: "LABEL_DG_DRUGS_INFORMATION",
        span: 24
    },
    columns: [
        {
            type: 'index',
            width: 80,
            title: "No."
        },
        {
            key: "DG_DRUG_ROLE"
        },
        {
            key: "DG_PRODUCT_NAME"
        },
        {
            key: "DG_BLIND"
        },
        {
            key: "DG_DOSEU"
        },
        {
            key: "DG_GEST_PERIOD"
        },
        {
            key: "DG_ACN"
        },

    ]

};
//form  多层嵌套上面的表单规则
rules.formRule_1 = [
    {

        isRepeat: false,
        data: [
            { itemId: 'DG_DRUG_ROLE', span: 12 },
            // { itemId: 'DG_PRD_KEY', span: 12 },
            { itemId: 'DG_PRODUCT_NAME', span: 24 },
            { itemId: 'DG_MPID_VER', span: 12 },
            { itemId: 'DG_MPID', span: 12 },
            { itemId: 'DG_PHPID_VER', span: 12 },
            { itemId: 'DG_PHPID', span: 12 },
            { itemId: 'DG_COUNTRY', span: 24 },
            { itemId: 'DG_BLIND', span: 12 },
            { itemId: 'DG_AUTH_NO', span: 12 },
            { itemId: 'DG_AUTH_NATIOIN_CODE', span: 12 },
            { itemId: 'DG_AUTH_NAME', span: 12 },
            { itemId: 'DG_DOSE', span: 12 },
            { itemId: 'DG_DOSEU', span: 12 },
            { itemId: 'DG_GEST_PERIOD', span: 12 },
            { itemId: 'DG_GEST_PERIODU', span: 12 },
            { itemId: 'DG_ACN', span: 24 },
            { itemId: 'DG_ADD_INFO', span: 24 },
            { itemId: 'LABEL_DG_SUBSTANCE_IDENTIFIER', span: 24 },


        ]
    },
    {
        isRepeat: true,
        list: [
            {
                deleted: false,
                isNew: true,
                data: [
                    { itemId: 'SUBS_NAME', span: 24 },
                    { itemId: 'SUBS_TID_VER', span: 12 },
                    { itemId: 'SUBS_TID', span: 12 },
                    { itemId: 'SUBS_DOSE', span: 12 },
                    { itemId: 'SUBS_DOSEU', span: 12 }
                ]
            },
        ],
        base: [//块
            { itemId: 'SUBS_NAME', span: 24 },
            { itemId: 'SUBS_TID_VER', span: 12 },
            { itemId: 'SUBS_TID', span: 24 },
            { itemId: 'SUBS_DOSE', span: 24 },
            { itemId: 'SUBS_DOSEU', span: 24 }
        ]

    },
    {
        isRepeat: false,
        data: [
            { itemId: 'LABEL_DG_DOSAGE_INFORMATION', span: 24 }
        ]
    },
    {

        isRepeat: true,
        list: [
            {
                deleted: false,
                isNew: true,
                data: [
                    { itemId: 'DOS_DOSE', span: 12 },
                    { itemId: 'DOS_DOSEU', span: 12 },
                    { itemId: 'DOS_INTERVAL', span: 12 },
                    { itemId: 'DOS_INTERVALU', span: 12 },
                    { itemId: 'DOS_STDTC', span: 12 },
                    { itemId: 'DOS_ENDTC', span: 12 },
                    { itemId: 'DOS_DUR', span: 12 },
                    { itemId: 'DOS_DURU', span: 12 },
                    { itemId: 'DOS_LOT_NO', span: 12 },
                    { itemId: 'DOS_DOSE_TEXT', span: 12 },
                    { itemId: 'DOS_FORM', span: 12 },
                    { uiType: "LINE", span: 24 },//避免高度一行两个元素高度不一致导致下面元素无法浮动至左侧的问题
                    { itemId: 'DOS_FORM_ID_VER', span: 12 },
                    { itemId: 'DOS_FORM_ID', span: 12 },
                    { itemId: 'DOS_ROUTE', span: 12 },
                    { uiType: "LINE", span: 24 },//避免高度一行两个元素高度不一致导致下面元素无法浮动至左侧的问题
                    { itemId: 'DOS_ROUTE_ID_VER', span: 12 },
                    { itemId: 'DOS_ROUTE_ID', span: 12 },
                    { itemId: 'DOS_ROUTE_PARENT', span: 12 },
                    { uiType: "LINE", span: 24 },//避免高度一行两个元素高度不一致导致下面元素无法浮动至左侧的问题
                    { itemId: 'DOS_ROUTE_ID_VER_PARENT', span: 12 },
                    { itemId: 'DOS_ROUTE_ID_PARENT', span: 12 }
                ]

            }],
        base: [//块
            { itemId: 'DOS_DOSE', span: 24 },
            { itemId: 'DOS_DOSEU', span: 12 },
            { itemId: 'DOS_INTERVAL', span: 12 },
            { itemId: 'DOS_INTERVALU', span: 12 },
            { itemId: 'DOS_STDTC', span: 12 },
            { itemId: 'DOS_ENDTC', span: 12 },
            { itemId: 'DOS_DUR', span: 12 },
            { itemId: 'DOS_DURU', span: 12 },
            { itemId: 'DOS_LOT_NO', span: 12 },
            { itemId: 'DOS_DOSE_TEXT', span: 12 },
            { itemId: 'DOS_FORM', span: 24 },
            { itemId: 'DOS_FORM_ID_VER', span: 12 },
            { itemId: 'DOS_FORM_ID', span: 12 },
            { itemId: 'DOS_ROUTE', span: 24 },
            { itemId: 'DOS_ROUTE_ID_VER', span: 12 },
            { itemId: 'DOS_ROUTE_ID', span: 12 },
            { itemId: 'DOS_ROUTE_PARENT', span: 24 },
            { itemId: 'DOS_ROUTE_ID_VER_PARENT', span: 12 },
            { itemId: 'DOS_ROUTE_ID_PARENT', span: 12 }
        ]

    },
    {
        isRepeat: false,
        data: [
            { itemId: 'LABEL_DG_INDICATION_FOR_USE', span: 24 }
        ]
    },
    {
        isRepeat: true,
        list: [
            {
                deleted: false,
                isNew: true,
                data: [
                    { itemId: 'DI_INDC', span: 24 },
                    { itemId: 'DI_MEDDRA_VER', span: 12 },
                    { itemId: 'DI_MEDDRA_LLT', span: 12 },

                ]

            }],
        base: [
            { itemId: 'DI_INDC', span: 24 },
            { itemId: 'DI_MEDDRA_VER', span: 12 },
            { itemId: 'DI_MEDDRA_LLT', span: 12 },
        ]
    },
    {
        isRepeat: false,
        data: [
            { itemId: 'LABEL_DG_DRUG_REACTIONS_MATRIX', span: 24 }
        ]
    },


];
//多层嵌套部分的规则
rules.formRule_2 = [  
     {

    
        deleted: false,
        isNew: true,
        data: [
            { itemId: 'MAT_AE_ROW_NO', span: 24 },
            { itemId: 'MAT_FAD_INTERVAL', span: 12 },
            { itemId: 'MAT_FAD_INTERVALU', span: 12 },
            { itemId: 'MAT_LAD_INTERVAL', span: 12 },
            { itemId: 'MAT_LAD_INTERVALU', span: 12 },
            { itemId: 'MAT_RE_ADMIN', span: 24 },
        ],
        children: [
            {
                deleted: false,
                isNew: true,
                data: [
                    { itemId: 'ASSE_SOURCE', span: 12 },
                    { itemId: 'ASSE_METHOD', span: 12 },
                    { itemId: 'ASSE_RESULT', span: 12 },

                ],
            }
        ],
        base: {
            parent: [
                { itemId: 'MAT_AE_ROW_NO', span: 24 },
                { itemId: 'MAT_FAD_INTERVAL', span: 12 },
                { itemId: 'MAT_FAD_INTERVALU', span: 12 },
                { itemId: 'MAT_LAD_INTERVAL', span: 12 },
                { itemId: 'MAT_LAD_INTERVALU', span: 12 },
                { itemId: 'MAT_RE_ADMIN', span: 24 },
            ],
            children: 
                {
                    deleted: false,
                    isNew: true,
                    data: [
                        { itemId: 'ASSE_SOURCE', span: 12 },
                        { itemId: 'ASSE_METHOD', span: 12 },
                        { itemId: 'ASSE_RESULT', span: 12 },

                    ],
                }
            
        }

    },

]
//多层嵌套下面的表单规则
rules.formRule_3 = [{
    isRepeat: true,
    list: [
        {
            deleted: false,
            isNew: true,
            data: [
                { itemId: 'ADD_INFO_CODE', span: 24 },
            ]

        }],
    base: [
        { itemId: 'ADD_INFO_CODE', span: 24 },

    ]
}]

export default rules;
