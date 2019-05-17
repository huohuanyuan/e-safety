/*
 * @Author: yongwnehao
 * @Date: 2019-04-02 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-08 15:24:09
 * @instruction: 系统配置用户接口(普通)
 */
import axios from '../http'
// 查看项目用户列表
export const getUserList = query => { return axios.get("/proj/user/list", { params: query }).then(res => res.data) };

// 修改项目用户
export const putUser = params => { return axios.put("/proj/user", params).then(res => res.data) };

// 新增项目用户
export const postUser = params => { return axios.post("/proj/user", params).then(res => res.data) };

// 检索所有可用的角色
export const getAvailableList = params => { return axios.get("/proj/role/available/list", params).then(res => res.data) };

// 看项目下单个用户
export const getUserId= query => { return axios.get(`/proj/user/${query}`).then(res => res.data) };

// 用户_项目人员是否已满员
export const getUserListFull = query => { return axios.get("/proj/user/full", { params: query }).then(res => res.data) };
