import axios from '../http'

// 查询公司列表
export const apiGetCompanyList = params => { return axios.get("/company/list",{params:params}).then(res => res.data) };

// 查询公司详情
export const apiGetCompanyInfo = query => { return axios.get("/company/"+query).then(res => res.data) };

// 新建公司
export const apiPostCompany = params => { return axios.post("/company",params).then(res => res.data) };

// 删除公司
export const apiDeleteCompany = query => { return axios.delete("/company/"+query).then(res => res.data) };

// 修改公司
export const apiPutCompany = params => { return axios.put("/company",params).then(res => res.data) };

