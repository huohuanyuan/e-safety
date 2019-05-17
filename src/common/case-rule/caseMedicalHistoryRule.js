let rules = {};
//table
rules.listRule = {
    title: {
        itemId: "LABEL_MH_DRUG_HISTORY",
        span: 24
    },
    topRule: [
        { itemId: 'LABEL_MH_DRUG_HISTORY', span: 24, tag: "H1" },
        { itemId: 'DM_MH_DETAIL', span: 24 },
        { itemId: 'DM_CON_THERAPHY', span: 24 },
    ],

    columns: [
        {
            type: 'index',
            width: 80,
            title: "No."
        },
        {
            key: "MH_MEDDRA_LLT"
        },
        {
            key: "MH_STDTC"
        },
        {
            key: "MH_CONT"
        },
        {
            key: "MH_ENDTC"
        },
        {
            key: "MH_COMMENT"
        },
        {
            key: "MH_FAM_HIS"
        }
    ]

};
//form  createDrawJson方法的rules参数要求是数组，所以此处的数据结构也定义为数组（数组中只有一个元素），
rules.formRule = [

    { itemId: 'LABEL_MH_MEDICAL_HISTORY', span: 24 },
    { itemId: 'MH_MEDDRA_VER', span: 12 },
    { itemId: 'MH_MEDDRA_LLT', span: 12 },
    { itemId: 'MH_STDTC', span: 12 },
    { itemId: 'MH_CONT', span: 12 },
    { itemId: 'MH_ENDTC', span: 12 }, 
    { itemId: 'MH_COMMENT', span: 12 },
    { itemId: 'MH_FAM_HIS', span: 12 },
];

export default rules;
