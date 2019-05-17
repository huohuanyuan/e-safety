import axios from './../http'

// 管理员首页统计
export const apiGetAdminStatistic = query => { return axios.get("/home/admin/statistic", { params: query }).then(res => res.data) };

// 获取登陆用户项目信息
export const apiGetUserProj = query => { return axios.get("/proj/user/access", { params: query }).then(res => res.data) };

// 用户选择项目后进入项目
export const apiPutProjEnter = params => { return axios.put("/proj/enter",params).then(res => res.data) };
