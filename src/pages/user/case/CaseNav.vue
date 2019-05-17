/*
 * @Author: chengshanshan 
 * @Date: 2019-03-12 13:37:45 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-04-26 09:35:47
 * @instructions:案例中心子导航容器
 */
<template>
  <Layout :style="{'height': '100%'}">
    <Header :style="{'height': '20px','line-height':'20px'}">
      <div class="header">{{caseNo}}
        </div>
    </Header>
    <Header class="nav-list">
      <router-link
        tag="div"
        class="cell"
        v-for="(item,index) of navList"
        :to="{name:item.routerName,query:{caseId:caseId,pageId:item.pageId}}"
        :key="index"
      >{{CASE_CODE[item.pageId]}}</router-link>
    </Header>
    <Content>
      <router-view></router-view>
    </Content>
  </Layout>
</template>
<script>
import { CASE_CODE } from "common/js/constant.js";
export default {
  data() {
    return {
      CASE_CODE: CASE_CODE,
      navList: [
        {
          title: "患者特征", //"DEMO",
          routerName: "CASE_DM",
          pageId: "DM"
        },
        {
          title: "不良事件/反应", //"AE",
          routerName: "CASE_AE",
          pageId: "AE"
        },
        {
          title: "药品信息", //"DRUG",
          routerName: "CASE_DRUG",
          pageId: "DG"
        },
        {
          title: "相关病史",
          routerName: "CASE_MH",
          pageId: "MH"
        },
        {
          title: "用药史",
          routerName: "CASE_DH",
          pageId: "DH"
        },

        {
          title: "实验室检查",
          routerName: "CASE_LB",
          pageId: "LB"
        },
        {
          title: "描述",
          routerName: "CASE_NR",
          pageId: "NR"
        },
        {
          title: "案例识别",
          routerName: "CASE_CI",
          pageId: "CI"
        },
        {
          title: "主要信息来源",
          routerName: "CASE_RP",
          pageId: "RP"
        },
        {
          title: "发送者信息",
          routerName: "CASE_SD",
          pageId: "SD"
        },
        {
          title: "文献",
          routerName: "CASE_LR",
          pageId: "LR"
        },
        {
          title: "研究信息",
          routerName: "CASE_SI",
          pageId: "SI"
        }
      ]
    };
  },
  computed: {
    caseId() {
      return this.$route.query.caseId;
    },
    caseNo() {
      return  localStorage.getItem("caseNo");;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/variable";
@import "../../../common/css/mixin";
.header{
  font-size: 16px;
  padding: 0 15px;
  font-weight: 600;
}
.nav-list {
  display: flex;
  border-bottom: 1px solid $color-border;
  padding: 0 15px;
  margin-top: 20px;
  .cell {
    padding: 0 10px;
    border-bottom: 4px solid transparent;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: -2px;
    cursor: pointer;
    &.router-link-active {
      border-bottom: 4px solid $color-theme;
      color: $color-theme;
    }
  }
}
</style>
