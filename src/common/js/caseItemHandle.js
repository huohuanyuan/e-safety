
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
 * @return { Object } resultObj返回的对象中包含：draw value  queryIdsObj

 */
caseHandle.createDrawJson = function (rules, formItems) {
    /**
    * drawDatas  整理后的包含渲染规则的有序列表，
    * valuesObj 存储表单value的对象，uid为key，初始化元素的值，
    * queryIdsObj：uid为key 初始化页面中每个元素的queryId，业务：如果queryId不为空，页面中显示质疑的小图标
    */

    let resultObj = { drawDatas: [], valuesObj: {}, queryIdsObj: {}, };

    let _formItemsMap = exportMap(formItems);

    for (let [i, rule] of rules.entries()) {
        if (rule.isRepeat) {
            for (let [j, elem] of rule.list.entries()) {
                rules[i].list[j].isNew = true;
                rules[i].list[j].deleted = false;
                rules[i].list[j].data = elem.data.map((val, index, arr) => {
                    if (val.uiType != "LABEL" && val.uiType != "LINE") {
                        let _uiType = _formItemsMap.get(val.itemId).uiType;
                        resultObj.queryIdsObj[val.itemId] = "";
                        //如果是搜索类型的，建立与select的关系
                        if (_uiType == "SEARCH") {
                            val.prevUid = arr[index - 1].itemId;
                            resultObj.valuesObj[val.itemId] = "";
                        } else {
                            resultObj.valuesObj[val.itemId] = "";
                        }
                    }
                    //  unitId:标记当前内容在整个数据结构最外层的下标
                    return { ...val, ..._formItemsMap.get(val.itemId), ...{ unitId: i, deleted: false, uid: val.itemId } }
                })
            }
            rules[i].base = rule.base.map(val => {
                return { ...val, ..._formItemsMap.get(val.itemId), ...{ unitId: i, deleted: false } }
            })
        } else {
            rules[i].data = rule.data.map((val, index, arr) => {

                if (val.uiType != "LABEL" && val.uiType != "LINE") {
                    let _uiType = _formItemsMap.get(val.itemId).uiType;
                    resultObj.queryIdsObj[val.itemId] = "";
                    //如果是搜索类型的，建立与select的关系
                    if (_uiType == "SEARCH") {
                        val.prevUid = arr[index - 1].itemId;

                    }
                    resultObj.valuesObj[val.itemId] = "";
                }

                return { ...val, ..._formItemsMap.get(val.itemId), ...{ unitId: i, deleted: false, uid: val.itemId } }
            })
        }
    }
    resultObj.drawDatas = deepCopy(rules);
    return resultObj;
}

/**
 * 将已经合成的渲染数据和后台返回的值合并
 * @params {Object} params 
 * @return { Object } resultObj 返回的对象中包含：drawDatas valuesObj  queryIdsObj
 */

