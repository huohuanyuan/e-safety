/*
 * @Author: chengshanshan 
 * @Date: 2019-03-12 13:34:52 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-03-26 16:32:30
 * @instructions:用户管理列表
 */
 
<template>
  <Layout :style="{'height': '100%'}">
    <Header>
      <div class="header">
        <Form inline>
          <FormItem>
            <Input type="text"  v-model="listParams.companyName" placeholder="请输入公司名称"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="listSearch">查询</Button>
          </FormItem>
        </Form>
        <div>
          <Button
            type="primary"
            :to="{name:'COM_ADD'}"
          >新建</Button>
        </div>
      </div>
    </Header>
    <Content>
      <Table
        size="small"
        :columns="comColums"
        :data="comListData"
      ></Table>
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
    <!--公司信息编辑 -->
    <Modal
      v-model="comEditModal"
      title="修改公司信息"
    >
      <Form
        ref="comEditForm"
        :model="comEditForm"
        :rules="comValidate"
        :label-width="80"
        label-position="left"
      >
        <Row :gutter="32">
          <Col span="12">
          <FormItem
            label="公司名称"
            prop="companyName"
          >
            <Input v-model.trim="comEditForm.companyName"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            label="联系人"
            prop="contacts"
          >
            <Input v-model.trim="comEditForm.contacts"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            label="联系电话"
            prop="phone"
          >
            <Input v-model.trim="comEditForm.phone"></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button
          type="primary"
          @click="comEditSave"
        >保存</Button>
      </div>
    </Modal>
  </Layout>
</template>
<script>
import {
  apiGetCompanyList,
  apiPutCompany,
  apiDeleteCompany
} from "api/system/company-api.js";
import { resCode } from "common/js/code.js";
export default {
  data() {
    return {
      comEditModal: false,
      comEditForm: {
        companyName: "",
        contacts: "",
        phone: ""
      },
      comEditIndex: "",
      comValidate: {
        companyName: [{ required: true, message: " ", trigger: "blur" }],
        contacts: [{ required: true, message: " ", trigger: "blur" }],
        phone: [{ required: true, message: " ", trigger: "blur" }]
      },
      comColums: [
        {
          title: "序号",
          type: "index",
          algin: "center",
          width: 80
        },
        {
          title: "公司名称",
          key: "companyName"
        },
        {
          title: "联系人",
          key: "contacts"
        },
        {
          title: "联系电话",
          key: "phone"
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
                        //编辑
                        this.$refs["comEditForm"].resetFields();
                        this.comEditModal = true;
                        this.comEditForm.companyName = params.row.companyName;
                        this.comEditForm.contacts = params.row.contacts;
                        this.comEditForm.phone = params.row.phone;
                        this.comEditForm.companyId = params.row.companyId;
                        this.comEditIndex = params.index;
                        break;
                      case 2:
                        //删除
                        this.$Modal.confirm({
                          title: "提示",
                          content: "确认要删除这条数据吗",
                          onOk: () => {
                            this.comDelete(params.row.companyId);
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
                      "编辑"
                    ),
                    h(
                      "DropdownItem",
                      {
                        props: {
                          name: 2
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
        companyName: ""
      },
      listTotal: 0,
      comListData: []
    };
  },
  methods: {
    //初始化
    init() {
      this.getCompanyList();
    },
    //获取公司list
    getCompanyList() {
      apiGetCompanyList(this.listParams).then(res => {
        if (res.status) {
          this.comListData = res.data.dataList;
          this.listTotal = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    //分页
    pageChange(num) {
      this.listParams.pageNum = num;
      this.getCompanyList();
    },
    //修改公司信息保存
    comEditSave() {
      this.$refs["comEditForm"].validate(valid => {
        if (valid) {
          apiPutCompany(this.comEditForm).then(res => {
            if (res.status) {
              this.$Message.success("公司修改成功");
              let _index = this.comEditIndex;
              this.comListData[_index].companyName = this.comEditForm.companyName;
              this.comListData[_index].contacts = this.comEditForm.contacts;
              this.comListData[_index].phone = this.comEditForm.phone;
              this.comEditModal = false;
            } else {
              this.$Message.error(resCode(this, res.code));
            }
          });
        }
      });
    },
    //公司删除
    comDelete(companyId) {
      apiDeleteCompany(companyId).then(res => {
        if (res.status) {
          this.$Message.success("公司删除成功");
             if(this.comListData.length == 1 && this.listParams.pageNum>1){
            this.listParams.pageNum--;
          }
          this.getCompanyList();
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    //搜索
    listSearch(){
      this.listParams.pageNum = 1;
      this.getCompanyList();
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
</style>
<style lang="scss" >
@import "../../../common/css/mixin";
@import "../../../common/css/variable";
.e-page {
  @include e-page( $color-theme);
}
.e-dropdown {
  @include e-dropdown();
}
</style>



