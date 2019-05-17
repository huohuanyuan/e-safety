/*
 * @Author: chengshanshan 
 * @Date: 2019-03-12 13:34:52 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-04-10 10:56:04
 * @instructions:新建项目
 */
<template>
  <Layout :style="{'height': '100%'}">
    <Header>
      <safety-nav-header>
        <template slot="title">
          新建项目
        </template>
        <template slot="back">
          <router-link :to="{name:'PRO_LIST'}">返回</router-link>
        </template>
      </safety-nav-header>
    </Header>
    <!-- satrt 第一步：新建项目基本信息 -->
    <Content v-show="showWrap == 1">
      <safety-content-outer>
        <template slot="content">
          <Form
            :label-width="100"
            label-position="left"
            ref="proFormData"
            :model="proFormData"
            :rules="proFormRule"
          >
            <p class="form-title">
              项目信息
            </p>
            <Row :gutter="64">
              <Col span="12">
              <FormItem
                label="项目名称"
                prop="projectName"
              >
                <Input v-model.trim='proFormData.projectName'></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem
                label="项目编码"
                prop="projectCode"
              >
                <Input v-model.trim='proFormData.projectCode'></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem
                label="项目概述"
                prop="overview"
              >
                <Input
                  type="textarea"
                  v-model.trim='proFormData.overview'
                ></Input>
              </FormItem>
              </Col>
            </Row>
            <p class="form-title">
              人员信息
            </p>
            <Row :gutter="64">
              <Col span="12">
              <FormItem
                label="指定管理员"
                prop="projectAdmin"
              >
                <Select
                  v-model="proFormData.projectAdmin"
                  filterable
                  remote
                  :remote-method="remoteSearch"
                  :loading="searchLoading"
                  clearable
                >
                  <Option
                    v-for="(option, index) in userList"
                    :value="option.userId"
                    :key="userId"
                  >{{option.name}}</Option>
                </Select>
              </FormItem>
              </Col>
            </Row>
            <p class="form-title">
              配置元素信息
            </p>
            <Row :gutter="64">
              <Col span="12">
              <FormItem
                label="案例最大数量"
                prop="maxCaseNum"
              >
                <Input v-model.trim='proFormData.maxCaseNum'></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem
                label="最大用户数量"
                prop="maxUserNum"
              >
                <Input v-model.trim='proFormData.maxUserNum'></Input>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem
                label="文献接口"
                prop="paperUrl"
              >
                <Select
                  v-model="proFormData.paperUrl"
                  clearable
                >
                  <Option value="1">知网</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem
                label="是否在线翻译"
                prop="isTranslate"
              >
                <Select
                  v-model="proFormData.isTranslate"
                  clearable
                >
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem
                label="医学字典"
                prop="medicalDic"
              >
                <Select
                  v-model="proFormData.medicalDic"
                  clearable
                >
                  <Option
                    v-for="(item,index) of meddraList"
                    :value='item.meddraId'
                    :key="item.meddraId"
                  >{{item.name}}&nbsp;&nbsp;V{{item.version}}</Option>
                </Select>
              </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button
                type="primary"
                @click="firstStepSave('proFormData')"
              >下一步</Button>
            </FormItem>

          </Form>

        </template>
        <template slot="btns">
          <Button
            type="primary"
            @click="firstStepSave('proFormData')"
          >保存</Button>
        </template>
      </safety-content-outer>
    </Content>
    <!-- end 第一步 -->
    <!-- satrt 第二步：配置项目流程 -->
    <Content v-show="showWrap == 2">
      <safety-content-outer>
        <template slot="content">
          <p class="form-title">
            流程信息
          </p>
          <p>*拖拽标签进行流程设置</p>
          <Row :gutter="64">
            <Col span="12">
            <!-- 排序后 -->
            <draggable
              class="pro-list"
              :list="processOrderList"
              group="processGroup"
              @change="sortChange"
              v-bind="dragOptions"
              draggable=".draggable"
            >
              <div
                class="item"
                v-for="(element, index) in processOrderList"
                :key="element.name"
                :class="{'draggable':isDraggable}"
              >
                <div class="cell">
                  <span class="num">{{index+1}}</span>
                  <span class="text"> {{element.name}}</span>
                </div>

              </div>
            </draggable>

            <!-- 排序的tag -->
            <draggable
              class="pro-sort-list"
              :list="processList"
              @change="sortChange"
              group="processGroup"
              draggable=".item"
            >
              <div
                class="item"
                v-for="(element, index) in processList"
                :key="element.name"
              >
                {{ element.name }}
              </div>
            </draggable>
            </Col>
          </Row>
        </template>
        <template slot="btns">
          <Button
            type="primary"
            @click="secondStepSave()"
          >保存</Button>
        </template>
      </safety-content-outer>
    </Content>
    <!-- end 第二步 -->
  </Layout>
