/*
 * @Author: chengshanshan 
 * @Date: 2019-04-22 13:29:01 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-04-23 10:37:46
 * @instraction:case页面操作轨迹
 */
 <template>
  <div>
    <Modal
      v-model="showModal"
      title="操作轨迹"
      width="800"
      :mask-closable="false"
    >

      <Table
        size="small"
        :columns="columns"
        :data="tableData"
      >
      </Table>
      <safety-split></safety-split>
      <Page
        :total="pageTotal"
        :page-size="pageSize"
        :current="pageNum"
        @on-change="pageChange"
        class-name="e-page"
      />

      <div slot="footer">
        <Button
          type="primary"
          @click="close"
        >关闭</Button>
      </div>
    </Modal>
  </div>
</template>
 <script>
import SafetySplit from "components/safety-split.vue";
import { apiGetElemPath } from "api/case/case-api.js";
import { resCode } from "common/js/code.js";
import { INPUT_TYPE } from "common/js/constant.js";
import moment from "moment";
export default {
  components: {
    SafetySplit
  },
  props: {
    pathParams: {
      //字典id
      type: Object,
      default() {
        return {
          dataId: ""
        };
      }
    }
  },
  data() {
    return {
      showModal: false,
      tableData: [],
      listData: [],
      pageSize: 10,
      pageNum: 1,
      columns: [
        {
          title: "用户名",
          key: "name"
        },
        {
          title: "值",
          key: "value"
        },
        {
          title: "类型",
          key: "type",
          render: (h, params) => {
            let str = "";
            switch (params.row.type) {
              case INPUT_TYPE.USER:
                str = "用户录入";
                break;
              case INPUT_TYPE.SYS:
                str = "系统录入";
            }
            return h("div", {}, str);
          }
        },
        {
          title: "时间",
          key: "create",
          render: (h, params) => {
            return h(
              "div",
              {},
              moment(params.row.create).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        }
      ],
      pageTotal: 0
    };
  },
  methods: {
    init() {
      this.tableData = [];
      this.pageSize = 10;
      this.pageNum = 1;
      this.pageTotal = 0;
      this.getElemPath();
      this.showModal = true;
    },
    getElemPath() {
      apiGetElemPath(this.pathParams.dataId).then(res => {
        if (res.status) {
          this.listData = res.data;
          this.pageTotal = res.data.length;
          this.tableData = this.listData.slice(0, this.pageSize);
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    pageChange(num) {
      this.pageNum = num;
      let start = this.pageSize * (this.pageNum - 1);
      let end = start + this.pageSize;
      this.tableData = this.listData.slice(start, end);
    },
    close() {
      this.showModal = false;
    }
  }
};
</script>
 
 

