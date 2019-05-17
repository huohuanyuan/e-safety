/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-13 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-18 13:33:06
 * @instruction: 企业配置页面
 */
<template>
  <safety-user-content-outer class="company-info-wrap">
    <Layout
      slot="content"
      :style="{'height': '100%'}"
    >
      <!-- 内容主体渲染区域 -->
      <Content>
        <div class="contnet-top">
          <p class="p-title"> {{$t('companyInfo.companyInfo')}} </p>
          <Form
            ref="companyForm"
            :model="companyForm"
            :rules="ruleValidate"
            :label-width="160"
            label-position="left"
          >
            <FormItem
              :label="$t('companyInfo.companyName')"
              prop="enterpriseName"
            >
              <Input
                v-model.trim="companyForm.enterpriseName"
                :maxlength="64"
              ></Input>
            </FormItem>
            <FormItem
              :label="$t('companyInfo.companyAddress')"
              prop="address"
            >
              <Input
                v-model.trim="companyForm.address"
                :maxlength="200"
              ></Input>
            </FormItem>
            <FormItem
              :label="$t('companyInfo.resDepartment')"
              prop="department"
            >
              <Input
                v-model.trim="companyForm.department"
                :maxlength="64"
              ></Input>
            </FormItem>
            <FormItem
              :label="$t('companyInfo.contact')"
              prop="contact"
            >
              <Input
                v-model.trim="companyForm.contact"
                :maxlength="32"
              ></Input>
            </FormItem>
            <FormItem
              :label="$t('companyInfo.fax')"
              prop="fax"
            >
              <Input
                v-model.trim="companyForm.fax"
                :maxlength="24"
              ></Input>
            </FormItem>
            <FormItem
              :label="$t('companyInfo.phone')"
              prop="phone"
            >
              <Input
                v-model.trim="companyForm.phone"
                :maxlength="24"
              ></Input>
            </FormItem>
            <FormItem
              :label="$t('login.email')"
              prop="email"
            >
              <Input
                v-model.trim="companyForm.email"
                :maxlength="64"
              ></Input>
            </FormItem>
          </Form>
        </div>
        <div class="content-bottom">
          <p class="p-title"> {{$t('companyInfo.unitInfo')}} </p>
          <p
            class="p-add"
            @click="addUnitFun"
          >
            <Icon type="md-add" />
          </p>
          <div class="bottom-table">
            <Table
              :row-class-name="rowClassName"
              :columns="columns"
              :data="data"
              @on-row-click="rowClickFun"
            ></Table>
            <div class="placeholder"> </div>
            <Card
              v-show="addUnitShow"
              id="card"
            >
              <p slot="title"> NO.{{ count }} </p>
              <Form
                ref="unitForm"
                :model="unitForm"
                :rules="ruleUnit"
                :label-width="100"
                label-position="left"
              >
                <Row :gutter="16">
                  <Col span="12">
                  <Form-item
                    :label="$t('companyInfo.unitName')"
                    prop="unitName"
                  >
                    <Input
                      v-model.trim="unitForm.unitName"
                      :maxlength="64"
                    > </Input>
                  </Form-item>
                  </Col>
                  <Col span="12">
                  <Form-item
                    :label="$t('companyInfo.countryNum')"
                    prop="countryAdrAccount"
                  >
                    <Input
                      v-model.trim="unitForm.countryAdrAccount"
                      :maxlength="128"
                    > </Input>
                  </Form-item>
                  </Col>
                  <Col span="12">
                  <Form-item
                    :label="$t('companyInfo.contact')"
                    prop="unitContact"
                  >
                    <Input
                      v-model.trim="unitForm.unitContact"
                      :maxlength="32"
                    > </Input>
                  </Form-item>
                  </Col>
                  <Col span="12">
                  <Form-item
                    :label="$t('companyInfo.phone')"
                    prop="phone"
                  >
                    <Input
                      v-model.trim="unitForm.phone"
                      :maxlength="24"
                    > </Input>
                  </Form-item>
                  </Col>
                  <Col
                    span="24"
                    class="unit-sort"
                  >
                  <Form-item :label="$t('companyInfo.unitCategory')">
                    <RadioGroup
                      v-model="unitForm.reportType"
                      vertical
                    >
                      <Radio :label="$t('companyInfo.medicalSite')"> </Radio>
                      <Radio :label="$t('companyInfo.runCompany')"> </Radio>
                      <Radio :label="$t('companyInfo.manufacturer')"> </Radio>
                      <Radio :label="$t('companyInfo.personal')"> </Radio>
                      <Radio :label="$t('companyInfo.other')"> </Radio>
                      <Input
                        v-model.trim="unitForm.reportNote"
                        :maxlength="48"
                        class="unit-input"
                      > </Input>
                    </RadioGroup>
                  </Form-item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
    <!-- 底部保存等按钮组 -->
    <template slot="btns">
      <Button
        type="info"
        size="large"
        @click="putEnterprise"
      > {{$t('common.save')}} </Button>
    </template>
  </safety-user-content-outer>
