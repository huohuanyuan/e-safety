/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-13 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-18 13:47:41
 * @instruction: 报告人 list
 */
<template>
  <safety-user-content-outer class="reporter-wrap">
    <Layout
      slot="content"
      :style="{'height': '100%'}"
    >
      <!-- 内容主体渲染区域 -->
      <Content>
        <Table
          :row-class-name="rowClassName"
          :columns="columns"
          :data="data"
          @on-row-click="rowClickFun"
        ></Table>
      </Content>
      <Footer>
        <Page
          class-name="e-page"
          :total="reporter.total"
          :current="reporter.pageNum"
          :page-size="reporter.pageSize"
          @on-change="pageChange"
        />
      </Footer>
    </Layout>
    <!-- 底部保存等按钮组 -->
    <template slot="btns">
      <Button
        type="info"
        size="large"
        :to="{name:'CASE_INFO_REP_ADD'}"
      > 新建 </Button>
    </template>
  </safety-user-content-outer>

</template>
<script>
import { resCode } from "common/js/code.js";
import { QUALIFICATION } from "common/js/constant.js";
import { apiGetReporterList } from "api/case-info/reporter-api.js";
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
      reporter: {
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
                  (vm.reporter.pageNum - 1) * vm.reporter.pageSize +
                  params.index +
                  1;
                return _code;
              })(this)
            );
          }
        },
        {
          title: "机构",
          key: "site"
        },
        {
          title: "研究者的名字",
          key: "reporterName"
        },
        {
          title: "资格",
          key: "qualification",
          render: (h, params) => {
            return h("div", [
              (function(vm) {
                return vm.qualificationFun(params.row.qualification);
              })(this)
            ]);
          }
        },
        {
          title: "删除",
          key: "deleted",
          width: 70,
          render: (h, params) => {
            return h(
              "div",
              (function(vm) {
                return params.row.deleted ? "是" : "否";
              })(this)
            );
          }
        }
      ],
      data: []
    };
  },
  methods: {
    // 查询案例报告人列表
    getReporterList() {
      apiGetReporterList(this.reporter).then(res => {
        if (res.status) {
          this.data = res.data.dataList;
          this.reporter.total = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 分页
    pageChange(pageNum) {
      this.reporter.pageNum = pageNum;
      this.getReporterList();
    },
    // 资格赋值显示文字
    qualificationFun(key) {
      return QUALIFICATION[key];
    },
    // 表格点击某一行
    rowClickFun(data) {
      this.$router.push({
        name: "CASE_INFO_REP_ADD",
        query: {
          reporterId: data.reporterId
        }
      });
    },
    // 添加删除class
    rowClassName(row, index) {
      if (row.deleted) {
        return "del-tr";
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getReporterList();
    }
  },
  mounted() {
    this.getReporterList();
  }
};
</script>
<style lang="scss">
@import "../../../../common/css/variable";
@import "../../../../common/css/mixin";
.reporter-wrap {
  .e-page {
    @include e-page();
  }
  .btns {
    z-index: 99 !important;
    a {
      @include bot-btn();
    }
  }
  .ivu-table {
    .ivu-table-cell {
      color: #000;
    }
  }
  .del-tr {
    text-decoration: line-through;
    color: red;
  }
  .ivu-layout-content {
    margin: 20px 0 0 20px;
  }
}
</style>