caseHandle.createCurrItems = function (params) {
    let formItems = params.formItems;//渲染用的结构数据
    let valueDatas = params.valueList;//后台返回的值

    /**
     * drawDatas  包含区域重复信息的渲染数据，
     * valuesObj 存储表单value的对象，uid为key，存入对应的值，
     * queryIdsObj：uid为key 存入每个元素的queryId，业务：如果queryId不为空，页面中显示质疑的小图标
     */
    let resultObj = { queryIdsObj: {}, dataIdsObj: {}, drawDatas: {}, valuesObj: {} }
    for (let [index, elem] of valueDatas.entries()) {
        let unitIndex = elem.unitId;
        if (elem.row2 == 0) {//repeat:false 不可重复的部分
            formItems[unitIndex].data.map(val => {
                val.row1 = elem.row1;
                val.row2 = elem.row2;
                val.row3 = elem.row3;
                val.uid = `${val.itemId}-${elem.row1}-${elem.row2}-${elem.row3}`
                return val;
            })
        } else if (elem.row2 == 1) { //repeat:true 可重复的部分,只重复一次不需要改变渲染数据结构
            formItems[unitIndex].list[0].data.map((val, index, arr) => {
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
            formItems[unitIndex].list[0].deleted = elem.deleted;
            formItems[unitIndex].list[0].isNew = false;
        } else if (elem.row2 > 1) {
            //可重复数据,重复了大于1次，创建重复的数据结构          
            if (formItems[unitIndex].list.length < elem.row2) {
                //创建重复的数据结构
                let baseData = formItems[unitIndex].base.map((val, index, arr) => {
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
                    i <= elem.row2 - formItems[unitIndex].list.length;
                    i++
                ) {

                    formItems[unitIndex].list.push(
                        {
                            data: deepCopy(baseData),
                            deleted: false,
                            isNew: false
                        }

                    )
                }

            }
            formItems[unitIndex].list[elem.row2 - 1].deleted = elem.deleted;
            formItems[unitIndex].list[elem.row2 - 1].isNew = false;
        }
        let _key = `${elem.itemId}-${elem.row1}-${elem.row2}-${elem.row3}`;
        if (elem.uiType == "SEARCH") {
            resultObj.valuesObj[_key] = `${elem.value},${elem.label}`;
        } else {
            resultObj.valuesObj[_key] = elem.value;
        }
        resultObj.queryIdsObj[_key] = elem.queryId;
        resultObj.dataIdsObj[_key] = elem.dataId;
    }
    resultObj.drawDatas = formItems;
    return resultObj;

}
/**
 * case页面提交数据整理
 * @params {Arrary} 页面的渲染数据，只包含块是否删除，是否重复信息，不包含每个输入框的值信息，
 * @params {valuesObj} 存在state 中的存储每个输入框值的对象（uid为key）
 * @params {String} pageId 页面id
 * @params {Number} caseId 案例的id 修改时传，新建时不用传
 */
caseHandle.caseSaveData = function (formList, valuesObj, pageId, caseId) {
    let resultObj = {
        saveData: [],//保存是提交的数据
        errorInfo: {//校验
            empty: [],//为空
            maxLength: [],//长度错误
            errorFormat: [],//格式错误
        },
        validResult: true,//校验结果
    }

    let obj = {
        pageId: pageId,
        caseId: caseId,
        dataList: [],
    }
    let _itemList = [];

    //页面结构单层嵌套
    for (let [i, rule] of formList.entries()) {
        if (rule.isRepeat) {
            for (let [j, elem] of rule.list.entries()) {

                for (let [k, item] of elem.data.entries()) {
                    if (item.uiType != "LABEL" && item.uiType != "LINE") {
                        let _obj = {
                            itemId: item.itemId,
                            flavor: item.flavor,
                            deleted: elem.deleted,//是否删除
                            unitId: item.unitId,
                            row1: 0,
                            row2: j + 1,
                            row3: 0
                        }

                        if (item.uiType == "SEARCH") {
                            //SEARCH类型需要置入value和label
                            let _value = valuesObj[item.uid] ? valuesObj[item.uid].split(",")[0] : "";
                            let _label = valuesObj[item.uid] ? valuesObj[item.uid].split(",")[1] : "";
                            _obj.value = _value;
                            _obj.label = _label;

                        } else {
                            let _value = valuesObj[item.uid] ? valuesObj[item.uid] : "";
                            _obj.value = _value;
                        }

                        //校验
                        if (item.require && !_obj.value) {//非空
                            resultObj.errorInfo.empty.push(item.elementId);
                            resultObj.validResult = false;
                        }
                        if (item.maxLength && _obj.value.length > item.maxLength) {//长度校验
                            resultObj.errorInfo.maxLength.push(item.elementId);
                            resultObj.validResult = false;
                        }
                        if (item.dataType && _obj.value && item.dataType == "N") {//数字格式校验
                            let reg = /^[0-9]+.?[0-9]*$/;
                            if (!reg.test(_obj.value)) {
                                resultObj.errorInfo.errorFormat.push(item.elementId);
                                resultObj.validResult = false;
                            }
                        }
                        _itemList.push(_obj)
                    }
                }

            }
        } else {
            for (let [j, item] of rule.data.entries()) {
                if (item.uiType != "LABEL" && item.uiType != "LINE") {
                    let _obj = {
                        itemId: item.itemId,
                        flavor: item.flavor,
                        deleted: false,
                        unitId: item.unitId,
                        row1: 0,
                        row2: 0,
                        row3: 0
                    }
                    if (item.uiType == "SEARCH") {
                        let _value = valuesObj[item.uid] ? valuesObj[item.uid].split(",")[0] : "";
                        let _label = valuesObj[item.uid] ? valuesObj[item.uid].split(",")[1] : "";
                        _obj.value = _value;
                        _obj.label = _label;

                    } else if (item.uiType == "CHECK") {
                        //如果是check的复选框，需要将值转换为数组
                        let _value = valuesObj[item.uid] ? valuesObj[item.uid] : "";
                        _obj.value = [_value];

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

        }
    }
    obj.dataList = _itemList;
    resultObj.saveData = obj;
    return resultObj;
}
export default caseHandle;
