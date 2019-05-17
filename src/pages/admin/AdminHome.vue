/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-12 16:52:07 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-03-21 15:59:52
 * 管理员页面
 */

<template>
  <div class="admin-home">
    <div class="item-wrap">
      <div class="item">
        <img
          src="./../../assets/user.png"
          alt="用户"
        >
        <p> {{$t('home.userNum')}} </p>
        <h3> {{ data.user }} </h3>
      </div>
      <div class="item">
        <img
          src="./../../assets/company.png"
          alt="公司"
        >
        <p> {{$t('home.companyNum')}} </p>
        <h3> {{ data.company}} </h3>
      </div>
      <div class="item">
        <img
          src="./../../assets/project.png"
          alt="项目"
        >
        <p> {{$t('home.projectNum')}} </p>
        <h3> {{ data.project }} </h3>
      </div>
    </div>
  </div>
</template>

<script>
import SafetyHeader from "components/safety-header";
import { apiGetAdminStatistic } from "@/api/home/home-api.js";
import { resCode } from "common/js/code.js";

export default {
  components: {
    SafetyHeader
  },
  data() {
    return {
      data: {}
    };
  },
  methods: {
    // 管理员首页统计
    getAdminStatistic() {
      apiGetAdminStatistic().then(res => {
        if (res.status) {
          this.data = res.data;
        } else {
          this.$Message.error(resCode(this, res.code));
        }
      });
    }
  },
  watch: {},
  mounted() {
    this.getAdminStatistic();
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/css/variable.scss";
.admin-home {
  background: $bg-color1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .top {
    height: 50px;
    font-size: 18px;
    color: $font-color-h2;
    width: 100%;
    position: absolute;
    top: 10px;
  }
  .top-img {
    display: inline-block;
    height: 35px;
    line-height: 35px;
    vertical-align: top;
    margin-left: 20px;
    img {
      width: 35px;
      height: 35px;
    }
  }
  .drop-down {
    margin-top: 5px;
    float: right;
    margin-right: 20px;
    .span-name {
      cursor: pointer;
    }
  }
  .item-wrap {
    text-align: center;
  }
  .item {
    background: #fff;
    border-radius: 16px;
    height: 300px;
    width: 250px;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    margin: 30px;
    img {
      margin: 50px 0;
    }
    p {
      font-size: 16px;
      color: $aid-font;
    }
    h3 {
      color: $font-color-h1;
      font-size: 40px;
    }
  }
}
</style>



