/*
 * @Author: yongwnehao
 * @Date: 2019-04-02 09:08:22 
 * @Last Modified by: yongwenhao
 * @Last Modified time: 2019-03-02 10:24:48
 * @instruction: 系统配置角色接口(普通)
 */
import axios from '../http'
// 查看角色列表( 3个接口 )
export const getRoleList = query => { return axios.get("/proj/role/list", { params: query }).then(res => res.data) };

// 修改角色列表
export const putRoleList = params => { return axios.put("/proj/role/list", params).then(res => res.data) };

// 检索角色是否使用
export const getRoleCheck = query => { return axios.get(`/proj/role/check/${query}`).then(res => res.data) };