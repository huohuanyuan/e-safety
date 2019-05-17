/*
 * @Author: chengshanshan 
 * @Date: 2019-03-26 11:41:56 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-05-13 10:40:30
 * @instraction:case模块输入组件包括：输入框 null flavor下拉选择，更多按钮
 */
<template>
  <div>
    <!-- 空元素，为避免高度一行两个元素高度不一致导致下面元素无法浮动至左侧的问题 -->
    <div v-if="currItemData.uiType=='LINE'">
    </div>
    <div
      class="unit-outer"
      v-else
    >
      <!-- 标题 -->
      <div
        class="title"
        v-if="currItemData.uiType=='LABEL'"
      >
        <h1 v-if="currItemData.tag == 'H1'"> {{newLabel}}</h1>
        <h2 v-else>{{newLabel}}</h2>

      </div>

      <!-- 文本 -->
      <FormItem
        v-else-if="currItemData.uiType=='TEXT_INPUT'"
        :prop="uid"
      >
        <p class="label"><i
            v-if="currItemData.require"
            class="require"
          >*</i>{{newLabel}}</p>
        <Input
          type="text"
          v-model.trim="currValue"
          @on-change="valueChange"
        ></Input>
      </FormItem>
      <!-- 文本域 -->
      <FormItem
        v-else-if="currItemData.uiType=='TEXT_AREA'"
        :prop="uid"
      >
        <p class="label"><i
            v-if="currItemData.require"
            class="require"
          >*</i>{{newLabel}}</p>
        <Input
          type="textarea"
          v-model.trim="currValue"
          @on-change="valueChange"
        ></Input>
      </FormItem>
      <!-- 日期 -->
      <FormItem
        v-else-if="currItemData.uiType=='DATE' || currItemData.uiType=='SYSDATE'"
        :prop="uid"
      >
        <p class="label"><i
            v-if="currItemData.require"
            class="require"
          >*</i>{{newLabel}}</p>
        <safety-date-picker
          :dataLimit='currItemData.dataLimit'
          @setDateValue="setDateValue"
          :dateValue="currValue"
        ></safety-date-picker>

      </FormItem>
      <!-- 单选框 -->
      <FormItem v-else-if="currItemData.uiType=='RADIO'">
        <p class="label"><i
            v-if="currItemData.require"
            class="require"
          >*</i>{{newLabel}}</p>
        <safety-case-radio
          ref="eRadio"
          :value="currValue"
          :codeList="currItemData.codeList"
          @setRadioValue="setRadioValue"
        ></safety-case-radio>

      </FormItem>
      <!-- 复选框 -->
      <FormItem
        v-else-if="currItemData.uiType=='CHECK'"
        :prop="uid"
      >
        <p class="label"><i
            v-if="currItemData.require"
            class="require"
          >*</i>{{newLabel}}</p>
        <CheckboxGroup
          vertical
          v-model="currValue"
          @on-change="valueChange"
        >
          <Checkbox
            :label="item.codeValue"
            v-for="(item,index) of currItemData.codeList"
            :key="item.codeValue"
          >{{item.codeLabel}} </Checkbox>

        </CheckboxGroup>

      </FormItem>
      <!-- 搜索 -->
      <FormItem
        v-else-if="currItemData.uiType=='SEARCH'"
        :prop="uid"
      >
        <p class="label"><i
            v-if="currItemData.require"
            class="require"
          >*</i>{{newLabel}}</p>
        <Input
          type="text"
          v-model="currValue.split(',')[0]"
          @on-click="searchClick"
          icon="ios-search"
        >
        </Input>
        <Input
          type="text"
          v-model="currValue.split(',')[1]"
          disabled
        ></Input>
      </FormItem>
      <!-- 下拉选择 -->
      <FormItem
        v-else-if="currItemData.uiType=='AUTOCOMPLETE'|| currItemData.uiType=='AUTOCOMBO'"
        :prop="uid"
      >
        <p class="label"><i
            v-if="currItemData.require"
            class="require"
          >*</i>{{newLabel}}</p>
        <Select
          :style="{width:'100%'}"
          v-model="currValue"
          filterable
          @on-change="valueChange"
        >
          <Option
            :value="item.codeValue"
            v-for="(item,index) of currItemData.codeList"
            :key="item.codeValue"
          >{{item.codeLabel}}</Option>

        </Select>
      </FormItem>
      <!-- 文件 -->
      <FormItem
        v-else-if="currItemData.uiType=='FILE'"
        @on-change="valueChange"
      >
        <p class="label"><i
            v-if="currItemData.require"
            class="require"
          >*</i>{{newLabel}}</p>
        <Upload action="http://123.com">
          <Button>选择文件</Button>
        </Upload>
      </FormItem>
      <!-- null flavor -->
      <div
        class="flavor"
        :class="{'algin-top':isAlginTop}"
      >
        <Select
          :style="{width:'100%'}"
          v-if="hasFlavor"
          v-model="currItemData.flavor"
          placeholder="······"
          @on-change="flavorChange"
        >
          <Option
            :value="item.codeValue"
            v-for="(item,index) of currItemData.flavorList"
            :key="item.codeValue"
          >{{item.codeLabel}}</Option>

        </Select>
        </FormItem>

      </div>

      <!-- 更多选项按钮 -->
      <Dropdown
        trigger="click"
        @on-click="clickDropdown"
      >
        <i
          v-if="hasMoreBtn"
          class="iconfont iconcaozuo"
          :class="{'algin-top':isAlginTop}"
        >
        </i>
        <DropdownMenu
          slot="list"
          style="text-align: center"
        >
          <DropdownItem
            name="query"
            v-if="!queryId"
          > 质疑 </DropdownItem>
          <DropdownItem> 重置 </DropdownItem>
          <DropdownItem name="path"> 轨迹 </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <!-- 质疑小图标 -->
      <div
        v-if="queryId"
        class="query-icon"
        @click="queryFun"
      >
        <i class="iconzhiyitishi iconfont"> </i>
      </div>
    </div>
    <!--  质疑模态框 -->
    <safety-query-modal
      ref="queryModal"
      :modalShow="modal"
      :queryType="queryType"
      :id="queryId"
      :dataId="dataId"
      :caseNo="caseNo"
      :dataName="dataName"
      :uid="uid"
      @cancelModalFun="cancelModalFun"
      @shwoModalFun="shwoModalFun"
    > </safety-query-modal>
  </div>

