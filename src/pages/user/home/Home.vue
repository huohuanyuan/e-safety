/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-22 16:09:25 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-22 17:17:49
 * user 的home 页面 
 */
<template>
  <div class="home">
    <!-- 流程任务 -->
    <div class='process'>
      <p class="table-top-but">
        <span>
          流程任务
        </span>
      </p>
      <router-link
        v-if="processShow"
        :to="{name:'PROCESS'}"
        class="go-more"
      >更多</router-link>
      <hr>
      <ul class="table-head">
        <li> <span>{{processHead[0].title}}</span></li>
        <li> <span>{{processHead[1].title}}</span></li>
        <li> <span>{{processHead[2].title}}</span></li>
        <li> <span>{{processHead[3].title}}</span></li>
        <li> <span>{{processHead[4].title}}</span></li>
        <li> <span>{{processHead[5].title}}</span></li>
        <li>
          <span>{{processHead[6].title}}</span>
          <p>
            <img
              src="@/assets/icon_san.png"
              alt=""
              class="img-top"
              @click='taskStatusClick(0)'
            >
            <img
              src="@/assets/icon_san.png"
              alt=""
              class="img-bot"
              @click='taskStatusClick(1)'
            >
          </p>
        </li>
        <li> <span>{{processHead[7].title}}</span></li>
      </ul>
      <ul
        v-for="(item,index) in processData"
        :key="index"
        class="table-body"
        @click="getprocessCon(item.caseId)"
      >
        <li>
          <span>{{item.caseNo}}</span>
        </li>
        <li>
          <span>{{item.receiptDate | moment}}</span>
        </li>
        <li>
          <span>{{item.drugName}}</span>
        </li>
        <li>
          <span>{{item.aeName}}</span>
        </li>
        <li>
          <span>{{item.sae}}</span>
        </li>
        <li>
          <span>{{item.subjectId}}</span>
        </li>
        <li>
          <span>{{item.status}}</span>
        </li>
        <li v-if="!item.dealline">
          <span>--</span>
        </li>
        <li v-else-if="item.dealline>2">
          <span>{{item.dealline}}天</span>
        </li>
        <li v-else>
          <span class="countdown">{{item.dealline}}天</span>
        </li>
      </ul>
    </div>
    <!-- 质疑任务 -->
    <div class='question'>
      <p class="table-top-but">
        <span>
          质疑任务
        </span>
      </p>
      <router-link
        v-if="queryShow"
        :to="{name:'QUESTUIN'}"
        class="go-more"
      >更多</router-link>
      <hr>
      <ul class="table-head">
        <li
          v-for="(item,index) in questionColumns"
          :key="index"
        >
          <span>{{item.title}}</span>
        </li>
      </ul>

      <ul
        v-for="(item,index) in questionData"
        :key="index"
        class="table-body"
      >
        <li @click="getQueryCon(item)">
          <span class="status-title">
            {{ item.queryCode}}
          </span>
        </li>
        <li>
          <span>
            {{item.queryStatus}}
          </span>
        </li>
        <li @click="clickCaseFun(item)">
          <span class="status-title">
            {{item.caseNo}}
          </span>
        </li>
        <li>
          <span>
            {{item.queryAuthorName}}
          </span>
        </li>
        <li>
          <span>
            {{ item.gmtCreate | moment}}
          </span>
        </li>
        <li>
          <span>
            {{item.gmtModified | moment }}
          </span>
        </li>
      </ul>
    </div>
    <!-- 质疑模态框 -->
    <safety-query-modal
      ref="queryModal"
      :modalShow="modal"
      :id="queryId"
      :caseNo="caseNo"
      :queryType="queryType"
      @cancelModalFun="cancelModalFun"
      @shwoModalFun="shwoModalFun"
    > </safety-query-modal>
  </div>
</template>

<script>
import qs from "qs";
import moment from "moment";
import { resCode } from "common/js/code.js"; // 状态码
import { PROCESS_CODE } from "common/js/constant.js"; // 项目流程 code
import { QUERY_CODE } from "common/js/constant.js";
import { caseQueryRouter } from "common/js/unit.js";

import {
  getProcessUser, // 根据用户ID获取用户的案例待办流程任务信息
  getQueryTask // 查询质疑列表
} from "api/home-user/home-api.js";

import SafetyQueryModal from "components/safety-query-modal"; // 质疑模态框

