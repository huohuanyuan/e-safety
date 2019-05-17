/*
 * @Author: chengshanshan 
 * @Date: 2019-03-14 16:33:42 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-08 10:37:14
 * @instruction:code对应值
 */

export function resCode(vm, key) {
  let _code = {
    '1001': '参数错误', //vm.$t('note.passwordError'),
    '1002': '系统错误',
    '1003': '用户无权限',
    '1004': '用户未登录',
    '2001': '用户不存在',
    '2002': '用户未激活',
    '2003': '密码错误',
    '2004': '密码过期',
    '2005': '验证码错误',
    '2006': '请先获取验证码',
    '2007': '邮箱已存在',
    '2008': '用户已进入项目'
  }
  return _code[key] ? _code[key] : '未知错误'
}

