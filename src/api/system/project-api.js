import axios from '../http'

// 查询项目列表
export const apiGetProjectList = params => { return axios.get("/proj/list", { params: params }).then(res => res.data) };

// 查询项目信息
export const apiGetProjectInfo = query => { return axios.get("/proj/" + query).then(res => res.data) };

// 添加项目基本信息
export const apiPostProject = params => { return axios.post("/proj", params).then(res => res.data) };

//设置项目流程
export const apiPostSetProcess = params => { return axios.post("/process/node", params).then(res => res.data) };


//删除项目
export const apiDeleteProject = query => { return axios.delete("/proj/" + query).then(res => res.data) };

// 修改项目
export const apiPutProject = params => { return axios.put("/proj", params).then(res => res.data) };

//获取指定管理员列表 后台模糊匹配
export const apiGetAdminList = params => { return axios.get("/user/simple", { params: params }).then(res => res.data) };

//获取系统医学字典
export const apiGetMeddraList = params => { return axios.get("/meddra/list", params).then(res => res.data) };
