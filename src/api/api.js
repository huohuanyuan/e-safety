import axios from './http'

// 登录
export const postLogin = params => { return axios.post("/login", params).then(res => res.data) };

// 修改密码(密码过期）
export const putPwdExpire = params => { return axios.put("/user/pwd/expire", params).then(res => res.data) };

// 获取验证码
export const putPwdVerifyCode = params => { return axios.put("/user/pwd/verify/code", params).then(res => res.data) };

// 重置密码
export const putLoginPwd = params => { return axios.put("/user/pwd/reset", params).then(res => res.data) };

// 获取E2B填写元素字典
export const ApiGetDict = query => { return axios.get("/case/dictionary/" + query).then(res => res.data) };