export default {
  components: {
    SafetyQueryModal
  },
  data() {
    return {
      modal: false,
      queryId: "",
      queryType: 3,
      caseNo: "",
      queryShow: false,
      processShow: false,
      processHead: [
        {
          title: "案例编号",
          key: "id"
        },
        {
          title: "收到报告日期",
          key: "receiptDate"
        },
        {
          title: "药品名称",
          key: "drugName"
        },
        {
          title: "不良反应",
          key: "adverseReactions"
        },
        {
          title: "严重性",
          key: "sae"
        },
        {
          title: "创建人",
          key: "founder"
        },
        {
          title: "任务状态",
          key: "taskStatus",
          sortable: true
        },
        {
          title: "倒计时",
          key: "countdown"
        }
      ],
      processData: [],
      questionColumns: [
        {
          title: "质疑编号",
          key: "id"
        },
        {
          title: "质疑状态",
          key: "taskStatus"
        },
        {
          title: "案例",
          key: "case"
        },
        {
          title: "发起人",
          key: "originator"
        },
        {
          title: "创建时间",
          key: "CreaTime"
        },
        {
          title: "更新时间",
          key: "UpdaTime"
        }
      ],
      questionData: []
    };
  },
  methods: {
    // 获取代办任务列表
    getProQueryList() {
      let _data = {
        pageNum: 1,
        pageSize: 5
      };
      getProcessUser(_data).then(res => {
        if (res.status) {
          res.data.dataList.map(item => {
            if (item.status == "EDIT") {
              item["status"] = PROCESS_CODE["EDIT"];
            } else if (item.status == "QC") {
              item["status"] = PROCESS_CODE["QC"];
            } else if (item.status == "EVALUATION") {
              item["status"] = PROCESS_CODE["EVALUATION"];
            } else if (item.status == "REVIEW") {
              item["status"] = PROCESS_CODE["REVIEW"];
            } else {
              item["status"] = PROCESS_CODE["COMPLETE"];
            }
            if (item.sae == null) {
              item["sae"] = "";
            } else if (item.sae) {
              item["sae"] = "严重";
            } else {
              item["sae"] = "不严重";
            }
          });
          this.processData = res.data.dataList;
          if (this.processData.length == 0) {
            this.processShow = false;
          } else {
            this.processShow = true;
          }
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 点击流程任务Head 任务状态按钮
    taskStatusClick(num) {
      if (num == 0) {
        console.log("top");
      } else {
        console.log("bot");
      }
    },
    // --- 质疑 --- //
    getQueryTask() {
      //  请求质疑任务
      let _data = {
        pageNum: 1,
        pageSize: 5
      };
      getQueryTask(_data).then(res => {
        if (res.status) {
          res.data.dataList.map(item => {
            item.queryStatus = QUERY_CODE[item.queryStatus];
          });
          this.questionData = res.data.dataList;
          if (this.questionData.length == 0) {
            this.queryShow = false;
          } else {
            this.queryShow = true;
          }
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 查看流程详情
    getprocessCon(processId) {
      this.$router.push({
        name: "CASE_DM",
        query: {
          caseId: processId,
          pageId: "DM"
        }
      });
    },
    // 查看质疑详情
    getQueryCon(data) {
      this.modal = true;
      this.queryId = data.queryId;
      this.caseNo = data.caseNo;
      this.$nextTick(() => {
        this.$refs.queryModal.init();
      });
    },
    //关闭质疑模态框
    cancelModalFun() {
      this.modal = false;
      this.getQueryTask();
    },
    // 打开质疑模态框
    shwoModalFun() {
      this.modal = true;
    },
    // 点击案例跳转指定页面
    clickCaseFun(data) {
      caseQueryRouter(data);
    }
  },
  mounted() {
    this.getProQueryList(); // 获取代办任务
    this.getQueryTask();
  }
};
</script>
<style lang="scss" scoped>
@import "@/common/css/variable.scss";

@mixin table-top-but {
  // 顶部按钮
  width: 130px;
  height: 40px;
  border-radius: 6px 6px 0px 0px;
  background-color: #19be6b;
  display: inline-block;
  span {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin: 9px 33px;
    display: inline-block;
  }
}
@mixin table-top-more {
  // 更多
  float: right;
  color: #595959;
  font-size: 16px;
  display: inline-block;
  margin-right: 12px;
  margin-top: 15px;
}
@mixin table-head {
  // head
  list-style: none;
  background-color: #e8e8e8;
  li {
    display: inline-block;
    padding: 15px 0;
    text-align: center;
    position: relative;
    span {
      font-size: 15px;
      font-family: "PingFang SC";
      font-weight: bold;
      color: #232424;
    }
  }
}
@mixin table-body {
  // body
  list-style: none;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.06);
  border: 1px solid #e9ebf0;
  margin: 12px 0;
  border-radius: 8px;
  transition: all 0.5s linear;
  li {
    display: inline-block;
    padding: 1px 0;
    text-align: center;
    position: relative;
    span {
      height: 40px;
      line-height: 40px;
    }
  }
}
.home {
  ul {
    display: block;
    width: 100%;
  }
  .process {
    width: 100%;
    margin-bottom: 10px;
    min-height: 260px;
    .table-top-but {
      @include table-top-but();
    }
    .go-more {
      @include table-top-more();
    }
    .go-more:hover {
      color: #50768f;
      text-decoration: underline;
    }
    .table-head {
      @include table-head();
      li {
        width: 10%;
      }
      li:nth-child(4) {
        width: 28%;
      }
      li:nth-child(7) {
        p {
          display: inline-block;
          position: absolute;
          top: 13px;
          img {
            width: 15px;
            height: auto;
            display: block;
          }
          .img-top {
            transform: rotate(-180deg);
          }
          .img-bot {
            position: absolute;
            top: 13px;
          }
        }
      }
      li:nth-child(8) {
        width: 9%;
      }
    }
    .table-body {
      @include table-body();
      li {
        width: 10%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      li:nth-child(4) {
        width: 28%;
      }
      li:nth-child(8) {
        width: 9%;
        .countdown {
          color: #ed4014;
        }
      }
      .status-title {
        color: $color-theme-btn;
        cursor: pointer;
      }
      .status-title:hover {
        text-decoration: underline;
      }
    }
    .table-body:hover {
      background: #f1f9f5;
      border: 1px solid #40c785;
    }
  }
  .question {
    width: 100%;
    margin-top: 30px;
    .table-top-but {
      @include table-top-but();
    }
    .go-more {
      @include table-top-more();
    }
    .go-more:hover {
      color: #50768f;
      text-decoration: underline;
    }
    .table-head {
      @include table-head();
      li {
        width: calc(100% / 6);
      }
    }
    .table-body {
      @include table-body();
      li {
        width: 16.36%;
      }
    }
    .status-title {
      color: $color-theme-btn;
      cursor: pointer;
      font-weight: bold;
    }
    .status-title:hover {
      text-decoration: underline;
    }
  }
}
</style>
