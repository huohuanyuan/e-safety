<!--  -->
<template>
  <div class='role-table'>
    <Content>
      <Table
        :columns="columns"
        :data="data"
        class='table-none-border'
      ></Table>
    </Content>
    <!-- 分页按钮组 -->
    <Footer>
      <Page
        :total="pageTotal"
        :current="pageNum"
        :page-size="pageSize"
        class-name="e-page"
        @on-change='getChange'
        @on-page-size-change='pageChange'
      />
    </Footer>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    row1: Array
  },
  data() {
    return {
      pageTotal: 10, // 总个数
      pageNum: 1, // 当前页
      pageSize: 5, // 每页显示的个数
      columns: [
        {
          title: this.$t("system.id"),
          key: "id"
        },
        {
          title: this.$t("system.time"),
          key: "time"
        },
        {
          title: this.$t("system.user"),
          key: "user"
        },
        {
          title: this.$t("system.protect"),
          key: "protect"
        },
        {
          title: this.$t("system.bidders"),
          key: "content"
        },
        {
          title: this.$t("system.roleName"),
          key: "protectId"
        }
      ],
      data: []
    };
  },
  mounted() {
    this.getFatherData();
  },
  methods: {
    getFatherData() {
      if (this.row1.length > 0) {
        this.data = this.row1;
        this.pageTotal = this.row1.length;
      } else {
        this.data = [];
        this.pageTotal = 0;
      }
    }
  }
};
</script>
<style lang='scss'>
//@import url(); 引入公共css类
@import "../../../../common/css/mixin";
.e-page {
  @include e-page();
}
.role-table{
.table-none-border{
  @include e-table()
}
}

</style>