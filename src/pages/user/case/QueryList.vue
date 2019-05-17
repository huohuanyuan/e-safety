/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-13 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-22 15:36:18
 * @instruction: 质疑列表
 */
<template>
  <div class="quertion-wrap">
    <safety-user-content-outer>
      <Layout
        slot="content"
        :style="{'height': '100%'}"
      >
        <!-- 内容主体渲染区域 -->
        <Content>
          <Table
            class="e-table"
            :columns="columns"
            :data="queryList"
          ></Table>
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
      </Layout>
    </safety-user-content-outer>
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
import SafetyQueryModal from "components/safety-query-modal"; // 质疑模态框
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域

import moment from "moment";
import { resCode } from "common/js/code.js";
import { QUERY_CODE } from "common/js/constant.js";
import { caseQueryRouter } from "common/js/unit.js";
import { apiGetQuery } from "api/query/query-api.js";
export default {
  components: {
    SafetyUserContentOuter,
    SafetyQueryModal
  },
  data() {
    return {
      modal: false,
      queryId: "",
      caseNo: "",
      queryType: 3,
      query: {
        pageNum: 1,
        pageSize: 10,
        total: 0
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
      queryList: []
    };
  },
  methods: {
    // 查询质疑列表
    getQuery() {
      apiGetQuery(this.query).then(res => {
        if (res.status) {
          this.queryList = res.data.dataList;
          this.query.total = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 分页
    pageChange(pageNum) {
      this.query.pageNum = pageNum;
      this.getQuery();
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
    // 关闭质疑模态框
    cancelModalFun() {
      this.modal = false;
      this.getQuery();
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
  watch: {
    $route(to, from) {
      this.getQuery();
    }
  },
  mounted() {
    this.getQuery();
  }
};
</script>
<style lang="scss">
@import "../../../common/css/variable";
@import "../../../common/css/mixin";
.quertion-wrap {
  height: 100%;
  .e-page {
    @include e-page();
  }
  .e-table {
    @include e-table();
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
</style>

