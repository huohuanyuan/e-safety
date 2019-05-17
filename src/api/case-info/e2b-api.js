/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-28 09:42:56 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-03-28 09:58:58
 * eb2 接口 
 */

 import axios from './../http'

 // 根据项目ID查询案例E2B信息
export const apiGetEtbInfo = query => { return axios.get("/etb/info", { params: query }).then(res => res.data) };

// 新增/修改企业信息
export const apiPutEtb = params => { return axios.put("/etb",params).then(res => res.data) };
