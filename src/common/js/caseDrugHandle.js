/*
 * @Author: chengshanshan 
 * @Date: 2019-04-26 09:55:32 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-05-15 13:05:47
 * @instraction:case drug 页面使用的公共方法
 */
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

//单层嵌套数据的整理方法
function dataExport(rules, _formItemsMap) {
    let formRule = deepCopy(rules);
    let resultObj = { draw: [], valuesObj: {}, queryIdsObj: {}, dataIdsObj: {} }
    let k = 0;
    for (let [i, rule] of formRule.entries()) {
        if (rule.isRepeat) {
            for (let [j, elem] of rule.list.entries()) {
                formRule[i].list[j].isNew = true;
                formRule[i].list[j].deleted = false;

                formRule[i].list[j].data = elem.data.map((val, index, arr) => {
                    if (val.itemId) {
                        let _uiType = _formItemsMap.get(val.itemId).uiType;
                        //如果是搜索类型的，建立与select的关系
                        if (_uiType == "SEARCH") {
                            val.prevUid = arr[index - 1].itemId;
                            resultObj.valuesObj[val.itemId] = "";
                        } else {
                            resultObj.valuesObj[val.itemId] = "";
                        }
                        resultObj.dataIdsObj[val.itemId] = "";
                        resultObj.queryIdsObj[val.itemId] = "";
                    }
                    //  unitId:标记当前内容在整个数据结构最外层的下标
                    return { ...val, ..._formItemsMap.get(val.itemId), ...{ unitId: i, deleted: false, uid: val.itemId } }

                })
            }
            formRule[i].base = rule.base.map(val => {
                val.uiType = _formItemsMap.get(val.itemId).uiType;
                return { ...val, ..._formItemsMap.get(val.itemId), ...{ unitId: i, deleted: false } }
            })
        } else {
            formRule[i].data = rule.data.map((val, index, arr) => {

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
                return { ...val, ..._formItemsMap.get(val.itemId), ...{ unitId: i, deleted: false, uid: val.itemId } }
            })
        }
    }
    resultObj.draw = formRule;
    return resultObj
}


/**
 * case 模块骨架json 和 后台返回的页面item数据合并，此方法用于 新建页面 时的渲染数据整理，如果是修改页面需要调用次方法后再调用reateCurrItems方法，将渲染数据和值合并
 * @params {Arrary} rules 定义好的页面渲染顺序和规则
 * @params {Arrary} formItems 表单渲染的数据
 * @return { Object } 整理后的包含渲染规则的有序列表
 */
