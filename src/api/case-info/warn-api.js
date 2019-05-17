/*
 * @Author: yongwnehao
 * @Date: 2019-04-02 09:08:22 
 * @Last Modified by: yongwenhao
 * @Last Modified time: 2019-03-02 10:24:48
 * @instruction: 案例配置预警配置接口
 */

import axios from './../http'

// 检索案例配置信息
export const getCaseWarn = params => { return axios.get("/case/warn", params).then(res => res.data) };
// 修改案例配置信息
export const putCaseWarn = params => { return axios.put("/case/warn", params).then(res => res.data) };