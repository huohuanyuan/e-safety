/*
 * @Author: yongwenhao
 * @Date: 2019-04-01 09:08:22 
 * @LastEditors: yongwenhao
 * @LastEditTime: 2019-04-08 11:36:27
 * @instruction: 角色
*/
<template>
  <safety-user-content-outer  class='role-list' >
    <Layout
      slot="content"
      :style="{'height': '100%'}"
    >
      <Content>
        <Table
          :columns="columns"
          :data="data"
          :row-class-name="rowClassName"
          class='table-none-border'
        ></Table>
        <Modal
          v-model="isModal"
          title="提醒："
          @on-ok="okModal"
          @on-cancel="cancelModal"
        >
          <span>页面数据未保存，是否保存</span>
        </Modal>
      </Content>
      <!-- 分页按钮组 -->
      <Footer>
        <Page
          class-name="e-page"
          :total="role.total"
          :current="role.pageNum"
          :page-size="role.pageSize"
          @on-change="pageChange"
        />
      </Footer>
    </Layout>
    <!-- 底部保存等按钮组 -->
    <template slot="btns">
      <Button
        type="info"
        size="large"
        @click="setDataList"
      >{{$t('system.save')}}</Button>
    </template>
  </safety-user-content-outer>
</template>
<script>
//  角色
const roleInput = (vm, h, param) => {
  if (param.row.isInputName && param.row.edit) {
    return h("Input", {
      props: {
        type: "text",
        maxlength: 32,
        value: param.row.roleName
      },
      on: {
        "on-change": event => {
          vm.data[param.index] = param.row;
          vm.data[param.index].roleName = event.target.value;
          vm.isData = true; // 数据发送改变
        },
        "on-blur": event => {
          vm.$set(param.row, "isInputName", false);
        }
      }
    });
  } else {
    return h(
      "div",
      {
        style: {
          width: "100%",
          height: "20px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden"
        },
        on: {
          click: () => {
            vm.$set(param.row, "isInputName", true);
          }
        }
      },
      param.row.roleName
    );
  }
};
// 描述
const descInput = (vm, h, param) => {
  if (param.row.isInputDesc && param.row.edit) {
    return h("Input", {
      props: {
        type: "textarea",
        maxlength: 128,
        value: param.row.description
      },
      on: {
        "on-change"(event) {
          vm.data[param.index] = param.row;
          vm.data[param.index].description = event.target.value;
          vm.isData = true; // 数据发送改变
        },
        "on-blur": event => {
          vm.$set(param.row, "isInputDesc", false);
        }
      }
    });
  } else {
    return h(
      "div",
      {
        style: {
          width: "100%",
          height: "20px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden"
        },
        on: {
          click: () => {
            vm.$set(param.row, "isInputDesc", true);
          }
        }
      },
      param.row.description
    );
  }
};
// 删除按钮
const deleteImg = (vm, h, params) => {
  return h("i", {
    class: ["iconshanjian", "iconfont"],
    style: {
      cursor: "pointer"
    },
    on: {
      click: e => {
        e.stopPropagation();
        vm.delBtn(params.index, true);
      }
    }
  });
};
// 恢复按钮
const restoreImg = (vm, h, params) => {
  return h("i", {
    class: ["iconhuifu", "iconfont"],
    style: {
      cursor: "pointer"
    },
    on: {
      click: e => {
        e.stopPropagation();
        vm.resBtn(params.index, false);
      }
    }
  });
};
import {
  getRoleList,
  putRoleList,
  getRoleCheck
} from "@/api/system-user/role-api";
import qs from "qs";
import tableRow from "./RoleTable.vue";
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域

