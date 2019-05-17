/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-13 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-18 13:55:07
 * @instruction: 新增/修改 报告人
 */
<template>
  <safety-user-content-outer class="reporter-add-wrap">
    <Layout
      slot="content"
      :style="{'height': '100%'}"
    >
      <!-- 内容主体渲染区域 -->
      <Content>
        <Form
          ref="reporterForm"
          :model="reporterForm"
          :rules="ruleReporter"
          :label-width="200"
          label-position="left"
        >
          <p class="p-title"> 报告者的名字 (C.2.r.1) </p>
          <FormItem
            label="报告者的职称 (C.2.r.1.1)"
            prop="title"
          >
            <Input
              v-model.trim="reporterForm.title"
              :maxlength="50"
            ></Input>
          </FormItem>
          <FormItem
            label="报告者的名字 (C.2.r.1.2)"
            prop="reporterName"
          >
            <Input
              v-model.trim="reporterForm.reporterName"
              :maxlength="60"
            ></Input>
          </FormItem>
          <FormItem
            label="报告者的中名 (C.2.r.1.3)"
            prop="middleName"
          >
            <Input
              v-model.trim="reporterForm.middleName"
              :maxlength="60"
            ></Input>
          </FormItem>
          <FormItem
            label="报告者的姓氏 (C.2.r.1.4)"
            prop="surname"
          >
            <Input
              v-model.trim="reporterForm.surname"
              :maxlength="60"
            ></Input>
          </FormItem>
          <p class="p-title"> 报告者的地址和电话 (C.2.r.2) </p>
          <FormItem
            label="报告者的机构 (C.2.r.2.1)"
            prop="site"
          >
            <Input
              v-model.trim="reporterForm.site"
              :maxlength="60"
            ></Input>
          </FormItem>
          <FormItem
            label="报告者的部门 (C.2.r.2.2)"
            prop="department"
          >
            <Input
              v-model.trim="reporterForm.department"
              :maxlength="60"
            ></Input>
          </FormItem>
          <FormItem
            label="报告者的街道地址 (C.2.r.2.3)"
            prop="street"
          >
            <Input
              v-model.trim="reporterForm.street"
              :maxlength="100"
            ></Input>
          </FormItem>
          <FormItem
            label="报告者所在城市 (C.2.r.2.4)"
            prop="city"
          >
            <Input
              v-model.trim="reporterForm.city"
              :maxlength="35"
            ></Input>
          </FormItem>
          </FormItem>
          <FormItem
            label="报告者所在州或省 (C.2.r.2.5)"
            prop="province"
          >
            <Input
              v-model.trim="reporterForm.province"
              :maxlength="40"
            ></Input>
          </FormItem>
          </FormItem>
          <FormItem
            label="报告者的邮政编码 (C.2.r.2.6)"
            prop="postcode"
          >
            <Input
              v-model.trim="reporterForm.postcode"
              :maxlength="15"
            ></Input>
          </FormItem>
          <FormItem
            label="报告者的电话 (C.2.r.2.7)"
            prop="phone"
          >
            <Input
              v-model.trim="reporterForm.phone"
              :maxlength="33"
            ></Input>
          </FormItem>
          <FormItem
            label="报告者的国家代码 (C.2.r.3)"
            prop="countryCode"
          >
            <Select v-model="reporterForm.countryCode">
              <Option
                v-for="(item,index) of countryList"
                :value="item.codeValue"
                :key="item.codeValue"
              >{{item.codeLabel}}</Option>
            </Select>
          </FormItem>
          <Form-item
            label="资格 (C.2.r.4)"
            prop="qualification"
          >
            <RadioGroup
              v-model="reporterForm.qualification"
              vertical
            >
              <Radio
                v-for="(val,key,index) in QUALIFICATION"
                :label="key"
                :key="index"
              >
                {{val}}
              </Radio>
            </RadioGroup>
          </Form-item>
          <Form-item label="用于监管目的的主要来源 (C.2.r.5)">
            <Checkbox v-model="reporterForm.mainSource"> </Checkbox>
          </Form-item>
          <Form-item label="删除">
            <Select v-model="reporterForm.deleted">
              <Option value="true"> 是 </Option>
              <Option value="false"> 否 </Option>
            </Select>
          </Form-item>
        </Form>
      </Content>
    </Layout>
    <!-- 底部保存等按钮组 -->
    <template slot="btns">
      <Button
        type="info"
        size="large"
        @click="putReporter"
      > 保存 </Button>
    </template>
  </safety-user-content-outer>

</template>
<script>
import { ApiGetDict } from "@/api/api";
import { resCode } from "common/js/code.js";
import { QUALIFICATION } from "common/js/constant.js";
import { apiPutReporter, apiGetReporter } from "api/case-info/reporter-api.js";
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
      countryList: [],
      QUALIFICATION: QUALIFICATION,
      reporterForm: {
        reporterId: "",
        title: "",
        reporterName: "",
        middleName: "",
        surname: "",
        site: "",
        department: "",
        street: "",
        city: "",
        province: "",
        postcode: "",
        phone: "",
        countryCode: "",
        qualification: "",
        mainSource: "false",
        deleted: "false"
      },
      ruleReporter: {
        reporterName: [{ required: true, message: " ", trigger: "blur" }],
        site: [{ required: true, message: " ", trigger: "blur" }],
        qualification: [
          { required: true, message: "请选择资格信息", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    init() {
      this.getDict();
      if (this.$route.query.reporterId) {
        this.getReporter();
      }
    },
    // 获取研究注册国家
    getDict() {
      ApiGetDict("COUNTRY").then(res => {
        if (res.status) {
          this.countryList = res.data.codeList;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 修改 / 新建 案例报告人信息
    putReporter() {
      this.$refs["reporterForm"].validate(valid => {
        if (valid) {
          apiPutReporter(this.reporterForm).then(res => {
            if (res.status) {
              this.$Message.success("成功");
              this.$router.push({ name: "CASE_INFO_REP_LIST" });
            } else {
              this.$Message.error(resCode(this, res.code));
            }
          });
        }
      });
    },
    // 查询单个报告人信息
    getReporter() {
      let _data = {
        reporterId: this.$route.query.reporterId
      };
      apiGetReporter(_data).then(res => {
        if (res.status) {
          if (res.data.deleted) {
            res.data.deleted = "true";
          } else {
            res.data.deleted = "false";
          }
          this.reporterForm = res.data;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../common/css/variable";
@import "../../../../common/css/mixin";
.reporter-add-wrap {
  .ivu-layout-content {
    padding: 0 20px;
  }
  form {
    margin-left: 20px;
    width: 67%;
  }
  .p-title {
    @include e-p-title();
    margin-left: -20px;
  }
  .btns {
    z-index: 99 !important;
    button {
      @include bot-btn();
    }
  }
}
</style>

