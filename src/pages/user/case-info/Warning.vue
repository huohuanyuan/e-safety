/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-13 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-18 13:51:09
 * @instruction: 预警配置页面
 */
<template>
  <safety-user-content-outer class="warning-from">
    <Layout
      slot="content"
      :style="{'height': '100%'}"
    >
      <!-- 内容主体渲染区域 -->
      <Content>
        <Form
          :model="warnData"
          label-position="left"
          :label-width="300"
          ref="warning"
          class="from_group"
        >
          <FormItem label="导致死亡 (E.i.3.2a)">
            <Row>
              <Col span="5">
              <InputNumber
                v-model="warnData.nshhDays"
                v-if="warnData.nshhIsApplicable "
                disabled
              ></InputNumber>
              <InputNumber
                v-model="warnData.nshhDays"
                v-else
                :max="999"
                :min="1"
              ></InputNumber>
              <span>天</span>
              </Col>
              <Col span="5">
              <Checkbox
                v-model="warnData.nshhIsApplicable"
                v-if="warnData.nshhDays>0"
                disabled
              >不适用</Checkbox>
              <Checkbox
                v-model="warnData.nshhIsApplicable"
                v-else
              >不适用</Checkbox>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="危及生命 (E.i.3.2b)">
            <Row>
              <Col span="5">
              <InputNumber
                v-model="warnData.nsnhhDays"
                v-if="warnData.nsnhhIsApplicable"
                disabled
              ></InputNumber>
              <InputNumber
                v-model="warnData.nsnhhDays"
                v-else
                :max="999"
                :min="1"
              ></InputNumber>
              <span>天</span>
              </Col>
              <Col span="5">
              <Checkbox
                v-model="warnData.nsnhhIsApplicable"
                v-if="warnData.nsnhhDays>0"
                disabled
              >不适用</Checkbox>
              <Checkbox
                v-model="warnData.nsnhhIsApplicable"
                v-else
              >不适用</Checkbox>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="导致/延长住院 (E.i.3.2c)">
            <Row>
              <Col span="5">
              <InputNumber
                v-model="warnData.shhDays"
                v-if="warnData.shhIsApplicable"
                disabled
              ></InputNumber>
              <InputNumber
                v-model="warnData.shhDays"
                v-else
                :maxlength="32"
                :max="999"
                :min="1"
              ></InputNumber>
              <span>天</span>
              </Col>
              <Col span="5">
              <Checkbox
                v-model="warnData.shhIsApplicable"
                v-if="warnData.shhDays> 0"
                disabled
              >不适用</Checkbox>
              <Checkbox
                v-model="warnData.shhIsApplicable"
                v-else
              >不适用</Checkbox>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="残疾/功能丧失 (E.i.3.2d)">
            <Row>
              <Col span="5">
              <InputNumber
                v-model="warnData.snhhDays"
                v-if="warnData.snhhIsApplicable"
                disabled
              ></InputNumber>
              <InputNumber
                v-model="warnData.snhhDays"
                v-else
                :max="999"
                :min="1"
              ></InputNumber>
              <span>天</span>
              </Col>
              <Col span="5">
              <Checkbox
                v-model="warnData.snhhIsApplicable"
                v-if="warnData.snhhDays>0"
                disabled
              >不适用</Checkbox>
              <Checkbox
                v-model="warnData.snhhIsApplicable"
                v-else
              >不适用</Checkbox>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="先天性异常或出生缺陷 (E.i.3.2e)">
            <Row>
              <Col span="5">
              <InputNumber
                v-model="warnData.fifthDays"
                v-if="warnData.fifthIsApplicable"
                disabled
              ></InputNumber>
              <InputNumber
                v-model="warnData.fifthDays"
                v-else
                :max="999"
                :min="1"
              ></InputNumber>
              <span>天</span>
              </Col>
              <Col span="5">
              <Checkbox
                v-model="warnData.fifthIsApplicable"
                v-if="warnData.fifthDays>0"
                disabled
              >不适用</Checkbox>
              <Checkbox
                v-model="warnData.fifthIsApplicable"
                v-else
              >不适用</Checkbox>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="其他重要医学事件 (E.i.3.2f)">
            <Row>
              <Col span="5">
              <InputNumber
                v-model="warnData.sixthDays"
                v-if="warnData.sixthIsApplicable"
                disabled
              ></InputNumber>
              <InputNumber
                v-model="warnData.sixthDays"
                v-else
                :max="999"
                :min="1"
              ></InputNumber>
              <span>天</span>
              </Col>
              <Col span="5">
              <Checkbox
                v-model="warnData.sixthIsApplicable"
                v-if="warnData.sixthDays>0"
                disabled
              >不适用</Checkbox>
              <Checkbox
                v-model="warnData.sixthIsApplicable"
                v-else
              >不适用</Checkbox>
              </Col>
            </Row>
          </FormItem>

          <FormItem label="描述">
            <Input
              v-model="warnData.description"
              type="textarea"
              :maxlength="256"
              :rows="5"
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
        @click="setWarnData"
      >{{$t('system.save')}}</Button>
    </template>
  </safety-user-content-outer>
</template>
<script>
import { getCaseWarn, putCaseWarn } from "api/case-info/warn-api.js";
import { resCode } from "common/js/code.js"; // 状态码
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
      warnData: {
        warnId: null,
        nshhDays: 0, // 导致死亡 (E.i.3.2a)
        nshhIsApplicable: false, // 同上
        nsnhhDays: 0, // 危及生命 (E.i.3.2b)
        nsnhhIsApplicable: false, // 同上
        shhDays: 0, // 导致/延长住院 (E.i.3.2c)
        shhIsApplicable: false,
        snhhDays: 0, //残疾/功能丧失 (E.i.3.2d)
        snhhIsApplicable: false, // 同上
        fifthDays: 0, // 先天性异常或出生缺陷 (E.i.3.2e)
        fifthIsApplicable: false, // 同上
        sixthDays: 0, //其他重要医学事件 (E.i.3.2f)天数
        sixthIsApplicable: false, // 同上
        description: "" // 描述
      }
    };
  },
  created() {
    this.getCaseWarn();
  },
  methods: {
    // 获取数据
    getCaseWarn() {
      getCaseWarn().then(res => {
        if (res.status) {
          if (res.data.warnId) {
            // 有值修改
            this.warnData = res.data;
          }
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 保存
    setWarnData() {
      putCaseWarn(this.warnData).then(res => {
        if (res.status) {
          this.$Message.success(this.$t("system.okCont"));
        } else {
          this.$Message.error(resCode(this, res.code));
        }
        this.getCaseWarn();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/variable";
@import "../../../common/css/mixin";
.from_group {
  padding: 15px 15px 0 25px;
  /deep/ .ivu-form-item-content {
    .ivu-col-span-5 {
      width: 15%;
    }
    .ivu-input-wrapper-default {
      width: 40%;
    }
  }
}
</style>
<style lang="scss" >
@import "../../../common/css/mixin";
.e-page {
  @include e-page();
}
.warning-from{
  .btns {
  z-index: 99 !important;
  button {
    @include bot-btn();
  }
}
  }

</style>
