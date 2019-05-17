/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-29 11:22:11 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-01 09:57:20
 *  产品 api
 */

 import axios from './../http'

//查询案例产品列表信息
 export const apiGetProductList = query => { return axios.get("/product/list", { params: query }).then(res => res.data) };

// 查询单个案例产品
  export const apiGetProduct = query => { return axios.get("/product", { params: query }).then(res => res.data) };

// 新增/修改案例产品及产品物质信息
export const apiPutProduct = params => { return axios.put("/product",params).then(res => res.data) };

