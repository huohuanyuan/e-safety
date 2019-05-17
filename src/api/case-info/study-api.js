/*
 * @Author: liuhaosheng 
 * @Date: 2019-04-01 09:05:41 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-01 10:02:53
 * 研究 api
 */

import axios from './../http'

// 根据项目ID查询多个研究信息
 export const apiGetStudyList = query => { return axios.get("/study/list", { params: query }).then(res => res.data) };

 // 新增或修改案例研究信息
 export const apiPutStudy = params => { return axios.put("/study",params).then(res => res.data) };

// 根据研究Id查询单个案例研究
 export const apiGetStudy = query => { return axios.get("/study", { params: query }).then(res => res.data) };
