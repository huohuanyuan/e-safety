/*
 * @Author: chengshanshan 
 * @Date: 2019-03-12 13:34:52 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-03-20 17:06:29
 * @instructions:用户管理新建/修改用户信息
 */
<template>
  <Layout :style="{'height': '100%'}">
    <Header>
      <safety-nav-header>
        <template slot="title">
          新建公司
        </template>
        <template slot="back">
          <router-link :to="{name:'COM_LIST'}">返回</router-link>
        </template>
      </safety-nav-header>
    </Header>
    <Content>
      <safety-content-outer>
        <template slot="content">
          <p class="form-title">
            公司信息
          </p>
          <Form
            ref="newComForm"
            :model="newComForm"
            :rules="newComValidate"
            :label-width="100"
            label-position="left"
          >
            <Row :gutter="160">
              <Col span="12">
              <FormItem
                label="公司名称"
                prop="companyName"
              >
                <Input v-model.trim="newComForm.companyName"></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem
                label="联系人"
                prop="contacts"
              >
                <Input v-model.trim="newComForm.contacts"></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem
                label="联系电话"
                prop="phone"
              >
                <Input v-model.trim="newComForm.phone"></Input>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </template>
        <template slot="btns">
          <Button
            type="primary"
            @click="newCompany('newComForm')"
          >保存</Button>
        </template>
      </safety-content-outer>
    </Content>

  </Layout>

</template>
<script>
import { apiPostCompany } from "api/system/company-api.js";
import { resCode } from "common/js/code.js";
import SafetyNavHeader from "components/safety-nav-header";
import SafetyContentOuter from "components/safety-content-outer";
import SafetySplit from "components/safety-split";
export default {
  components: {
    SafetyNavHeader,
    SafetyContentOuter,
    SafetySplit
  },
  data() {
    return {
      newComForm: {
        companyName: "",
        contacts: "",
        phone: ""
      },
      newComValidate: {
        companyName: [{ required: true, message: " ", trigger: "blur" }],
        contacts: [{ required: true, message: " ", trigger: "blur" }],
        phone: [{ required: true, message: " ", trigger: "blur" }]
      }
    };
  },
  methods: {
    //新建公司
    newCompany(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          apiPostCompany(this.newComForm).then(res => {
            if (res.status) {
              this.$Message.success("公司创建成功");
              this.$router.push({ name: "COM_LIST" });
            } else {
              this.$Message.error(resCode(this, res.code));
            }
          });
        }
      });
    }
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


