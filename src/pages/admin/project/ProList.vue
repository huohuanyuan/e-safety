/*
 * @Author: chengshanshan 
 * @Date: 2019-03-12 13:34:52 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-03-26 13:21:38
 * @instructions:用户管理列表
 */
<template>
  <Layout :style="{'height': '100%'}">
    <Header>
      <div class="header">
        <Form inline>
          <FormItem>
            <Input
              type="text"
              v-model="listParams.name"
              placeholder="请输入项目名称或项目编码"
            ></Input>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              @click="listSearch"
            >查询</Button>
          </FormItem>
        </Form>
        <div>
          <Button
            type="primary"
            :to="{name:'PRO_ADD'}"
          >新建</Button>
        </div>
      </div>
    </Header>
    <Content>
      <Table
        size="small"
        :columns="proColums"
        :data="proListData"
      >
      </Table>
    </Content>
    <Footer>
      <Page
        :total="listTotal"
        :page-size="listParams.pageSize"
        :current="listParams.pageNum"
        @on-change="pageChange"
        class-name="e-page"
      />
    </Footer>
    <!--项目信息编辑 -->
    <Modal
      v-model="proEditModal"
      title="修改项目信息"
      width="800"
    >
      <Form
        ref="proEditForm"
        :model="proEditForm"
        :rules="proFormRule"
        :label-width="80"
        label-position="left"
      >
        <p class="form-title">
          项目信息
        </p>
        <Row :gutter="32">
          <Col span="12">
          <FormItem
            label="项目名称"
            prop="projectName"
          >
            <Input v-model.trim="proEditForm.projectName"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            label="项目编码"
            prop="projectCode"
          >
            <Input v-model.trim="proEditForm.projectCode"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            label="项目概述"
            prop="overview"
          >
            <Input
              type="textarea"
              v-model.trim="proEditForm.overview"
            ></Input>
          </FormItem>
          </Col>
        </Row>
        <p class="form-title">
          人员信息
        </p>
        <Row :gutter="32">
          <Col span="12">
          <FormItem
            label="指定管理员"
            prop="projectAdmin"
          >
            <Input v-model.trim='proEditForm.projectAdmin'></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button
          type="primary"
          @click="proEditSave('proEditForm')"
        >保存</Button>
      </div>
    </Modal>
    <!-- 配置元素信息 -->
    <Modal
      v-model="proSetModal"
      title="配置"
      width="800"
    >
      <Form
        ref="proSetForm"
        :model="proSetForm"
        :label-width="100"
        label-position="left"
      >
        <p class="form-title">
          配置元素信息
        </p>
        <Row :gutter="32">
          <Col span="12">
          <FormItem
            label="案例最大数量"
            prop="maxCaseNum"
          >
            <Input v-model.trim="proSetForm.maxCaseNum"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            label="最大用户数量"
            prop="maxUserNum"
          >
            <Input v-model.trim="proSetForm.maxUserNum"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            label="文献接口"
            prop="paperUrl"
          >
            <Input v-model.trim="proSetForm.paperUrl"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            label="是否在线翻译"
            prop="isTranslate"
          >
            <Input v-model.trim="proSetForm.isTranslate"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            label="医学字典"
            prop="medicalDic"
          >
            <Input v-model.trim="proSetForm.medicalDic"></Input>
          </FormItem>
          </Col>
        </Row>

      </Form>
      <div slot="footer">
        <Button
          type="primary"
          @click="proSetSave('proSetForm')"
        >保存</Button>
      </div>
    </Modal>
  </Layout>
