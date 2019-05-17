/*
 * @Author: chengshanshan 
 * @Date: 2019-03-13 09:08:22 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-04-22 17:25:02
 * @instruction:案例中心案例list
 */
<template>
  <safety-user-content-outer>
    <Layout
      slot="content"
      :style="{'height': '100%'}"
    >
      <!-- 内容主体渲染区域 -->
      <Content>
        <Table
          :columns="columns"
          :data="listData"
          @on-row-click="caseClick"
          class="e-table"
        ></Table>
      </Content>
      <!-- 分页按钮组 -->
      <Footer>
        <Page
          :total="pageTotal"
          :page-size="listParams.pageSize"
          :current="listParams.pageNum"
          @on-change="pageChange"
          class-name="e-page"
        />
      </Footer>
    </Layout>
    <div slot="btns">
      <button
        class="new-btn"
        @click="newCase"
      >添加</button>
    </div>
  </safety-user-content-outer>
</template>
<script>
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
import { apiGetCaseList } from "api/case/case-api.js";
import { resCode } from "common/js/code.js";
import { PROCESS_CODE } from "common/js/constant.js";
export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
      listParams: {
        pageNum: 1,
        pageSize: 10
      },
      pageTotal: 0,
      columns: [
        {
          type: "index",
          title: "序号",
          width: 80
        },
        {
          title: "案例编号",
          key: "caseNo"
        },
        {
          title: "接收日期",
          key: "receiptDate"
        },
        {
          title: "产品名称",
          key: "drugName"
        },
        {
          title: "倒计时",
          key: "dealline",
          render: (h,params) => {
            if(params.row.dealline){
              return h("div",{},`${params.row.dealline}天`)
            }else{
               return h("div",{},"--")
            }
          }
        },
        {
          title: "受试者ID",
          key: "subjectId"
        },
        {
          title: "AE",
          key: "aeName"
        },
        {
          title: "SAE",
          key: "sae",
          render: (h, params) => {
            return h("div", {}, params.row.sae ? "是" : "否");
          }
        },
        {
          title: "案例类型",
          key: "type", //true：首次 false:随访，
          render: (h, params) => {
            return h("div", {}, params.row.type==0 ? "首次" : "随访");
          }
        },
        {
          title: "申报截止日期",
          key: "dealline"
        },
        {
          title: "案例状态",
          key: "status",
          render: (h, params) => {
            return h("div", {}, PROCESS_CODE[params.row.status]);
          }
        },
        {
          title: "是否删除",
          key: "deleted",
          render: (h, params) => {
            return h("div", {}, params.row.type ? "是" : "否");
          }
        }
      ],
      listData: []
    };
  },
  methods: {
    init() {
      this.getCaseList();
    },
    getCaseList() {
      apiGetCaseList(this.listParams).then(res => {
        if (res.status) {
          this.listData = res.data.dataList;
          this.pageTotal = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    pageChange(num) {
      this.listParams.pageNum = num;
      this.getCaseList();
    },
    caseClick(row, index) {
      localStorage.setItem("caseNo", row.caseNo);
      this.$router.push({
        name: "CASE_DM",
        query: {
          caseId: row.caseId,
          pageId: "DM",      
        }
      });
    },
    newCase() {
      this.$router.push({
        name: "CASE_DM",
        query: {
          caseId: null, //caseId为-1时是新建
          pageId: "DM"
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/variable";
@import "../../../common/css/mixin";
.new-btn {
  @include bot-btn();
}
</style>
<style lang="scss" >
@import "../../../common/css/mixin";
.e-page {
  @include e-page();
}
.e-table {
  @include e-table();
}
</style>

