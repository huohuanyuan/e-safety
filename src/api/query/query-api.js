/*
 * @Author: liuhaosheng 
 * @Date: 2019-04-11 17:08:26 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-15 15:58:32
 * 质疑 api
 */

import axios from '../http'

// 添加质疑
export const apiPostQuery = params => { return axios.post("/query", params).then(res => res.data) };

// 根据案例ID查询案例已操作流程节点用户信息
export const getCaseProcessTaskUser = query => { return axios.get("/case/process/task/user", { params: query }).then(res => res.data) };

// 查询质疑列表
export const apiGetQuery = query => { return axios.get("/query", { params: query }).then(res => res.data) };

 // 回复质疑
export const apiPostQueryDetail = params => { return axios.post("/query/detail", params).then(res => res.data) };

// 关闭质疑
export const apiPutQueryClose = params => { return axios.put("/query/close", params).then(res => res.data) };

// 查看质疑及质疑详细
export const apiGetQueryCon = query => { return axios.get("/query/" + query).then(res => res.data) };
