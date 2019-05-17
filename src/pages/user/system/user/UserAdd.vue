/*
 * @Author:yongwenhao
 * @Date: 2019-03-25 09:08:22 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-07 20:47:32
 * @instruction: 添加用户
 */
<template>
  <safety-user-content-outer class="reporter-add-wrap user-add">
    <Layout
      slot="content"
      :style="{'height': '100%'}"
    >
      <!-- 内容主体渲染区域 -->
      <Content>
        <Form
          :model="dataInfo"
          :rules="ruleValidate"
          label-position="left"
          :label-width="120"
          ref="dataInfo"
          class='from_group'
        >
          <!-- label="用户名" -->
          <FormItem
            :label="$t('system.username')"
            prop="username"
          >
            <!-- 编辑 -->
            <Input
              v-model="dataInfo.username"
              disabled
              v-if="!isAdd"
            > </Input>
            <!-- 新建 -->
            <Input
              v-model="dataInfo.username"
              v-else
              :maxlength="32"
            > </Input>
            <i class="iconfont iconguiji"></i>
          </FormItem>
          <!-- label="手机号" -->
          <FormItem :label="$t('system.phone')">
            <Input
              v-model="dataInfo.phone"
              :maxlength="32"
            ></Input>
            <i class="iconfont iconguiji"></i>
          </FormItem>
          <!-- label="邮箱" -->
          <FormItem
            :label="$t('system.email')"
            prop="email"
            class='aaa'
          >
            <!-- 编辑 -->
            <Input
              v-model="dataInfo.email"
              disabled
              v-if="!isAdd"
            ></Input>
            <!-- 新建 -->
            <Input
              v-model="dataInfo.email"
              v-else
              :maxlength="32"
            ></Input>
            <i class="iconfont iconguiji"></i>
          </FormItem>
          <!-- label="角色" -->
          <FormItem
            :label="$t('system.role')"
            prop="roleId"
          >
            <!-- placeholder="请选择角色" -->
            <Select
              v-model="dataInfo.roleId"
              :label="dataInfo.roleName"
              class="role"
            >
              <Option
                :value="item.roleId"
                v-for="(item, index) in roleList"
                v-bind:key="index"
              >{{item.roleName}}</Option>
            </Select> <i class="iconfont iconguiji"></i>
          </FormItem>
          <!-- label="开始时间" -->
          <FormItem :label="$t('system.startDate')">
            <DatePicker
              type="date"
              v-model="dataInfo.startDate"
              class="time"
              @on-change='startDate'
            ></DatePicker> <i class="iconfont iconguiji"></i>
          </FormItem>
          <!-- label="结束时间" -->
          <FormItem :label="$t('system.endDate')">
            <DatePicker
              type="date"
              v-model="dataInfo.endDate"
              class="time"
              @on-change='endDate'
            ></DatePicker> <i class="iconfont iconguiji"></i>
          </FormItem>
          <!-- label="描述" -->
          <FormItem :label="$t('system.description')">
            <Input
              type="textarea"
              v-model="dataInfo.description"
              :maxlength="500"
            ></Input> <i class="iconfont iconguiji"></i>
          </FormItem>
          </FormItem>
        </Form>
      </Content>
    </Layout>
    <!-- 底部保存等按钮组 -->
    <template slot="btns">
      <!-- 填正确的按钮 -->
      <Button
        type="info"
        size="large"
        @click="handleSubmit('dataInfo')"
        v-if='!this.isTime'
      >{{$t('system.save')}}</Button>
      <!-- 时间不对的按钮 -->
      <Button
        type="error"
        size="large"
        disabled
        v-if='this.isTime'
      >{{$t('system.save')}}</Button>
    </template>
  </safety-user-content-outer>
</template>
<script>
import moment from "moment";
import { resCode } from "common/js/code.js";
import {
  putUser,
  postUser,
  getUserId,
  getAvailableList
} from "@/api/system-user/user-api";
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
export default {
  components: {
    SafetyUserContentOuter
  },
  name: "",
  data() {
    return {
      dataInfo: {},
      ruleValidate: {
        username: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          },
          {
            type: "string",
            max: 32,
            message: " ",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          },
          {
            type: "email",
            max: 32,
            message: "请填写正确邮箱地址",
            trigger: "blur"
          }
        ],
        roleId: [
          {
            required: true,
            message: " ",
            trigger: "change"
          }
        ]
      },
      isAdd: true, // false 编辑 true 新建
      roleList: [], // 角色列表
      isTime: false
    };
  },
  created() {
    // 请求数据
    this.getAvailableList();
  },
  methods: {
    // 请求数据
    getAvailableList() {
      let userId = this.$route.query.userId;
      if (userId) {
        // 请求查询接口 并设置为修改模式
        getUserId(userId).then(res => {
          if (res.status) {
            this.dataInfo = res.data;
            this.startTimeValue = res.data.startDate;
            this.isAdd = false;
          } else {
            this.$Message.error(resCode(this, res.code));
          }
        });
      }
      // 获取用户角色列表
      getAvailableList().then(res => {
        if (res.status) {
          this.roleList = res.data;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 开始时间
    startDate(e) {
      if (this.dataInfo.endDate) {
        this.isTimeOr();
      }
    },
    // 结束时间
    endDate(e) {
      if (this.dataInfo.startDate) {
        this.isTimeOr();
      }
    },
    isTimeOr() {
      let startTime = moment(this.dataInfo.startDate).format("YYYY-MM-DD");
      let endTime = moment(this.dataInfo.endDate).format("YYYY-MM-DD");
      if (moment(endTime).isAfter(startTime)) {
        this.isTime = false;
      } else {
        this.isTime = true;
        this.$Message.error({
          content: this.$t("system.timeCont"),
          duration: 5,
          top: 300
        });
      }
    },
    // 保存
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (!this.isAdd) {
            // 修改
            putUser(this.dataInfo).then(res => {
              if (res.status) {
                this.$router.push({
                  name: "SYS_SET_USER_LIST"
                });
              } else {
                this.$Message.error(resCode(this, res.code));
              }
            });
          } else {
            // 新增
            postUser(this.dataInfo).then(res => {
              if (res.status) {
                this.$router.push({
                  name: "SYS_SET_USER_LIST"
                });
              } else {
                this.$Message.error(resCode(this, res.code));
              }
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../common/css/variable";
@import "../../../../common/css/mixin";
.from_group {
  width: 40%;
  padding: 15px 15px 0 15px;
  /deep/ .ivu-form-item-content {
    width: 100%;
    .ivu-input-wrapper {
      display: inline-block;
      width: 80%;
    }
  }
  .role {
    width: 80%;
  }
  .time {
    width: 80%;
    /deep/ .ivu-input-wrapper {
      width: 100%;
    }
  }
}
.v-transfer-dom {
  /deep/ .ivu-modal {
    width: 70% !important;
    margin-left: 260px;
    margin-top: 50px;
  }
}
</style>
<style lang="scss">
@import "../../../../common/css/mixin";
.user-add{
  .btns {
    z-index: 99 !important;
    button {
      @include bot-btn();
    }
  }
}
</style>


