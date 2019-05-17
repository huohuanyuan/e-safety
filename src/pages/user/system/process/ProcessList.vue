<!--
 * @Author: yongwenhao
 * @LastEditors: yongwenhao
 * @instruction: 流程 List
 * @Date: 2019-04-08 13:21:19
 * @LastEditTime: 2019-04-19 17:27:43
-->

<template>
    <safety-user-content-outer class="reporter-wrap process-list">
      <Layout
        slot="content"
        :style="{'height': '100%'}"
      >
        <!-- 内容主体渲染区域 -->
        <Content>
          <!-- QC-->
          <Card
            style="width:100%;margin-bottom:10px"
            v-if='this.qcData.isIf'
          >
            <Table
              :columns="qcData.columns"
              :data="qcData.data"
              class='table-none-border'
            ></Table>
            <Page
              class-name="e-page"
              :total="qcData.page.total"
              :current="qcData.page.pageNum"
              :page-size="qcData.page.pageSize"
              @on-change="pageChangeQc"
            />
          </Card>
          <!-- 医学评价 -->
          <Card
            style="width:100%;margin-bottom:10px"
            v-if='this.evaData.isIf'
          >
            <Table
              :columns="evaData.columns"
              :data="evaData.data"
              class='table-none-border'
            ></Table>
            <Page
              class-name="e-page"
              :total="evaData.page.total"
              :current="evaData.page.pageNum"
              :page-size="evaData.page.pageSize"
              @on-change="pageChangeEva"
            />
          </Card>
          </Card>
          <!-- 复核 -->
          <Card
            style="width:100%"
            v-if='this.revData.isIf'
          >
            <Table
              :columns="revData.columns"
              :data="revData.data"
              class='table-none-border'
            ></Table>
            <Page
              class-name="e-page"
              :total="revData.page.total"
              :current="revData.page.pageNum"
              :page-size="revData.page.pageSize"
              @on-change="pageChangeRev"
            />
          </Card>
        </Content>
      </Layout>
      <!-- 底部保存等按钮组 -->
      <template slot="btns">
        <Button
          type="info"
          size="large"
          @click="processListSave"
        >{{$t('system.save')}}</Button>
      </template>
    </safety-user-content-outer>
</template>
<script>
window.selfs = {};
// 目的 将window 和 vue 实例绑定在一起 为了获取VueComponent 实例
// 如果不这样，获取到的实例是Vue 获取不到其组件的数据和方法
// 并在 creatde(){} 生命周期里面把 进行 this 绑定
import SafetyUserContentOuter from "components/safety-user-content-outer"; // content-content： 内容区域
import {
  getProcessNode, // 查询项目流程节点信息
  getProcessNodeUser, // 根据项目流程节点获取节点用户信息
  putProcessNodeUser // 批量新增或修改节点用户信息
} from "@/api/system-user/process-api";
import { resCode } from "common/js/code.js"; // 状态码
import { PROCESS_CODE } from "common/js/constant.js"; // 项目流程 code

