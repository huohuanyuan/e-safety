import axios from '../http'

// 请求用户list
export const apiGetUserList = params => { return axios.get("/user",{params:params}).then(res => res.data) };

// 添加用户
export const apiPostUser = params => { return axios.post("/user",params).then(res => res.data) };

//删除用户
export const apiDeleteUser = query => { return axios.delete("/user/"+query).then(res => res.data) };

// 修改用户
export const apiPutUser = params => { return axios.put("/user",params).then(res => res.data) };

//冻结用户
export const apiLockActiveUser = params => { return axios.put("/user/activated", params).then(res => res.data) };
