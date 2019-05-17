报告人/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-13 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-03-22 17:32:03
 * @instruction: 产品 list 页面
 */
<template>
  <safety-user-content-outer class="product-wrap">
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
          :total="product.total"
          :current="product.pageNum"
          :page-size="product.pageSize"
          @on-change="pageChange"
        />
      </Footer>
    </Layout>
    <!-- 底部保存等按钮组 -->
    <template slot="btns">
      <Button
        type="info"
        size="large"
        :to="{name:'CASE_INFO_PRO_ADD'}"
      > 添加 </Button>
    </template>
  </safety-user-content-outer>

</template>
<script>
import { resCode } from "common/js/code.js";
import { apiGetProductList } from "api/case-info/product-api.js";
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
      product: {
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
                  (vm.product.pageNum - 1) * vm.product.pageSize +
                  params.index +
                  1;
                return _code;
              })(this)
            );
          }
        },
        {
          title: "产品名称",
          key: "preApprovedName"
        },
        {
          title: "品牌名称",
          key: "brandName"
        },
        {
          title: "原厂商",
          key: "originalCompany"
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
    // 分页
    pageChange(pageNum) {
      this.product.pageNum = pageNum;
      this.getProductList();
    },
    // 查询案例产品物质列表信息
    getProductList() {
      apiGetProductList(this.product).then(res => {
        if (res.status) {
          this.data = res.data.dataList;
          this.product.total = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
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
        name: "CASE_INFO_PRO_ADD",
        query: {
          productId: data.productId
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.getProductList();
    }
  },
  mounted() {
    this.getProductList();
  }
};
</script>
<style lang="scss">
@import "../../../../common/css/variable";
@import "../../../../common/css/mixin";
.product-wrap {
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
