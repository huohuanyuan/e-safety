<template>
  <div class="project-select">
    <safety-header :style="{'padding': '15px'}"> </safety-header>
    <div class="content">
      <Row
        :gutter="16"
        type="flex"
        justify="center"
        v-if="projData.length == 1"
      >
        <Col
          :sm="24"
          :md="12"
          v-for="item in projData"
          :key="item.projectId"
        >
        <div class="item">
          <p> {{$t('home.projectName')}} </p>
          <h2> {{ item.projectName }} </h2>
          <p> {{$t('home.projectDes')}} </p>
          <div class="text"> {{item.overview }}</div>
          <Button
            type="success"
            shape="circle"
            @click="clickEnterHome(item)"
          > 进入 </Button>
        </div>
        </Col>
      </Row>
      <Row
        :gutter="16"
        v-else
      >
        <Col
          :sm="24"
          :md="12"
          v-for="item in projData"
          :key="item.projectId"
        >
        <div class="item">
          <p> {{$t('home.projectName')}} </p>
          <h2> {{ item.projectName }} </h2>
          <p> {{$t('home.projectDes')}} </p>
          <div class="text"> {{item.overview }}</div>
          <Button
            type="success"
            shape="circle"
            @click="clickEnterHome(item)"
          > 进入 </Button>
        </div>
        </Col>
      </Row>
    </div>
    <Page
      class-name="e-page"
      :total="project.total"
      :current="project.pageNum"
      :page-size="project.pageSize"
      @on-change="pageChange"
    />
  </div>
</template>

<script>
import qs from "qs";
import SafetyHeader from "components/safety-header";
import { apiGetUserProj } from "@/api/home/home-api.js";
import { resCode } from "common/js/code.js";
import { apiPutProjEnter } from "api/home/home-api.js";

export default {
  components: {
    SafetyHeader
  },
  data() {
    return {
      project: {
        total: 0,
        pageNum: 1,
        pageSize: 4
      },
      projData: []
    };
  },
  methods: {
    putProjEnter(data) {
      let _data = {
        projectId: data.projectId,
        roleId: data.roleId
      };
      apiPutProjEnter(qs.stringify(_data)).then(res => {
        if (res.status) {
          localStorage.setItem("projectId", data.projectId);
          localStorage.setItem("roleId", data.roleId);
          this.$router.push({
            name: "HOME",
            query: {
              projectId: data.projectId,
              roleId: data.roleId
            }
          });
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 获取登陆用户项目信息
    getUserProj() {
      apiGetUserProj(this.project).then(res => {
        if (res.status) {
          this.projData = res.data.dataList;
          this.project.total = res.data.total;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    },
    // 分页
    pageChange(pageNum) {
      this.project.pageNum = pageNum;
      this.getUserProj();
    },
    // 点击进入 home 页面
    clickEnterHome(item) {
      this.putProjEnter(item);
    }
  },
  mounted() {
    this.getUserProj();
  }
};
</script>
<style lang="scss">
@import "@/common/css/variable.scss";
@import "@/common/css/mixin.scss";
.project-select {
  background: $bg-color1;
  height: 100%;
  .content {
    padding: calc(20% - 270px) 100px 100px 100px;
    background: $bg-color1;
    height: calc(100% - 107px);
  }
  .item {
    height: 220px;
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    margin: 20px;
    color: $font-color-content;
    p {
      color: $font-color-content;
      font-size: 13px;
    }
    h2 {
      padding: 10px 0;
      color: $color-theme;
      font-weight: bold;
    }
    .text {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      margin-top: 10px;
      text-indent: 2em;
    }
    .ivu-btn-circle {
      padding: 5px 30px;
      position: absolute;
      bottom: 5px;
      right: 50px;
    }
  }
  .e-page {
    @include e-page();
  }
}
</style>