export default {
  components: {
    tableRow,
    SafetyUserContentOuter
  },
  data() {
    return {
      columns: [
        {
          title: this.$t("system.id"),
          type: "id",
          width: 100,
          render: (h, params) => {
            return h(
              "div",
              (function(vm) {
                let _code =
                  (vm.role.pageNum - 1) * vm.role.pageSize + params.index + 1;
                return _code;
              })(this)
            );
          }
        },
        {
          title: this.$t("system.role"),
          type: "roleName",
          width: 450,
          render: (h, params) => {
            return h("div", [
              (function(vm) {
                if (params.row.deleted) {
                  return params.row.roleName;
                } else {
                  return roleInput(vm, h, params);
                }
              })(this)
            ]);
          }
        },
        {
          title: this.$t("system.des"),
          type: "description",
          render: (h, params) => {
            return h("div", [
              (function(vm) {
                if (params.row.deleted) {
                  return params.row.description;
                } else {
                  return descInput(vm, h, params);
                }
              })(this)
            ]);
          }
        },
        {
          title: " ",
          type: "deleted",
          className: "set_title",
          width: 70,
          renderHeader: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "md-add"
                },
                style: {
                  backgroundColor: "#40C785",
                  padding: " 5px 15px",
                  fontSize: "20px",
                  color: "white",
                  marginLeft: " -20px"
                },
                on: {
                  click: e => {
                    let obj = {
                      roleName: " ",
                      description: " ",
                      roleId: null,
                      deleted: false,
                      edit: true,
                      isInputName: true,
                      isInputDesc: true
                    };
                    this.data.unshift(obj);
                    this.isData = true;
                  }
                }
              })
            ]);
          },
          render: (h, params) => {
            return h("div", [
              (function(vm) {
                if (params.row.edit) {
                  if (params.row.deleted) {
                    return restoreImg(vm, h, params);
                  } else {
                    return deleteImg(vm, h, params);
                  }
                }
              })(this)
            ]);
          }
        }
      ],
      data: [],
      role: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      goPageNum: 1, //
      isData: false, // 页面数据发生改变
      isModal: false // 离开当前页面提醒框
    };
  },
  mounted() {
    // 获取列表
    this.getRoleDateList();
  },
  methods: {
    // 分页
    pageChange(pageNum) {
      this.goPageNum = pageNum;
      if (this.role.pageNum != pageNum && this.isData) {
        // 数据发送改变没有保存点击分页
        this.isModal = true;
      } else {
        this.role.pageNum = pageNum;
        this.getRoleDateList();
      }
    },
    getRoleDateList() {
      getRoleList(this.role).then(res => {
        if (res.status) {
          res.data.dataList.map(item => {
            item["isInputName"] = false;
            item["isInputDesc"] = false;
          });
          this.data = res.data.dataList;
          this.role.total = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 恢复
    resBtn(index) {
      this.data[index].deleted = false;
      this.isData = true; // 数据发送改变
    },
    // 删除
    delBtn(index) {
      if (this.data[index].roleId) {
        // 已有的先判断是否使用
        getRoleCheck(this.data[index].roleId).then(res => {
          if (res.status) {
            if (res.data == 0) {
              // 未使用
              this.data[index].deleted = true;
              this.isData = true; // 数据发送改变
            } else {
              this.$Message.error(this.$t("system.roleDelErr"));
            }
          } else {
            this.$Message.error(resCode(this, res.code));
          }
        });
      } else {
        // 新增的直接删除
        this.data.splice(index, 1);
      }
    },
    // 保存
    setDataList() {
      let result = this.data.every(item => {
        if (item.roleName.trim() == "") {
          return false;
        } else {
          return true;
        }
      });
      if (result) {
        putRoleList(this.data).then(res => {
          if (res.status) {
            this.$Message.success(this.$t("system.okCont"));
            this.isData = false;
            this.getRoleDateList();
          } else {
            this.$Message.error(resCode(this, res.code));
          }
        });
      } else {
        this.$Message.error(this.$t("system.noRoleCont"));
      }
    },
    //tr 添加class
    rowClassName(row, index) {
      if (row.deleted) {
        return "del-tr";
      }
    },
    // 离开页面弹框 确认(保存)
    okModal() {
      this.setDataList();
      this.role.pageNum = this.goPageNum;
      this.getRoleDateList();
    },
    // 离开页面弹框 取消()
    cancelModal() {
      this.role.pageNum = this.goPageNum;
      this.getRoleDateList();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../common/css/variable";
@import "../../../../common/css/mixin";
.header {
  display: flex;
  justify-content: space-between;
}
</style>
<style lang="scss" >
@import "../../../../common/css/mixin";
.e-page {
  @include e-page();
}
.role-list{
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
</style>
