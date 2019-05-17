/*
 * @Author: chengshanshan 
 * @Date: 2019-03-13 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-04 13:32:18
 * @instruction:用户界面 页签导航
 */
<template>
  <!-- content-top :二级导航 -->
  <ul class="e-tabs">
    <router-link
      v-for="(item,index) of navList"
      :key="index"
      tag="li"
      :to="{name:item.routerName}"
    >{{item.title}}</router-link>
  </ul>
</template>
<script>
export default {
  props: {
    navList: {
      // 二级导航
      type: Array,
      default: []
    }
  }
  // ,
  // created(){
  //   this.getPropsList()
  // },
  // methods:{
  //   getPropsList(){
  //     console.log(this.props,'000')
  //     console.log(this.navList,'111')
  //   }
  // },
  // watch: {
  //   navList: function(newVal, oldVal) {
  //     console.log(newVal, oldVa);
  //   }
  // }
};
</script>
<style lang="scss" scoped>
@import "../common/css/variable";
@import "../common/css/mixin";
.e-tabs {
  display: flex;
  padding: 0 28px;
  li {
    height: 30px;
    width: 100px;
    text-align: center;
    border: 2px solid transparent;
    border-bottom: none;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    margin: 0 2px;
    background-color: $color-bg-tabs;
    transition: all 0.3s linear;
    font-size: 16px;
    font-weight: bold;

    &:hover {
      cursor: pointer;
    }
    &.router-link-active {
      background-color: #fff;
      border: 2px solid $color-theme;
      border-bottom: none;
      color: $color-theme;
    }
  }
}
</style>


