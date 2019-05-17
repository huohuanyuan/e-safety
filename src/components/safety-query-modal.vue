/*
 * @Author: liuhaosheng 
 * @Date: 2019-04-10 13:08:44 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-22 16:44:50
 * 质疑 的 对话框
 */
<template>
  <div>
    <Modal
      class="question-modal"
      v-model="modalShow"
      :closable="false"
      :mask-closable="false"
      :width="900"
    >
      <p class="title"> 质疑 </p>
      <div class="content">
        <div class="content-top">
          <p> 案例编号：{{ caseNo }} </p>
          <p v-if="addShow"> 质疑内容：{{ pageName }} <span v-if="dataName != undefined"> -> {{dataName}}</span> </p>
          <p
            class="case-router"
            v-else
            @click="clickCaseFun(data)"
          > 质疑内容：<span> {{ pageName }} </span> <span v-if="dataNameOwn != undefined "> -> {{ dataNameOwn}} </span> </p>
        </div>
        <div class="content-mid">
          <p> 质疑流程 </p>
          <Steps :current="stepsCurrent">
            <Step title="质疑起草"></Step>
            <Step title="发送质疑"></Step>
            <Step title="质疑回复"></Step>
            <Step title="质疑关闭"></Step>
          </Steps>
        </div>
        <div class="content-bottom">
          <div v-if="addShow">
            <ul>
              <li>
                <p> <span> 质疑起草 </span> &nbsp;&nbsp; {{ name }} &nbsp;&nbsp; {{ email}} </p>
                <Input
                  v-model="draftTextarea"
                  type="textarea"
                  :maxlength="500"
                  :rows="4"
                />
              </li>
            </ul>
          </div>
          <div v-else>
            <ul
              v-for="(item,index) in queryDetailList"
              :key="index"
            >
              <li v-if="item.detailType == 1">
                <p> <span> 质疑起草 </span> &nbsp;&nbsp; {{ item.spokesmanName}} &nbsp;&nbsp; {{ item.spokesmanEmail}} &nbsp;&nbsp; {{ item.gmtCreate | moment}}</p>
                <Input
                  v-model="item.comment"
                  type="textarea"
                  disabled
                  :rows="3"
                />
              </li>
              <li v-if="item.detailType == 2">
                <p> <span> 质疑回复 </span> &nbsp;&nbsp; {{ item.spokesmanName}} &nbsp;&nbsp; {{ item.spokesmanEmail}} &nbsp;&nbsp; {{ item.gmtCreate | moment}} </p>
                <Input
                  v-model="item.comment"
                  disabled
                  type="textarea"
                  :rows="3"
                />
              </li>
              <li v-if="item.detailType == 3">
                <p> <span> 质疑关闭 </span> &nbsp;&nbsp; {{ item.spokesmanName}} &nbsp;&nbsp; {{ item.spokesmanEmail}} &nbsp;&nbsp; {{ item.gmtCreate | moment}} </p>
              </li>
            </ul>
            <li v-if="quertionReplyShow">
              <p> <span> 质疑回复 </span> &nbsp;&nbsp; {{ queryOwnerName }} &nbsp;&nbsp; {{ email}}</p>
              <Input
                v-model="replyComment"
                type="textarea"
                :maxlength="500"
                :rows="3"
              />
            </li>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button
          size="large"
          @click="cancelFun"
        > 取消 </Button>
        <Button
          type="primary"
          size="large"
          v-if="shutShow"
          @click="putQueryClose"
        > 质疑关闭 </Button>
        <!-- 质疑回复按钮 -->
        <Button
          type="primary"
          size="large"
          v-if="replyShow"
          @click="postQueryDetail"
        > 质疑回复 </Button>
        <!--  质疑提交按钮 -->
        <Button
          type="primary"
          size="large"
          v-if="saveShow"
          @click="questionSave"
        > 提交 </Button>
      </div>
    </Modal>
    <Modal
      class="question-modal"
      v-model="queryUserModal"
      :closable="false"
      :mask-closable="false"
      :width="480"
    >
      <p class="title"> 发送质疑 </p>
      <div class="content content-query">
        <Select
          v-model="queryReceiver"
          filterable
        >
          <Option
            v-for="item in userList"
            :value="item.operator"
            :key="item.operator"
          >{{ item.operatorName }}</Option>
        </Select>
      </div>
      <div slot="footer">
        <Button
          size="large"
          @click="queryUserModalFun"
        > 取消 </Button>
        <Button
          type="primary"
          size="large"
          @click="postQuery"
        > 提交 </Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import qs from "qs";
