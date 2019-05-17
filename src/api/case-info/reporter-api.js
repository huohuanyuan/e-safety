/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-28 16:56:08 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-03-28 17:09:09
 * 报告人的 api
 */

 import axios from './../http'

 // 查询案例报告人列表
 export const apiGetReporterList = query => { return axios.get("/reporter/list", { params: query }).then(res => res.data) };

 // 新增/ 修改报告人信息
export const apiPutReporter = params => { return axios.put("/reporter",params).then(res => res.data) };

// 查询单个报告人信息
 export const apiGetReporter= query => { return axios.get("/reporter", { params: query }).then(res => res.data) };
