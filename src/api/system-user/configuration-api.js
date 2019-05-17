/*
 * @Author: yongwnehao
 * @Date: 2019-04-02 09:08:22 
 * @Last Modified by: yongwenhao
 * @Last Modified time: 2019-03-02 10:24:48
 * @instruction: 系统配置角色配置接口(普通)
 */
import axios from '../http'

// 检索角色和权限的关系
export const getRoleListPrivilegeRoleRelationship = params => { return axios.get("proj/role/privilege/role/relationship", params).then(res => res.data) };

// 检索所有可用的角色 
export const getRoleAllocationList = params => { return axios.get("/proj/role/allocation/list", params).then(res => res.data) };

//修改角色和权限的关系
export const putRoleListPrivilegeRelationship = params => { return axios.put("/proj/role/privilege/relationship", params).then(res => res.data) };

