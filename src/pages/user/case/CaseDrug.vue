/*
 * @Author: chengshanshan 
 * @Date: 2019-03-25 15:10:02 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-05-13 15:03:00
 * @instraction:文献
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
        <div slot="title">
          {{title}}
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
          class="row-repeat-wraper"
          :class="{'deleted':currFormDeleted}"
        >
          <div class="row-repeat-outer">
            <!-- 顶部序号和删除按钮 -->
            <div class="header">
              <div class="title">
                NO.{{rowNumber+1}}
              </div>
              <div>
                <i
                  v-show="!currFormDeleted"
                  class="iconfont iconshanchus"
                  @click="removeRow"
                ></i>
              </div>
            </div>
            <!-- 表单 -->
            <Form label-position="top">
              <!-- drawDatas1渲染 -->
              <div>
                <div
                  v-for="(unit,unitIndex) of drawDatas1"
                  :key="unitIndex"
                >
                  <!-- 不可重复区域start -->
                  <template v-if="!unit.isRepeat">
                    <Row :gutter="80">
                      <Col
                        :span="item.span"
                        v-for="(item,itemIndex) of unit.data"
                        :key="itemIndex"
                      >
                      <safety-case-input
                        :parentList="unit.data"
                        :itemData='item'
                        :colIndex="itemIndex"
                        @showSearchModal="showSearchModal"
                        @valueChange="valueChange"
                        @showPathModal="showPathModal"
                      ></safety-case-input>
                      </Col>
                    </Row>

                  </template>
                  <!--不可重复区域end  -->
                  <!-- 可重复区域start -->
                  <template v-else>
                    <div
                      v-for="(item,itemIndex) of unit.list"
                      :key="itemIndex"
                    >
                      <safety-case-repeat-unit
                        :repeatIndex="unitIndex"
                        :currIndex="itemIndex"
                        :repeatBase="unit.base"
                        :repeatList="unit.list"
                        :isDeleted="item.deleted"
                        @addItem="addItem1"
                        @removeItem="removeItem1"
                        @recoverItem="recoverItem1"
                      >
                        <!-- 标号 -->
                        <template slot="No">NO.{{rowNumber+1}}.{{itemIndex+1}}
                        </template>
                        <!-- 内容start -->
                        <Row :gutter="80">
                          <Col
                            v-for="(col,colIndex) of item.data"
                            :key="colIndex"
                            :span="col.span"
                          >
                          <safety-case-input
                            :parentList="item.data"
                            :colIndex="colIndex"
                            :itemData='col'
                            @showSearchModal="showSearchModal"
                            @valueChange="valueChange"
                            @showPathModal="showPathModal"
                          ></safety-case-input>
                          </Col>
                        </Row>
                        <!-- 内容end -->
                      </safety-case-repeat-unit>
                      <safety-split></safety-split>
                      <safety-split></safety-split>
                    </div>
                  </template>
                  <!-- 可重复区域end -->
                </div>
              </div>
              <!-- drawDatas2渲染 -->
              <div>
                <div
                  v-for="(unit,unitIndex) of drawDatas2"
                  :key="unitIndex"
                >
                  <safety-case-repeat-unit
                    :repeatIndex="unitIndex"
                    :currIndex="unitIndex"
                    :repeatBase="unit.base"
                    :repeatList="drawDatas2"
                    :isDeleted="unit.deleted"
                    @addItem="addItem2"
                    @removeItem="removeItem2"
                    @recoverItem="recoverItem2"
                  ><template slot="No">NO.{{rowNumber+1}}.{{unitIndex+1}}
                    </template>
                    <!-- parent start -->

                    <Row :gutter="80">
                      <Col
                        v-for="(col,colIndex) of unit.data"
                        :key="colIndex"
                        :span="col.span"
                      >
                      <safety-case-input
                        :colIndex="colIndex"
                        :itemData='col'
                        @showSearchModal="showSearchModal"
                        @valueChange="valueChange"
                        @showPathModal="showPathModal"
                      ></safety-case-input>
                      </Col>
                      <Col span="24">
                      <!-- children start -->
                      <div
                        v-for="(child,childIndex) of unit.children"
                        :key="childIndex"
                      >

                        <safety-case-repeat-unit
                          :repeatIndex="unitIndex"
                          :currIndex="childIndex"
                          :repeatBase="unit.base.children"
                          :repeatList="unit.children"
                          :isDeleted="unit.deleted"
                          @addItem="childAddItem"
                          @removeItem="childRemoveItem"
                          @recoverItem="childRecoverItem"
                        >
                          <template slot="No">NO.{{rowNumber+1}}.{{unitIndex+1}}.{{childIndex+1}}
                          </template>
                          <Row :gutter="80">
                            <Col
                              v-for="(col,colIndex) of child.data"
                              :key="colIndex"
                              :span="col.span"
                            >
                            <safety-case-input
                              :colIndex="colIndex"
                              :itemData='col'
                              @showSearchModal="showSearchModal"
                              @valueChange="valueChange"
                              @showPathModal="showPathModal"
                            ></safety-case-input>
                            </Col>
                          </Row>

                        </safety-case-repeat-unit>
                        <safety-split></safety-split>
                        <safety-split></safety-split>
                      </div>

                      <!-- children end -->
                      </Col>
                    </Row>
                    <!-- parent end -->
                  </safety-case-repeat-unit>
                  <safety-split></safety-split>
                  <safety-split></safety-split>
                </div>
              </div>

              <!-- drawDatas3渲染 -->
              <div>
                <div
                  v-for="(unit,unitIndex) of drawDatas3"
                  :key="unitIndex"
                >
                  <template v-if="unit.isRepeat">
                    <div
                      v-for="(item,itemIndex) of unit.list"
                      :key="itemIndex"
                    >
                      <safety-case-repeat-unit
                        :repeatIndex="unitIndex"
                        :currIndex="itemIndex"
                        :repeatBase="unit.base"
                        :repeatList="unit.list"
                        :isDeleted="item.deleted"
                        @addItem="addItem3"
                        @removeItem="removeItem3"
                        @recoverItem="recoverItem3"
                      >
                        <template slot="No">NO.{{rowNumber+1}}.{{itemIndex+1}}
                        </template>

                        <Row :gutter="80">
                          <Col
                            v-for="(col,colIndex) of item.data"
                            :key="colIndex"
                            :span="col.span"
                          >
                          <safety-case-input
                            :parentList="item.data"
                            :colIndex="colIndex"
                            :itemData='col'
                            @showSearchModal="showSearchModal"
                            @valueChange="valueChange"
                            @showPathModal="showPathModal"
                          ></safety-case-input>
                          </Col>
                        </Row>
                      </safety-case-repeat-unit>
                      <safety-split></safety-split>
                      <safety-split></safety-split>
                    </div>

                  </template>
                </div>
              </div>
            </Form>
          </div>
          <!-- 遮罩层 -->
          <div
            class="row-mask-layer"
            v-show="currFormDeleted"
          >
            <div class="header">
              <!-- 恢复按钮 -->
              <i
                class="iconfont iconhuifu"
                @click="recoverRow"
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
import SafetyCaseRepeatUnit from "components/safety-case-repeat-unit.vue";
import SafetyCaseSearchModal from "components/safety-case-search-modal.vue";
import SafetyCasePathModal from "components/safety-case-path-modal.vue";
import SafetySplit from "components/safety-split.vue";
import {
  apiGetCaseDatas,
  apiGetCaseItems,
  apiPutCaseSave
} from "api/case/case-api.js";
import caseRule from "common/case-rule/index.js";
import caseHandle from "common/js/caseDrugHandle.js";
import { DURATION_TIME } from "common/js/constant.js";
export default {
  components: {
    SafetyCaseOuter,
    SafetyCaseInput,
    SafetyCaseSearchModal,
    SafetyCasePathModal,
    SafetyCaseRepeatUnit,
    SafetySplit
  },
  data() {
    return {
      spinShow: false,
      caseId: "",
      pageId: "",
      title: "", //页面标题
      formItems1: [], //最基本的渲染模板，新建时用
      formItems2: [],
      formItems3: [],
      initValuesObj:{},
      initDataIdsObj:{},
      initQueryIdsObj:{},

      drawDatas1: [], //已经保存过的渲染模板，可能有块的删除，增加的情况
      drawDatas2: [],
      drawDatas3: [],

      currFormDeleted: false,
      currFormNew: false,

      columns: [], //table的列
      tableDatas: [], //table数据
      showForm: true, //是否显示form表单
      rowNumber: -1, //当前正在操作的行
      hasUnsavedData: false, //标记是否有未保存的数据
      oldJsonValue: "", //保存旧数据并且MD5加密，用来判断前后数据是否有改变

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

          //创建页面渲染数据
          let _drawDatas = caseHandle.createDrawJson(
            caseRule[this.pageId],
            res.data.itemList
          );
        
          this.formItems1 = _drawDatas.formItems1;
          this.formItems2 = _drawDatas.formItems2;
          this.formItems3 = _drawDatas.formItems3;
          this.initValuesObj = _drawDatas.valuesObj;    
          this.initDataIdsObj =  _drawDatas.dataIdsObj;
          this.initQueryIdsObj =  _drawDatas.queryIdsObj; 
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
              this.tableDatas = caseHandle.createTableData({
                valueList: res.data.dataList,           
                tabelColumn: caseRule[this.pageId].listRule.columns,
                formItems1: this.formItems1,
                formItems2: this.formItems2,
                formItems3: this.formItems3
              });
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
      // let _isChanged = caseHandle.isChanged(
      //   this.oldJsonValue,
      //   JSON.stringify(this.drawDatas)
      // );
      let _isChanged = false;
      if (!_isChanged) {
        this.showForm = true;
        this.rowNumber = this.tableDatas.length;
        let _row = caseHandle.addRowData(caseRule[this.pageId].listRule);
        this.tableDatas.push(JSON.parse(JSON.stringify(_row)));
        this.currFormDeleted = this.tableDatas[this.rowNumber].deleted;
        this.currFormNew = this.tableDatas[this.rowNumber].isNew;
        this.drawDatas1 = this.formItems1;
        this.drawDatas2 = this.formItems2;
        this.drawDatas3 = this.formItems3;
        //值初始化
           this.$store.commit("drawValueStrInit", {         
            valuesObj:this.initValuesObj,       
            dataIdsObj:this.initDataIdsObj,
            queryIdsObj:this.initQueryIdsObj
          });     
      } else {
        this.$Notice.warning({
          title: "警告",
          duration: DURATION_TIME,
          desc: "当前页面有数据未保存"
        });
      }
    },
    //删除一行
    removeRow() {
      this.currFormDeleted = this.tableDatas[this.rowNumber].deleted;
      this.currFormNew = this.tableDatas[this.rowNumber].isNew;
      if (this.currFormNew) {
        //如果是新添加的，直接删除数据
        this.showForm = false;
        this.tableDatas.splice(this.rowNumber, 1);
        // this.drawDatas = JSON.parse(this.oldJsonValue);
      } else {
        //如果是已经保存的数据，重置删除状态
        this.$set(this.tableDatas[this.rowNumber], "deleted", true);
      }
    },
    //恢复一行
    recoverRow() {
      this.$set(this.tableDatas[this.rowNumber], "deleted", false);
      this.currFormDeleted = this.tableDatas[this.rowNumber].deleted;
      this.currFormNew = this.tableDatas[this.rowNumber].isNew;
    },
    //点击某一行
    rowClick(rowData, index) {
      console.log(rowData)
      this.rowNumber = index;
      this.showForm = true;

      this.drawDatas1 = rowData.drawDatas1;
      this.drawDatas2 = rowData.drawDatas2;
      this.drawDatas3 = rowData.drawDatas3;
      this.currFormDeleted = this.tableDatas[this.rowNumber].deleted;
      this.currFormNew = this.tableDatas[this.rowNumber].isNew;

      // this.oldJsonValue = JSON.stringify(this.drawDatas);


      this.$store.commit("setRowToDrawValue", rowData);
    },
    //数据保存
    dataSave() {
      let _data = caseHandle.caseSaveData({
        drawDatas1: this.drawDatas1,
        drawDatas2: this.drawDatas2,
        drawDatas3: this.drawDatas3,
        valuesObj: JSON.parse(this.drawValueStr),
    
        rowNumber: this.rowNumber + 1,
        rowDelete: this.tableDatas[this.rowNumber].deleted,
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
    //dataDraw1 可重复部分添加
    addItem1(params) {
      let _index = params.repeatIndex;
      let _base = JSON.parse(JSON.stringify(params.content));
      let _len = this.drawDatas1[_index].list.length;

      _base.map((val, index, arr) => {
        val.uid = `${val.itemId}_${_index}_${_len++}`;
        if (val.uiType == "SEARCH") {
          val.prevUid = arr[index - 1].uid;
        }
        return val;
      });
    
      this.$store.commit("addItem", {
        repeatBase: _base
      });
      this.drawDatas1[_index].list.push({
        isNew: true,
        deleted: false,
        data: _base
      });
  
    },
    //dataDraw1 可重复部分删除
    removeItem1(params) {
      if (params.isNew) {
        //新添加的数据删除
        this.drawDatas1[params.repeatIndex].list.splice(params.currIndex, 1);
      } else {
        //保存的数据删除
        this.drawDatas1[params.repeatIndex].list[
          params.currIndex
        ].deleted = true;
      }
    },
    //dataDraw1 可重复部分恢复
    recoverItem1(params) {
      this.drawDatas1[params.repeatIndex].list[
        params.currIndex
      ].deleted = false;
    },
    //dataDraw2 外层可重复部分添加
    addItem2(params) {
      let _index = params.repeatIndex;
      let _parentLen = this.drawDatas2.length;
      let _parent = params.content.parent;

      //设置uid 保证数据的唯一性
      _parent.map((val, index, arr) => {
        val.uid = `${val.itemId}_${_index}_${_parentLen++}`;
        return val;
      });
      this.$store.commit("addItem", {
        repeatBase: JSON.parse(JSON.stringify(_parent))
      });
      let _children = params.content.children;
      let _childLen = this.drawDatas2[_index].children.length;
      //设置uid 保证数据的唯一性
      _children.data.map((val, index, arr) => {
        val.uid = `${val.itemId}_${_index}_${_childLen++}`;
        return val;
      });

      this.$store.commit("addItem", {
        repeatBase: JSON.parse(JSON.stringify(_children.data))
      });
      this.drawDatas2.push({
        isNew: true,
        deleted: false,
        data: JSON.parse(JSON.stringify(_parent)),
        children: [JSON.parse(JSON.stringify(_children))],
        base: JSON.parse(JSON.stringify(params.content))
      });
    },
    //dataDraw2 外层可重复部分删除
    removeItem2(params) {
      if (params.isNew) {
        //新添加的数据删除
        this.drawDatas2.splice(params.currIndex, 1);
      } else {
        //保存的数据删除
        this.drawDatas2[params.currIndex].deleted = true;
      }
    },
    //dataDraw2 外层可重复部分恢复
    recoverItem2(params) {
      this.drawDatas2[params.currIndex].deleted = false;
    },
    //dataDraw2 内层层可重复部分添加
    childAddItem(params) {
      let _index = params.repeatIndex;
      let _base = params.content;
      let _childLen = this.drawDatas2[_index].children.length;
      _base.data.map((val, index, arr) => {
        val.uid = `${val.itemId}_${_index}_${_childLen++}`;
        return val;
      });
      this.drawDatas2[_index].children.push(JSON.parse(JSON.stringify(_base)));
    },
    //dataDraw2 内层层可重复部分删除
    childRemoveItem(params) {
      if (params.isNew) {
        //新添加的数据删除
        this.drawDatas2[params.repeatIndex].children.splice(
          params.currIndex,
          1
        );
      } else {
        //保存的数据删除
        this.drawDatas2[params.repeatIndex].children[
          params.currIndex
        ].deleted = true;
      }
    },
    //dataDraw2 外层可重复部分恢复
    childRecoverItem(params) {
      this.drawDatas2[params.repeatIndex].children[
        params.currIndex
      ].deleted = false;
    },
    //dataDraw3 可重复部分添加
    addItem3(params) {
      let _index = params.repeatIndex;
      let _base = params.content;
      let _len = this.drawDatas3[_index].list.length;

      _base.map((val, index, arr) => {
        val.uid = `${val.itemId}_${_index}_${_len++}`;
        return val;
      });
      this.$store.commit("addItem", {
        repeatBase: JSON.parse(JSON.stringify(_base))
      });
      this.drawDatas3[_index].list.push({
        isNew: true,
        deleted: false,
        data: JSON.parse(JSON.stringify(_base))
      });
    },
    //dataDraw3 可重复部分删除
    removeItem3(params) {
      if (params.isNew) {
        //新添加的数据删除
        this.drawDatas3[params.repeatIndex].list.splice(params.currIndex, 1);
      } else {
        //保存的数据删除
        this.drawDatas3[params.repeatIndex].list[
          params.currIndex
        ].deleted = true;
      }
    },
    //dataDraw3 可重复部分恢复
    recoverItem3(params) {
      this.drawDatas3[params.repeatIndex].list[
        params.currIndex
      ].deleted = false;
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
    searchValueStr() {
      return this.$store.state.caseData.searchValueStr;
    },
    dataIdStr() {
      return this.$store.state.caseData.dataIdStr;
    },
   
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
@import "../../../common/css/mixin";
@import "../../../common/css/variable";
.e-table {
  @include e-table();
}
.ivu-table .select-row td {
  &:first-child {
    border-left: 3px solid $color-theme;
  }
  background-color: #f1f9f5;
}
</style>
<style lang="scss" scoped>
@import "../../../common/css/variable";
.row-repeat-wraper {
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
    .row-mask-layer {
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
.row-repeat-outer {
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


