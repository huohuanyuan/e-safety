/*
 * @Author: chengshanshan 
 * @Date: 2019-04-15 13:47:48 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-05-13 10:39:45
 * @instraction:case页面 字典元搜索模态框，table前端分页
 */
 <template>
  <div>
    <Modal
      v-model="showModal"
      title="CODE"
      width="800"
      :mask-closable="false"
    >
      <Input
        search
        enter-button
        @on-search="search"
        v-model="searchValue"
      />
      <safety-split></safety-split>
      <Table
        size="small"
        :columns="columns"
        :data="tableData"
        @on-row-click="rowClick"
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
import { apiGetMeddraList } from "api/case/case-api.js";
import { resCode } from "common/js/code.js";
export default {
  components: {
    SafetySplit
  },
  props: {
    searchParams: {
      //字典id
      type: Object,
      default() {
        return {
          meddraId: "",
          uid: ""
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
          title: "LLT",
          key: "lltName",
          render: (h, params) => {
            return h("div", {}, `${params.row.lltName}(${params.row.lltCode})`);
          }
        },
        {
          title: "PT",
          key: "ptName",
          render: (h, params) => {
            return h("div", {}, `${params.row.ptName}(${params.row.ptCode})`);
          }
        },
        {
          title: "SOC",
          key: "socName",
          render: (h, params) => {
            return h("div", {}, `${params.row.socName}(${params.row.socCode})`);
          }
        }
      ],
      pageTotal: 0,
      searchValue: ""
    };
  },
  methods: {
    init() {
      if (!this.searchParams.version) {
        this.$Message.warning("请先选择字典");
      } else {
        this.showModal = true;
        this.searchValue = "";
        this.tableData = [];
        this.pageSize = 10;
        this.pageNum = 1;
        this.pageTotal = 0;
      }
    },
    search() {
      this.pageSize = 10;
      this.pageNum = 1;
      this.getMeddraList();
    },
    getMeddraList() {
      apiGetMeddraList({
        version: this.searchParams.version,
        searchValue: this.searchValue
      }).then(res => {
        if (res.status) {
          this.listData = res.data;
          this.tableData = this.listData.slice(0, this.pageSize);
          this.pageTotal = res.data.length;
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
    },
    rowClick(row, index) {
      this.$store.commit("setDrawValueStr", {
        value: `${row.lltCode},${row.lltName}`,
        uid:this.searchParams.uid
      });

      this.showModal = false;
    }
  }
};
</script>
 
 
