/*
 * @Author: chengshanshan 
 * @Date: 2019-03-25 15:10:02 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-05-13 15:01:09
 * @instraction:没有list的case页面
 */
<template>
  <Layout :style="{'height': '100%'}">
    <!-- 内容主体渲染区域 -->
    <Content>
      <safety-case-outer
        @dataSave="dataSave"
        :spinShow="spinShow"
      >
        <Form label-position="top">
          <div
            v-for="(unit,unitIndex) of drawDatas"
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
                  @addItem="addItem"
                  @removeItem="removeItem"
                  @recoverItem="recoverItem"
                >
                  <!-- 标号 -->
                  <template slot="No">NO.{{itemIndex+1}}
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
        </Form>

      </safety-case-outer>
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
import caseHandle from "common/js/caseItemHandle";
import { resCode } from "common/js/code.js";
import SafetyCaseInput from "components/safety-case-input.vue";
import SafetyCaseOuter from "components/safety-case-outer.vue";
import SafetyCaseRepeatUnit from "components/safety-case-repeat-unit.vue";
import SafetyCaseSearchModal from "components/safety-case-search-modal.vue";
import SafetyCasePathModal from "components/safety-case-path-modal.vue";
import SafetySplit from "components/safety-split.vue";
import caseRule from "common/case-rule/index.js";
import {
  apiGetCaseDatas,
  apiGetCaseItems,
  apiPutCaseSave
} from "api/case/case-api.js";
export default {
  components: {
    SafetyCaseInput,
    SafetyCaseRepeatUnit,
    SafetyCaseOuter,
    SafetySplit,
    SafetyCaseSearchModal,
    SafetyCasePathModal
  },
  data() {
    return {
      spinShow: false,

      searchParams: {
        version: "",
        uid: ""
      },

      pathParams: {
        dataId: ""
      },
      parentList: "",
      editList: "",
      formItemDatas: [], //页面items
      drawDatas: [], //页面渲染数据
      errorInfo: {},
      validResult: true
    };
  },
  methods: {
    init() {
      //请求渲染数据
      this.getCaseItem();
    },
    getCaseItem() {
      this.formItemDatas = [];
      this.drawDatas = [];
      this.spinShow = true;
      apiGetCaseItems(this.pageId).then(itemRes => {
        if (itemRes.status) {
          let _drawDatas = caseHandle.createDrawJson(
            caseRule[this.pageId],
            itemRes.data.itemList
          );
          this.formItemDatas = _drawDatas.drawDatas; 
          this.$store.commit("drawValueStrInit", {
            valuesObj: _drawDatas.valuesObj,          
            queryIdsObj: _drawDatas.queryIdsObj,
            dataIdsObj: _drawDatas.dataIdsObj
          });
          //如果caseId为空则说明是新建，不需要调用请求值的接口
          if (this.caseId) {
            this.getCaseDatas();
          } else {
            this.spinShow = false;
            this.drawDatas = this.formItemDatas;
          }
        } else {
          this.spinShow = false;
          this.$Message.error(resCode(params.vm, itemRes.code));
        }
      });
    },
    getCaseDatas() {
      apiGetCaseDatas(this.caseId, this.pageId).then(valueRes => {
        if (valueRes.status) {
          if (valueRes.data.dataList && valueRes.data.dataList.length > 0) {
            let _drawDatas = caseHandle.createCurrItems({
              valueList: valueRes.data.dataList,
              inputType: this.inputType,
              formItems: this.formItemDatas
            });
            this.drawDatas = _drawDatas.drawDatas;
            this.$store.commit("drawValueStrInit", {
              valuesObj: _drawDatas.valuesObj,          
              queryIdsObj: _drawDatas.queryIdsObj,
              dataIdsObj: _drawDatas.dataIdsObj
            });
          } else {
            this.drawDatas = this.formItemDatas;
          }
          this.spinShow = false;
        } else {
          this.spinShow = false;
          this.$Message.error(resCode(this, valueRes.code));
        }
      });
    },
    valueChange(params) {
      this.drawDatas[params.index].value = params.value;
    },
    //添加一块
    addItem(params) {
      let _index = params.repeatIndex;
      let _base = JSON.parse(JSON.stringify(params.content));
      let _len = this.drawDatas[_index].list.length;     

      _base.map((val, index, arr) => {
        if (val.uiType == "SEARCH") {
          val.prevUid = _base[index - 1].uid;
        }
        val.uid = `${val.itemId}_${_index}_${_len++}`;
        return val;
      });
      this.$store.commit("addItem", {
        repeatBase: _base
      });
      this.drawDatas[_index].list.push({
        isNew: true,
        deleted: false,
        data: _base
      });
    },
    //删除一块
    removeItem(params) {   
      if (params.isNew) {
        //新添加的数据删除
        this.drawDatas[params.repeatIndex].list.splice(params.currIndex, 1);
      } else {
        //保存的数据删除
        this.drawDatas[params.repeatIndex].list[
          params.currIndex
        ].deleted = true;    
 
      }
    },
    //恢复已删除的
    recoverItem(params) {
        this.drawDatas[params.repeatIndex].list[
          params.currIndex
        ].deleted = false;
    },
    //数据保存
    dataSave() {
      let _data = caseHandle.caseSaveData(
        this.drawDatas, 
        JSON.parse(this.drawValueStr), 
        this.pageId,
        this.caseId
      );
      let errorInfo = _data.errorInfo;
      this.validResult = _data.validResult;
      if (this.validResult) {
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
            this.init();
            this.$Message.success("成功");
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
    //显示搜索模态框
    showSearchModal(params) {
      //version
      let _drawValueObj = JSON.parse(this.drawValueStr);
      this.searchParams.version = _drawValueObj[params.prevUid];
      //保存uid
      this.searchParams.uid = params.uid;
      //模态框方法初始化
      this.$refs.searchModal.init();
    },
    //显示操作轨迹模态框
    showPathModal(params) {
      this.pathParams.dataId = params.dataId;
      //模态框方法初始化
      this.$refs.pathModal.init();
    }
  },
  computed: {
    caseId() {
      return this.$route.query.caseId;
    },
    pageId() {
      return this.$route.query.pageId;
    },
    drawValueStr() {
      return this.$store.state.caseData.drawValueStr;
    }, 
    inputType() {
      return this.$store.state.caseData.inputType;
    }
  },
  mounted() {
    this.init();
  }
};
</script>



