报告人/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-13 09:08:22 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-03-22 17:32:03
 * @instruction: 产品 新增 页面
 */
<template>
  <safety-user-content-outer class="product-add-wrap">
    <Layout
      slot="content"
      :style="{'height': '100%'}"
    >
      <!-- 内容主体渲染区域 -->
      <Content>
        <Form
          ref="productForm"
          :model="productForm"
          :rules="ruleProduct"
          :label-width="160"
          label-position="left"
        >
          <FormItem
            label="预先批准IP名称"
            prop="preApprovedName"
          >
            <Input
              v-model.trim="productForm.preApprovedName"
              :maxlength="128"
            ></Input>
          </FormItem>
          <FormItem
            label="品牌名称"
            prop="brandName"
          >
            <Input
              v-model.trim="productForm.brandName"
              :maxlength="50"
            ></Input>
          </FormItem>
          <FormItem
            label="原厂商"
            prop="originalCompany"
          >
            <Input
              v-model.trim="productForm.originalCompany"
              :maxlength="50"
            ></Input>
          </FormItem>
          <FormItem
            label="描述"
            prop="description"
          >
            <Input
              v-model.trim="productForm.description"
              :maxlength="256"
            ></Input>
          </FormItem>
          <Form-item label="删除">
            <Select v-model="productForm.deleted">
              <Option value="true"> 是 </Option>
              <Option value="false"> 否 </Option>
            </Select>
          </Form-item>
        </Form>
        <div class="content-bottom">
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
      </Content>
    </Layout>
    <!-- 底部保存等按钮组 -->
    <template slot="btns">
      <Button
        type="info"
        size="large"
        @click="putProduct"
      >保存</Button>
    </template>

  </safety-user-content-outer>

