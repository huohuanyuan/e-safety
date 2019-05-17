/*
 * @Author: chengshanshan 
 * @Date: 2019-04-10 10:33:44 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-05-06 16:00:00
 * @instruction：:案例中心 可重复部分组件，包含添加 删除 恢复按钮，删除时遮罩层样式
 */

<template>
  <div
    class="repeat-wraper"
    :class="{'deleted':isDeleted}"
  >
    <div class="repeat-outer">
      <div class="header">
        <div class="title">
          <slot name="No"></slot>

        </div>
        <div v-show="!isDeleted">
          <!-- 增加按钮 -->
          <i
            class="iconfont iconzengjia"
            @click.stop="addItem"
          ></i>
          <!-- 删除按钮 -->
          <i
            v-show="isShowDeleteBtn"
            class="iconfont iconshanchus"
            @click="removeItem"
          ></i>
        </div>
      </div>
      <!-- 内容插槽 -->
      <slot></slot>
    </div>
    <div
      class="mask-layer"
      v-show="isDeleted"
    >
      <div class="header">
        <!-- 增加按钮 -->
        <i
          class="iconfont iconzengjia"
          @click.stop="addItem"
        ></i>
        <!-- 恢复按钮 -->
        <i
          class="iconfont iconhuifu"
          @click="recoverItem"
        ></i>

      </div>

    </div>
  </div>
</template>
<script>
export default {
  props: {
    repeatIndex: {
      //最外层需要复制的项的小标
      type: Number,
      default: 0
    },
    currIndex: {
      //当前复制项的下标
      type: Number,
      default: 0
    },
    repeatBase: {//复制项
      type: [Object,Array],
      default: () => {
        return {};
      }
    },
    repeatList: {//重复list
      type: Array,
      default: () => {
        return [];
      }
    },
    isDeleted: {//是否删除
      type: Boolean,
      default: false
    },
   
  },
  methods: {
    //添加一块
    addItem() {  
      this.$emit("addItem", {
        repeatIndex: this.repeatIndex,
        content: this.repeatBase
      });
    },
    //恢复删除块
    recoverItem() {
      this.$emit("recoverItem", {
        repeatIndex: this.repeatIndex,
        currIndex: this.currIndex
      });
    },
    //删除块
    removeItem() {
      this.$emit("removeItem", {
        repeatIndex: this.repeatIndex,
        currIndex: this.currIndex,
        isNew: this.repeatList[this.currIndex].isNew
      });
    }
  },
  computed: {
    isShowDeleteBtn() {
       return this.repeatList.length > 1 && !this.isDeleted;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../common/css/variable";
.repeat-wraper {
  position: relative;
  &.deleted {
    .header {
      .title {
        position: relative;
        &:before {
          position: absolute;
          content: "";
          display: block;
          width: calc(100% - 4px);
          top: 50%;
          height: 2px;
          margin-top: -1px;
          background-color: red;
        }
      }
    }
    .mask-layer {
      padding: 10px;
      background-color: $color-case-bg;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .header {
        text-align: right;
      }
    }
  }
}
.repeat-outer {
  border: 1px solid $color-border-case;
  padding: 10px;

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .title {
      height: 24px;
      line-height: 24px;
      font-size: 14px;
      font-weight: 600;
      border-left: 4px solid $color-theme;
      padding-left: 5px;
    }
  }
}
.iconfont {
  cursor: pointer;
  color: $color-theme-btn;
}
</style>

