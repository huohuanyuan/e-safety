let rules = {};
//table
rules.listRule = {
    title: {
        itemId: "LABEL_DH_PAST_DRUG_HISTORY",
        span: 24
    },
    columns: [
        {
            type: 'index',
            width: 80,
            title: "No."
        },
        {
            key: "DH_DRUG_NAME"
        },
        {
            key: "DH_MPID"
        },
        {
            key: "DH_STDTC"
        },
        {
            key: "DH_ENDTC"
        },
        {
            key: "DH_MEDDRA_LLT_IND"
        },
        {
            key: "DH_MEDDRA_LLT_AE"
        },

    ]

};
//form  
rules.formRule = [
    { itemId: 'DH_DRUG_NAME', span: 24 },
    { itemId: 'DH_MPID_VER', span: 12 },
    { itemId: 'DH_MPID', span: 12 },
    { itemId: 'DH_PHPID_VER', span: 12 },
    { itemId: 'DH_PHPID', span: 12 },
    { itemId: 'DH_STDTC', span: 12 },
    { itemId: 'DH_ENDTC', span: 12 },
    { itemId: 'DH_MEDDRA_VER_IND', span: 12 },
    { itemId: 'DH_MEDDRA_LLT_IND', span: 12 },
    { itemId: 'DH_MEDDRA_VER_AE', span: 12 },
    { itemId: 'DH_MEDDRA_LLT_AE', span: 12 },


];

export default rules;
