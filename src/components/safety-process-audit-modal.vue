<!--
 * @Author: yongwenhao
 * @LastEditors: yongwenhao
 * @instruction: 审核模态框
 * @Date: 2019-04-12 14:20:01
 * @LastEditTime: 2019-04-19 17:15:18
 -->
<template>
  <Modal
    v-model="qcModalShow.qcModel"
    :closable="false"
    :mask-closable="false"
    :width="900"
    class="process-modal"
  >
    <p class="title"> {{titleModel}} </p>
    <div class="content">
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
      > 通过 </Button>
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
  getProcess, // 根据案例ID获取案例实例信息
  getProcessTask, // 根据案例ID查询案例历史操作任务信息
  getProcessNodeUser, // 查询案例流程某个节点下用户列表
  putCaseProcess, //审批通过，提交下一个节点，撤回等案例流程操作
  getQureyExistence // 查看当前案例有无未关闭的质疑
} from "api/case-process/process-api.js";
import { resCode } from "common/js/code.js"; // 状态码
import { PROCESS_CODE } from "common/js/constant.js"; // 项目流程 code
import qs from "qs";

export default {
  name: "",
  props: {
    qcModalShow: Object
  },
  data() {
    return {
      qcInfo: {},
      titleModel: "",
      conModel: "",
      isOkQuery: false // 有质疑不显示确定按钮
    };
  },
  watch: {
    qcModalShow: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        this.qcInfo = newV;
        this.isOkQuery = false;
         if(this.qcInfo.qcModel){
          this.getQureyExistence();
        }
       
      },
      deep: true
    }
  },
  methods: {
    setTitle() {
      this.conModel = "请确认当前内容无异议，并评审通过";
      if (this.qcInfo.nodeCode == "QC") {
        this.titleModel = PROCESS_CODE["QC"];
      } else if (this.qcInfo.nodeCode == "EVALUATION") {
        this.titleModel = PROCESS_CODE["EVALUATION"];
      } else {
        this.titleModel = PROCESS_CODE["REVIEW"];
      }
    },
    // 根据获取当前案例是否有质疑来显示内容
    getQureyExistence() {
      if (this.qcInfo.caseId) {
        getQureyExistence(this.qcInfo.caseId).then(res => {
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
    // 取消
    cancelFun() {
      this.$emit("qcmodalfal");
    },
     // 保存
    questionSave() {
      // status 0：提交到下一级 1：审批通过 2：撤回
      this.qcInfo["sequence"] = ++this.qcInfo["taskSequence"];
      this.qcInfo["status"] = 1;
      putCaseProcess(this.qcInfo).then(res => {
        if (res.status) {
          this.$emit("qcmodalfal");
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    }
  }
};
</script>
<style lang='scss'>
@import "../common/css/variable";
@import "../common/css/mixin";
.e-page {
  @include e-page();
}
.process-modal {
  .ivu-modal-body {
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