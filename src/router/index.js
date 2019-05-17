import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import {
  routers,
  otherRouter,
  appRouter
} from './router';


export const router = new Router({
  mode: 'history',
  routes: routers
})

// router 全局导航钩子
const LOGIN_NAME = 'LOGIN';
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (!token && to.name !== LOGIN_NAME) {
    //未登录且前往的页面不是登录页面
    next({
      name: LOGIN_NAME
    })
  
    //  next() // 跳转
  } else if (!token && to.name === LOGIN_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  }else{
     next() // 跳转
  }
})
