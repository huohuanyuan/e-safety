/* 
* @Author: chengshanshan 
 * @Date: 2019-03-12 13:37:45 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-03 17:17:12
 * @instructions:系统配置子导航容器
*/
<template>
  <Layout :style="{'height': '100%'}">
    <Header :style="{'height': '34px','line-height':'34px'}">
      <safety-user-nav :navList="navList">
      </safety-user-nav>
    </Header>
    <Content>
      <router-view></router-view>
    </Content>
  </Layout>
</template>
<script>
import SafetyUserNav from "components/safety-user-nav"; // content-top :二级导航
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域

export default {
  components: {
    SafetyUserNav,
    SafetyUserContentOuter
  },
  data() {
    return {
      navList: [
        {
          title: "用户",
          routerName: "SYS_SET_USER"
        },
        {
          title: "角色",
          routerName: "SYS_SET_ROLE"
        },
        {
          title: "角色配置",
          routerName: "SYS_SET_ROLE_SET"
        },
        {
          title: "流程",
          routerName: "SYS_SET_PROCESS"
        },
         {
          title: "案例编码",
          routerName: "SYS_CASE_CONDING"
        }
      ]
    };
  }
  // ,
  // watch: {
  //   $route(to, from) {
  //     console.log(to.path);
  //   },
  //   // 深度观察监听
  //   deep: true
  // }
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/variable";
@import "../../../common/css/mixin";
</style>



