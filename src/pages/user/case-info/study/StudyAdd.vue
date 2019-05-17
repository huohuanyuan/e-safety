报告人/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-13 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-03-22 17:32:03
 * @instruction: 研究 新增 页面
 */
<template>
  <safety-user-content-outer class="study-add">
    <Layout
      slot="content"
      :style="{'height': '100%'}"
    >
      <!-- 内容主体渲染区域 -->
      <Content>
        <div class="content-top">
          <p class="p-title"> 物质 </p>
          <p
            class="p-add"
            @click="addMatterFun"
          >
            <Icon type="md-add" />
          </p>
          <Table
            :row-class-name="rowClassName"
            :columns="columns"
            :data="data"
          ></Table>
        </div>
        <Form
          ref="studyForm"
          :model="studyForm"
          :rules="ruleStudy"
          :label-width="200"
          label-position="left"
        >
          <FormItem
            label="研究名称 (C.5.2)"
            prop="studyName"
          >
            <Input
              v-model.trim="studyForm.studyName"
              :maxlength="2000"
            ></Input>
          </FormItem>
          <FormItem
            label="申办者研究编号 (C.5.3)"
            prop="sponsorStudyCode"
          >
            <Input
              v-model.trim="studyForm.sponsorStudyCode"
              :maxlength="50"
            ></Input>
          </FormItem>
          <Form-item
            label="该反应/事件的研究类型 (C.5.4)"
            prop="studyType"
          >
            <RadioGroup
              v-model="studyForm.studyType"
              vertical
            >
              <Radio
                v-for="(val,key,index) in STUDYTYPE"
                :label="key"
                :key="index"
              >
                {{val}}
              </Radio>
              <!-- <Radio label="1"> 临床试验 </Radio>
              <Radio label="2"> 个例患者使用个例患者使用（例如“同情使用同情使用”或“指定患者用途”） </Radio>
              <Radio label="3"> 其他研究（例如药物流行病学、药物经济学、重点监测重点） </Radio> -->
            </RadioGroup>
          </Form-item>
          <Form-item label="删除">
            <Select v-model="studyForm.deleted">
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
        @click="putStudy"
      >保存</Button>
    </template>
  </safety-user-content-outer>

</template>
<script>
const registrationNumberInput = (vm, h, param) => {
  return h("Input", {
    props: {
      type: "text",
      maxlength: 50,
      value: param.row.registrationNumber
    },
    on: {
      "on-change": event => {
        // 解决获取焦点的bug
        vm.data[param.index] = param.row;
        vm.data[param.index].registrationNumber = event.target.value;
      }
    }
  });
};
const unitSelect = (vm, h, params) => {
  return h(
    "Select",
    {
      props: {
        filterable: true,
        value: params.row.registrationCountry
      }
    },
    [
      (function(vm) {
        let _arrH = [];
        let roleH;
        for (let i = 0; i < vm.countryList.length; i++) {
          roleH = h(
            "Option",
            {
              props: {
                value: vm.countryList[i].codeValue,
                lable: vm.countryList[i].codeLabel,
                key: vm.countryList[i].codeValue
              },
              nativeOn: {
                click() {
                  vm.onChange(params.index, vm.countryList[i]);
                }
              }
            },
            vm.countryList[i].codeLabel
          );
          _arrH.push(roleH);
        }
        return _arrH;
      })(vm)
    ]
  );
};
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
        vm.deleteFun(params.row, params.index, true);
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
        vm.deleteFun(params.row, params.index, false);
      }
    }
  });
};
import { resCode } from "common/js/code.js";
import { STUDYTYPE } from "common/js/constant.js";
import { ApiGetDict } from "@/api/api";
import { apiPutStudy, apiGetStudy } from "api/case-info/study-api.js";
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
      STUDYTYPE: STUDYTYPE,
      addShow: true,
      countryList: [],
      ruleStudy: {
        sponsorStudyCode: [{ required: true, message: " ", trigger: "blur" }]
      },
      studyForm: {
        sponsorStudyCode: "",
        studyName: "",
        studyType: "",
        countryName: "",
        deleted: "false"
      },
      data: [],
      columns: [
        {
          title: "序号",
          width: 70,
          type: "index",
          align: "center"
        },
        {
          title: "研究注册编号 (C.5.1.r.1)",
          key: "registrationNumber",
          render: (h, params) => {
            return h("div", [
              (function(vm) {
                if (params.row.deleted) {
                  return params.row.registrationNumber;
                } else {
                  return registrationNumberInput(vm, h, params);
                }
              })(this)
            ]);
          }
        },
        {
          title: "研究注册国家 (C.5.1.r.2)",
          key: "registrationCountry",
          render: (h, params) => {
            return h("div", [
              (function(vm) {
                if (params.row.deleted) {
                  return params.row.countryName;
                } else {
                  return unitSelect(vm, h, params);
                }
              })(this)
            ]);
          }
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
      ]
    };
  },
  methods: {
    init() {
      this.getDict();
    },
    // 获取研究注册国家 (C.5.1.r.2)
    getDict() {
      ApiGetDict("COUNTRY").then(res => {
        if (res.status) {
          this.countryList = res.data.codeList;
          if (this.$route.query.studyId) {
            this.addShow = false;
            this.getStudy();
          }
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 新建/修改保存按钮
    putStudy() {
      this.studyForm.studyMatterVOs = this.data;
      this.putStudyFun(this.studyForm);
    },
    // 新增或修改案例研究信息
    putStudyFun(data) {
      this.$refs["studyForm"].validate(valid => {
        if (valid) {
          apiPutStudy(data).then(res => {
            if (res.status) {
              this.$Message.success("成功");
              this.data = [];
              if (this.addShow) {
                this.$router.push({ name: "CASE_INFO_STU_LIST" });
              } else {
                this.getStudy();
              }
            } else {
              this.$Message.error(resCode(this, res.code));
            }
          });
        }
      });
    },

    //根据研究Id查询单个案例研究
    getStudy() {
      let _data = {
        studyId: this.$route.query.studyId
      };
      apiGetStudy(_data).then(res => {
        if (res.status) {
          if (res.data.deleted) {
            res.data.deleted = "true";
          } else {
            res.data.deleted = "false";
          }
          this.studyForm = res.data;
          this.data = res.data.studyMatterVOs;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 点击 新建物质按钮
    addMatterFun() {
      let _data = {
        registrationNumber: "",
        registrationCountry: "",
        countryName: "",
        deleted: false,
        studyId: this.$route.query.studyId
      };
      this.data.push(_data);
    },

    // select 选择事件
    onChange(index, data) {
      this.data[index].countryName = data.codeLabel;
      this.data[index].registrationCountry = data.codeValue;
    },
    //tr 添加class
    rowClassName(row, index) {
      if (row.deleted) {
        return "del-tr";
      }
    },
    // 删除/ 恢复 当前数据
    deleteFun(data, index, value) {
      if (data.studyMatterId == "") {
        this.data.splice(data._index, 1);
      } else {
        let studyMatterVOs = [];
        data.deleted = value;
        studyMatterVOs.push(data);
        let _data = {
          studyId: this.studyForm.studyId,
          studyMatterVOs: studyMatterVOs
        };
        this.data[index].deleted = value;
        this.putStudyFun(_data);
      }
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
.study-add {
  .content-top {
    width: 67%;
    position: relative;
    margin-left: 20px;
  }
  form {
    margin: 30px 0 0 20px;
    width: 67%;
  }
  .p-title {
    @include e-p-title();
    margin-left: 0;
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
.study-add {
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

