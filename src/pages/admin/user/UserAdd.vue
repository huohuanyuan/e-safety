/*
 * @Author: chengshanshan 
 * @Date: 2019-03-12 13:34:52 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-18 14:55:12
 * @instructions:用户管理新建用户信息
 */
<template>
  <Layout :style="{'height': '100%'}">
    <Header>
      <safety-nav-header>
        <template slot="title">
          新建用户
        </template>
        <template slot="back">
          <router-link :to="{name:'USER_LIST'}">返回</router-link>
        </template>
      </safety-nav-header>
    </Header>
    <Content>
      <safety-content-outer>

        <template slot="content">
          <p class="form-title">
            用户信息
          </p>
          <Form
            :label-width="80"
            label-position="left"
            ref="userFormData"
            :model="userFormData"
            :rules="userFormRule"
          >
            <Row :gutter="64">
              <Col span="12">
              <FormItem
                label="用户名称"
                prop="name"
              >
                <Input v-model.trim="userFormData.name"></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem
                label="用户邮箱"
                prop="email"
              >
                <Input v-model.trim="userFormData.email"></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem
                label="联系电话"
              >
                <Input v-model.trim="userFormData.mobile"></Input>
              </FormItem>
              </Col>
            </Row>
            <p class="form-title">
              分配信息
            </p>
            <Row :gutter="64">
              <Col span="12">
              <FormItem label="所属公司">
                <Select v-model="userFormData.companyId">
                  <Option
                    v-for="item in companyList"
                    :value="item.companyId"
                    :key="item.companyId"
                  >{{ item.companyName }}</Option>
                </Select>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </template>
        <template slot="btns">
          <Button
            type="primary"
            @click="postUser('userFormData')"
          >保存</Button>
        </template>
      </safety-content-outer>
    </Content>
  </Layout>
</template>
<script>
import SafetyNavHeader from "components/safety-nav-header";
import SafetyContentOuter from "components/safety-content-outer";
import SafetySplit from "components/safety-split";
import { apiPostUser } from "api/system/user-api.js";
import { apiGetCompanyList } from "api/system/company-api.js";
import { resCode } from "common/js/code.js";
export default {
  components: {
    SafetyNavHeader,
    SafetyContentOuter,
    SafetySplit
  },
  data() {
    return {
      userFormData: {
        name: "",
        email: "",
        mobile: "",
        companyId: ""
      },
      userFormRule: {
        name: [
          { required: true, message: " ", trigger: "blur" },
          {
            type: "string",
            max: 24,
            message: "用户名称长度不能超过24位",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: " ", trigger: "blur" },
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          },
          {
            max: 32,
            message: "邮箱长度不能超过32位",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            max: 20,
            message: "联系电话不能超过20位",
            trigger: "blur"
          }
        ]
      },
      companyList: []
    };
  },
  methods: {
    //初始化
    init(){
      this.getCompanyList()
    },
    // 新建用户
    postUser(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          apiPostUser(this.userFormData).then(res => {
            if (res.status) {
              this.$Message.success("新建成功！");
              this.$router.push({ name: "USER_LIST" });
            } else {
              this.$Message.error(resCode(this, res.code));
            }
          });
        }
      });
    },
    // 请求公司list
    getCompanyList() {
      apiGetCompanyList().then(res => {
        if (res.status) {
          this.companyList = res.data.dataList;
        } else {
          this.$Message.error(resCode(this, res.code));
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
@import "../../../common/css/mixin";
.add-user-outer {
  height: 100%;
}
.form-title{
  @include e-form-title();
}
</style>


