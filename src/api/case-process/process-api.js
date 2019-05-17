/*
 * @Author: yongwenhao
 * @LastEditors: yongwenhao
 * @instruction: 案例中心流程接口
 * @Date: 2019-04-12 09:42:53
 * @LastEditTime: 2019-04-19 11:26:44
 */

import axios from '../http'

// 根据案例ID获取案例实例信息
export const getProcess= query => { return axios.get("/case/process", { params: query }).then(res => res.data) };

// 根据案例ID查询案例历史操作任务信息
export const getProcessTask = query => { return axios.get("/case/process/task", { params: query }).then(res => res.data) };

// 根据流程节点Id获取该节点当前分配的用户列表
export const getProcessNodeUserList = query => { return axios.get("/process/node/user/list", { params: query }).then(res => res.data) };

// 审批通过，提交下一个节点，撤回等案例流程操作
export const putCaseProcess = params => { return axios.put("/case/process", params).then(res => res.data) };

// 查看当前案例有无未关闭的质疑
export const getQureyExistence = query => { return axios.get(`/query/existence/${query}`).then(res => res.data) };


