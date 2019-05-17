/*
 * @Author: chengshanshan 
 * @Date: 2019-03-12 13:34:52 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-03-26 16:40:34
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
              placeholder="请输入用户名称或公司名称"
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
            :to="{name:'USER_ADD'}"
          >新建</Button>
        </div>
      </div>
    </Header>
    <Content>
      <Table
        size="small"
        :columns="userColums"
        :data="userListData"
      ></Table>
    </Content>
    <Footer>
      <Page
        :total="listTotal"
        :current="listParams.pageNum"
        :page-size="listParams.pageSize"
        @on-change="pageChange"
        class-name="e-page"
      />
    </Footer>
    <Modal
      v-model="userEditModal"
      title="用户信息"
      width="800"
    >
      <Form
        :label-width="80"
        label-position="left"
        ref="userEditForm"
        :model="userEditForm"
        :rules="userFormRule"
      >
        <Row :gutter="64">
          <Col span="12">
          <FormItem
            label="用户名称"
            prop="name"
          >
            <Input v-model.trim="userEditForm.name"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem
            label="用户邮箱"
            prop="email"
          >
            <Input v-model.trim="userEditForm.email"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="联系电话">
            <Input v-model.trim="userEditForm.mobile"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
          <FormItem label="所属公司">
            <Select v-model="userEditForm.companyId">
              <Option
                v-for="item in companyList"
                :value="item.companyId"
                :key="item.companyId"
              >{{ item.companyName }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button
          type="primary"
          @click="userEditSave('userEditForm')"
        >保存</Button>
      </div>
    </Modal>
  </Layout>
</template>
<script>
import {
  apiGetUserList,
  apiPutUser,
  apiDeleteUser,
  apiLockActiveUser
} from "api/system/user-api.js";
import { apiGetCompanyList } from "api/system/company-api.js";
import { resCode } from "common/js/code.js";
export default {
  data() {
    return {
      userEditModal: false,
      userEditForm: {
        name: "",
        email: "",
        mobile: "",
        companyId: ""
      },
      userFormRule: {
        name: [
          { required: true, message: " ", trigger: "blur" },
          {
            type: "string",
            max: 24,
            message: "用户名称长度不能超过24位",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: " ", trigger: "blur" },
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          },
          {
            max: 32,
            message: "邮箱长度不能超过32位",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            max: 20,
            message: "联系电话不能超过20位",
            trigger: "blur"
          }
        ]
      },
      userColums: [
        {
          title: "序号",
          type: "index",
          algin: "center",
          width: 80
        },
        {
          title: "用户名",
          key: "name"
        },
        {
          title: "联系电话",
          key: "mobile"
        },
        {
          title: "电子邮箱",
          key: "email"
        },
        {
          title: "所属公司",
          key: "companyName"
        },
        {
          title: "状态",
          key: "activated",
          render: (h, params) => {
            return h("div", {}, params.row.activated ? "激活" : "冻结");
          }
        },
        {
          title: "操作",
          width: 80,
          algin: "center",
          render: (h, params) => {
            // return h(" 定义的元素 "，{ 元素的性质 }，" 元素的内容"/[元素的内容])
            // { 元素的性质 }=>{attr:{自带属性},props:{定义属性},style:{样式},on:{事件}}
            return h( // 创建下拉列表
              "Dropdown",
            {class: "e-dropdown",
            on: { // 下拉列表的单击事件，获取下拉后选中的值
                  "on-click": name => {
                    switch (name) {
                      case 1:
                        //用户基本信息修改
                        this.$refs["userEditForm"].resetFields();
                        this.userEditModal = true;
                        this.userEditForm.userId = params.row.userId;
                        this.userEditForm.name = params.row.name;
                        this.userEditForm.email = params.row.email;
                        this.userEditForm.mobile = params.row.mobile;
                        this.userEditForm.companyId = params.row.companyId;
                        this.userEditIndex = params.index;
                        break;
                      case 2:
                        //激活/冻结 1:激活，0：冻结
                        this.userLockOrActive(
                          params.row.userId,
                          params.row.activated
                        );
                        this.userEditIndex = params.index;
                        break;
                      case 3:
                        //删除
                        this.$Modal.confirm({
                          title: "提示",
                          content: "确认要删除这条数据吗",
                          onOk: () => {
                            this.userDelete(params.row.userId);
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
                h("DropdownMenu",{ //下拉列表实例
                    slot: "list"
                  },
                  [
                    h( // 下拉列表项
                      "DropdownItem",
                      {
                        props: {
                          name: 1
                        }
                      },
                      "修改"
                    ),
                    h( // 下拉列表项
                      "DropdownItem",
                      {
                        props: {
                          name: 2
                        }
                      },
                      !params.row.activated ? "激活" : "冻结"
                    ),
                    h( // 下拉列表项
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
      userListData: [],
      listParams: {
        pageNum: 1,
        pageSize: 10,
        name: ""
      },
      listTotal: 0,
      companyList: []
    };
  },
  methods: {
    //初始化
    init() {
      this.getUserList();
      this.getCompanyList();
    },
    // 请求公司list
    getCompanyList() {
      apiGetCompanyList().then(res => {
        if (res.status) {
          this.companyList = res.data.dataList;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 请求用户 list
    getUserList() {
      apiGetUserList(this.listParams).then(res => {
        if (res.status) {
          this.userListData = res.data.dataList;
          this.listTotal = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 分页
    pageChange(pageNum) {
      this.listParams.pageNum = pageNum;
      this.getUserList();
    },
    //修改用户
    userEditSave(name) {     
      this.$refs[name].validate(valid => {
        if (valid) {
          apiPutUser(this.userEditForm).then(res => {
            if (res.status) {
              this.$Message.success("用户信息修改成功");           
              this.getUserList();  
              this.userEditModal = false;
            } else {
              this.$Message.error(resCode(this, res.code));
            }
          });
        }
      });
    },
    //删除用户
    userDelete(userId) {
      apiDeleteUser(userId).then(res => {
        if (res.status) {
          this.$Message.success("用户删除成功");
          if (this.userListData.length == 1 && this.listParams.pageNum > 1) { // 判断当前页是不是只有一项删除后，就返回上一页
            this.listParams.pageNum--;
          }
          this.getUserList();
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    //冻结用户
    userLockOrActive(userId, isActive) {
      //1:激活，0：冻结
      let _activated = isActive ? 0 : 1;
      apiLockActiveUser({ userId: userId, activated: _activated }).then(res => {
        if (res.status) {
          this.$Message.success("用户状态已修改");
          let _index = this.userEditIndex;
          this.userListData[_index].activated = !isActive;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    //列表搜索
    listSearch() {
      this.listParams.pageNum = 1;
      this.getUserList();
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
.e-page {
  @include e-page( $color-theme);
}
</style>



