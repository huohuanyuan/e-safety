/*
 * @Author: liuhaosheng 
 * @Date: 2018-12-11 11:31:14 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-03-18 10:00:01
 */

const regValidate = (rule, value, callback) => {
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
  if (!reg.test(value)) {
    callback(new Error(window.vm.$t('login.pwdNumberEn')))
  } else {
    callback()
  }

};
/**
 * 密码校验：长度为6-20，必须包含数字和字母
 */
let pwdValidate = [{
    required: true,
    message: window.vm.$t('login.pwdNoBlank'),
    trigger: 'blur'
  },
  {
    type: "string",
    min: 6,
    message: window.vm.$t('login.pwdLength6'),
    trigger: "blur"
  },
  {
    type: "string",
    max: 20,
    message: window.vm.$t('login.pwdLength20'),
    trigger: "blur"
  },
  {
    validator: regValidate,
    trigger: "blur"
  },

];
export default pwdValidate
