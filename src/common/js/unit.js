/*
 * @Author: liuhaosheng 
 * @Date: 2019-4-7 13:45:53
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-18 16:17:41
 *  公共函数
 */
import Router from 'vue-router'

// 质疑跳转指定页面方法
export function caseQueryRouter(data) {
  let _data = {
    pageId: data.pageId,
    caseId: data.caseId
  };
  if (data.pageId == "DM") {
    window.vm.$router.push({
      name: "CASE_DM",
      query: _data
    });
  } else if (data.pageId == "AE") {
    window.vm.$router.push({
      name: "CASE_AE",
      query: _data
    });
  } else if (data.pageId == "DG") {
    window.vm.$router.push({
      name: "CASE_DRUG",
      query: _data
    });
  } else if (data.pageId == "MH") {
    window.vm.$router.push({
      name: "CASE_MH",
      query: _data
    });
  } else if (data.pageId == "DH") {
    window.vm.$router.push({
      name: "CASE_DH",
      query: _data
    });
  } else if (data.pageId == "LB") {
    window.vm.$router.push({
      name: "CASE_LB",
      query: _data
    });
  } else if (data.pageId == "NR") {
    window.vm.$router.push({
      name: "CASE_NR",
      query: _data
    });
  } else if (data.pageId == "CI") {
    window.vm.$router.push({
      name: "CASE_CI",
      query: _data
    });
  } else if (data.pageId == "RP") {
    window.vm.$router.push({
      name: "CASE_RP",
      query: _data
    });
  } else if (data.pageId == "SD") {
    window.vm.$router.push({
      name: "CASE_SD",
      query: _data
    });
  } else if (data.pageId == "LR") {
    window.vm.$router.push({
      name: "CASE_LR",
      query: _data
    });
  } else if (data.pageId == "SI") {
    window.vm.$router.push({
      name: "CASE_SI",
      query: _data
    });
  }

}
