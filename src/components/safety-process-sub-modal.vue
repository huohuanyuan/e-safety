<!--
 * @Author: yongwenhao
 * @LastEditors: yongwenhao
 * @instruction: 提交模态框
 * @Date: 2019-04-11 15:26:20
 * @LastEditTime: 2019-04-23 16:41:08
 -->
<template>
  <div class='sub-model'>
    <!-- 质疑 -->
    <div v-if="!isOkQuery">
      <Modal
        v-model="proModalShow.proModel"
        :closable="false"
        :mask-closable="false"
        :width="900"
        class="process-modal"
      >
        <p class="title"> {{titleModel}}</p>
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
            @click="cancelFun"
          > 确定 </Button>
        </div>
      </Modal>
    </div>
    <div v-if='isOkQuery'>
      <Modal
        v-model="proModalShow.proModel"
        :closable="false"
        :mask-closable="false"
        :width="900"
        class="process-modal"
      >
        <p class="title"> {{titleModel}} </p>
        <div class='steps'>
          <div class='steps-d'>
            <div>
              <p class="steps-y">
                <span></span>
              </p>
              <p>案例录入</p>
            </div>
          </div>
          <div
            v-for='(item,index) in processListData'
            :key='index'
            :class="{ 
              'steps-d': true,
              'steps-one':  processListData.length == 1,
               'steps-two': processListData.length == 2,
               'steps-the': processListData.length == 3,
               }"
          >
            <p class="line"></p>
            <div>
              <p class="steps-y">
                <span></span>
              </p>
              <p>{{item}}</p>
            </div>
          </div>
        </div>
        <!-- 查看轨迹 -->
        <div class="guiji">
          <p>流程轨迹</p>
          <Button
            class="btn"
            v-if='!tableShow'
            @click='seeTable(0)'
          >查看</Button>
          <Button
            class="btn"
            v-else
            @click='seeTable(1)'
          >收起</Button>
        </div>
        <!-- 轨迹 Table -->
        <div
          class="see-guiji"
          v-if='tableShow'
        >
          <Table
            :columns="columns"
            :data="dataList"
          ></Table>
          <Page
            class-name="e-page-sub"
            :total="process.total"
            :current="process.pageNum"
            :page-size="process.pageSize"
            @on-change="pageChange"
          />
        </div>
        <!-- input -->
        <div class='search'>
          <Input
            type='text'
            v-model="inputSearch"
            placeholder="请填写搜索内容"
          ></Input>
          <Button
            class="search-btn"
            @click='search'
          >查找</Button>
        </div>
        <!-- 参与人员 -->
        <div class="prope">
          <p>参与人员</p>
          <ul>
            <RadioGroup v-model="proper">
              <li
                v-for="item in properList"
                :key="item.userId"
              >
                <Radio
                  :label="item.userId"
                  :key="item.userId"
                >
                  <span class='li-span'> {{item.userName}}</span>
                </Radio>
              </li>
            </RadioGroup>

          </ul>
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
          > 提交 </Button>
        </div>
      </Modal>
    </div>
  </div>