</template>
<script>
import SafetyNavHeader from "components/safety-nav-header";
import SafetyContentOuter from "components/safety-content-outer";
import SafetySplit from "components/safety-split";
import draggable from "vuedraggable";
import {
  apiPostProject,
  apiGetAdminList,
  apiGetMeddraList,
  apiPostSetProcess
} from "api/system/project-api.js";
import {PROCESS_CODE_ADMIN}  from "common/js/constant.js"
import qs from "qs";
export default {
  components: {
    SafetyNavHeader,
    SafetyContentOuter,
    SafetySplit,
    draggable
  },
  data() {
    return {
      showWrap: 1,
      dragOptions: {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      },
      isDraggable: true, //是否允许拖动  
      processList: [],
      proFormData: {
        projectCode: "",
        projectName: "",
        overview: "",
        projectAdmin: "",
        maxCaseNum: "",
        maxUserNum: "",
        paperUrl: "",
        medicalDic: "",
        process: "",
        isTranslate: "",
        companyId: ""
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
      meddraList: [], //医学字典list
      userList: [], //指定管理员list
      searchLoading: false, //远程搜索loading
      currProjectId: "" //保存第一步创建成功的项目id，设置流程时使用
    };
  },
  computed:{
    processOrderList() {
      let _arr = [];
      for(let k in PROCESS_CODE_ADMIN){
        _arr.push({code:k,name:PROCESS_CODE_ADMIN[k]})
      }
      return _arr;
    }
  },
  methods: {
    //初始化
    init() {
      this.getMeddraList();
      this.showWrap = 1;
    },
    //获取医学字典
    getMeddraList() {
      apiGetMeddraList().then(res => {
        if (res.status) {
          this.meddraList = res.data;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    //拖拽排序时调用
    sortChange: function(evt) {
      //流程移除的剩一个时禁止拖拽
      if (this.processOrderList.length == 1) {
        this.isDraggable = false;
      } else {
        this.isDraggable = true;
      }
    },
    //新建项目保存
    firstStepSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          apiPostProject(this.proFormData).then(res => {
            if (res.status) {
              this.showWrap = 2;
              this.currProjectId = res.data;
            } else {
              this.$Message.error(resCode(this, res.code));
            }
          });
        }
      });
    },
    remoteSearch(query) {
      if (query !== "") {
        this.searchLoading = true;
        apiGetAdminList({ name: query }).then(res => {
          if (res.status) {
            this.searchLoading = false;
            this.userList = res.data;
          } else {
            this.$Message.error(resCode(this, res.code));
          }
        });
      } else {
        this.options1 = [];
      }
    },
    //流程配置保存
    secondStepSave() { 
      let _orderList = this.processOrderList.map(val => {
        return val.code;
      });
      apiPostSetProcess(qs.stringify({
        nodeCodes: _orderList.join(","),
        projectId: this.currProjectId
      })).then(res => {
        if (res.status) {
          this.$router.push({ name: "PRO_LIST" });
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
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
.add-user-outer {
  height: 100%;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.pro-sort-list {
  display: flex;
  padding: 10px;
  border: 1px dashed $color-border;
  min-height: 54px;
  .item {
    padding: 5px 10px;
    border: 2px solid transparent;
    box-shadow: 0 3px 6px #c9d4dd;
    border-radius: 6px;
    margin-right: 24px;
    transition: all 0.5s linear;
    &:hover {
      cursor: move;
      border: 2px solid $color-theme;
    }
  }
}
.pro-list {
  display: flex;
  padding: 10px 0;
  border: 1px dashed $color-border;
  margin-top: 10px;
  min-height: 54px;
  .item {
    display: flex;
    align-items: center;
    &:first-child {
      &::before {
        display: none;
      }
    }
    &::before {
      content: "";
      display: inline-block;
      height: 0;
      width: 10px;
      border-bottom: 1px solid #707070;
    }
    &:hover {
      cursor: move;
    }
    .cell {
      display: flex;
      align-items: center;
      padding: 0 10px;
      .num {
        background-color: $color-input;
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
      }
      .text {
        border: 1px solid $color-input;
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
      }
    }
  }
}
.form-title {
  @include e-form-title();
}
</style>


