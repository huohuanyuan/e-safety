/*
 * @Author: chengshanshan 
 * @Date: 2019-03-13 09:08:22 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-03-13 11:08:43
 * @instruction:子页面顶部title 包含页面标题和返回按钮
 */
<template>
    <div class="outer">
        <div class="title">
            <slot name="title"> </slot>
        </div>
        <div class="back">
            <slot name="back"></slot>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
@import "../common/css/variable";
@import "../common/css/mixin";
.outer{
    height: 32px;
    background-color: #F4F4F5;
    display: flex;
    justify-content:space-between;
    align-items: center;
    padding: 0 10px;
    .title{
        color: $font-color-content;
        font-size: 14px;
        font-weight: bold;
    }
    .back{
        color: $color-theme;
    }
}

</style>