caseHandle.createDrawJson = function (rules, formItems) {
    let resultObj = { formItems1: [], formItems2: [], formItems3: [], valuesObj: {}, dataIdsObj: {}, queryIdsObj: {} };
    let _formItemsMap = exportMap(formItems);
    //整理drawDatas1
    let _resultObj1 = dataExport(rules.formRule_1, _formItemsMap)
    resultObj.formItems1 = _resultObj1.draw;
    //整理drawDatas2

    for (let [i, rule] of rules.formRule_2.entries()) {
        rules.formRule_2[i].isNew = true;
        rules.formRule_2[i].deleted = false;
        rules.formRule_2[i].data = rule.data.map(val => {
            if (val.itemId) {
                let _uiType = _formItemsMap.get(val.itemId).uiType;
                //如果是搜索类型的，建立与select的关系
                if (_uiType == "SEARCH") {
                    val.prevUid = arr[index - 1].itemId;
                    resultObj.valuesObj[val.itemId] = "";
                } else {
                    resultObj.valuesObj[val.itemId] = "";
                }
                resultObj.dataIdsObj[val.itemId] = "";
                resultObj.queryIdsObj[val.itemId] = "";
            }

            //  unitId:标记当前内容在整个数据结构最外层的下标
            return { ...val, ..._formItemsMap.get(val.itemId), ...{ unitId: i, deleted: false, uid: val.itemId } }
        });
        for (let [j, elem] of rule.children.entries()) {
            elem.isNew = true;
            elem.deleted = false;
            elem.data = elem.data.map(val => {
                if (val.itemId) {
                    //如果是搜索类型的，建立与select的关系
                    let _uiType = _formItemsMap.get(val.itemId).uiType;
                    if (_uiType == "SEARCH") {
                        val.prevUid = arr[index - 1].itemId;
                        resultObj.valuesObj[val.itemId] = "";
                    } else {
                        resultObj.valuesObj[val.itemId] = "";
                    }
                    resultObj.dataIdsObj[val.itemId] = "";
                    resultObj.queryIdsObj[val.itemId] = "";

                }
                return { ...val, ..._formItemsMap.get(val.itemId), ...{ unitId: i, deleted: false, uid: val.itemId } }
            });
        }
        rules.formRule_2[i].base.parent = rule.base.parent.map(val => {
            val.uiType = _formItemsMap.get(val.itemId).uiType;
            return { ...val, ..._formItemsMap.get(val.itemId), ...{ unitId: i, deleted: false } }
        });
        rules.formRule_2[i].base.children.data = rule.base.children.data.map(val => {
            val.uiType = _formItemsMap.get(val.itemId).uiType;
            return { ...val, ..._formItemsMap.get(val.itemId), ...{ unitId: i, deleted: false } }
        })

    }
    resultObj.formItems2 = deepCopy(rules.formRule_2);
    //整理drawDatas3
    let _resultObj3 = dataExport(rules.formRule_3, _formItemsMap);
    resultObj.formItems3 = _resultObj3.draw;
    resultObj.valuesObj = { ...resultObj.valuesObj, ..._resultObj1.valuesObj, ..._resultObj3.valuesObj };
    resultObj.dataIdsObj = { ...resultObj.dataIdsObj, ..._resultObj1.dataIdsObj, ..._resultObj3.dataIdsObj }
    resultObj.queryIdsObj = { ...resultObj.queryIdsObj, ..._resultObj1.queryIdsObj, ..._resultObj3.queryIdsObj }
    return resultObj;
}

/**
 * 根据后台返回的渲染数据和前台定义的列表渲染结构整理出 iview table可以解析的columns数据格式
 * @params {Arrary} listRule 定义好的list渲染规则
 * @params {Arrary} itemList 表单渲染的数据
 * 
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
 * 创建表格渲染数据
 * @params {Object} params 包括3个值：
 * valueList：后台返回的值列表
 * tableColumn：表格的列中的key，数据整理成{key：value}的格式，渲染表格
 */
