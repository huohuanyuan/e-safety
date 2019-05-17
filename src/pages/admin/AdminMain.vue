
<template>
  <div class="layout">
    <Layout :style="{height: '100vh'}">
      <Header :style="{'border-bottom':'3px solid #E9EBF0'}">
        <satety-header></satety-header>
      </Header>
      <Layout>
        <Sider
          :width="200"
          :style="{background: '#F9FBFA'}"
        >
          <div class="menu">
            <router-link
              class="title"
              tag="p"
              :to="{name:'ADMIN_HOME'}"
            >
              首页</router-link>

            <p class="title">
              系统管理
            </p>
            <ul class="menu-children">
              <router-link
                tag="li"
                :to="{name:'USER_MAN'}"
              >
                <i class="iconfont iconyonghu"></i>用户管理</router-link>
              <router-link
                tag="li"
                :to="{name:'COM_MAN'}"
              >
                <i class="iconfont icongongsi"></i>公司管理</router-link>
              <router-link
                tag="li"
                :to="{name:'PRO_MAN'}"
              >
                <i class="iconfont iconxiangmu"></i>项目管理</router-link>
            </ul>
          </div>
        </Sider>
        <Content>
          <router-view :style="{'height': '100%',padding:'15px'}"> </router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import SatetyHeader from "components/safety-header.vue"
export default {
  components:{
    SatetyHeader
  }
};
</script>
<style lang="scss" scoped>
@import "../../common/css/variable";
.menu {
  padding: 8px;
  .title {
    font-size: 15px;
    color: $font-color-h1;
    padding: 8px;
    font-weight: bold;
    border-radius: 4px;
    &:hover {
      cursor: pointer;
    }
    &.router-link-active {
      color: #fff;
      background-color: $color-theme;
      .iconfont {
        color: #fff;
      }
    }
  }
  .menu-children {
    border-bottom: 1px solid #e9ebf0;
    list-style: none;
    li {
      padding: 5px 8px;
      font-size: 13px;
      border-radius: 4px;
      .iconfont {
        margin-right: 10px;
        color: #8a949e;
        font-size: 15px;
      }
      &:hover {
        cursor: pointer;
      }
      &.router-link-active {
        color: #fff;
        background-color: $color-theme;
        .iconfont {
          color: #fff;
        }
      }
    }
  }
}
</style>