</template>
<script>
// 输入框
const matterNameInput = (vm, h, param) => {
  return h("Input", {
    props: {
      type: "text",
      maxlength: 250,
      value: param.row.matterName
    },
    on: {
      "on-change": event => {
        vm.data[param.index] = param.row;
        vm.data[param.index].matterName = event.target.value;
      }
    }
  });
};
const termDateInput = (vm, h, param) => {
  return h("Input", {
    props: {
      type: "text",
      maxlength: 50,
      value: param.row.termDate
    },
    on: {
      "on-blur"(event) {
        vm.data[param.index].termDate = event.target.value;
      }
    }
  });
};
const termIdInput = (vm, h, param) => {
  return h("Input", {
    props: {
      type: "text",
      maxlength: 50,
      value: param.row.termId
    },
    on: {
      "on-blur"(event) {
        vm.data[param.index].termId = event.target.value;
      }
    }
  });
};
const specificationsInput = (vm, h, param) => {
  return h("InputNumber", {
    props: {
      min: 0,
      max: 1000000000,
      value: parseInt(param.row.specifications)
    },
    style: {
      width: "100%"
    },
    on: {
      "on-change": event => {
        vm.data[param.index] = param.row;
        vm.data[param.index].specifications = event;
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
        value: params.row.specificationsUnit
      }
    },
    [
      (function(vm) {
        let _arrH = [];
        let roleH;
        for (let i = 0; i < vm.unitList.length; i++) {
          roleH = h(
            "Option",
            {
              props: {
                value: vm.unitList[i].codeValue,
                lable: vm.unitList[i].codeLabel,
                key: vm.unitList[i].codeValue
              },
              nativeOn: {
                click() {
                  vm.onChangeUnit(params.index, vm.unitList[i]);
                }
              }
            },
            vm.unitList[i].codeLabel
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
import { ApiGetDict } from "@/api/api";
import { apiPutProduct, apiGetProduct } from "api/case-info/product-api.js";
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域

export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
      addShow: true,
      unitList: [],
      productForm: {
        preApprovedName: "",
        brandName: "",
        originalCompany: "",
        description: "",
        deleted: "false"
      },
      ruleProduct: {
        preApprovedName: [{ required: true, message: " ", trigger: "blur" }]
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "物质/指定物质名称(G.k.2.3.r.1)",
          key: "matterName",
          render: (h, params) => {
            return h("div", [
              (function(vm) {
                if (params.row.deleted) {
                  return params.row.matterName;
                } else {
                  return matterNameInput(vm, h, params);
                }
              })(this)
            ]);
          }
        },
        {
          title: "物质/指定物质术语ID版本日期/编号(G.k.2.3.r.2a)",
          key: "termDate",
          render: (h, params) => {
            return h("div", [
              (function(vm) {
                if (params.row.deleted) {
                  return params.row.termDate;
                } else {
                  return termDateInput(vm, h, params);
                }
              })(this)
            ]);
          }
        },
        {
          title: "物质/指定物质术语ID(G.k.2.3.r.2b)",
          key: "termId",
          render: (h, params) => {
            return h("div", [
              (function(vm) {
                if (params.row.deleted) {
                  return params.row.termId;
                } else {
                  return termIdInput(vm, h, params);
                }
              })(this)
            ]);
          }
        },
        {
          title: "规格（数值数值）(G.k.2.3.r.3a)",
          key: "specifications",
          render: (h, params) => {
            return h("div", [
              (function(vm) {
                if (params.row.deleted) {
                  return params.row.specifications;
                } else {
                  return specificationsInput(vm, h, params);
                }
              })(this)
            ]);
          }
        },
        {
          title: "规格（单位）(G.k.2.3.r.3b)",
          key: "specificationsUnit",
          render: (h, params) => {
            return h("div", [
              (function(vm) {
                if (params.row.deleted) {
                  return params.row.unitName;
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
      ],
      data: [
        {
          matterName: "",
          termDate: "",
          termId: "",
          specifications: 0,
          specificationsUnit: "",
          unitName: "",
          deleted: false,
          productId: this.$route.query.productId
        }
      ]
    };
  },
  methods: {
    //
    init() {
      this.getDict();
      if (this.$route.query.productId) {
        this.addShow = false;
        this.getProduct();
      }
    },
    // 点击 新建物质按钮
    addMatterFun() {
      let _data = {
        matterName: "",
        termDate: "",
        termId: "",
        specifications: 0,
        specificationsUnit: "",
        unitName: "",
        deleted: false,
        productId: this.$route.query.productId
      };
      this.data.push(_data);
    },
    //
    putProduct() {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].specifications != 0) {
          if (this.data[i].specificationsUnit == "") {
            this.$Message.warning(
              "请选择规格（数值数值）为" +
                this.data[i].specifications +
                "的规格（单位）信息"
            );
            return false;
          }
        }
      }
      this.productForm.productMatterVOs = this.data;
      this.putProductFun(this.productForm);
    },
    // 新增/修改案例产品及产品物质信息
    putProductFun(data) {
      this.$refs["productForm"].validate(valid => {
        if (valid) {
          apiPutProduct(data).then(res => {
            if (res.status) {
              this.$Message.success("成功");
              this.data = [];
              if (this.addShow) {
                this.$router.push({ name: "CASE_INFO_PRO_LIST" });
              } else {
                this.getProduct();
              }
            } else {
              this.$Message.error(resCode(this, res.code));
            }
          });
        }
      });
    },
    // 获取字典信息
    getDict() {
      ApiGetDict("DOSEU").then(res => {
        if (res.status) {
          this.unitList = res.data.codeList;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 根据产品物质ID查询产品物质信息
    getProduct() {
      let _data = {
        productId: this.$route.query.productId
      };
      apiGetProduct(_data).then(res => {
        if (res.status) {
          if (res.data.deleted) {
            res.data.deleted = "true";
          } else {
            res.data.deleted = "false";
          }
          this.productForm = res.data;
          if (res.data.productMatterVOs.length > 0) {
            this.data = res.data.productMatterVOs;
          }
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    //tr 添加class
    rowClassName(row, index) {
      if (row.deleted) {
        return "del-tr";
      }
    },
    // 删除当前数据
    deleteFun(data, index, value) {
      if (data.matterId == "") {
        this.data.splice(data._index, 1);
      } else {
        let productMatterVOs = [];
        data.deleted = value;
        productMatterVOs.push(data);
        let _data = {
          productId: this.productForm.productId,
          productMatterVOs: productMatterVOs
        };
        this.data[index].deleted = value;
        this.putProductFun(_data);
      }
    },
    /**
     * 项目添加员工选择 员工类型
     * @param index  当前数据的下标
     * @param  {Number} value 当前选中的 value
     */
    onChangeUnit(index, data) {
      this.data[index].unitName = data.codeLabel;
      this.data[index].specificationsUnit = data.codeValue;
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
<style lang="scss">
@import "../../../../common/css/variable";
@import "../../../../common/css/mixin";
.product-add-wrap {
  .ivu-layout-content {
    padding: 20px;
  }
  form {
    width: 67%;
    margin-left: 20px;
  }
  .content-bottom {
    width: 90%;
    position: relative;
  }
  .p-title {
    @include e-p-title();
    margin-left: 0;
  }
  .p-add {
    @include e-add-btn();
  }
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
  .btns {
    z-index: 99 !important;
    button {
      @include bot-btn();
    }
  }
}
</style>
