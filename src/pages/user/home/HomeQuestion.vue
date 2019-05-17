<!--
 * @Author: yongwenhao
 * @LastEditors: yongwenhao
 * @instruction: 质疑任务列表
 * @Date: 2019-04-10 09:26:17
 * @LastEditTime: 2019-04-11 13:57:45
-->

<template>
  <div class="home-question">
    <p class="table-top-but">
      <span>
        质疑任务
      </span>
      <p
        class="go-back case-code-title"
        @click='goBack'
      >返回</p>
      <Content>
        <Table
          class="e-table"
          :columns="columns"
          :data="questionData"
        >
        </Table>
      </Content>
      <Footer>
        <Page
          class-name="e-page"
          :total="query.total"
          :current="query.pageNum"
          :page-size="query.pageSize"
          @on-change="pageChange"
        />
      </Footer>
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
import { resCode } from "common/js/code.js";
import { QUERY_CODE } from "common/js/constant.js";
import { caseQueryRouter } from "common/js/unit.js";
import { getQueryTask } from "api/home-user/home-api.js";

import SafetyQueryModal from "components/safety-query-modal"; // 质疑模态框

export default {
  components: {
    SafetyQueryModal
  },
  data() {
    return {
      modal: false,
      queryId: "",
      caseNo: "",
      queryType: 3,
      query: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
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
                  (vm.query.pageNum - 1) * vm.query.pageSize + params.index + 1;
                return _code;
              })(this)
            );
          }
        },
        {
          title: "质疑编号",
          key: "queryCode",
          render: (h, params) => {
            return h(
              "div",
              {
                class: "status-title",
                on: {
                  click: () => {
                    this.getQueryCon(params.row);
                  }
                }
              },
              (function(vm) {
                return params.row.queryCode;
              })(this)
            );
          }
        },
        {
          title: "质疑状态",
          key: "queryStatus",
          render: (h, params) => {
            return h(
              "div",
              (function(vm) {
                return QUERY_CODE[params.row.queryStatus];
              })(this)
            );
          }
        },
        {
          title: "质疑案例",
          key: "caseNo",
          render: (h, params) => {
            return h(
              "div",
              {
                class: "status-title",
                on: {
                  click: () => {
                    this.clickCaseFun(params.row);
                  }
                }
              },
              (function(vm) {
                return params.row.caseNo;
              })(this)
            );
          }
        },
        {
          title: "发起人",
          key: "queryAuthorName"
        },
        {
          title: "当前所有人",
          key: "queryOwnerName"
        },
        {
          title: "创建时间",
          key: "gmtCreate",
          width: 150,
          render: (h, params) => {
            return h(
              "div",
              (function(vm) {
                return moment(params.row.gmtCreate).format(
                  "YYYY MM DD hh:mm:ss"
                );
              })(this)
            );
          }
        },
        {
          title: "更新时间",
          key: "gmtModified",
          width: 150,
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
      ],
      questionData: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1); //返回上一层
    },
    pageChange(pageNum) {
      this.query.pageNum = pageNum;
      this.getQueryTask();
    },
    getQueryTask() {
      getQueryTask(this.query).then(res => {
        if (res.status) {
          this.questionData = res.data.dataList;
          this.query.total = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
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
    this.getQueryTask();
  }
};
</script>
<style lang="scss">
@import "@/common/css/variable.scss";
@import "@/common/css/mixin.scss";
.e-page {
  @include e-page();
}
.home-question {
  height: 100%;
  .ivu-layout-content {
    height: calc(100% - 80px);
  }
  .e-table {
    @include e-table();
  }
  .table-top-but {
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
  .status-title {
    color: $color-theme-btn;
    cursor: pointer;
    font-weight: bold;
  }
  .status-title:hover {
    text-decoration: underline;
  }
  .go-back {
    float: right;
    color: #595959;
    margin: 15px 15px 0 0;
    font-size: 15px;
    cursor: pointer;
  }
}
</style>


