/*
 * @Author: chengshanshan 
 * @Date: 2019-04-03 17:09:37 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-18 11:29:25
 */
<template>
  <div class="layout">
    <Layout :style="{height: '100vh','overflow':'hidden','min-width':'1280px'}">
      <Header :style="{'border-bottom':'3px solid #E9EBF0'}">
        <satety-header></satety-header>
      </Header>
      <Layout :style="{overflow:'auto'}">
        <Sider
          :width="200"
          :style="{background: '#F9FBFA'}"
        >
          <div class="menu">
            <ul class="menu-children">
              <div class="menu-div">
                <router-link
                  tag="li"
                  :to="{name:'HOME',query:{roleId:this.roleId,projectId:this.projectId}}"
                  :class="isActive?'router-link-active':''"
                >
                  首页</router-link>
              </div>
              <div class="menu-div">
                <router-link
                  tag="li"
                  :to="{name:'CASE_CENTER'}"
                >
                  案例中心
                </router-link>
              </div>
              <div class="menu-div">
                <router-link
                  tag="li"
                  :to="{name:'CASE_INFO_MAN'}"
                >
                  案例配置
                </router-link>
              </div>
              <div class="menu-div">
                <li>
                  递交传输
                </li>
              </div>
              <div class="menu-div">
                <li>
                  数据中心
                </li>
              </div>
              <div class="menu-div">
                <router-link
                  tag="li"
                  :to="{name:'SYS_SET'}"
                >
                  系统配置</router-link>
              </div>

            </ul>
          </div>
        </Sider>
        <Content :style="{padding: '15px 15px 30px 15px'}">
          <router-view :style="{'height': '100%'}"> </router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import SatetyHeader from "components/safety-header.vue";
export default {
  components: {
    SatetyHeader
  },
  data() {
    return {
      projectId: localStorage["projectId"],
      roleId: localStorage["roleId"],
      isActive: false
    };
  },
  watch: {
    $route: {
      handler(val, oldval) {
        if (val.name == "PROCESS" || val.name == "QUESTUIN") {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      },
      // 深度观察监听
      deep: true
    }
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
    list-style: none;
    .menu-div {
      padding: 15px 0;
    }
    li {
      padding: 8px;
      font-size: 16px;
      border-radius: 4px;
      font-weight: bold;
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

