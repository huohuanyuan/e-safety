/*
 * @Author: chengshanshan 
 * @Date: 2019-03-13 09:43:58 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-04-22 17:16:48
 * @instruction:管理员子页面外部框线，按钮压线样式,小标题样式
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
  padding:15px;
  .content {
    flex: 1 1 auto;
    border: 1px solid $color-border;
    padding: 15px;
  
  }
  .btns {
    flex: 0 0 auto;
    margin-top: -15px;
    margin-left: 20px;
    z-index: 2;
  }
}
</style>


