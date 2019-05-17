let rules = {};
//table
rules.listRule = {
    title: {
        itemId: "LABEL_LR_LITERATURE_REFERENCES",
        span: 24
    },
    columns: [
        {
            type: 'index',
            width: 80,
            title: "No."
        },
        {
            key: "LIT_REF"
        },
        {
            key: "LIT_FILE_CONTENT"
        }
    ]

};
//form  createDrawJson方法的rules参数要求是数组，所以此处的数据结构也定义为数组（数组中只有一个元素），
rules.formRule =
    [
        { itemId: 'LIT_REF', span: 12 },
        { itemId: 'LIT_FILE_CONTENT', span: 12 },

    ]

export default rules;
