/*
 * @Author: yongwenhao
 * @LastEditors: yongwenhao
 * @instruction: 普通用户 首页
 * @Date: 2019-04-12 09:01:30
 * @LastEditTime: 2019-04-16 10:30:08
 */

import axios from '../http'

// 根据用户ID获取用户的案例待办流程任务信息
export const getProcessUser = query => { return axios.get("/case/process/user/task", { params: query }).then(res => res.data) };

// 查询质疑列表
export const getQueryTask = query => { return axios.get("/query/task", { params: query }).then(res => res.data) };