import moment from "moment";
import { resCode } from "common/js/code.js";
import { CASE_CODE } from "common/js/constant.js";
import { caseQueryRouter } from "common/js/unit.js";

import {
  apiPostQuery,
  getCaseProcessTaskUser,
  apiPutQueryClose,
  apiGetQueryCon,
  apiPostQueryDetail
} from "./../api/query/query-api.js";

export default {
  props: {
    uid: "",
    id: [Number, String], // 传过来的 queryId
    caseNo: [Number, String], // case 编码
    modalShow: Boolean, // 控制模态框
    queryType: Number, // 传过来的质疑对象;1:page; 2:item
    dataId: [Number, String], // 数据项id
    dataName: String //
  },
  data() {
    return {
      addShow: true,
      shutShow: false, // 质疑关闭按钮
      saveShow: false, // 质疑提交的按钮
      replyShow: false, // 质疑回复的按钮
      quertionReplyShow: false, // 质疑回复的框
      queryOwnerName: "", // 回复者的名字
      replyComment: "", // 回复的信息
      stepsCurrent: 0,
      queryUserModal: false,
      userList: [],
      draftTextarea: "",
      queryReceiver: "",
      caseId: "",
      pageId: "",
      queryDetailList: [],
      pageName: "",
      dataNameOwn: this.dataName,
      data: {
        pageId: "",
        caseId: ""
      }
    };
  },
  methods: {
    //
    init() {
      if (this.id) {
        this.addShow = false;
        this.saveShow = false;
        this.replyComment = "";
        this.getQueryCon();
      } else {
        this.addShow = true;
        this.replyShow = false;
        this.saveShow = true;
        this.draftTextarea = "";
        this.determineFun();
        this.pageNameFun(this.pageId);
      }
    },
    // 判断是否有 caseId /pageId
    determineFun() {
      if (this.$route.query.pageId) {
        this.pageId = this.$route.query.pageId;
      }
      if (this.$route.query.caseId) {
        this.caseId = this.$route.query.caseId;
      }
    },
    // 点击 提交按钮
    questionSave() {
      if (this.draftTextarea == "") {
        this.$Message.warning("请填写质疑详情");
      } else {
        this.$emit("cancelModalFun");
        this.queryUserModal = true;
        this.getCaseProcessTaskUser();
      }
    },
    // 点击 取消按钮
    cancelFun() {
      this.$emit("cancelModalFun");
    },
    // 打开质疑模态框
    showFun() {
      this.$emit("shwoModalFun");
    },
    // 根据案例ID查询案例已操作流程节点用户信息
    getCaseProcessTaskUser() {
      let _data = {
        caseId: this.caseId
      };
      getCaseProcessTaskUser(_data).then(res => {
        if (res.status) {
          this.userList = res.data.dataList;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 新建质疑
    postQuery() {
      let _data = {
        caseId: this.caseId,
        pageId: this.pageId,
        queryObj: this.queryType,
        dataId: this.dataId,
        queryReceiver: this.queryReceiver,
        queryDetailVO: {
          comment: this.draftTextarea
        }
      };
      if (this.queryReceiver == "") {
        this.$Message.warning("请选择质疑人员！");
      } else {
        apiPostQuery(_data).then(res => {
          if (res.status) {
            this.$Message.success(this.$t("common.success"));
            this.queryUserModal = false;
            this.cancelFun();
            this.$store.commit("setQueryIdStr", {
              queryId: res.data,
              uid: this.uid
            });
          } else {
            this.$Message.error(resCode(this, res.code));
          }
        });
      }
    },
    // 关闭质疑
    putQueryClose() {
      let _data = {
        queryId: this.id
      };
      apiPutQueryClose(qs.stringify(_data)).then(res => {
        if (res.status) {
          this.$Message.success(this.$t("common.success"));
          this.cancelFun();
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 查看质疑及质疑详细
    getQueryCon() {
      apiGetQueryCon(this.id).then(res => {
        if (res.status) {
          this.data.caseId = res.data.caseId;
          this.data.pageId = res.data.pageId;
          this.caseId = res.data.caseId;
          this.pageId = res.data.pageId;
          this.pageNameFun(res.data.pageId);
          if (res.data.dataName) {
            this.dataNameOwn = res.data.dataName;
          }
          this.queryOwnerName = res.data.queryOwnerName;
          this.queryDetailList = res.data.queryDetailBOList;
          // 判断是否显示 关闭质疑按钮
          if (this.userId == res.data.queryAuthor) {
            this.shutShow = true;
          } else {
            this.shutShow = false;
          }
          // 判断显示状态
          if (this.queryDetailList.length == 1) {
            this.stepsCurrent = 1;
          } else {
            this.stepsCurrent = 2;
          }
          // 判断是否显示质疑提交按钮
          if (
            this.queryDetailList[this.queryDetailList.length - 1].detailType ==
            3
          ) {
            this.saveShow = false;
            this.replyShow = false;
            this.shutShow = false;
            this.stepsCurrent = 3;
            this.quertionReplyShow = false;
          } else {
            if (this.userId == res.data.queryOwner) {
              this.replyShow = true;
              this.saveShow = false;
              this.quertionReplyShow = true;
            } else {
              this.saveShow = false;
              this.replyShow = false;
              this.quertionReplyShow = false;
            }
          }
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 质疑回复
    postQueryDetail() {
      let _data = {
        queryId: this.id,
        comment: this.replyComment
      };
      if (this.replyComment == "") {
        this.$Message.warning("请填写回复详情！");
      } else {
        apiPostQueryDetail(_data).then(res => {
          if (res.status) {
            this.$Message.success(this.$t("common.success"));
            this.cancelFun();
          } else {
            this.$Message.error(resCode(this, res.code));
          }
        });
      }
    },
    // 显示 pageName
    pageNameFun(key) {
      this.pageName = CASE_CODE[key];
      return this.pageName;
    },
    clickCaseFun(data) {
      caseQueryRouter(data);
    },
    queryUserModalFun() {
      this.showFun();
      this.queryUserModal = false;
    }
  },
  computed: {
    userId() {
      return localStorage.getItem("userId");
    },
    email() {
      // 当前登录者的 email
      return localStorage.getItem("email");
    },
    name() {
      // 当前登录者的 email
      return localStorage.getItem("name");
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
@import "../common/css/variable";

.question-modal {
  .ivu-modal-body {
    font-size: 14px;
    padding: 0;
  }
  .content-query {
    height: 200px;
  }
  .ivu-input[disabled] {
    color: #737679;
  }
  .case-router {
    span {
      color: $color-theme-btn;
      cursor: pointer;
      font-weight: bold;
      text-decoration: underline;
    }
  }
  .title {
    background: $color-theme-btn;
    font-size: 16px;
    color: #fff;
    padding: 12px;
    font-weight: bold;
  }
  .content {
    padding: 20px;
  }
  .content-top {
    padding: 10px;
    border: 1px dashed $color-border-case;
  }
  .content-mid {
    p:first-child {
      font-size: 15px;
      font-weight: bold;
      margin: 15px 0;
    }
  }
  .content-bottom {
    margin: 20px 0;
    li {
      margin: 10px 0;
      p {
        padding: 5px 0;
      }
      span {
        font-weight: bold;
      }
    }
  }
  .title-p {
    font-size: 15px;
    font-weight: bold;
    margin: 10px 0;
  }
  .user-ul {
    .ivu-radio-group {
      width: 100%;
    }
    .ivu-radio-wrapper {
      float: right;
      right: 100px;
    }
  }
}
</style>


