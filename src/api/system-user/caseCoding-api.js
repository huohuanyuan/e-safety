/*
 * @Author: yongwnehao
 * @Date: 2019-04-02 09:08:22 
 * @Last Modified by: yongwenhao
 * @Last Modified time: 2019-03-02 10:24:48
 * @instruction: 系统配置案例规则(普通)
 */
import axios from '../http'
// 获取数据
export const getCaseCode = query => { return axios.get("/proj/case/code", { params: query }).then(res => res.data) };

// 修改数据
export const putCaseCode = params => { return axios.put("/proj/case/code", params).then(res => res.data) };