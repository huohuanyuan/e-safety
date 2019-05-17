/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-27 13:12:17 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-03-27 13:51:07
 *  企业配置
 */

import axios from './../http'

// 查询企业配置信息
export const apiGetEnterprise = query => { return axios.get("/enterprise", { params: query }).then(res => res.data) };

// 新增/修改企业信息
export const apiPutEnterprise = params => { return axios.put("/enterprise",params).then(res => res.data) };

