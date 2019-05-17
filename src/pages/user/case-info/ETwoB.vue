/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-13 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-18 13:32:53
 * @instruction: E2B 页面
 */
<template>
  <safety-user-content-outer class="e-two-wrap">
    <Layout
      slot="content"
      :style="{'height': '100%'}"
    >
      <!-- 内容主体渲染区域 -->
      <Content>
        <div class="contnet-wrap">
          <Form
            ref="eTwoForm"
            :model="eTwoForm"
            :rules="ruleETwo"
            :label-width="160"
            label-position="left"
          >
            <p class="p-title"> E2B R3发送/接收标识符（批） </p>
            <FormItem
              label="发送者标识符 N.1.3"
              prop="batchSenderTag"
            >
              <Input
                v-model.trim="eTwoForm.batchSenderTag"
                :maxlength="60"
              ></Input>
            </FormItem>
            <FormItem
              label="接收者标识符 N.1.4"
              prop="batchReceiverTag"
            >
              <Input
                v-model.trim="eTwoForm.batchReceiverTag"
                :maxlength="60"
              ></Input>
            </FormItem>

            <p class="p-title"> E2B R3发送/接收标识符（ICSR） </p>
            <FormItem
              label="发送者标识符 N.2.r.2"
              prop="icsrSenderTag"
            >
              <Input
                v-model.trim="eTwoForm.icsrSenderTag"
                :maxlength="60"
              ></Input>
            </FormItem>
            <FormItem
              label="接收者标识符 N.2.r.3"
              prop="icsrReceiverTag"
            >
              <Input
                v-model.trim="eTwoForm.icsrReceiverTag"
                :maxlength="60"
              ></Input>
            </FormItem>
          </Form>
        </div>
      </Content>
    </Layout>
    <!-- 底部保存等按钮组 -->
    <template slot="btns">
      <Button
        type="info"
        size="large"
        @click="putEtb"
      >保存</Button>
    </template>

  </safety-user-content-outer>

</template>
<script>
import { apiGetEtbInfo, apiPutEtb } from "api/case-info/e2b-api.js";
import { resCode } from "common/js/code.js";
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
      eTwoForm: {
        batchSenderTag: "",
        batchReceiverTag: "",
        icsrSenderTag: "",
        icsrReceiverTag: ""
      },
      ruleETwo: {}
    };
  },
  methods: {
    // 查询案例E2B信息
    getEtbInfo() {
      apiGetEtbInfo().then(res => {
        if (res.status) {
          if (res.data) {
            this.eTwoForm = res.data;
          }
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 新增或修改案例E2B
    putEtb() {
      apiPutEtb(this.eTwoForm).then(res => {
        if (res.status) {
          this.$Message.success(this.$t("common.success"));
          this.getEtbInfo();
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.getEtbInfo();
    }
  },
  mounted() {
    this.getEtbInfo();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/variable";
@import "../../../common/css/mixin";
.e-two-wrap {
  .contnet-wrap {
    width: 67%;
  }
  form {
    margin-left: 40px;
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

