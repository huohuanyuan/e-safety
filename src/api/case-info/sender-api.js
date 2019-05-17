/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-28 15:38:50 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-03-28 15:39:51
 * 发送者的 api
 */

 import axios from './../http'

 // 根据项目ID查询发件人信息
export const apiGetSenderInfo = query => { return axios.get("/sender/info", { params: query }).then(res => res.data) };

// 新增或修改发件人信息
export const apiPutSender = params => { return axios.put("/sender",params).then(res => res.data) };