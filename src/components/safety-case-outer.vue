/*
 * @Author: chengshanshan 
 * @Date: 2019-03-13 09:43:58 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-22 15:29:03
 * @instruction:案例中心页面外部包含框组件，包含外部框线样式 下方的悬浮按钮，侧边的操作按钮
 */
 
<template>
  <div class="outer">
    <div class="l-wrap">
      <!-- 需要展示list end-->
      <div
        class="list-wrap"
        v-show="showList"
      >
        <!-- 标题 -->
        <div class="title">
          <slot name="title"></slot>
        </div>
        <div class="btn">
          <Button
            type="info"
            @click="createNewForm"
          >新建</Button>
        </div>
        <!-- 表格 -->
        <div class="list">
          <slot name="table"></slot>
        </div>
      </div>
      <!-- 需要展示list end -->
      <div
        class="form-wrap"
        v-show="showForm"
      >
        <!-- 表单 -->
        <slot></slot>
      </div>
      <div class="save-btn">
        <!-- 下方保存按钮 -->
        <button @click="dataSave">保存</button>
      </div>
    </div>
    <!-- 右侧操作按钮 -->
    <div class="r-btn">
      <!-- 操作完成 -->
      <div v-if='isOperator'> <i
          class="iconwancheng iconfont"
          style='color: #40C785;'
        > </i></div>
      <!-- 提交 -->
      <div
        @click="submit"
        v-if='isAuditBtn'
      > <i class="iconfasong2 iconfont"> </i></div>
      <!-- 审核 -->
      <div
        @click="qcSubmit"
        v-if='isSubBtn'
      > <i class="iconpingshen1 iconfont"> </i></div>
      <!-- 撤回 -->
      <div
        @click="backSubmit"
        v-if='isBack'
      > <i class="iconhuituidahui iconfont"> </i></div>
      <!--  质疑  -->
      <div @click="queryFun"> <i class="iconzhiyitishi iconfont"> </i></div>
    </div>
    <!-- 加载loading -->
    <Spin
      size="large"
      fix
      :style="{'margin-top':'-10px','margin-left':'-10px',}"
      v-if="spinShow"
    ></Spin>
    <!--  质疑模态框 -->
    <safety-query-modal
      ref="queryModal"
      :modalShow="modal"
      :caseNo="caseNo"
      :queryType="queryType"
      @cancelModalFun="cancelModalFun"
      @shwoModalFun="shwoModalFun"
    > </safety-query-modal>
    <!-- 提交模态框 -->
    <safety-process-sub-modal
      :proModalShow="getProcess"
      @promodalfal='proModelF'
    > </safety-process-sub-modal>
    <!-- 审核模态框 -->
    <safety-process-audit-modal
      :qcModalShow="getQcProcess"
      @qcmodalfal='qcModelF'
    > </safety-process-audit-modal>
    <!-- 撤回模态框 -->
    <safety-process-back-modal
      :backModalShow="getBackProcess"
      @backmodalfal='backModelF'
    > </safety-process-back-modal>

  </div>
</template>
<script>
import {
  getProcess, // 根据案例ID获取案例实例信息
  putCaseProcess //审批通过，提交下一个节点，撤回等案例流程操作
} from "api/case-process/process-api.js";
import { resCode } from "common/js/code.js"; // 状态码
import { PROCESS_CODE } from "common/js/constant.js"; // 项目流程 code
import SafetyQueryModal from "components/safety-query-modal"; // 质疑模态框
import SafetyProcessSubModal from "components/safety-process-sub-modal"; // 提交模态框
import SafetyProcessAuditModal from "components/safety-process-audit-modal"; // 审核模态框
import SafetyProcessBackModal from "components/safety-process-back-modal"; // 撤回模态框

