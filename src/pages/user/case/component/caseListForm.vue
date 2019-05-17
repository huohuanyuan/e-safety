/*
 * @Author: chengshanshan 
 * @Date: 2019-03-25 15:10:02 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-05-14 13:55:29
 * @instraction:case 包含list的页面
 */
<template>
  <Layout :style="{'height': '100%'}">
    <!-- 内容主体渲染区域 -->
    <Content>
      <safety-case-outer
        :showList="true"
        :showForm="showForm"
        @dataSave="dataSave"
        @createNewForm="createNewForm"
        :spinShow="spinShow"
      >
        <!-- 列表start -->
        <div slot="title">
          <!-- MH页面显示form表单 -->
          <Form
            label-position="top"
            v-if="pageId == 'MH'"
            class="top-form"
            slot="title"
          >
            <Row :gutter="80">
              <Col
                v-for="(col,colIndex) of publicDrawDatas"
                :key="colIndex"
                :span="col.span"
              >
              <safety-case-input
                :itemData='col'
                :colIndex='colIndex'
                @valueChange="valueChange"
                @showSearchModal="showSearchModal"
                @showPathModal="showPathModal"
              ></safety-case-input>
              </Col>
            </Row>
          </Form>
          <!-- 其他页面显示标题 -->
          <div v-else>
            {{title}}
          </div>
        </div>
        <!-- 列表start -->

        <Table
          class="e-table"
          size="small"
          slot="table"
          :row-class-name="rowClassName"
          @on-row-click="rowClick"
          :columns="columns"
          :data="tableDatas"
        ></Table>
        <!-- 列表end -->
        <!-- 列表下的表单区域 -->

        <div
          class="repeat-wraper"
          :class="{'deleted':isFormDeleted}"
        >
          <div class="repeat-outer">
            <!-- 顶部序号和删除按钮 -->
            <div class="header">
              <div class="title">
                NO.{{rowNumber+1}}
              </div>
              <div>
                <i
                  v-show="!isFormDeleted"
                  class="iconfont iconshanchus"
                  @click="removeItem"
                ></i>
              </div>
            </div>
            <!-- 表单 -->
            <Form label-position="top">
              <!-- 内容start -->
              <Row :gutter="80">
                <Col
                  v-for="(col,colIndex) of drawDatas"
                  :key="colIndex"
                  :span="col.span"
                >
                <safety-case-input
                  :itemData='col'
                  :colIndex='colIndex'
                  @valueChange="valueChange"
                  @showSearchModal="showSearchModal"
                  @showPathModal="showPathModal"
                ></safety-case-input>
                </Col>
              </Row>
              <!-- 内容end -->
            </Form>
          </div>
          <!-- 遮罩层 -->
          <div
            class="mask-layer"
            v-show="isFormDeleted"
          >
            <div class="header">
              <!-- 恢复按钮 -->
              <i
                class="iconfont iconhuifu"
                @click="recoverItem"
              ></i>
            </div>
          </div>
        </div>
      </safety-case-outer>
      <!-- 列表下的表单区域end -->
      <!-- 搜索模态框 -->
      <safety-case-search-modal
        ref="searchModal"
        :searchParams="searchParams"
      ></safety-case-search-modal>
      <!-- 操作轨迹模态框 -->
      <safety-case-path-modal
        ref="pathModal"
        :pathParams="pathParams"
      ></safety-case-path-modal>
    </Content>
  </Layout>
