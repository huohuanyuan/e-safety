let rules = {};
//table
rules.listRule = {
    title: {
        itemId: "LABEL_RP_PRIMARY_SOURCES",
        span: 24
    },
    columns: [
        {
            type: 'index',
            width: 80,
            title: "No."
        },
        {
            key: "RPT_TITLE"
        },
        {
            key: "RPT_GIV_NAME"
        },
        {
            key: "RPT_QUALIFY"
        }
    ]

};
//form  
rules.formRule = [
    { itemId: 'LABEL_RP_REPORTER_NAME', span: 24 },
    { itemId: 'RPT_TITLE', span: 12 },
    { itemId: 'RPT_GIV_NAME', span: 12 },
    { itemId: 'RPT_MID_NAME', span: 12 },
    { itemId: 'RPT_FAM_NAME', span: 12 },
    { itemId: 'LABEL_RP_REPORTER_ADDRESS', span: 24 },
    { itemId: 'RPT_ORGAN', span: 12 },
    { itemId: 'RPT_DEPART', span: 12 },
    { itemId: 'RPT_STREET', span: 12 },
    { itemId: 'RPT_CITY', span: 12 },
    { uiType: "LINE", span: 24 },
    { itemId: 'RPT_STATE', span: 12 },
    { itemId: 'RPT_POST_CODE', span: 12 },
    { itemId: 'RPT_PHONE', span: 12 },
    { itemId: 'RPT_COUNTRY', span: 12 },
    { uiType: "LINE", span: 24 },
    { itemId: 'RPT_QUALIFY', span: 12 },
    { itemId: 'RPT_PRIMARY', span: 12 }

];

export default rules;
