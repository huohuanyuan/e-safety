let rules = {};
//table
rules.listRule = {
    title: {
        itemId: "LABEL_AE_REACTIONS_EVENTS",
        span: 24
    },
    columns: [
        {
            type: 'index',
            width: 80,
            title: "No."
        },
        {
            key: "AE_TERM_LANG"
        },
        {
            key: "AE_HIGHLIGHT"
        },
        {
            key: "LABEL_AE_SERIOUSNESS_CRITERIA"
        },
        {
            key: "AE_STDTC"
        },
        {
            key: "AE_ENDTC"
        },
        {
            key: "AE_LANG"
        }
    ]

};
//form  createDrawJson方法的rules参数要求是数组，所以此处的数据结构也定义为数组（数组中只有一个元素），
rules.formRule = [
    { itemId: 'AE_TERM_LANG', span: 12 },
    { itemId: 'AE_LANG', span: 12 },
    { uiType: "LINE", span: 24 },//避免高度一行两个元素高度不一致导致下面元素无法浮动至左侧的问题
    { itemId: 'AE_TERM', span: 12 },
    { itemId: 'AE_HIGHLIGHT', span: 12 },
    { uiType: "LINE", span: 24 },
    { itemId: 'AE_MEDDRA_VER', span: 12 },
    { itemId: 'AE_MEDDRA_LLT', span: 12 },
    { itemId: 'LABEL_AE_SERIOUSNESS_CRITERIA', span: 24 },
    { itemId: 'AE_SDTH', span: 12 },
    { itemId: 'AE_SLIFE', span: 12 },
    { itemId: 'AE_SHOSP', span: 12 },
    { itemId: 'AE_SDISAB', span: 12 },
    { itemId: 'AE_SCONG', span: 12 },
    { itemId: 'AE_SMIE', span: 12 },
    { itemId: 'AE_STDTC', span: 12 },
    { itemId: 'AE_ENDTC', span: 12 },
    { itemId: 'AE_DUR', span: 12 },   
    { itemId: 'AE_DURU', span: 12 },
    { uiType: "LINE", span: 24 },
    { itemId: 'AE_OUT', span: 12 },
    { itemId: 'AE_PROFE_CONFIRM', span: 12 },
    { itemId: 'AE_COUNTRY', span: 24 },

]

export default rules;