import qs from "qs";
export default {
  components: {
    SafetyUserContentOuter
  },
  data() {
    return {
      qcData: {
        columns: [
          {
            title: PROCESS_CODE['QC'],
            key: "title",
            width: 150
          },
          {
            title: " ",
            key: "userName",
            className: "table-head",
            isSearch: false,
            nodeId: 93,
            renderHeader: (h, params) => {
              if (params.column.isSearch) {
                return h("Div", [
                  h("span", {}, "人员列表"),
                  h("Input", {
                    props: {
                      type: "text",
                      search: "search"
                    },
                    style: {
                      width: "auto",
                      left: "85px",
                      bottom: "5px",
                      position: "absolute"
                    },
                    on: {
                      "on-search": value => {
                        this.searchInput(value, 1);
                        vm.$set(params.column, "isSearch", false);
                      }
                    }
                  })
                ]);
              } else {
                return h("Div", [
                  h("span", {}, "人员列表"),
                  h("i", {
                    class: ["iconsearch", "iconfont"],
                    style: {
                      cursor: "pointer",
                      marginLeft: "5px"
                    },
                    on: {
                      click: e => {
                        e.stopPropagation();
                        vm.$set(params.column, "isSearch", true);
                      }
                    }
                  })
                ]);
              }
            }
          },
          {
            title: " ",
            key: "email"
          },
          {
            title: " ",
            key: "deleted",
            width: 120,
            renderHeader: (h, params) => {
              return h("Div", [
                h("span", "全选"),
                h("Checkbox", {
                  props: {
                    size: "large"
                  },
                  style: {
                    marginLeft: "5px"
                  },
                  on: {
                    "on-change": value => {
                      if (!value) {
                        this.qcData.data.map(item => {
                          item["deleted"] = true;
                        });
                      } else {
                        this.qcData.data.map(item => {
                          item["deleted"] = false;
                        });
                      }
                    }
                  }
                })
              ]);
            },
            render: (h, params) => {
              return h("Checkbox", {
                props: {
                  size: "large",
                  value: (function() {
                    if (!params.row.deleted) {
                      return true;
                    } else {
                      return false;
                    }
                  })(params)
                },
                style: {
                  marginLeft: "30px"
                },
                on: {
                  "on-change": value => {
                    if (!value) {
                      this.qcData.data[params.index].deleted = true;
                    } else {
                      this.qcData.data[params.index].deleted = false;
                    }
                  }
                }
              });
            }
          }
        ],
        data: [],
        isIf: false, // 页面是否显示
        page: {
          nodeId: null, // 流程节点ID
          name: "", // 查询条件
          pageNum: 1,
          pageSize: 5,
          total: 0
        }
      }, // 案例质检 QC
      evaData: {
        columns: [
          {
            title: PROCESS_CODE['EVALUATION'],
            key: "title",
            width: 150
          },
          {
            title: " ",
            key: "userName",
            className: "table-head",
            isSearch: false,
            nodeId: 93,
            renderHeader: (h, params) => {
              if (params.column.isSearch) {
                return h("Div", [
                  h("span", "人员列表"),
                  h("Input", {
                    props: {
                      type: "text",
                      search: "search"
                    },
                    style: {
                      width: "auto",
                      left: "85px",
                      bottom: "5px",
                      position: "absolute"
                    },
                    on: {
                      "on-search": value => {
                        this.searchInput(value, 2);
                        vm.$set(params.column, "isSearch", false);
                      }
                    }
                  })
                ]);
              } else {
                return h("Div", [
                  h("span", "人员列表"),
                  h("i", {
                    class: ["iconsearch", "iconfont"],
                    style: {
                      cursor: "pointer",
                      marginLeft: "5px"
                    },
                    on: {
                      click: e => {
                        e.stopPropagation();
                        vm.$set(params.column, "isSearch", true);
                      }
                    }
                  })
                ]);
              }
            }
          },
          {
            title: " ",
            key: "email"
          },
          {
            title: " ",
            key: "deleted",
            width: 120,
            renderHeader: (h, params) => {
              return h("Div", [
                h("span", "全选"),
                h("Checkbox", {
                  props: {
                    size: "large"
                  },
                  style: {
                    marginLeft: "5px"
                  },
                  on: {
                    "on-change": value => {
                      if (!value) {
                        this.evaData.data.map(item => {
                          item["deleted"] = true;
                        });
                      } else {
                        this.evaData.data.map(item => {
                          item["deleted"] = false;
                        });
                      }
                    }
                  }
                })
              ]);
            },
            render: (h, params) => {
              return h("Checkbox", {
                props: {
                  size: "large",
                  value: (function() {
                    if (!params.row.deleted) {
                      return true;
                    } else {
                      return false;
                    }
                  })(params)
                },
                style: {
                  marginLeft: "30px"
                },
                on: {
                  "on-change": value => {
                    if (!value) {
                      this.evaData.data[params.index].deleted = true;
                    } else {
                      this.evaData.data[params.index].deleted = false;
                    }
                  }
                }
              });
            }
          }
        ],
        data: [],
        isIf: false, // 页面是否显示
        page: {
          nodeId: null, // 流程节点ID
          name: "", // 查询条件
          pageNum: 1,
          pageSize: 5,
          total: 0
        }
      }, // 医学评价 EVALUATION
      revData: {
        columns: [
          {
            title: PROCESS_CODE['REVIEW'],
            key: "title",
            width: 150
          },
          {
            title: " ",
            key: "userName",
            className: "table-head",
            isSearch: false,
            nodeId: 93,
            renderHeader: (h, params) => {
              if (params.column.isSearch) {
                return h("Div", [
                  h("span", "人员列表"),
                  h("Input", {
                    props: {
                      type: "text",
                      search: "search"
                    },
                    style: {
                      width: "auto",
                      left: "85px",
                      bottom: "5px",
                      position: "absolute"
                    },
                    on: {
                      "on-search": value => {
                        this.searchInput(value, 3);
                        vm.$set(params.column, "isSearch", false);
                      }
                    }
                  })
                ]);
              } else {
                return h("Div", [
                  h("span", "人员列表"),
                  h("i", {
                    class: ["iconsearch", "iconfont"],
                    style: {
                      cursor: "pointer",
                      marginLeft: "5px"
                    },
                    on: {
                      click: e => {
                        e.stopPropagation();
                        vm.$set(params.column, "isSearch", true);
                      }
                    }
                  })
                ]);
              }
            }
          },
          {
            title: " ",
            key: "email"
          },
          {
            title: " ",
            key: "deleted",
            width: 120,
            renderHeader: (h, params) => {
              return h("Div", [
                h("span", "全选"),
                h("Checkbox", {
                  props: {
                    size: "large"
                  },
                  style: {
                    marginLeft: "5px"
                  },
                  on: {
                    "on-change": value => {
                      if (!value) {
                        this.revData.data.map(item => {
                          item["deleted"] = true;
                        });
                      } else {
                        this.revData.data.map(item => {
                          item["deleted"] = false;
                        });
                      }
                    }
                  }
                })
              ]);
            },
            render: (h, params) => {
              return h("Checkbox", {
                props: {
                  size: "large",
                  value: (function() {
                    if (!params.row.deleted) {
                      return true;
                    } else {
                      return false;
                    }
                  })(params)
                },
                style: {
                  marginLeft: "30px"
                },
                on: {
                  "on-change": value => {
                    if (!value) {
                      this.revData.data[params.index].deleted = true;
                    } else {
                      this.revData.data[params.index].deleted = false;
                    }
                  }
                }
              });
            }
          }
        ],
        data: [],
        isIf: false, // 页面是否显示
        page: {
          nodeId: null, // 流程节点ID
          name: "", // 查询条件
          pageNum: 1,
          pageSize: 5,
          total: 0
        }
      } // 案例复核  REVIEW
    };
  },
  creatde() {
    selfs = this;
  },
  mounted() {
    this.getJson(); // 请求数据
  },
  methods: {
     // 获取列表卡片
    getJson() {
      getProcessNode().then(res => {
        if (res.status) {
          res.data.map(item => {
            if (item.nodeCode == "QC") {
              this.qcData.page.nodeId = item.nodeId;
              this.qcData.isIf = true;
              this.getqcDataDateList(); // 获取 QC 列表
            } else if (item.nodeCode == "EVALUATION") {
              this.evaData.page.nodeId = item.nodeId;
              this.evaData.isIf = true;
              this.getEvaDateList(); // 获取 医学评价 列表
            } else {
              this.revData.page.nodeId = item.nodeId;
              this.revData.isIf = true;
              this.getRevDateList(); // 获取 复核 列表
            }
          });
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
     // 获取 QC 列表
    getqcDataDateList() {
      getProcessNodeUser(this.qcData.page).then(res => {
        if (res.status) {
          res.data.dataList.map(item => {
            if (!item.nodeId) {
              item["nodeId"] = this.qcData.page.nodeId;
            }
          });
          this.qcData.data = res.data.dataList;
          this.qcData.page.total = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
       // 获取 医学评价 列表
    getEvaDateList() {
      getProcessNodeUser(this.evaData.page).then(res => {
        if (res.status) {
          res.data.dataList.map(item => {
            if (!item.nodeId) {
              item["nodeId"] = this.evaData.page.nodeId;
            }
          });
          this.evaData.data = res.data.dataList;
          this.evaData.page.total = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
      // 获取 复核 列表
    getRevDateList() {
      getProcessNodeUser(this.revData.page).then(res => {
        if (res.status) {
          res.data.dataList.map(item => {
            if (!item.nodeId) {
              item["nodeId"] = this.revData.page.nodeId;
            }
          });
          this.revData.data = res.data.dataList;
          this.revData.page.total = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // QC 分页
    pageChangeQc(pageNum) {
      this.qcData.page.pageNum = pageNum;
      this.getqcDataDateList();
    },
     // 医学评价 分页
    pageChangeEva(pageNum) {
      this.evaData.page.pageNum = pageNum;
      this.getEvaDateList();
    },
     // 复核 分页
    pageChangeRev(pageNum) {
      this.revData.page.pageNum = pageNum;
      this.getRevDateList();
    },
     // 搜索
    searchInput(value, number) {
      let name = value.replace(/(^\s*)|(\s*$)/g, "");
      if (number == 1) {
        this.qcData.page.name = name;
        this.qcData.page.pageNum = 1;
        this.getqcDataDateList();
      } else if (number == 2) {
        this.evaData.page.name = name;
        this.evaData.page.pageNum = 1;
        this.getEvaDateList();
      } else {
        this.revData.page.name = name;
        this.revData.page.pageNum = 1;
        this.getRevDateList();
      }
    },
     // 修改/保存
    processListSave() {
      let processList = [
        ...this.qcData.data,
        ...this.evaData.data,
        ...this.revData.data
      ];
      putProcessNodeUser(processList).then(res => {
        if (res.status) {
          this.$Message.success(this.$t("system.okCont"));
        } else {
          this.$Message.error(resCode(this, res.code));
        }
        this.getJson(); // 请求数据
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../common/css/variable";
@import "../../../../common/css/mixin";
.header {
  display: flex;
  justify-content: space-between;
}

</style>
<style lang="scss" >
@import "../../../../common/css/mixin";
.e-page {
  @include e-page();
}
// 放在局部 不起作用
.process-list {
  .table-none-border {
    @include e-table();
  }
  /deep/ .table-head {
    position: relative;
  }
  .btns {
    z-index: 99 !important;
    button {
      @include bot-btn();
    }
  }
}
</style>