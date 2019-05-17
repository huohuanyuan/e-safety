let rules = {};
//table
rules.listRule = {
    title: {
        itemId: "LABEL_LB_RESULTS_OF_TESTS",
        span: 24
    },
    columns: [
        {
            type: 'index',
            width: 80,
            title: "No."
        },
        {
            key: "LB_DTC"
        },
        {
            key: "LB_TEST"
        },
        {
            key: "LB_RESULT_UNSTRUCT"
        },
        {
            key: "LB_ORNRLO"
        },
        {
            key: "LB_ORNRHI"
        },
        {
            key: "LB_COMMENT"
        }
    ]

};
//form  
rules.formRule = [
    { itemId: 'LB_DTC', span: 12 },
    { itemId: 'LB_TEST', span: 12 },
    { itemId: 'LB_MEDDRA_VER', span: 12 },
    { itemId: 'LB_MEDDRA_LLT', span: 12 },
    { itemId: 'LB_RES_CODE', span: 12 },
    { itemId: 'LB_STRESC', span: 12 },
    { uiType: "LINE", span: 24 },
    { itemId: 'LB_STRESU', span: 12 },
    { itemId: 'LB_RESULT_UNSTRUCT', span: 12 },
    { itemId: 'LB_ORNRLO', span: 12 },
    { itemId: 'LB_ORNRHI', span: 12 },
    { itemId: 'LB_COMMENT', span: 12 },
    { itemId: 'LB_MORE_INFO', span: 12 },

];

export default rules;
