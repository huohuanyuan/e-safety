/*
 * @Author: yongwenhao 
 * @Date: 2019-03-26 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-19 13:27:27
 * @instruction: 用户 list
 */
<template>
  <safety-user-content-outer class="user-list-wrap uesr-list">
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
          class='table-none-border'
          @on-row-click="getTableIndex"
        ></Table>
      </Content>
      <Footer>
        <Page
          class-name="e-page"
          :total="user.total"
          :current="user.pageNum"
          :page-size="user.pageSize"
          @on-change="pageChange"
        />
      </Footer>
    </Layout>
    <!-- 底部保存等按钮组 -->
    <template slot="btns">
      <Button
        type="info"
        size="large"
        @click="goUserAdd"
      > {{$t('system.newAdd')}}</Button>
    </template>
  </safety-user-content-outer>
</template>
<script>
// 删除按钮
const deleteIcon = (vm, h, params) => {
  return h("i", {
    class: ["iconshanjian", "iconfont"],
    style: {
      cursor: "pointer"
    },
    on: {
      click: e => {
        e.stopPropagation();
        vm.deleteFun(params.row, true);
      }
    }
  });
};
// 恢复按钮
const restoreIcon = (vm, h, params) => {
  return h("i", {
    class: ["iconhuifu", "iconfont"],
    style: {
      cursor: "pointer"
    },
    on: {
      click: e => {
        e.stopPropagation();
        vm.deleteFun(params.row, false);
      }
    }
  });
};
import {
  getUserList,
  getUserListFull,
  putUser
} from "@/api/system-user/user-api";
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
      columns: [
        {
          title: this.$t("system.id"),
          width: 70,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              (function(vm) {
                let _code =
                  (vm.user.pageNum - 1) * vm.user.pageSize + params.index + 1;
                return _code;
              })(this)
            );
          }
        },
        {
          title: this.$t("system.username"),
          key: "username"
        },
        {
          title: this.$t("system.phone"),
          key: "phone"
        },
        {
          title: this.$t("system.email"),
          key: "email"
        },
        {
          title: this.$t("system.role"),
          key: "roleName"
        },
        {
          title: this.$t("system.startDate"),
          key: "startDate"
        },
        {
          title: this.$t("system.endDate"),
          key: "endDate"
        },
        {
          title: " ",
          width: 60,
          render: (h, params) => {
            return h("div", [
              (function(vm) {
                if (params.row.deleted) {
                  return restoreIcon(vm, h, params);
                } else {
                  return deleteIcon(vm, h, params);
                }
              })(this)
            ]);
          }
        }
      ],
      data: [],
      user: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      isUserFull: false
    };
  },
  mounted() {
    // 获取用户列表
    this.getUserList();
  },
  methods: {
    // 分页
    pageChange(pageNum) {
      this.user.pageNum = pageNum;
      this.getUserList();
    },
    // 获取用户列表
    getUserList() {
      getUserList(this.user).then(res => {
        if (res.status) {
          this.data = res.data.dataList;
          this.user.total = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 用户_项目人员是否已满员
    getUserListFull() {
      getUserListFull().then(res => {
        if (res.status) {
          if (res.data) {
            this.$router.push({
              name: "SYS_SET_USER_ADD"
            });
          } else {
            this.$Message.error(this.$t("system.addUser"));
          }
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 获取点击的数据
    getTableIndex(data) {
      if (!data.deleted) {
        this.$router.push({
          name: "SYS_SET_USER_ADD",
          query: {
            userId: data.userId
          }
        });
      }
    },
    // 新建用户
    goUserAdd() {
      this.getUserListFull();
    },
    // 删除 / 恢复
    deleteFun(data, value) {
      data.deleted = value;
      if (!value) {
        getUserListFull().then(res => {
          if (res.status) {
            if (res.data) {
              this.putUser(data);
            } else {
              this.$Message.error(this.$t("system.addUser"));
              data.deleted = !value;
            }
          } else {
            this.$Message.error(resCode(this, res.code));
          }
        });
      } else {
        this.putUser(data);
      }
    },
    // 删除 / 恢复的 api
    putUser(data) {
      putUser(data).then(res => {
        if (res.status) {
          this.getUserList();
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    //tr 添加class
    rowClassName(row, index) {
      if (row.deleted) {
        return "del-tr";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../common/css/variable";
@import "../../../../common/css/mixin";

.user-list-wrap {
  .ivu-table {
    .ivu-table-cell {
      color: #000;
    }
  }
  .del-tr {
    td {
      text-decoration: line-through;
      color: red;
    }
    td:last-child {
      text-decoration: blink;
    }
  }
}
</style>
<style lang="scss" >
@import "../../../../common/css/mixin";
.e-page {
  @include e-page();
}
.user-list-wrap {
  .table-none-border {
    @include e-table();
  }
  .btns {
    z-index: 99 !important;
    button {
      @include bot-btn();
    }
  }
}
</style>

