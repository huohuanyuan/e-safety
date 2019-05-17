<!--
 * @Author: yongwenhao
 * @LastEditors: yongwenhao
 * @instruction: 审核模态框
 * @Date: 2019-04-12 14:20:01
 * @LastEditTime: 2019-04-19 17:16:12
 -->
<template>
  <Modal
    v-model="backModalShow.backModel"
    :closable="false"
    :mask-closable="false"
    :width="900"
    class="process-modal"
  >
    <p class="title">{{titleModel}}</p>
    <div class='content'>
      <p>{{conModel}}</p>
    </div>
    <div slot="footer">
      <Button
        size="large"
        @click="cancelFun"
      > 取消 </Button>
      <Button
        type="primary"
        size="large"
        @click="questionSave"
        v-if="isOkQuery"
      > 提交 </Button>
      <!-- 处理质疑 -->
      <Button
        type="primary"
        size="large"
        @click="cancelFun"
        v-if="!isOkQuery"
      > 确定 </Button>
    </div>
  </Modal>
</template>

<script>
import {
  putCaseProcess, //审批通过，提交下一个节点，撤回等案例流程操作
  getQureyExistence // 查看当前案例有无未关闭的质疑
} from "api/case-process/process-api.js";
import { resCode } from "common/js/code.js"; // 状态码
import qs from "qs";

export default {
  name: "",
  props: {
    backModalShow: Object
  },
  //这里存放数据
  data() {
    return {
      backInfo: {},
      isOkQuery: false, // 有质疑不显示确定按钮
      conModel: "",
      titleModel: ""
    };
  },
  watch: {
    backModalShow: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        this.backInfo = newV;
        this.isOkQuery = false;
        if(this.backInfo.backModel){
          this.getQureyExistence();
        }
      },
      deep: true
    }
  },
  methods: {
    getQureyExistence() {
      if (this.backInfo.caseId) {
        getQureyExistence(this.backInfo.caseId).then(res => {
          if (res.status) {
            this.isOkQuery = true;
            this.setTitle();
          } else {
            this.titleModel = "质疑提醒";
            this.conModel = "当前案例存在质疑，请先处理质疑!";
          }
        });
      }
    },
    setTitle() {
      this.titleModel = "撤销提醒";
      if (this.backInfo.taskStatus == "1") {
        if (this.backInfo.nodeCode == "QC") {
          this.conModel = "已通过案例质检，是否撤回?";
        } else if (this.backInfo.nodeCode == "EVALUATION") {
          this.conModel = "已通过医学评价，是否撤回?";
        } else {
          this.conModel = "已通过案例复核，是否撤回?";
        }
      } else {
        this.conModel = "确认打回到创建人？";
      }
    },
    // 取消
    cancelFun() {
      this.$emit("backmodalfal");
    },
    // 保存
    questionSave() {
      // status 0：提交到下一级 1：审批通过 2：撤回
      this.backInfo["sequence"] = ++this.backInfo["taskSequence"];
      this.backInfo["status"] = 2;
      putCaseProcess(this.backInfo).then(res => {
        if (res.status) {
          this.$emit("backmodalfal");
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../common/css/variable";
@import "../common/css/mixin";
.e-page {
  @include e-page();
}
.process-modal {
  /deep/ .ivu-modal-body {
    font-size: 14px;
    padding: 0;
    .title {
      background: $color-theme-btn;
      font-size: 16px;
      color: #fff;
      padding: 12px;
      font-weight: bold;
    }
    .content {
      padding: 100px;
      p {
        font-size: 18px;
        text-align: center;
      }
    }
  }
}
</style>