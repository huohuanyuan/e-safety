
import md5 from "js-md5";

let caseHandle = {};
/**
 * 将数组整理为Map格式
 * @params {Arrary} formItems 表单渲染的数据
 * @return { Map } 返回已ItemId 为key值的map
 */
function exportMap(formItems) {
    let _map = new Map();
    for (let [index, elem] of formItems.entries()) {
        if (_map.has(elem.itemId)) {
            //错误提示
            console.log("itemLabel重复")
        } else {
            _map.set(elem.itemId, elem)
        }
    }
    return _map;
}
//深拷贝
function deepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
}
/**
 * case 模块骨架json 和 后台返回的页面item数据合并，此方法用于 新建页面 时的渲染数据整理，如果是修改页面需要调用次方法后再调用reateCurrItems方法，将渲染数据和值合并
 * @params {Arrary} rules 定义好的页面渲染顺序和规则
 * @params {Arrary} formItems 表单渲染的数据
 * @return { Object } 整理后的包含渲染规则的有序列表
 */
caseHandle.createDrawJson = function (rules, formItems) {
    let resultObj = { formItems: [], valuesObj: {}, dataIdsObj: {}, queryIdsObj: {} };
    let _formItemsMap = exportMap(deepCopy(formItems));
    resultObj.formItems = rules.map((val, index, arr) => {
        if (val.itemId) {
            let _uiType = _formItemsMap.get(val.itemId).uiType;
            //如果是搜索类型的，建立与select的关系
            if (_uiType == "SEARCH") {
                val.prevUid = arr[index - 1].itemId;
            }
            resultObj.valuesObj[val.itemId] = "";
            resultObj.dataIdsObj[val.itemId] = "";
            resultObj.queryIdsObj[val.itemId] = "";
        }
        return { ...val, ..._formItemsMap.get(val.itemId), ...{ unitId: 0, deleted: false, uid: val.itemId } };
    })
    return resultObj;
}



/**
 * case页面提交数据整理
 * @params {object} params
 * @return {Object} resultObj 
 */
caseHandle.caseSaveData = function (params) {
    let resultObj = {
        saveData: [],//保存是提交的数据
        errorInfo: {//校验
            empty: [],//为空
            maxLength: [],//长度错误
            errorFormat: [],//格式错误

        },
        validResult: true,//校验结果
    }
    let drawDatas = params.drawDatas;//渲染数据
    let valuesObj = params.valuesObj;//值对象
    let rowNumber = params.rowNumber;//行号
    let rowDelete = params.rowDelete;//该行数据是否删除
    let pageId = params.pageId;//pageId
    let caseId = params.caseId;//caseId

    let obj = {
        pageId: pageId,
        caseId: caseId,
        dataList: [],
    }
    let _itemList = [];

    for (let [i, item] of drawDatas.entries()) {
        if (item.uiType != "LABEL" && item.uiType != "LINE") {
            let _obj = {
                itemId: item.itemId,
                flavor: item.flavor,
                deleted: rowDelete,//是否删除
                unitId: item.unitId,
                value: item.value,
                row1: rowNumber,
                row2: 0,
                row3: 0
            }
            //SEARCH类型需要置入value和label
            if (item.uiType == "SEARCH") {
                let _value = valuesObj[item.uid] ? valuesObj[item.uid].split(",")[0] : "";
                let _label = valuesObj[item.uid] ? valuesObj[item.uid].split(",")[1] : "";
                _obj.value = _value;
                _obj.label = _label;

            } else {
                let _value = valuesObj[item.uid] ? valuesObj[item.uid] : "";
                _obj.value = _value;
            }
            //校验
            if (item.require && !_obj.value) {
                resultObj.errorInfo.empty.push(item.elementId);
                resultObj.validResult = false;
            }
            if (item.maxLength && _obj.value.length > item.maxLength) {
                resultObj.errorInfo.maxLength.push(item.elementId);
                resultObj.validResult = false;
            }
            if (item.dataType && _obj.value && item.dataType == "N") {//数字
                let reg = /^[0-9]+.?[0-9]*$/;
                if (!reg.test(_obj.value)) {
                    resultObj.errorInfo.errorFormat.push(item.elementId);
                    resultObj.validResult = false;
                }
            }
            _itemList.push(_obj)
        }
    }
    obj.dataList = _itemList;
    resultObj.saveData = obj;
    return resultObj;
}
/**
 * 根据后台返回的渲染数据和前台定义的列表渲染结构整理出 iview table可以解析的columns数据格式
 * @params {Arrary} listRule 定义好的list渲染规则
 * @params {Arrary} itemList 表单渲染的数据 
 */