</template>
<script>
import {
  apiGetProjectList,
  apiPutProject,
  apiDeleteProject
} from "api/system/project-api.js";
import { resCode } from "common/js/code.js";
import { PROCESS_CODE } from "common/js/constant.js";
export default {
  data() {
    return {
      proEditIndex: "",
      proEditModal: false, //修改model
      proEditForm: {
        projectName: "",
        projectCode: "",
        overview: ""
      },
      proSetModal: false, //配置元素model，
      proSetForm: {
        maxUserNum: "",
        maxCaseNum: "",
        paperUrl: "",
        isTranslate: "",
        medicalDic: ""
      },
      proFormRule: {
        projectName: [{ required: true, message: " ", trigger: "blur" }],
        projectCode: [{ required: true, message: " ", trigger: "blur" }],
        overview: [
          { required: true, message: " ", trigger: "blur" },
          {
            type: "string",
            max: 200,
            message: "字符长度不能超过200",
            trigger: "blur"
          }
        ]
      },
      proColums: [
        {
          title: "序号",
          type: "index",
          algin: "center",
          width: 80
        },
        {
          title: "项目名称",
          key: "projectName"
        },
        {
          title: "项目编码",
          key: "projectCode"
        },
        {
          title: "项目概述",
          key: "overview"
        },
        {
          title: "管理员数量",
          key: "adminNum"
        },
        {
          title: "案例最大数量",
          key: "maxCaseNum"
        },
        {
          title: "用户最大数量",
          key: "maxUserNum"
        },
        {
          title: "文献接口",
          key: "paperUrl"
        },
        {
          title: "是否在线翻译",
          key: "isTranslate",
          render: (h, params) => {
            return h("div", {}, params.row.isTranslate == 1 ? "是" : "否");
          }
        },
        {
          title: "医学字典",
          key: "medicalDic"
        },
        {
          title: "流程配置",
          width: 150,
          render: (h, params) => {
            //按照sequence对流程配置字段进行排序
            let sortFun = (a, b) => {
              return a.sequence - b.sequence;
            };
            let _sortList = params.row.processNodes.slice().sort(sortFun);
            let _process = _sortList.map(val => {
              return PROCESS_CODE[val.nodeCode];
            });
            let _sortStr = _process.join("-");
            return h(
              "Tooltip",
              {
                props: {
                  type: "text",
                  className: "tooltip-hover"
                }
              },
              [
                h(
                  "p",
                  {
                    style: {
                      width: "110px",
                      "text-overflow": "ellipsis",
                      "white-space": "nowrap",
                      overflow: "hidden"
                    }
                  },
                  _sortStr
                ),
                h(
                  "div",
                  {
                    slot: "content",
                    style: {
                      "white-space": "normal",
                      width: "120px"
                    }
                  },
                  _sortStr
                )
              ]
            );
          }
        },
        {
          title: "操作",
          width: 80,
          algin: "center",
          render: (h, params) => {
            return h(
              "Dropdown",
              {
                class: "e-dropdown",
                on: {
                  "on-click": name => {
                    switch (name) {
                      case 1:
                        //项目基本信息修改
                        this.$refs["proEditForm"].resetFields();
                        this.proEditModal = true;
                        this.proEditForm.projectName = params.row.projectName;
                        this.proEditForm.projectCode = params.row.projectCode;
                        this.proEditForm.overview = params.row.overview;
                        this.proEditForm.projectId = params.row.projectId;
                        this.proEditIndex = params.index;
                        break;
                      case 2:
                        //项目元素配置
                        this.$refs["proSetForm"].resetFields();
                        this.proSetModal = true;
                        this.proSetForm.maxUserNum = params.row.maxUserNum;
                        this.proSetForm.maxUserNum = params.row.maxUserNum;
                        this.proSetForm.paperUrl = params.row.paperUrl;
                        this.proSetForm.medicalDic = params.row.medicalDic;
                        this.proSetForm.isTranslate = params.row.isTranslate;
                        this.proEditIndex = params.index;
                        break;
                      case 3:
                        //删除
                        this.$Modal.confirm({
                          title: "提示",
                          content: "确认要删除这条数据吗",
                          onOk: () => {
                            this.proDelete(params.row.projectId);
                          }
                        });
                    }
                  }
                }
              },
              [
                h("i", {
                  class: "iconfont iconcaozuo",
                  style: {
                    cursor: "pointer"
                  }
                }),
                h(
                  "DropdownMenu",
                  {
                    slot: "list"
                  },
                  [
                    h(
                      "DropdownItem",
                      {
                        props: {
                          name: 1
                        }
                      },
                      "修改"
                    ),
                    h(
                      "DropdownItem",
                      {
                        props: {
                          name: 2
                        }
                      },
                      "配置"
                    ),
                    h(
                      "DropdownItem",
                      {
                        props: {
                          name: 3
                        }
                      },
                      "删除"
                    )
                  ]
                )
              ]
            );
          }
        }
      ],
      listParams: {
        pageNum: 1,
        pageSize: 10,
        name: ""
      },
      proListData: [],
      listTotal: 0
    };
  },
  methods: {
    //初始化
    init() {
      this.getProList();
    },
    //获取项目列表
    getProList() {
      apiGetProjectList(this.listParams).then(res => {
        if (res.status) {
          this.proListData = res.data.dataList;
          this.listTotal = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    //分页改变
    pageChange(num) {
      this.listParams.pageNum = num;
      this.getProList();
    },
    //项目基本信息修改保存
    proEditSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          apiPutProject(this.proEditForm).then(res => {
            if (res.status) {
              this.$Message.success("项目修改成功");
              let _index = this.proEditIndex;
              this.proListData[
                _index
              ].projectName = this.proEditForm.projectName;
              this.proListData[
                _index
              ].projectCode = this.proEditForm.projectCode;
              this.proListData[_index].overview = this.proEditForm.overview;
              this.proEditModal = false;
            } else {
              this.$Message.error(resCode(this, res.code));
            }
          });
        }
      });
    },
    //流程配置保存
    proSetSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          apiPutProject(this.proEditForm).then(res => {
            if (res.status) {
              this.$Message.success("项目修改成功");
              let _index = this.proEditIndex;
              this.proListData[_index].maxCaseNum = this.proSetForm.maxCaseNum;
              this.proListData[_index].maxUserNum = this.proSetForm.maxUserNum;
              this.proListData[_index].paperUrl = this.proSetForm.paperUrl;
              this.proListData[_index].medicalDic = this.proSetForm.medicalDic;
              this.proListData[
                _index
              ].isTranslate = this.proSetForm.isTranslate;
              this.proSetModal = false;
            } else {
              this.$Message.error(resCode(this, res.code));
            }
          });
        }
      });
    },
    //项目删除
    proDelete(companyId) {
      apiDeleteProject(companyId).then(res => {
        if (res.status) {
          this.$Message.success("项目删除成功");
          if (this.proListData.length == 1 && this.listParams.pageNum > 1) {
            this.listParams.pageNum--;
          }
          this.getProList();
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    //列表搜索
    listSearch() {
      this.listParams.pageNum = 1;
      this.getProList();
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/css/variable";
@import "../../../common/css/mixin";
.header {
  display: flex;
  justify-content: space-between;
}
.form-title {
  color: $font-color-content;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
<style lang="scss" >
@import "../../../common/css/mixin";
.e-page {
  @include e-page($color-theme);
}
.e-dropdown {
  @include e-dropdown();
}
</style>



