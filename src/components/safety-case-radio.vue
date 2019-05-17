/*
 * @Author: chengshanshan 
 * @Date: 2019-04-19 16:01:08 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-04-25 17:08:10
 * @instraction:case页面用的单选框组件，每次只能选一个，再次点击取消选中
 */
<template>
  <div>
    <div
      class="e-radio-wrapper"
      v-for="(item,index) in codeList"
      :key="item.codeValue"
      @click.stop="labelClick(item.codeValue)"
    >

      <span :class="{'e-radio':true,'e-checked':checkedValue==item.codeValue}">
        <span class="e-radio-inner"></span>
        <input
          class="e-input"
          type="radio"
          name="check"
          :value="item.codeValue"
          v-model="checkedValue"
        >
      </span>

      {{item.codeLabel}}

    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    codeList: {
      type: Array,
      default: () => {
        return [{ codeId: "", codeValue: "", codeLabel: "" }];
      }
    }
  },
  data() {
    return {
      checkedValue: this.value,
      prevValue: "" //记录上次的值
    };
  },
  methods: {
    labelClick(v) {
      this.checkedValue = v;
      if (this.prevValue == this.checkedValue) {
        this.checkedValue = "";
      }
      this.prevValue = this.checkedValue;
      this.$emit("setRadioValue", this.checkedValue);
    },
    init() {
      this.checkedValue = "";
    }
  },

  watch: {
    value(v) {
      this.checkedValue = v;
      this.prevValue = v;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../common/css/variable";
.e-radio-wrapper {
  font-size: 12px;

  display: block;
  position: relative;
  white-space: nowrap;
  margin-right: 8px;
  cursor: pointer;
  .e-radio {
    display: inline-block;
    margin-right: 4px;
    white-space: nowrap;
    position: relative;
    line-height: 1;
    vertical-align: middle;
    cursor: pointer;
    &.e-checked {
      .e-radio-inner {
        border-color: $color-theme;
        &:after {
          opacity: 1;
          transform: scale(1);
          transition: all 0.2s ease-in-out;
        }
      }
    }
    .e-radio-inner {
      display: inline-block;
      width: 14px;
      height: 14px;
      position: relative;
      top: 0;
      left: 0;
      background-color: #fff;
      border: 1px solid #dcdee2;
      border-radius: 50%;
      transition: all 0.2s ease-in-out;
      &:after {
        position: absolute;
        width: 8px;
        height: 8px;
        left: 2px;
        top: 2px;
        border-radius: 4px;
        display: table;
        border-top: 0;
        border-left: 0;
        content: " ";
        background-color: $color-theme;
        opacity: 0;
        transition: all 0.2s ease-in-out;
        -webkit-transform: scale(0);
        transform: scale(0);
      }
    }
    .e-input {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      opacity: 0;
      cursor: pointer;
    }
  }
}
</style>


