let rules = [
    {

        isRepeat: false,
        data: [
            { itemId: 'LABEL_SD_INFORMATION_ON_SENDER', span: 24 },
            { itemId: 'SND_TYPE', span: 12 },
            { itemId: 'SND_ORGAN', span: 12 },
            { itemId: 'LABEL_SD_PERSON_FOR_SENDING', span: 24 },
            { itemId: 'SND_DEPART', span: 12 },
            { itemId: 'SND_TITLE', span: 12 },           
            { itemId: 'SND_GIV_NAME', span: 12 },
            { itemId: 'SND_MID_NAME', span: 12 },
           
            { itemId: 'SND_FAM_NAME', span: 12 },
            { itemId: 'LABEL_SD_SENDER_ADDRESS', span: 24 },
            { itemId: 'SND_STREET', span: 12 },
            { itemId: 'SND_CITY', span: 12 },
            { uiType: "LINE", span: 24 },//避免高度一行两个元素高度不一致导致下面元素无法浮动至左侧的问题
            { itemId: 'SND_STATE', span: 12 },
            { itemId: 'SND_POST_CODE', span: 12 },
            { itemId: 'SND_COUNTRY', span: 12 },
            { itemId: 'SND_PHONE', span: 12 },
            { itemId: 'SND_FAX', span: 12 },
            { itemId: 'SND_EMAIL', span: 12 },
        ]
    },
]
export default rules;
