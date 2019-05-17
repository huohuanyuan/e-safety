报告人/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-13 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-03-22 17:32:03
 * @instruction: 研究 新增 页面
 */
<template>
  <safety-user-content-outer class="study-list-wrap">
    <Layout
      slot="content"
      :style="{'height': '100%'}"
    >
      <!-- 内容主体渲染区域 -->
      <Content>
        <Table
          @on-row-click="rowClickFun"
          :row-class-name="rowClassName"
          :columns="columns"
          :data="data"
        ></Table>
      </Content>
      <!-- 分页按钮组 -->
      <Footer>
        <Page
          class-name="e-page"
          :total="study.total"
          :current="study.pageNum"
          :page-size="study.pageSize"
          @on-change="pageChange"
        />
      </Footer>
    </Layout>
    <!-- 底部保存等按钮组 -->
    <template slot="btns">
      <Button
        type="info"
        size="large"
        :to="{name:'CASE_INFO_STU_ADD'}"
      > 添加 </Button>
    </template>

  </safety-user-content-outer>

</template>
<script>
import { resCode } from "common/js/code.js";
import { STUDYTYPE } from "common/js/constant.js";
import { apiGetStudyList } from "api/case-info/study-api.js";
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
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
                  (vm.study.pageNum - 1) * vm.study.pageSize + params.index + 1;
                return _code;
              })(this)
            );
          }
        },
        {
          title: "申办方研究编号",
          key: "sponsorStudyCode"
        },
        {
          title: "研究名称",
          key: "studyName"
        },
        {
          title: "研究类型",
          key: "studyType",
          render: (h, params) => {
            return h("div", [
              (function(vm) {
                return vm.studyTypeFun(params.row.studyType);
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
      data: [],
      study: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  methods: {
    // 分页
    pageChange(pageNum) {
      this.study.pageNum = pageNum;
      this.getStudyList();
    },
    // 查询研究信息
    getStudyList() {
      apiGetStudyList(this.study).then(res => {
        if (res.status) {
          this.data = res.data.dataList;
          this.study.total = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 资格赋值显示文字
    studyTypeFun(key) {
      return STUDYTYPE[key];
    },
    // 添加删除class
    rowClassName(row, index) {
      if (row.deleted) {
        return "del-tr";
      }
    },
    // 表格点击某一行
    rowClickFun(data) {
      this.$router.push({
        name: "CASE_INFO_STU_ADD",
        query: {
          studyId: data.studyId
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.getStudyList();
    }
  },
  mounted() {
    this.getStudyList();
  }
};
</script>
<style lang="scss">
@import "../../../../common/css/variable";
@import "../../../../common/css/mixin";
.study-list-wrap {
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
