<!--
 * @Author: yongwenhao
 * @LastEditors: yongwenhao
 * @instruction: 案例编码
 * @Date: 2019-04-18 16:30:04
 * @LastEditTime: 2019-04-19 09:02:28
 -->

<template>
  <safety-user-content-outer class="case-coding">
    <Layout
      slot="content"
      :style="{'height': '100%'}"
    >
      <!-- 内容主体渲染区域 -->
      <Content> 
        <Form
          :model="caseCodingData"
          label-position="left"
          :label-width="300"
          ref="warning"
          class="from-group"
        >
          <FormItem label="案例编码规范:">

          </FormItem>
          <FormItem label="案例编码前缀:">
            <Row>
              <Col span="3">
              <Input
                type='text'
                v-model="caseCodingData.codePrefix"
              ></Input>
              </Col>

            </Row>
          </FormItem>
          <FormItem label="案例编码自增:">
            <Row>
              <Col span="3">
              <InputNumber
                :max="10"
                :min="1"
                class="numInput"
                v-model="caseCodingData.codeNum"
              ></InputNumber>

              </Col>

            </Row>
          </FormItem>
        </Form>
      </Content>
    </Layout>
    <!-- 底部保存等按钮组 -->
    <template slot="btns">
      <Button
        type="info"
        size="large"
        @click="setCaseCoding"
      >{{$t('system.save')}}</Button>
    </template>
  </safety-user-content-outer>
</template>
<script>
import { getCaseCode, putCaseCode } from "@/api/system-user/caseCoding-api";
import { resCode } from "common/js/code.js"; // 状态码
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
      caseCodingData: {
        codePrefix: "",
        codeNum: 0
      }
    };
  },
  created() {
    this.getCaseData();
  },
  methods: {
    // 获取数据
    getCaseData() {
      getCaseCode().then(res => {
        if (res.status) {
          this.caseCodingData = res.data;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 保存
    setCaseCoding() {
      if (
        this.caseCodingData.codePrefix.trim().length == 0 ||
        this.caseCodingData.codeNum == null
      ) {
        this.$Message.error("不能为空");
      } else {
        putCaseCode(this.caseCodingData).then(res => {
          if (res.status) {
            this.$Message.success(this.$t("system.okCont"));
          } else {
            this.$Message.error(resCode(this, res.code));
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/variable";
@import "../../../common/css/mixin";
.from-group {
  padding: 15px 15px 0 25px;
  /deep/ .ivu-form-item-content {
    /deep/ .numInput{
      width: 100%;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "../../../common/css/mixin";
.case-coding {
  .btns {
    z-index: 99 !important;
    button {
      @include bot-btn();
    }
  }
}
</style>

<style lang="scss" >
@import "../../../common/css/mixin";
.e-page {
  @include e-page();
}
</style>
