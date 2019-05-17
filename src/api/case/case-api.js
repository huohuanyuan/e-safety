import axios from '../http'

//获取渲染项
export const apiGetCaseItems = (pageId) => { return axios.get("/case/" + pageId + "/items").then(res => res.data) };
//数据保存
export const apiPutCaseSave = params => { return axios.put("/case/save", params).then(res => res.data) };
//请求数据
export const apiGetCaseDatas = (caseId, pageId) => { return axios.get("/case/" + caseId + "/" + pageId + "/data").then(res => res.data) };
//获取案例清单list
export const apiGetCaseList = params => { return axios.get("/case/list",{params:params}).then(res => res.data) };
//查询meddra字典数据信息
export const apiGetMeddraList = params => { return axios.get("/meddra/data/list", { params: params }).then(res => res.data) };
//元素操作轨迹
export const apiGetElemPath = dataId => { return axios.get("/case/auit/"+dataId).then(res => res.data) };
