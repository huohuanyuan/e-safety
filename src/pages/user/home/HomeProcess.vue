<!--
 * @Author: yongwenhao
 * @LastEditors: yongwenhao
 * @instruction: 流程任务列表
 * @Date: 2019-04-10 09:26:17
 * @LastEditTime: 2019-04-19 17:01:59
-->

<template>
  <div class="home-process">
    <p class="table-top-but">
      <span>
        流程任务
      </span>
    </p>
    <span
      @click='goBack'
      class='go-back'
    >返回</span>
    <Content>
      <Table
        class='table-none-border'
        :columns="columns"
        :data="data"
        @on-row-click="getprocessCon"
      >
      </Table>
    </Content>
    <Footer>
      <Page
        class-name="e-page"
        :total="process.total"
        :current="process.pageNum"
        :page-size="process.pageSize"
        @on-change="pageChange"
      />
    </Footer>
  </div>
</template>

<script>
import qs from "qs";
import moment from "moment";
import { resCode } from "common/js/code.js"; // 状态码
import { PROCESS_CODE } from "common/js/constant.js"; // 项目流程 code
import {
  getProcessUser // 根据用户ID获取用户的案例待办流程任务信息
} from "api/home-user/home-api.js";

export default {
  data() {
    return {
      process: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      columns: [
        {
          title: "案例编号",
          key: "caseNo",
          width: 150,
          align: "center"
        },
        {
          title: "收到报告日期",
          key: "receiptDate",
          width: 180,
          align: "center",
          render: (h, params) => {
            if (params.row.receiptDate) {
              return h(
                "div",
                (function(vm) {
                  return moment(params.row.receiptDate).format(
                    "YYYY MM DD hh:mm:ss"
                  );
                })(this)
              );
            } else {
              return h("div", {}, `--`);
            }
          }
        },
        {
          title: "药品名称",
          key: "drugName",
          width: 150,
          align: "center"
        },
        {
          title: "不良反应",
          key: "aeName",
          minWidth: 150,
          align: "center"
        },
        {
          title: "严重性",
          key: "sae",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.sae == null) {
              return h("span", {}, `  `);
            } else if (params.row.sae) {
              return h("span", {}, `严重`);
            } else {
              return h("span", {}, `不严重`);
            }
          }
        },
        {
          title: "创建人",
          key: "subjectId",
          width: 100,
          align: "center"
        },
        {
          title: "任务状态",
          key: "status",
          sortable: true,
          width: 130,
          align: "center",
          render: (h, params) => {
            return h("div", {}, PROCESS_CODE[params.row.status]);
          }
        },
        {
          title: "倒计时",
          key: "dealline",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (!params.row.dealline) {
              return h("span", {}, `--`);
            } else if (params.row.dealline > 2) {
              return h("span", {}, `${params.row.dealline}天`);
            } else {
              return h(
                "span",
                {
                  style: {
                    color: "#ed4014"
                  }
                },
                `${params.row.dealline}天`
              );
            }
          }
        }
      ],
      data: []
    };
  },
  methods: {
    getprocessCon(row, index) {
      // 查看流程详情
      this.$router.push({
        name: "CASE_DM",
        query: {
          caseId: row.caseId,
          pageId: "DM"
        }
      });
    },
    goBack() {
      //返回上一层
      this.$router.go(-1);
    },
    pageChange(pageNum) {
      this.process.pageNum = pageNum;
      this.getProcessDateList();
    },
    getProcessDateList() {
      getProcessUser(this.process).then(res => {
        if (res.status) {
          this.data = res.data.dataList;
          this.process.total = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    }
  },
  mounted() {
    this.getProcessDateList();
  }
};
</script>


<style lang="scss">
@import "@/common/css/variable.scss";
@import "@/common/css/mixin.scss";
.e-page {
  @include e-page();
}

.home-process {
  height: 100%;
  .ivu-layout-content {
    height: calc(100% - 80px);
  }
  .table-none-border {
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
  .go-back {
    float: right;
    color: #595959;
    margin: 18px 15px 0 0;
    font-size: 15px;
  }
  .go-back:hover {
    text-decoration: underline;
    color: $color-theme-btn;
    cursor: pointer;
  }
  .go-back:hover {
    color: #50768f;
    text-decoration: underline;
  }
}
</style>


