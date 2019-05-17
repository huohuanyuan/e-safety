
const caseData = {
    state: {
        locale: "zh-cn", //语言 修改日历组件的语言是使用 
        drawValueStr: "",//以字符串的形式存储input输入框的值
        queryIdStr: "",
        dataIdStr: "",
    },
    mutations: {    
        //添加一项
        addItem(state, params) {
            let _base = params.repeatBase;
            let _drawValueObj = JSON.parse(state.drawValueStr)
            for (let [i, item] of _base.entries()) {
                //如果uid重复，打印错误，调试用，不要删除
                // if (_drawValueObj.hasOwnProperty(item.uid)){
                //     console.error(item.uid+"重复"); 
                // }
                _drawValueObj[item.uid] = "";
           
            }
            state.drawValueStr = JSON.stringify(_drawValueObj);
       
        },      
       
        //包含list的页面,点击一行，置入drawValue数据
        setRowToDrawValue(state, rowData) {
            state.queryIdStr = JSON.stringify(rowData.queryIdsObj);
            state.dataIdStr = JSON.stringify(rowData.dataIdsObj);
            state.drawValueStr = JSON.stringify(rowData.valuesObj);
        },      
      
        //input框的value值change，更新到state
        setDrawValueStr(state, params) {           
            let _drawValueObj = JSON.parse(state.drawValueStr);
            _drawValueObj[params.uid] = params.value;
            state.drawValueStr = JSON.stringify(_drawValueObj);
        },
        setQueryIdStr(state, params) {
            let _queryIdObj = JSON.parse(state.queryIdStr);
            _queryIdObj[params.uid] = params.queryId;
            state.queryIdStr = JSON.stringify(_queryIdObj);
        },
        //MH 页面 将list上面的值更新到state中
        setMHTopFormValue(state, params) {
            for (let key in params.topFormValue) {
                let _drawValueObj = JSON.parse(state.drawValueStr);
                _drawValueObj[key] = params.topFormValue[key];
                state.drawValueStr = JSON.stringify(_drawValueObj);
            }
        },  
        //drug 页面值初始化
        drawValueStrInit(state, params){        
            state.queryIdStr = JSON.stringify(params.queryIdsObj);
            state.dataIdStr = JSON.stringify(params.dataIdsObj);
            state.drawValueStr = JSON.stringify(params.valuesObj);
          
        }

    }

}


export default caseData;