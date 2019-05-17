/*
 * @Author: yongwenhao
 * @Date: 2019-04-09 08:46:45
 * @LastEditors: yongwenhao
 * @LastEditTime: 2019-04-15 11:05:18
 * @instruction: 系统配置流程接口
 */
import axios from '../http'
// 查询项目流程节点信息
export const getProcessNode = params => { return axios.get("/process/node", params).then(res => res.data) };

// 根据项目流程节点获取节点用户信息
export const getProcessNodeUser = query => { return axios.get("/process/node/user", { params: query }).then(res => res.data) };

// 批量新增或修改节点用户信息
export const putProcessNodeUser = params => { return axios.put("/process/node/user", params).then(res => res.data) };