</template>
<script>
import moment from "moment";
import {
  getProcessNode // 查询项目流程节点信息
} from "api/system-user/process-api";
import {
  getProcess, // 根据案例ID获取案例实例信息
  getProcessTask, // 根据案例ID查询案例历史操作任务信息
  getProcessNodeUserList, // 根据流程节点Id获取该节点当前分配的用户列表
  putCaseProcess, //审批通过，提交下一个节点，撤回等案例流程操作
  getQureyExistence // 查看当前案例有无未关闭的质疑
} from "api/case-process/process-api.js";
import { resCode } from "common/js/code.js"; // 状态码
import { PROCESS_CODE } from "common/js/constant.js"; // 项目流程 code
import qs from "qs";
export default {
  props: {
    proModalShow: Object
  },
  data() {
    return {
      processListData: [], // 流程列表
      titleModel: "",
      conModel: "",
      isOkQuery: false, // 有质疑不显示确定按钮
      process: {
        total: 0,
        pageNum: 1,
        pageSize: 5,
        caseId: 0
      }, // 分页
      properList: [], // 操作人员
      proper: "", // 选择的操作人员
      columns: [
        {
          title: "序号",
          width: 70,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              (function(vm) {
                let _code =
                  (vm.process.pageNum - 1) * vm.process.pageSize +
                  params.index +
                  1;
                return _code;
              })(this)
            );
          }
        },
        {
          title: "操作人",
          key: "operatorName"
        },
        {
          title: "节点",
          key: "nodeCode",
          render: (h, params) => {
            return h("div", {}, PROCESS_CODE[params.row.nodeCode]);
          }
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            return h("div", {}, PROCESS_CODE[params.row.status]);
          }
        },
        {
          title: "操作时间",
          key: "gmtModified",
          render: (h, params) => {
            return h(
              "div",
              (function(vm) {
                return moment(params.row.gmtModified).format(
                  "YYYY MM DD hh:mm:ss"
                );
              })(this)
            );
          }
        }
      ], // 历史流程 table
      dataList: [], // 历史流程 tableCon
      tableShow: false, // 查看轨迹
      inputSearch: "", // input
      processInfo: {} // 提交的数据
    };
  },
  watch: {
    proModalShow: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        this.processInfo = newV;
        if (this.processInfo.proModel) {
          this.getQureyExistence();
          this.getProcessList();
          this.tableShow = false; // 默认历史记录关闭
        }
      },
      deep: true
    }
  },
  methods: {
    setCon() {
      if (this.processInfo.proModel) {
        this.getProcessUserJson();
        this.getProcessTask();
        // this.getProcessList();
      }
      if (this.processInfo.nextNodeCode == "QC") {
        this.titleModel = "发送至案例质检";
      } else if (this.processInfo.nextNodeCode == "EVALUATION") {
        this.titleModel = "发送至医学评价";
      } else if (this.processInfo.nextNodeCode == "REVIEW") {
        this.titleModel = "发送至案例复核";
      }
    },
    // 获取流程列表
    getProcessList() {
      this.processListData = [];
      getProcessNode().then(res => {
        if (res.status) {
          if (res.data.length > 0) {
            res.data.map(item => {
              if (item.nodeCode == "QC") {
                this.processListData.push(PROCESS_CODE["QC"]);
              } else if (item.nodeCode == "EVALUATION") {
                this.processListData.push(PROCESS_CODE["EVALUATION"]);
              } else {
                this.processListData.push(PROCESS_CODE["REVIEW"]);
              }
            });
          }
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },

    // 获取数据
    getQureyExistence() {
      getQureyExistence(this.processInfo.caseId).then(res => {
        if (res.status) {
          this.isOkQuery = true;
          this.setCon();
        } else {
          this.isOkQuery = false;
          this.titleModel = "质疑提醒";
          this.conModel = "当前案例存在质疑，请先处理质疑!";
        }
      });
    },
    pageChange(pageNum) {
      this.process.pageNum = pageNum;
      this.getProcessTask();
    },
    // 查询案例流程某个节点下用户列表
    getProcessUserJson() {
      let nodeId = {
        nodeId: this.processInfo.nextNodeId
      };
      getProcessNodeUserList(nodeId).then(res => {
        if (res.status) {
          this.properList = res.data.dataList;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 案例历史操作任务信息
    getProcessTask() {
       
      this.process.caseId = this.processInfo.caseId;
      getProcessTask(this.process).then(res => {
        if (res.status) {
          this.dataList = res.data.dataList;
          this.process.total = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 查看轨迹按钮
    seeTable(num) {
      if (num == 0) {
        this.tableShow = true;
      } else {
        this.tableShow = false;
      }
    },
    // 提交
    questionSave() {
      if (this.proper) {
        // status 0：提交到下一级 1：审批通过 2：撤回
        this.processInfo["sequence"] = ++this.processInfo["taskSequence"];
        this.processInfo["operator"] = this.proper;
        this.processInfo["status"] = 0;
        putCaseProcess(this.processInfo).then(res => {
          if (res.status) {
            this.$emit("promodalfal");
          } else {
            this.$Message.error(resCode(this, res.code));
          }
        });
      } else {
        this.$Message.error("请选择参与审核人");
      }
    },
    // 取消
    cancelFun() {
      this.$emit("promodalfal");
    },
    // 搜索
    search() {
      let searchData = {
        nodeId: this.processInfo.nextNodeId,
        name: this.inputSearch
      };
      getProcessNodeUserList(searchData).then(res => {
        if (res.status) {
          this.properList = res.data.dataList;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../common/css/variable";

.process-modal {
  /deep/ .ivu-modal-body {
    padding: 0;
    .title {
      background: $color-theme-btn;
      font-size: 16px;
      color: #fff;
      padding: 12px;
      font-weight: bold;
    }

    .steps {
      margin: 20px 20px 20px 25px;
      .steps-d {
        display: inline-block;
        position: relative;
        // width: 30.5%;
        div {
          display: inline-block;
          position: relative;
          .steps-y {
            width: 20px;
            height: 20px;
            border: 2px solid #a3abb4;
            position: relative;
            border-radius: 50%;
            margin-left: 18px;
            span {
              display: inline-block;
              width: 12px;
              height: 12px;
              background-color: #a3abb4;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              position: absolute;
              margin: auto;
              border-radius: 50%;
            }
          }
        }
        .line {
          height: 1px;
          display: inline-block;
          margin-bottom: 25px;
          background-color: #a3abb4;
        }
      }
      .steps-d:first-child {
        width: 60px;
      }
    }
    // 1 ge
    .steps-one {
      width: 92%;
      .line {
        width: 92%;
      }
    }
    //  2ge
    .steps-two {
      width: 46.2%;
      .line {
        width: 84%;
      }
    }
    // 3ge
    .steps-the {
      width: 30.8%;
      .line {
        width: 74%;
      }
    }
    // 轨迹
    .guiji {
      margin: 20px 20px 20px 25px;
      p {
        display: inline-block;
        font-size: 14px;
      }
      .btn {
        font-size: 14px;
        background-color: #a3abb4;
        color: #fff;
        display: inline-block;
        text-align: center;
        padding: 2px 20px;
        border-radius: 2px;
      }
    }
    // 查看轨迹
    .see-guiji {
      width: 95%;
      margin: 0 auto;
    }
    // 搜索
    .search {
      margin: 20px 20px 20px 25px;
      .ivu-input-wrapper {
        width: calc(95% - 80px);
      }
      .search-btn {
        width: 100px;
        height: 32px;
        float: right;
        display: inline-block;
        background-color: #e8e8e8;
        color: #232424;
      }
    }
    // 人员列表
    .prope {
      margin: 20px 20px 20px 25px;
      p {
        height: 20px;
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
        color: rgb(35, 36, 36);
      }
      ul {
        width: 95%;
        margin-bottom: 35px;
        .ivu-radio-group {
          width: 100%;
        }
        li {
          margin: 5px;
          padding: 5px;
          .ivu-radio-wrapper {
            width: 100%;
            .ivu-radio {
              float: right;
            }
            .li-span {
              display: inline-block;
              float: left;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import "../common/css/variable";
@import "../common/css/mixin";
.sub-model {
  .ivu-modal-footer {
    padding: 12px 25px 12px 18px;
  }
}
.e-page-sub {
  @include e-page();
  margin: 0;
  position: relative;
  bottom: 0;
}
</style>
