/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-13 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-18 13:44:58
 * @instruction: 发件人 页面
 */
<template>
  <safety-user-content-outer class="sender-wrap">
    <Layout
      slot="content"
      :style="{'height': '100%'}"
    >
      <!-- 内容主体渲染区域 -->
      <Content>
        <Form
          ref="senderForm"
          :model="senderForm"
          :rules="ruleSender"
          :label-width="160"
          label-position="left"
        >
          <FormItem
            label="发送者类型 (C.3.1)"
            prop="senderType"
          >
            <RadioGroup
              v-model="senderForm.senderType"
              vertical
            >
              <Radio label="1"> 制药公司 </Radio>
              <Radio label="2"> 监管机构 </Radio>
              <Radio label="3"> 医疗保健专业人士 </Radio>
              <Radio label="4"> 地区药物警戒中心 </Radio>
              <Radio label="5"> WHO国际药物监测合作中心 </Radio>
              <Radio label="6"> 其他（例如：经销商或其他机构）</Radio>
              <Radio label="7"> 患者/消费者 </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            label="报告者所在机构 (C.3.2)"
            prop="site"
          >
            <Input
              v-model.trim="senderForm.site"
              :maxlength="100"
            ></Input>
          </FormItem>
          <p class="p-title"> E2B R3发送/接收标识符（ICSR） </p>
          <FormItem
            label="发送者的部门 (C.3.3.1)"
            prop="department"
          >
            <Input
              v-model.trim="senderForm.department"
              :maxlength="60"
            ></Input>
          </FormItem>
          <FormItem
            label="发送者的职称 (C.3.3.2)"
            prop="title"
          >
            <Input
              v-model.trim="senderForm.title"
              :maxlength="50"
            ></Input>
          </FormItem>
          </FormItem>
          <FormItem
            label="发送者的给定名 (C.3.3.3)"
            prop="giveName"
          >
            <Input
              v-model.trim="senderForm.giveName"
              :maxlength="60"
            ></Input>
          </FormItem>
          <FormItem
            label="发送者的中间名字 (C.3.3.4)"
            prop="middleName"
          >
            <Input
              v-model.trim="senderForm.middleName"
              :maxlength="60"
            ></Input>
          </FormItem>
          <FormItem
            label="发送者的姓名 (C.3.3.5)"
            prop="senderName"
          >
            <Input
              v-model.trim="senderForm.senderName"
              :maxlength="60"
            ></Input>
          </FormItem>
          <p class="p-title"> 发送者的地址、传真、电话和邮箱地址 (C.3.4) </p>
          <FormItem
            label="发送者的街道地址 (C.3.4.1)"
            prop="street"
          >
            <Input
              v-model.trim="senderForm.street"
              :maxlength="100"
            ></Input>
          </FormItem>
          <FormItem
            label="发送者所在城市 (C.3.4.2)"
            prop="city"
          >
            <Input
              v-model.trim="senderForm.city"
              :maxlength="35"
            ></Input>
          </FormItem>
          <FormItem
            label="发送者所在州或省 (C.3.4.3)"
            prop="province"
          >
            <Input
              v-model.trim="senderForm.province"
              :maxlength="40"
            ></Input>
          </FormItem>
          <FormItem
            label="发送者的邮政编码 (C.3.4.4)"
            prop="postcode"
          >
            <Input
              v-model.trim="senderForm.postcode"
              :maxlength="15"
            ></Input>
          </FormItem>
          <FormItem
            label="发送者的国家代码 (C.3.4.5)"
            prop="countryCode"
          >
            <Select v-model="senderForm.countryCode">
              <Option
                v-for="(item,index) of countryList"
                :value="item.codeValue"
                :key="item.codeValue"
              >{{item.codeLabel}}</Option>
            </Select>
          </FormItem>
          <FormItem
            label="发送者的电话号码 (C.3.4.6)"
            prop="phone	"
          >
            <Input
              v-model.trim="senderForm.phone"
              :maxlength="33"
            ></Input>
          </FormItem>
          <FormItem
            label="发送者的传真号码 (C.3.4.7)"
            prop="fax"
          >
            <Input
              v-model.trim="senderForm.fax"
              :maxlength="33"
            ></Input>
          </FormItem>
          <FormItem
            label="发送者的邮箱地址 (C.3.4.8)"
            prop="email"
          >
            <Input
              v-model.trim="senderForm.email"
              :maxlength="100"
            ></Input>
          </FormItem>
        </Form>
      </Content>
    </Layout>
    <!-- 底部保存等按钮组 -->
    <template slot="btns">
      <Button
        type="info"
        size="large"
        @click="putSender"
      >保存</Button>
    </template>
  </safety-user-content-outer>
</template>
<script>
import { ApiGetDict } from "@/api/api";
import { resCode } from "common/js/code.js";
import { apiGetSenderInfo, apiPutSender } from "api/case-info/sender-api.js";
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
      countryList: [],
      senderForm: {
        senderType: "",
        site: "",
        department: "",
        title: "",
        giveName: "",
        middleName: "",
        senderName: "",
        street: "",
        city: "",
        province: "",
        postcode: "",
        countryCode: "",
        phone: "",
        fax: "",
        email: ""
      },
      ruleSender: {
        senderType: [
          { required: true, message: "请选择发送者类型", trigger: "change" }
        ],
        site: [{ required: true, message: " ", trigger: "blur" }],
        giveName: [{ required: true, message: " ", trigger: "blur" }],
        email: [
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
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
    // 请求详情
    getSenderInfo() {
      apiGetSenderInfo().then(res => {
        if (res.status) {
          if (res.data) {
            this.senderForm = res.data;
          }
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 新增 / 修改信息
    putSender() {
      this.$refs["senderForm"].validate(valid => {
        if (valid) {
          apiPutSender(this.senderForm).then(res => {
            if (res.status) {
              this.$Message.success(this.$t("common.success"));
              this.getSenderInfo();
            } else {
              this.$Message.error(resCode(this, res.code));
            }
          });
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.getSenderInfo();
    }
  },
  mounted() {
    this.getDict();
    this.getSenderInfo();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/variable";
@import "../../../common/css/mixin";
.sender-wrap {
  form {
    margin: 20px 0 0 40px;
    width: 67%;
  }
  .p-title {
    @include e-p-title();
    margin: 20px 0 20px -20px;
  }
  .btns {
    z-index: 99 !important;
    button {
      @include bot-btn();
    }
  }
}
</style>
