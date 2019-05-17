/*
 * @Author: luhaosheng 
 * @Date: 2019-03-12 13:37:45 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-12 10:11:01
 * @instructions: 案例配置模块
 */
<template>
 
  <Layout :style="{'height': '100%'}">
    <Header :style="{'height': '34px','line-height':'34px'}">
      <safety-user-nav :navList="navList">
      </safety-user-nav>
    </Header>
    <Content>
      <router-view> </router-view>
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
          title: "案例清单",
          routerName: "CASE_LIST"
        },
        {
          title: "质疑列表",
          routerName: "QUERY_LIST"
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