</template>
<script>
// 删除按钮
const deleteIcon = (vm, h, params) => {
  return h("i", {
    class: ["iconshanjian", "iconfont"],
    style: {
      cursor: "pointer"
    },
    on: {
      click: e => {
        e.stopPropagation();
        vm.deleteFun(params.row, true);
      }
    }
  });
};
// 恢复按钮
const restoreIcon = (vm, h, params) => {
  return h("i", {
    class: ["iconhuifu", "iconfont"],
    style: {
      cursor: "pointer"
    },
    on: {
      click: e => {
        e.stopPropagation();
        vm.deleteFun(params.row, false);
      }
    }
  });
};
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
import {
  apiGetEnterprise,
  apiPutEnterprise
} from "api/case-info/company-info-api.js";
import { resCode } from "common/js/code.js";
export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
      addUnitShow: false,
      count: 1,
      num: -1,
      companyForm: {
        enterpriseName: "",
        address: "",
        department: "",
        contact: "",
        fax: "",
        phone: "",
        email: ""
      },
      ruleValidate: {
        email: [
          {
            type: "email",
            message: this.$t("system.emailRule"),
            trigger: "blur"
          }
        ]
      },
      unitForm: {
        unitId: "",
        unitName: "",
        unitContact: "",
        phone: "",
        reportType: "",
        reportNote: "",
        countryAdrAccount: "",
        enterpriseId: "",
        deleted: 0
      },
      ruleUnit: {},
      columns: [
        {
          title: this.$t("companyInfo.index"),
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: this.$t("companyInfo.unitName"),
          key: "unitName"
        },
        {
          title: this.$t("companyInfo.contact"),
          key: "unitContact"
        },
        {
          title: " ",
          width: 60,
          render: (h, params) => {
            return h("div", [
              (function(vm) {
                if (params.row.deleted) {
                  return restoreIcon(vm, h, params);
                } else {
                  return deleteIcon(vm, h, params);
                }
              })(this)
            ]);
          }
        }
      ],
      data: []
    };
  },
  methods: {
    //  查询企业配置信息
    getEnterprise() {
      this.$refs["companyForm"].resetFields();
      this.addUnitShow = false;
      apiGetEnterprise().then(res => {
        if (res.status) {
          if (res.data) {
            this.companyForm = res.data;
            this.unitForm.enterpriseId = res.data.enterpriseId;
            this.data = res.data.enterpriseUnitVOs;
          }
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 新增/修改企业信息
    putEnterprise(name) {
      if (this.data.length > 0) {
        if (this.addUnitShow) {
          this.data.splice(this.count - 1, 1, this.unitForm);
        }
      }
      this.companyForm.enterpriseUnitVOs = this.data;
      this.putEnterpriseFun(this.companyForm);
    },
    // 新增/修改企业 公共方法
    putEnterpriseFun(data) {
      this.$refs["companyForm"].validate(valid => {
        if (valid) {
          apiPutEnterprise(data).then(res => {
            if (res.status) {
              this.$Message.success(this.$t("common.success"));
              this.getEnterprise();
            } else {
              this.$Message.error(resCode(this, res.code));
            }
          });
        }
      });
    },
    // 新建单位信息
    addUnitFun() {
      let _data = {
        unitId: "",
        unitName: "",
        unitContact: "",
        phone: "",
        reportType: "",
        reportNote: "",
        countryAdrAccount: "",
        enterpriseId: "",
        deleted: 0
      };
      this.data.push(_data);
      document.querySelector(".placeholder").scrollIntoView(true);
    },
    // 点击table 行事件
    rowClickFun(data, index) {
      if (!data.deleted) {
        // 判断是否第一次点击
        if (this.addUnitShow) {
          /**
           * 判断当前点击是否和上次点击的一样
           * 如果不是，让当前的form表单的值赋值给上一次 data 对应位置
           * 然后把当前的data 赋值给 form 表单
           *  */

          if (this.num != index) {
            this.data.splice(this.num, 1, this.unitForm);
            this.unitForm = data;
          } else {
            // 让form表单的值对应赋值给当前点击的 data
            this.data.splice(index, 1, this.unitForm);
          }
        } else {
          this.unitForm = data;
        }
        this.addUnitShow = true;
        this.num = index;
        this.count = index + 1;
        this.$nextTick(() => {
          document.querySelector(".placeholder").scrollIntoView(true);
        });
      }
    },
    // 删除 / 恢复 当前数据
    deleteFun(data, value) {
      if (data.unitId == "") {
        if (data._index == this.count - 1) {
          this.addUnitShow = false;
        }
        this.data.splice(data._index, 1);
      } else {
        let _enterpriseUnitVOs = [];
        data.deleted = value;
        _enterpriseUnitVOs.push(data);

        let _data = {
          enterpriseId: this.companyForm.enterpriseId,
          enterpriseUnitVOs: _enterpriseUnitVOs
        };
        this.putEnterpriseFun(_data);
      }
    },
    //tr 添加class
    rowClassName(row, index) {
      if (row.deleted) {
        return "del-tr";
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getEnterprise();
    }
  },
  mounted() {
    this.getEnterprise();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/variable";
@import "../../../common/css/mixin";
.company-info-wrap {
  .contnet-top {
    width: 50%;
  }
  .content-bottom {
    width: 67%;
    position: relative;
  }
  .bottom-table {
    margin-left: 40px;
    .ivu-card {
      margin: 20px 0;
    }
    .unit-sort {
      position: relative;
    }
    .unit-input {
      width: 100px;
      position: absolute;
      left: 80px;
      bottom: 0;
    }
  }
  .placeholder {
    width: 100%;
    height: 20px;
  }
  form {
    margin-left: 40px;
  }
  .p-title {
    @include e-p-title();
  }
  .p-add {
    @include e-add-btn();
  }
  .btns {
    z-index: 99 !important;
    button {
      @include bot-btn();
    }
  }
}
</style>
<style lang="scss">
.company-info-wrap {
  .ivu-table {
    .ivu-table-cell {
      color: #000;
    }
  }
  .del-tr {
    td {
      text-decoration: line-through;
      color: red;
    }
    td:last-child {
      text-decoration: blink;
    }
  }
}
</style>