caseHandle.createTableColumn = function (listRule, itemList) {
    let _formItemsMap = exportMap(deepCopy(itemList));
    listRule.title = { ...listRule.title, ..._formItemsMap.get(listRule.title.itemId) };
    for (let [index, elem] of listRule.columns.entries()) {
        if (elem.key) {
            let _title = _formItemsMap.get(elem.key).itemLabel;
            listRule.columns[index] = { ...elem, ...{ title: _title } };
            listRule.columns[index].render = function (h, params) {
                if (!params.row.deleted) {
                    return h("div", {}, params.row[params.column.key])
                } else {//设置删除的样式
                    return h("span", {
                        style: {
                            position: 'relative',
                        }
                    }, [
                            params.row[params.column.key],
                            h("i", {
                                style: {
                                    position: 'absolute',
                                    top: '50%',
                                    left: 0,
                                    right: 0,
                                    'border-top': '1px solid red'

                                }
                            }, "")
                        ])
                }

            }
        }

    }
    return listRule;
}
/**
 * 根据后台返回的值数据，按照行（row1）整理成iview table组件可以解析的数据格式
 * @params {Object} params 
 * valueList：后台返回的值列表
 * tabelColumn：表格的列
 * topFormRule：MH页面列表顶部的渲染规则
 * @return {Object} resultObj
 * tableList：表格渲染数据
 * queryIdsObj：这一行所有元素对应的queryId
 * dataIdsObj： 这一行所有元素对应的dataId
 * valuesObj：这一行所有元素对应的value
 */
caseHandle.createTableData = function (params) {
    let valueList = deepCopy(params.valueList);
    let tableColumnArr = params.tabelColumn.map((val, index, arr) => {
        if (val.key) {
            return val.key
        }
    })
    let resultObj = { tableList: [], topFormValue: {} };
    let _tableList = [];
    let _topItemsMap = new Map();
    if (params.topFormRule) {
        _topItemsMap = exportMap(params.topFormRule);
    }
    for (let [index, elem] of valueList.entries()) {
        //row1的最大值表示表格的行数，根据row1的值在tableList中添加空对象，每一个对象代表table的一行        
        if (_tableList.length < elem.row1) {
            for (let i = 0; i <= elem.row1 - _tableList.length; i++) {
                //queryIds 这一行数据的表单所包含的queryId，以对象存储key为uid
                //dataId 这一行数据的表单所包含的dataId，发送质疑是使用，以对象存储key为uid
                _tableList.push({ queryIdsObj: {}, dataIdsObj: {}, valuesObj: {}, isNew: false, deleted: false })
            }
        }
        //如果这个字段需要在列表中展示，按照行号，将valueList中的itemId作为key，value作为值存入这一行的对象中
        let _uiType = elem.uiType;
        let tRow = elem.row1 - 1;
        if (tableColumnArr.includes(elem.itemId)) {
            if (_uiType == "SEARCH") {
                //如果是SEARCH类型，存入search数据
                _tableList[tRow][elem.itemId] = elem.value && elem.label ? `${elem.value},${elem.label}` : ""
            } else {
                _tableList[tRow][elem.itemId] = elem.value;
            }
        }

        //table数据的行数据信息中
        _tableList[tRow].deleted = elem.deleted;//是否删除
        _tableList[tRow].isNew = false;//是否新建
        _tableList[tRow].queryIdsObj[elem.itemId] = elem.queryId;
        _tableList[tRow].dataIdsObj[elem.itemId] = elem.dataId;
        _tableList[tRow].valuesObj[elem.itemId] = elem.value;

        //MH页面
        if (_topItemsMap.has(elem.itemId)) {
            resultObj.topFormValue[elem.itemId] = elem.value
        }


    }
    resultObj.tableList = _tableList;
    return resultObj;
}
/**
 * 给列表添加一行
 */
caseHandle.addRowData = function (params) {
    let _obj = {};
    let columnRule = deepCopy(params.columns);
    let queryIdsObj = params.queryIdsObj;
    let dataIdsObj = params.dataIdsObj;
    let valuesObj = params.valuesObj
    for (let [index, elem] of columnRule.entries()) {
        if (elem.key) {
            _obj[elem.key] = "";
            _obj.isNew = true;
            _obj.deleted = false;

        }
    }
    _obj.deleted = false;
    _obj.isNew = true;
    _obj.queryIdsObj = deepCopy(queryIdsObj);
    _obj.dataIdsObj = deepCopy(dataIdsObj);
    _obj.valuesObj = deepCopy(valuesObj);
    return _obj;
}

export default caseHandle;