export default {
  props: {
    showList: {
      type: Boolean,
      default: false
    },
    showForm: {
      type: Boolean,
      default: true
    },
    spinShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SafetyQueryModal,
    SafetyProcessSubModal,
    SafetyProcessAuditModal,
    SafetyProcessBackModal
  },
  data() {
    return {
      PROCESSCODE: PROCESS_CODE,
      modal: false, // 质疑模态框
      queryType: 1,
      isSubBtn: false, // 审核
      isAuditBtn: false, // 提交
      isBack: false, // 撤回
      getProcess: {
        proModel: false // 提交审核模态框/
      }, // 获取 提交 数据
      getQcProcess: {
        qcModel: false // QC模态框
      }, // 提交
      getBackProcess: {
        backModel: false // 撤回模态框
      }, // 撤回
      isOperator: false // 流程当前操作人
    };
  },

  methods: {
    dataSave() {
      this.$emit("dataSave");
    },
    createNewForm() {
      this.$emit("createNewForm");
    },
    //质疑
    queryFun() {
      this.modal = true;
      this.$nextTick(() => {
        this.$refs.queryModal.init();
      });
    },
    // 关闭质疑模态框
    cancelModalFun() {
      this.modal = false;
    },
    // 打开质疑模态框
    shwoModalFun() {
      this.modal = true;
    },
    //提交
    submit() {
      this.$set(this.getProcess, "proModel", true);
    },
    // 提交模态框父子传参
    proModelF() {
      this.$set(this.getProcess, "proModel", false);
      this.getJson();
    },
    // QC
    qcSubmit() {
      this.$set(this.getQcProcess, "qcModel", true);
    },
    // QC模态框父子传参
    qcModelF() {
      this.$set(this.getQcProcess, "qcModel", false);
      this.getJson();
    },
    // 打回 撤回
    backSubmit() {
      this.$set(this.getBackProcess, "backModel", true);
    },
    // 撤回模态框父子传参
    backModelF() {
      this.$set(this.getBackProcess, "backModel", false);
      this.getJson();
    },
    getJson() {
      this.isSubBtn = false;
      this.isAuditBtn = false;
      this.isBack = false;
      let _data = {
        caseId: this.caseId
      };
      // 新建项目不发送请求
      if (this.caseId) {
        // 根据案例ID获取案例实例信息
        getProcess(_data).then(res => {
          if (res.status) {
            // 仅 针对当前审核提交后，下一个操作人员和当前人员不一致 操作完成图标
            // if (localStorage["userId"] == res.data.taskOperator) {
            this.isBack = true;
            if (res.data.nodeCode == "EDIT") {
              // 提交 QC
              this.isBack = false;
              this.isAuditBtn = true;
              this.getProcess = res.data;
            } else if (res.data.nodeCode == "QC" && res.data.taskStatus == 0) {
              //  QC 审核
              this.isSubBtn = true;
              this.getQcProcess = res.data;
              this.getBackProcess = res.data;
            } else if (res.data.nodeCode == "QC" && res.data.taskStatus == 1) {
              // QC发送到医学评价
              this.isAuditBtn = true;
              this.getProcess = res.data;
              this.getBackProcess = res.data;
            } else if (
              res.data.nodeCode == "EVALUATION" &&
              res.data.taskStatus == 0
            ) {
              // 医学评价 审核
              this.isSubBtn = true;
              this.getQcProcess = res.data;
              this.getBackProcess = res.data;
            } else if (
              res.data.nodeCode == "EVALUATION" &&
              res.data.taskStatus == 1
            ) {
              // 医学评价发送到复核
              this.isAuditBtn = true;
              this.getProcess = res.data;
              this.getBackProcess = res.data;
            } else if (
              res.data.nodeCode == "REVIEW" &&
              res.data.taskStatus == 0
            ) {
              // 复核 审核
              this.isSubBtn = true;
              this.getQcProcess = res.data;
              this.getBackProcess = res.data;
            } else {
              this.isSubBtn = false;
              this.isAuditBtn = false;
              this.isBack = false;
              // this.isOperator = true;
            }
            // } else {
            // this.isBack = false;
            // this.isOperator = true;
            // }
          } else {
            this.$Message.error(resCode(this, res.code));
          }
        });
      }
    }
  },
  mounted() {
    this.getJson();
  },
  computed: {
    caseId() {
      return this.$route.query.caseId;
    },
    pageId() {
      return this.$route.params.pageId;
    },
    caseNo() {
      return localStorage.getItem("caseNo");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../common/css/variable";
.outer {
  position: relative;
  margin-top: 10px;
  padding-bottom: 4px;
  display: flex;
  min-height: calc(100% + 18px);
  .l-wrap {
    flex: 1 1 auto;
  }
  .r-btn {
    flex: 0 0 50px;
    padding: 0 10px;
    .iconfont {
      font-size: 42px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .list-wrap {
    border: 1px solid $color-border;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 20px 20px 16px 30px;
    border-left: none;
    box-shadow: 10px 5px 10px rgba(0, 0, 0, 0.1);
    background-image: url("../assets/tab_sider.png");
    background-repeat: repeat-y;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    .title {
      font-size: 22px;
      font-weight: 600;
      color: $font-color-h1;
    }
    .btn {
      text-align: right;
    }
    .list {
      margin-top: 10px;
    }
  }

  .form-wrap {
    padding: 16px;
    border: 1px solid $color-border;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .save-btn {
    position: fixed;
    right: 100px;
    bottom: 18px;
    button {
      font-weight: 600;
      font-size: 15px;
      padding: 10px 50px 10px;
      background-color: $color-theme-btn;
      border: none;
      color: #fff;
      box-shadow: 2px 5px 6px rgba(149, 156, 161, 0.8);
      cursor: pointer;
    }
  }
}
</style>


