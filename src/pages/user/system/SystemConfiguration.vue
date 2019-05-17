/*
 * @Author: yongwenhao
 * @Date: 2019-03-27 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-19 13:30:20
 * @instruction: 角色配置
 */
<template>
 
    <safety-user-content-outer class='system-config'>
    <Layout
      slot="content"
      :style="{'height': '100%'}"
    >
      <!-- 内容主体渲染区域 -->
      <Content>
        <Table
          :columns="priTableCol"
          :data="priTableData"
          class='table-none-border'
        ></Table>
      </Content>
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
import {
  putRoleListPrivilegeRelationship, //保存修改
  getRoleListPrivilegeRoleRelationship ,// content
  getRoleAllocationList// 用户角色列表
} from "@/api/system-user/configuration-api";
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
import { resCode } from "common/js/code.js"; // 状态码
import qs from "qs";
export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
      headCol: [], // 表格头
      priTableData: [], // 主体
      dataList: new Map() // 保存提交的数据
    };
  },
  created() {
    this.getDataList(); // 请求数据
  },
  computed: {
    priTableCol: function(params) {
      const priRaido = (vm, h, params) => {
        return h("Checkbox", {
          props: {
            size: "large",
            value: (function() {
              if (params.row.roleIds.includes(params.column.key)) {
                return true;
              } else {
                return false;
              }
            })(params)
          },
          on: {
            "on-change": value => {
              let _rolePri = `${params.column.menuId}-${params.row.menuId}`;
              if (this.dataList.has(_rolePri)) {
                this.dataList.delete(_rolePri);
              } else {
                this.dataList.set(_rolePri, value ? 1 : 0);
              }
            }
          }
        });
      };
      //绘制角色list
      let roleArr = [];
      for (let [index, elem] of this.headCol.entries()) {
        roleArr.push({
          key: elem.roleId,
          menuId: elem.roleId,
          align: "center",
          minWidth:130,
          renderHeader: (h, params) => {
            //系统角色
            return h("span", {}, elem.roleName);
          },
          render: (h, params) => {
            return h("span", [priRaido(this, h, params)]);
          }
        });
      }
      return [
        {
          key: "mune",
          title: this.$t("system.menu"),
          width: 100
        },
        {
          key: "type",
          title: this.$t("system.typeT"),
          width: 100
        },
        {
          key: "permissions",
          title: this.$t("system.permissions"),
          width: 100
        },
        ...roleArr
      ];
    }
  },
  methods: {
    getDataList() {
      // 获取用户角色列表
      getRoleAllocationList().then(res => {
        if (res.status) {
          this.headCol = res.data;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
      // 检索所有的权限菜单  content
      getRoleListPrivilegeRoleRelationship().then(res => {
        if (res.status) {
          let menuPageNum = 0; // 同样菜单名称的只显示一个
          res.data.map((item, index) => {
            // menuPage 菜单 mune
            let menuPageRegExpA = new RegExp("SYS_CONF");
            if (menuPageRegExpA.test(item.menuPage)) {
              if (menuPageNum > 0) {
                item["mune"] = " ";
              } else {
                item["mune"] = this.$t("system.systemConfiguration");
              }
              ++menuPageNum;
            }
            // menuType 类型 type
            let menuTypeRegExpA = new RegExp("PRIV");
            let menuTypeRegExpB = new RegExp("ROLE");
            if (menuTypeRegExpA.test(item.menuType)) {
              item["type"] = this.$t("system.accessConfiguration");
            } else if (menuTypeRegExpB.test(item.menuType)) {
              item["type"] = this.$t("system.role");
            } else {
              item["type"] = this.$t("system.user");
            }
            // menuId 权限 permissions
            let menuIdRegExpA = new RegExp("EDIT");
            if (menuIdRegExpA.test(item.menuId)) {
              item["permissions"] = this.$t("system.editor");
            } else {
              item["permissions"] = this.$t("system.view");
            }
          });
          this.priTableData = res.data;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 保存
    setDataList() {
      // 便利循环提交的数据
      let _arr = [...this.dataList];
      if (_arr.length > 0) {
        for (let [index, elem] of _arr.entries()) {
          _arr[index] = elem.join("-");
        }
        putRoleListPrivilegeRelationship(
          qs.stringify({ relationships: _arr.join(",") })
        ).then(res => {
          if (res.status) {
            this.$Message.success(this.$t("system.okCont"));
          } else {
            this.$Message.error(resCode(this, res.code));
          }
          this.dataList = new Map();
          this.getDataList();
        });
      }
    }
  }
};
</script>
<style lang='scss'>
@import "../../../common/css/mixin";
.system-config{
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
