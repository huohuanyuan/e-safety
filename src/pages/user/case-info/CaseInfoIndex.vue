/*
 * @Author: luhaosheng 
 * @Date: 2019-03-12 13:37:45 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-08 13:15:15
 * @instructions: 案例配置模块
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
export default {
  components: {
    SafetyUserNav
  },
  data() {
    return {
      navList: [
        {
          title: "预警配置",
          routerName: "CASE_INFO_WARNING"
        },
        {
          title: "企业配置",
          routerName: "CASE_INFO_COM"
        },
        {
          title: "E2B",
          routerName: "CASE_INFO_E2B"
        },
        {
          title: "发送者",
          routerName: "CASE_INFO_SEN"
        },
        {
          title: "报告者",
          routerName: "CASE_INFO_REP"
        },
        {
          title: "产品",
          routerName: "CASE_INFO_PRO"
        },
        {
          title: "研究",
          routerName: "CASE_INFO_STU"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/variable";
@import "../../../common/css/mixin";
</style>



