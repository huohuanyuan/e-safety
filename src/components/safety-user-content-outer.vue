/*
 * @Author: chengshanshan 
 * @Date: 2019-03-13 09:43:58 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-04 13:09:54
 * @instruction:普通用户子页面外部框线，按钮悬浮，左侧书签样式
 */
<template>
  <div class="outer">
    <div class="content">
      <!-- 内容插槽 -->
      <slot name="content"></slot>
    </div>
    <div class="btns">
      <!-- 按钮插槽 -->
      <slot name="btns"></slot>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../common/css/variable";
.outer {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid $color-border;
  margin-top: -4px;
  padding-bottom: 4px;
  border-left: none;
  box-shadow: 10px 5px 10px rgba(0, 0, 0, 0.1);
  padding-left: 15px;
  background-image: url("../assets/tab_sider.png");
  background-repeat: repeat-y;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  .content {
    height: 100%;
    padding: 15px 15px 20px 15px;
  }
  .btns {
    position: fixed;
    right: 50px;
    bottom: 18px;
  }
}
</style>