caseHandle.createTableData = function (params) {
    let _tableList = [];
    let valueList = deepCopy(params.valueList);
    let formItems1 = params.formItems1;
    let formItems2 = params.formItems2;
    let formItems3 = params.formItems3;
    let tableColumnArr = params.tabelColumn.map((val, index, arr) => {
        if (val.key) {
            return val.key
        }
    })
    for (let [index, elem] of valueList.entries()) {
        //row1的最大值表示表格的行数，根据row1的值在tableList中添加空对象，每一个对象代表table的一行
        if (_tableList.length < elem.row1) {
            for (let i = 0; i <= elem.row1 - _tableList.length; i++) {
                //queryIdsObj 这一行数据的表单所包含的queryId，以对象存储key为uid
                //dataIdsObj 这一行数据的表单所包含的dataId，发送质疑是使用，以对象存储key为uid
                _tableList.push({ queryIdsObj: {}, dataIdsObj: {}, drawDatas1: deepCopy(formItems1), drawDatas2: deepCopy(formItems2), drawDatas3: deepCopy(formItems3), valuesObj: {}, isNew: false, deleted: false })
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

        //整理渲染结构数据
        let drawNo = elem.unitId.split("_")[0];
        if (drawNo == 1) {
            //drawDatas1          
            let unitIndex = elem.unitId.split("_")[1];
            if (elem.row2 == 0) {//repeat:false 不可重复的部分
                _tableList[tRow].drawDatas1[unitIndex].data.map(val => {
                    val.row1 = elem.row1;
                    val.row2 = elem.row2;
                    val.row3 = elem.row3;
                    val.uid = `${val.itemId}-${elem.row1}-${elem.row2}-${elem.row3}`
                    return val;
                })
            } else if (elem.row2 == 1) { //repeat:true 可重复的部分,只重复一次不需要改变渲染数据结构
                _tableList[tRow].drawDatas1[unitIndex].list[0].data.map((val, index, arr) => {
                    val.row1 = elem.row1;
                    val.row2 = elem.row2;
                    val.row3 = elem.row3;
                    val.uid = `${val.itemId}-${elem.row1}-${elem.row2}-${elem.row3}`
                    if (val.uiType == "SEARCH") {
                        val.prevUid = arr[index - 1].uid;

                    }
                    return val;
                })
                //标记是否删除
                _tableList[tRow].drawDatas1[unitIndex].list[0].deleted = elem.deleted;
                _tableList[tRow].drawDatas1[unitIndex].list[0].isNew = false;
            } else if (elem.row2 > 1) {
                //可重复数据,重复了大于1次，创建重复的数据结构          
                if (_tableList[tRow].drawDatas1[unitIndex].list.length < elem.row2) {
                    //创建重复的数据结构
                    let baseData = _tableList[tRow].drawDatas1[unitIndex].base.map((val, index, arr) => {
                        val.row1 = elem.row1;
                        val.row2 = elem.row2;
                        val.row3 = elem.row3;
                        val.uid = `${val.itemId}-${elem.row1}-${elem.row2}-${elem.row3}`
                        if (val.uiType == "SEARCH") {
                            val.prevUid = arr[index - 1].uid;
                        }
                        return val;
                    })
                    for (
                        let i = 0;
                        i <= elem.row2 - _tableList[tRow].drawDatas1[unitIndex].list.length;
                        i++
                    ) {
                        _tableList[tRow].drawDatas1[unitIndex].list.push(
                            {
                                data: deepCopy(baseData),
                                deleted: false,
                                isNew: false
                            }

                        )
                    }

                }
                //标记是否删除
                _tableList[tRow].drawDatas1[unitIndex].list[elem.row2 - 1].deleted = elem.deleted
                _tableList[tRow].drawDatas1[unitIndex].list[elem.row2 - 1].isNew = false;
            }

        } else if (drawNo == 2) {
            //drawDatas2
            let type = elem.unitId.split("_")[1]; //c:子集元素 p:父集元素
            if (type == "p") {
                if (elem.row2 == 1) {//parent 可重复部分只重复了1次
                    _tableList[tRow].drawDatas2[0].data.map(val => {
                        val.row1 = elem.row1;
                        val.row2 = elem.row2;
                        val.row3 = elem.row3;
                        val.uid = `${val.itemId}-${elem.row1}-${elem.row2}-${elem.row3}`
                        return val;
                    })
                    _tableList[tRow].drawDatas2[0].deleted = elem.deleted;
                    _tableList[tRow].drawDatas2[0].isNew = false;
                } else if (elem.row2 > 1) {//parent 可重复部分只重复了大于1次                            
                    if (_tableList[tRow].drawDatas2.length < elem.row2) {
                        //创建重复的数据结构
                        let baseData = _tableList[tRow].drawDatas2[unitIndex].base.parent.map(val => {
                            val.row1 = elem.row1;
                            val.row2 = elem.row2;
                            val.row3 = elem.row3;
                            val.uid = `${val.itemId}-${elem.row1}-${elem.row2}-${elem.row3}`
                            return val;
                        })
                        for (
                            let i = 0;
                            i <= elem.row2 - _tableList[tRow].drawDatas2.length;
                            i++
                        ) {
                            _tableList[tRow].drawDatas2.push(
                                {

                                    data: deepCopy(baseData),
                                    deleted: false,
                                    isNew: false
                                }

                            )
                        }

                    }
                    _tableList[tRow].drawDatas2[elem.row2].deleted = elem.deleted;
                    _tableList[tRow].drawDatas2[elem.row2].isNew = false;
                }


            }
            if (type == "c") {
                if (elem.row3 == 1) {//children 可重复部分只重复了1次
                    _tableList[tRow].drawDatas2[elem.row2 - 1].children[0].data.map(val => {
                        val.row1 = elem.row1;
                        val.row2 = elem.row2;
                        val.row3 = elem.row3;
                        val.uid = `${val.itemId}-${elem.row1}-${elem.row2}-${elem.row3}`
                        return val;
                    })
                    _tableList[tRow].drawDatas2[elem.row2 - 1].children[0].deleted = elem.deleted;
                    _tableList[tRow].drawDatas2[elem.row2 - 1].children[0].isNew = false;

                } else if (elem.row3 > 1) {//children 可重复部分重复了大于1次，需要先构建渲染结构
                    if (_tableList[tRow].drawDatas2[elem.row2 - 1].children.length < elem.row3) {
                        //创建重复的数据结构
                        let baseData = _tableList[tRow].drawDatas2[elem.row2 - 1].base.children.data.map(val => {
                            val.row1 = elem.row1;
                            val.row2 = elem.row2;
                            val.row3 = elem.row3;
                            val.uid = `${val.itemId}-${elem.row1}-${elem.row2}-${elem.row3}`
                            return val;
                        })
                        for (
                            let i = 0;
                            i <= elem.row3 - _tableList[tRow].drawDatas2[elem.row2 - 1].children.length;
                            i++
                        ) {
                            _tableList[tRow].drawDatas2[elem.row2 - 1].children.push(
                                {

                                    data: deepCopy(baseData),
                                    deleted: false,
                                    isNew: false
                                }

                            )
                        }

                    }
                    _tableList[tRow].drawDatas2[elem.row2 - 1].children[elem.row3 - 1].deleted = elem.deleted;
                    _tableList[tRow].drawDatas2[elem.row2 - 1].children[elem.row3 - 1].isNew = false;
                }

            }

        } else if (drawNo == 3) {
            //drawDatas3
            let unitIndex = elem.unitId.split("_")[1];
            if (elem.row2 = 1) {//可重复部分重复了1次
                _tableList[tRow].drawDatas3[unitIndex].list[0].data.map(val => {
                    val.row1 = elem.row1;
                    val.row2 = elem.row2;
                    val.row3 = elem.row3;
                    val.uid = `${val.itemId}-${elem.row1}-${elem.row2}-${elem.row3}`
                    return val;
                })
                _tableList[tRow].drawDatas3[unitIndex].list[0].deleted = elem.deleted;
                _tableList[tRow].drawDatas3[unitIndex].list[0].isNew = false;
            } else if (elem.row2 > 1) {//可重复部分重复了大于1次
                //创建重复的数据结构
                let baseData = _tableList[tRow].drawDatas3[unitIndex].base.map(val => {
                    val.row1 = elem.row1;
                    val.row2 = elem.row2;
                    val.row3 = elem.row3;
                    val.uid = `${val.itemId}-${elem.row1}-${elem.row2}-${elem.row3}`
                    return val;
                })
                //可重复数据             
                if (_tableList[tRow].drawDatas3[unitIndex].list.length < elem.row2) {
                    for (
                        let i = 0;
                        i <= elem.row2 - _tableList[tRow].drawDatas3[unitIndex].data.length;
                        i++
                    ) {
                        _tableList[tRow].drawDatas3[unitIndex].list.push(
                            {

                                data: deepCopy(baseData),
                                deleted: false,
                                isNew: false
                            }

                        )
                    }

                }
                _tableList[tRow].drawDatas3[unitIndex].list[elem.row2 - 1].deleted = elem.deleted;
                _tableList[tRow].drawDatas3[unitIndex].lsit[elem.row2 - 1].isNew = false;


            }

        }
        let _key = `${elem.itemId}-${elem.row1}-${elem.row2}-${elem.row3}`;
        if (elem.uiType == "SEARCH") {
            _tableList[tRow].valuesObj[_key] = `${elem.value},${elem.label}`;
        }
        _tableList[elem.row1 - 1].isNew = false;//是否新建  
        _tableList[elem.row1 - 1].deleted = elem.deleted;//是否删除
        _tableList[tRow].valuesObj[_key] = elem.value;
        _tableList[tRow].queryIdsObj[_key] = elem.queryId;
        _tableList[tRow].dataIdsObj[_key] = elem.dataId;
       
    }
    return _tableList;

}
/**
 * 给列表添加一行
 */
caseHandle.addRowData = function (listRule) {
    let _obj = {};
    let columnRule = deepCopy(listRule.columns);
    for (let [index, elem] of columnRule.entries()) {
        if (elem.key) {
            _obj[elem.key] = "";
            _obj.isNew = true;
            _obj.deleted = false;
        }
    }
    return _obj;
}
function createSaveDataCell(item, params) {
    let valuesObj = params.valuesObj;
    let drawNo = params.drawNo;
    let emptyId = "";
    let maxLengthId = "";
    let errorForamtId = "";
    let validResult = true;
    let deleted = params.deleted;
    let dataCell = {
        itemId: item.itemId,
        flavor: item.flavor,
        deleted: deleted,//是否删除
        unitId: `${drawNo}_${item.unitId}`,
        row1: params.row1,
        row2: params.row2,
        row3: params.row3
    }
    if (item.uiType == "SEARCH") {
        //SEARCH类型需要置入value和label
        let _value = valuesObj[item.uid] ? valuesObj[item.uid].split(",")[0] : "";
        let _label = valuesObj[item.uid] ? valuesObj[item.uid].split(",")[1] : "";
        dataCell.value = _value;
        dataCell.label = _label;

    } else {
        let _value = valuesObj[item.uid] ? valuesObj[item.uid] : "";
        dataCell.value = _value;
    }

    //校验
    if (item.require && !dataCell.value) {//非空
        emptyId = item.elementId;
        validResult = false;
    }
    if (item.maxLength && dataCell.value.length > item.maxLength) {//长度校验
        maxLengthId = item.elementId;
        validResult = false;
    }
    if (item.dataType && dataCell.value && item.dataType == "N") {//数字格式校验
        let reg = /^[0-9]+.?[0-9]*$/;
        if (!reg.test(dataCell.value)) {
            errorForamtId = item.elementId;
            validResult = false;
        }
    }
    let obj = {
        dataCell: dataCell,
        emptyId: emptyId,
        maxLengthId: maxLengthId,
        errorForamtId: errorForamtId,
        validResult: validResult
    }
    return obj;


}
/**
 * 提交保存数据
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
    let drawDatas1 = params.drawDatas1;
    let drawDatas2 = params.drawDatas2;
    let drawDatas3 = params.drawDatas3;
    let valuesObj = params.valuesObj;

    let rowNumber = params.rowNumber;
    let rowDelete = params.rowDelete;
    let pageId = params.pageId;
    let caseId = params.caseId;

    let _itemList = [];
    //drawDatas1整理
    for (let [i, rule] of drawDatas1.entries()) {
        if (rule.isRepeat) {
            for (let [j, listCell] of rule.list.entries()) {
                for (let [k, item] of listCell.data.entries()) {
                    if (item.uiType != "LABEL" && item.uiType != "LINE") {
                        let _obj = createSaveDataCell(item, {
                            row1: rowNumber,
                            row2: j + 1,
                            row3: 0,
                            drawNo: 1,//标记是解析drawDatas1
                            deleted: rowDelete ? true : listCell.deleted,//是否删除
                            valuesObj: valuesObj,

                        })
                        _itemList.push(_obj.dataCell);
                        _obj.emptyId != "" && resultObj.errorInfo.empty.push(_obj.emptyId);
                        _obj.maxLengthId != "" && resultObj.errorInfo.maxLength.push(_obj.maxLengthId);
                        _obj.errorForamtId != "" && resultObj.errorInfo.errorFormat.push(_obj.errorForamtId);
                        resultObj.validResult = _obj.validResult;
                    }
                }

            }
        } else {
            for (let [j, item] of rule.data.entries()) {
                if (item.uiType != "LABEL" && item.uiType != "LINE") {
                    let _obj = createSaveDataCell(item, {
                        row1: rowNumber,
                        row2: 0,
                        row3: 0,
                        drawNo: 1,//标记是解析drawDatas1
                        deleted: rowDelete,
                        valuesObj: valuesObj,

                    })
                    _itemList.push(_obj.dataCell);
                    _obj.emptyId != "" && resultObj.errorInfo.empty.push(_obj.emptyId);
                    _obj.maxLengthId != "" && resultObj.errorInfo.maxLength.push(_obj.maxLengthId);
                    _obj.errorForamtId != "" && resultObj.errorInfo.errorFormat.push(_obj.errorForamtId);
                    resultObj.validResult = _obj.validResult;
                }
            }
        }
    }
    //drawDatas2整理 
    for (let [parentIndex, rule] of drawDatas2.entries()) {
        //parent
        for (let [i, item] of rule.data.entries()) {
            if (item.uiType != "LABEL" && item.uiType != "LINE") {
                let _obj = createSaveDataCell(item, {
                    row1: rowNumber,
                    row2: parentIndex + 1,
                    row3: 0,
                    drawNo: '2_p',//标记为drawData2 父级数据
                    deleted: rowDelete ? true : rule.deleted,
                    valuesObj: valuesObj,

                })
                _itemList.push(_obj.dataCell);
                _obj.emptyId != "" && resultObj.errorInfo.empty.push(_obj.emptyId);
                _obj.maxLengthId != "" && resultObj.errorInfo.maxLength.push(_obj.maxLengthId);
                _obj.errorForamtId != "" && resultObj.errorInfo.errorFormat.push(_obj.errorForamtId);
                resultObj.validResult = _obj.validResult;
            }
        };
        //children 
        for (let [childIndex, child] of rule.children.entries()) {
            for (let [i, item] of child.data.entries()) {
                if (item.uiType != "LABEL" && item.uiType != "LINE") {
                    let _obj = createSaveDataCell(item, {
                        row1: rowNumber,
                        row2: parentIndex + 1,
                        row3: childIndex + 1,
                        drawNo: '2_c',//标记为drawData2 子集数据
                        deleted: rowDelete ? true : rule.deleted ? true : child.deleted,
                        valuesObj: valuesObj,

                    })
                    _itemList.push(_obj.dataCell);
                    _obj.emptyId != "" && resultObj.errorInfo.empty.push(_obj.emptyId);
                    _obj.maxLengthId != "" && resultObj.errorInfo.maxLength.push(_obj.maxLengthId);
                    _obj.errorForamtId != "" && resultObj.errorInfo.errorFormat.push(_obj.errorForamtId);
                    resultObj.validResult = _obj.validResult;
                }
            }
        }
    }
    //drawDatas3整理 
    for (let [i, rule] of drawDatas3.entries()) {
        if (rule.isRepeat) {
            for (let [j, listCell] of rule.list.entries()) {
                for (let [k, item] of listCell.data.entries()) {
                    if (item.uiType != "LABEL" && item.uiType != "LINE") {
                        let _obj = createSaveDataCell(item, {
                            row1: rowNumber,
                            row2: j + 1,
                            row3: 0,
                            drawNo: 3,//标记是解析drawDatas3
                            deleted: rowDelete ? true : listCell.deleted,//是否删除
                            valuesObj: valuesObj,

                        })
                        _itemList.push(_obj.dataCell);
                        _obj.emptyId != "" && resultObj.errorInfo.empty.push(_obj.emptyId);
                        _obj.maxLengthId != "" && resultObj.errorInfo.maxLength.push(_obj.maxLengthId);
                        _obj.errorForamtId != "" && resultObj.errorInfo.errorFormat.push(_obj.errorForamtId);
                        resultObj.validResult = _obj.validResult;
                    }
                }

            }
        }
    }
    resultObj.saveData = {
        pageId: pageId,
        caseId: caseId,
        dataList: _itemList
    }
    return resultObj;
}
export default caseHandle