</template>
<script>
import { resCode } from "common/js/code.js";
import SafetyCaseOuter from "components/safety-case-outer.vue";
import SafetyCaseInput from "components/safety-case-input.vue";
import SafetyCaseSearchModal from "components/safety-case-search-modal.vue";
import SafetyCasePathModal from "components/safety-case-path-modal.vue";
import {
  apiGetCaseDatas,
  apiGetCaseItems,
  apiPutCaseSave
} from "api/case/case-api.js";
import caseRule from "common/case-rule/index.js";
import caseHandle from "common/js/caseListPageHandle";
import { DURATION_TIME } from "common/js/constant.js";
export default {
  components: {
    SafetyCaseOuter,
    SafetyCaseInput,
    SafetyCaseSearchModal,
    SafetyCasePathModal
  },
  data() {
    return {
      spinShow: false,
      caseId: "",
      pageId: "",
      title: "", //页面标题

      drawDatas: [], //页面渲染数据
      initValuesObj: {},
      initDataIdsObj: {},
      initQueryIdsObj: {},

      columns: [], //table的列
      tableDatas: [], //table数据
      showForm: true, //是否显示form表单
      rowNumber: -1, //当前正在操作的行
  
      isFormDeleted: false,
      isFormNew: true,
      publicDrawDatas: [], //列表上面的表单渲染数据
      searchParams: {
        version: "",
        uid: ""
      },
      pathParams: {
        dataId: ""
      },
      propSearchValue: {
        lltName: "",
        lltCode: ""
      }
    };
  },

  methods: {
    init() {
      this.caseId = this.$route.query.caseId;
      this.pageId = this.$route.query.pageId;
      this.rowNumber = -1;
      this.isFormNew = false;
      this.isFormDeleted = false;
  
      this.getCaseItems();
    },
    getCaseItems() {
      this.spinShow = true;
      apiGetCaseItems(this.pageId).then(res => {
        if (res.status) {
          //表格数据
          let listData = caseHandle.createTableColumn(
            caseRule[this.pageId].listRule,
            res.data.itemList
          );
          //表格的列
          this.columns = listData.columns;
          //页面标题
          this.title = listData.title.itemLabel;

          //列表上面的表单渲染数据(只有MH页面需要渲染)
          if (this.pageId == "MH") {
            let _publicDrawDatas = caseHandle.createDrawJson(
              caseRule[this.pageId].listRule.topRule,
              res.data.itemList
            );
            this.publicDrawDatas = _publicDrawDatas.formItems;
            this.initValuesObj = _publicDrawDatas.valuesObj;
            this.initDataIdsObj = _publicDrawDatas.dataIdsObj;
            this.initQueryIdsObj = _publicDrawDatas.queryIdsObj;
          }

          //创建页面渲染数据
          let _drawDatas = caseHandle.createDrawJson(
            caseRule[this.pageId].formRule,
            res.data.itemList
          );

          this.drawDatas = _drawDatas.formItems;
          this.initValuesObj = {
            ...this.initValuesObj,
            ..._drawDatas.valuesObj
          };
          this.initDataIdsObj = {
            ...this.initDataIdsObj,
            ..._drawDatas.dataIdsObj
          };
          this.initQueryIdsObj = {
            ...this.initQueryIdsObj,
            ..._drawDatas.queryIdsObj
          };
          //值初始化
          this.$store.commit("drawValueStrInit", {
            valuesObj: this.initValuesObj,
            dataIdsObj: this.initDataIdsObj,
            queryIdsObj: this.initQueryIdsObj
          });

          this.showForm = false;
          this.getCaseDatas();
        } else {
          this.spinShow = false;
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    getCaseDatas() {
      if (this.caseId) {
        apiGetCaseDatas(this.caseId, this.pageId).then(res => {
          if (res.status) {
            if (res.data.dataList && res.data.dataList.length > 0) {
              let resultObj = caseHandle.createTableData({
                valueList: res.data.dataList,
                tabelColumn: caseRule[this.pageId].listRule.columns,
                topFormRule: caseRule[this.pageId].listRule.topRule
              });
              this.tableDatas = resultObj.tableList;
              //列表上面的表单值置入(只有MH页面需要渲染)
              if (this.pageId == "MH") {
                this.$store.commit("setMHTopFormValue", {
                  topFormValue: resultObj.topFormValue
                });
              }
            }
            this.spinShow = false;
          } else {
            this.spinShow = false;
            this.$Message.error(resCode(this, res.code));
          }
        });
      } else {
        this.spinShow = false;
      }
    },
    //新建表单
    createNewForm() {
    
  
        this.showForm = true;
        this.rowNumber = this.tableDatas.length;
        this.isFormNew = true;
        this.isFormDeleted = false;
        // let _row = caseHandle.addRowData(caseRule[this.pageId].listRule);
        let _row = caseHandle.addRowData({
          columns: caseRule[this.pageId].listRule.columns,
          valuesObj: this.initValuesObj,
          dataIdsObj: this.initDataIdsObj,
          queryIdsObj: this.initQueryIdsObj
        });
        this.tableDatas.push(JSON.parse(JSON.stringify(_row)));
        //值初始化
        this.$store.commit("drawValueStrInit", {
          valuesObj: this.initValuesObj,
          dataIdsObj: this.initDataIdsObj,
          queryIdsObj: this.initQueryIdsObj
        });

    },
    //删除一块
    removeItem() {
      if (this.isFormNew) {
        //如果是新添加的，直接删除数据
        this.showForm = false;
        this.tableDatas.splice(this.rowNumber, 1);
        this.isFormNew = false;
      } else {
        //如果是已经保存的数据，重置删除状态
        this.isFormDeleted = true;
        this.tableDatas[this.rowNumber].deleted = true;
        this.drawDatas.map(val => (val.deleted = true));
      }
    },
    //恢复已删除的
    recoverItem() {
      this.isFormDeleted = false;
      this.tableDatas[this.rowNumber].deleted = false;
      this.drawDatas.map(val => (val.deleted = false));
    },
    //点击某一行
    rowClick(rowData, index) {
 
        this.rowNumber = index;
        this.showForm = true;
        this.isFormNew = false;
        this.isFormDeleted = rowData.deleted;
        this.$store.commit("setRowToDrawValue", rowData);
     
    },
    //数据保存
    dataSave() {
      let _data = caseHandle.caseSaveData({
        drawDatas: [...this.drawDatas, ...this.publicDrawDatas],
        valuesObj: JSON.parse(this.drawValueStr),
        rowNumber: this.rowNumber + 1,
        rowDelete: this.isFormDeleted,
        pageId: this.pageId,
        caseId: this.caseId
      });
      let validResult = _data.validResult;
      let errorInfo = _data.errorInfo;
      if (validResult) {
        apiPutCaseSave(_data.saveData).then(res => {
          if (res.status) {
            if (!this.caseId) {
              //新建时保存成功返回caseId在路由参数中添加caseId值 重新加载页面
              let _name = this.$route.name;
              let _caseId = res.data.caseId;
              let _pageId = this.$route.query.pageId;
              this.$router.push({
                name: _name,
                query: { pageId: _pageId, caseId: _caseId }
              });
            }
            this.$Message.success("保存成功");
            this.init();
          } else {
            this.$Message.error(resCode(this, res.code));
          }
        });
      } else {
        this.$Notice.warning({
          title: "提示",
          render: h => {
            return h("div", {}, [
              (() => {
                if (errorInfo.empty.length > 0) {
                  return h("div", {}, "不能为空：" + errorInfo.empty.join(","));
                }
              })(),
              (() => {
                if (errorInfo.maxLength.length > 0) {
                  return h(
                    "div",
                    {},
                    "字段超长：" + errorInfo.maxLength.join(",")
                  );
                }
              })(),
              (() => {
                if (errorInfo.errorFormat.length > 0) {
                  return h(
                    "div",
                    {},
                    "格式错误：" + errorInfo.errorFormat.join(",")
                  );
                }
              })()
            ]);
          }
        });
      }
    },
    valueChange(params) {
      this.tableDatas[this.rowNumber][params.itemId] = params.value;
    },
    showSearchModal(params) {
      //获取meddraId
      let prevUid = params.prevUid;
      let _drawValueObj = JSON.parse(this.drawValueStr);
      this.searchParams.version = _drawValueObj[prevUid];
      //保存uid
      this.searchParams.uid = params.uid;
      //模态框方法初始化
      this.$refs.searchModal.init();
    },
    //显示操作轨迹模态框
    showPathModal(params) {
      let _dataIdObj = JSON.parse(this.dataIdStr);
      let _uid = params.uid;
      this.pathParams.dataId = _dataIdObj[_uid];
      //模态框方法初始化
      this.$refs.pathModal.init();
    },
    rowClassName(row, index) {
      if (index == this.rowNumber) {
        return "select-row";
      } else {
        return "";
      }
    }
  },
  computed: {
    drawValueStr() {
      return this.$store.state.caseData.drawValueStr;
    },

    dataIdStr() {
      return this.$store.state.caseData.dataIdStr;
    }
  },
  watch:{
    isFormDeleted:function(){
      this.isEqual = !this.isEqual
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
@import "../../../../common/css/mixin";
@import "../../../../common/css/variable";
.e-table {
  @include e-table();
  .ivu-table .select-row td {
    &:first-child {
      border-left: 3px solid $color-theme;
    }
    background-color: #f1f9f5;
  }
}
</style>
<style lang="scss" scoped>
@import "../../../../common/css/variable";
.repeat-wraper {
  position: relative;
  &.deleted {
    .header {
      .title {
        position: relative;
        &:before {
          position: absolute;
          content: "";
          display: block;
          width: calc(100% - 4px);
          top: 50%;
          height: 2px;
          margin-top: -1px;
          background-color: red;
        }
      }
    }
    .mask-layer {
      padding: 10px;
      background-color: $color-case-bg;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .header {
        text-align: right;
      }
    }
  }
}
.repeat-outer {
  border: 1px solid $color-border-case;
  padding: 10px;

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .title {
      height: 24px;
      line-height: 24px;
      font-size: 14px;
      font-weight: 600;
      border-left: 4px solid $color-theme;
      padding-left: 5px;
    }
  }
}
.iconfont {
  cursor: pointer;
  color: $color-theme-btn;
}
</style>


