/*
 * @Author: chengshanshan 
 * @Date: 2019-03-22 13:18:52 
 * @Last Modified by: chengshanshan
 * @Last Modified time: 2019-04-22 13:56:25
 * @instrction:系统常用常量
 */

//项目流程code
// PROCESS_CODE 流程中的状态 
export const PROCESS_CODE = {
  EDIT: '案例录入',
  QC: "案例质检",
  EVALUATION: "医学评价",
  // AUDIT: "医学审核",
  REVIEW: "案例复核",
  COMPLETE: '案例归档',
  0: '提交',
  1: '通过',
  2: '撤回',
}
//项目流程code 3个
export const PROCESS_CODE_ADMIN = {
  QC: "案例质检",
  EVALUATION: "医学评价",
  // AUDIT: "医学审核",
  REVIEW: "案例复核",

}

// 报告者的资格
export const QUALIFICATION = {
  "1": "医生",
  "2": "药剂师",
  "3": "其他医疗保健专业人士",
  "4": "律师",
  "5": "消费者或其他非医疗保健专业人士"
}

// 事件的研究类型
export const STUDYTYPE = {
  "1": "临床试验",
  "2": "个例患者使用个例患者使用（例如“同情使用同情使用”或“指定患者用途”）",
  "3": "其他研究（例如药物流行病学、药物经济学、重点监测重点）"
}

//页面提示时长单位：秒
export const DURATION_TIME = 2;

// 质疑状态
export const QUERY_CODE = {
  SENDING: "质疑发送",
  REPLY: "质疑回复",
  CLOSE: "质疑关闭"
}

// case 页面
export const CASE_CODE = {
  DM: "患者特征",
  AE: "不良事件/反应",
  DG: "药品信息",
  MH: "相关病史",
  DH: "用药史",
  LB: "实验室检查",
  NR: "描述",
  CI: "案例识别",
  RP: "主要信息来源",
  SD: "发送者信息",
  LR: "文献",
  SI: "研究信息"
}
//case 输入类型
export const INPUT_TYPE = {
  USER: 0,//用户录入
  SYS: 1,//系统录入
}