</template>

<script>
import SafetyQueryModal from "components/safety-query-modal"; // 质疑模态框
import SafetyDatePicker from "components/safety-date-picker.vue";
import SafetyCaseRadio from "components/safety-case-radio";
export default {
  components: {
    SafetyDatePicker,
    SafetyQueryModal,
    SafetyCaseRadio
  },
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {
          uiType: "LABEL", //LABEL  TEXT_INPUT  DATE AUTOCOMPLETE RADIO SEARCH TEXT_AREA CHECK FILE
          itemLabel: "",
          nullFlavorList: null
        };
      }
    },
    parentList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    colIndex: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      searchModal: false,
      currItemData: this.itemData,
      modal: false, // 质疑的模态框
      queryType: 2, // 质疑类型
      dataId: "",
      dataName: ""
    };
  },
  computed: {
    uid() {
      return this.itemData.uid;
    },
    queryId() {
      return JSON.parse(this.queryIdStr)[this.uid];
    },
    isAlginTop() {
      return ["RADIO", "TEXT_AREA"].includes(this.currItemData.uiType);
    },
    newLabel() {
      let _itemLabel = this.currItemData.itemLabel
        ? this.currItemData.itemLabel
        : "";
      let _elementId = this.currItemData.elementId
        ? `(${this.currItemData.elementId})`
        : "";
      return `${_itemLabel}${_elementId}`;
    },
    hasFlavor() {
      return this.currItemData.flavorId && this.currItemData.uiType != "LABEL";
    },
    hasMoreBtn() {
      return !["LABEL", "LINE", "FILE"].includes(this.currItemData.uiType);
    },
    drawValueStr() {
      return this.$store.state.caseData.drawValueStr;
    },
    currValue: {
      get: function() {
        let val = JSON.parse(this.drawValueStr)[this.uid];
        if (this.itemData.uiType == "CHECK") {
          //如果是check类型的需要将字符串类型的值转换为数组
          return val.length > 0 ? val.split(",") : [];
        } else {
          return val;
        }
      },
      set: function(v) {
        let val = v;
        if (this.itemData.uiType == "CHECK") {
          //如果是check类型的需要将数组类型的值转换为字符串
          val = v.join(",");
        }
        this.$store.commit("setDrawValueStr", { value: val, uid: this.uid });
      }
    },
    queryIdStr() {
      return this.$store.state.caseData.queryIdStr;
    },
    searchValueStr() {
      return this.$store.state.caseData.searchValueStr;
    },
    caseNo() {
      return localStorage.getItem("caseNo");
    }
  },
  methods: {
    flavorChange(val) {
      this.currValue = "";
      this.currItemData.value = this.currValue;
      if (this.itemData.uiType == "RADIO") {
        this.$refs.eRadio.init();
      }
    },
    valueChange() {
      if (this.currValue) {
        this.currItemData.flavor = "";
      }
    },
    searchClick() {
      this.$emit("showSearchModal", {
        prevUid: this.itemData.prevUid,
        uid: this.itemData.uid
      });
    },
    setDateValue(v) {
      this.$store.commit("setDrawValueStr", { value: v, uid: this.uid });
    },
    setRadioValue(v) {   
      if (v) {
        this.currItemData.flavor = "";
      }
      this.$store.commit("setDrawValueStr", { value: v, uid: this.uid });
    },
    // 点击下拉 Dropdown
    clickDropdown(name) {
      if (name == "query") {
        this.dataId = this.itemData.dataId;
        this.dataName = this.itemData.itemLabel;
        this.pageId = this.itemData.pageId;
        this.queryFun();
      } else if (name == "path") {
        //传入的dataId是在caseForm.vue中使用，
        //传入的uid在caseListForm中使用，用于从state中获取dataId
        this.$emit("showPathModal", {
          dataId: this.itemData.dataId,
          uid: this.uid
        });
      }
    },
    //质疑
    queryFun() {
      this.modal = true;
      this.$nextTick(() => {
        this.$refs.queryModal.init();
      });
    },
    // 关闭质疑模态框
    cancelModalFun() {
      this.modal = false;
    },
    // 打开质疑模态框
    shwoModalFun() {
      this.modal = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../common/css/variable";
.unit-outer {
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
  &.copy-cell {
    &.deleted {
      background-color: $color-case-bg;
    }
    &.p-left {
      padding-left: 10px;
      border-left: 1px solid $color-border-case;
    }
    &.p-right {
      padding-right: 10px;
      border-right: 1px solid $color-border-case;
    }
  }
  &.p-left {
    padding-right: 15px;
  }
  &.p-right {
    padding-left: 15px;
  }

  .title {
    margin-top: 10px;
    margin-bottom: 15px;

    h1 {
      font-size: 22px;
      font-weight: 600;
      color: $font-color-h1;
    }
    h2 {
      font-size: 16px;
      font-weight: 600;
      color: $font-color-h2;
      padding-top: 10px;
    }
  }
  .label {
    line-height: 18px;
  }
  .iconfont {
    width: 30px;
    color: $color-theme-btn;
  }
  .flavor {
    width: 80px;
  }
  .flavor {
    flex: 0 0 auto;
    margin-bottom: 20px;
    margin-left: 10px;
    &.algin-top {
      align-self: flex-start;
    }
  }
  .query-icon {
    flex: 0 0 auto;
    margin-bottom: 22px;
    margin-left: 4px;
    &:hover {
      cursor: pointer;
    }
    .iconfont {
      color: red;
    }
  }
  .require {
    color: red;
  }
}
</style>
<style lang="scss">
.unit-outer {
  .ivu-form-item {
    width: 100%;
    .ivu-form-item-label {
      text-align: left;
    }
  }
  .ivu-dropdown {
    flex: 0 0 auto;
    margin-bottom: 22px;
    margin-left: 10px;
    &.algin-top {
      align-self: flex-start;
    }
  }
}
</style>



