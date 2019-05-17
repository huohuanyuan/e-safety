/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-13 11:10:28 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-17 17:28:24
 * header 部分
 */
<template>
  <div class="header-outer">
    <div class="h-left">
      药物警戒系统
    </div>
    <div class="h-right">
      <Dropdown
        trigger="click"
        class="drop-down"
        @on-click="handleClick"
        placement="bottom-end"
      >
        <span class="span-name"> {{ name }}
          <Icon type="md-arrow-dropdown" /> </span>
        <DropdownMenu slot="list">
          <DropdownItem
            name="processSelect"
            v-if='isPrcoessSelect'
          > 选择项目 </DropdownItem>
          <DropdownItem name="loginout"> 退出登录 </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isPrcoessSelect: false
    };
  },
  computed: {
    name() {
      return localStorage.getItem("name");
    },
    roleId() {
      return localStorage.getItem("roleId");
    }
  },
  methods: {
    handleClick(name) {
      if (name === "loginout") {
        this.$router.push({
          name: "LOGIN"
        });
        localStorage.removeItem("token");
      } else {
        this.$router.push({
          name: "PROJECT_SELECT"
        });
        localStorage.removeItem("roleId");
      }
    }
  },
  mounted() {
    if (this.roleId) {
      this.isPrcoessSelect = true;
    } else {
      this.isPrcoessSelect = false;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/common/css/variable.scss";
.header-outer {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  .h-left {
    padding-left: 30px;
    background: url("../assets/logo.png") 0 center no-repeat;
    background-size: 25px 25px;
  }
}
</style>
<style lang="scss">
.header-outer {
  .h-right {
    .drop-down {
      .ivu-select-dropdown {
        top: 35px !important;
        .ivu-dropdown-item {
          padding: 15px 16px !important;
        }
      }
    }
  }
}
</style>

