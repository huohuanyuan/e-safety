/*
 * @Author: liuhaosheng 
 * @Date: 2019-03-21 10:17:02 
 * @Last Modified by: liuhaosheng
 * @Last Modified time: 2019-04-15 14:11:27
 * 登录页面
 */
<template>
  <div class="wrap-login">
    <div class="wrap">
      <div
        class="login"
        v-if="loginShow"
        @keydown.enter="postLogin('formLogin')"
      >
        <h2> {{$t('login.login')}} </h2>
        <Form
          ref="formLogin"
          :model="formLogin"
          :rules="loginRuleValidate"
          label-position="top"
        >
          <Form-item
            prop="email"
            :label="$t('login.email')"
          >
            <Input
              size="large"
              type="text"
              v-model.trim="formLogin.email"
            >
            </Input>
          </Form-item>
          <Form-item
            prop="password"
            :label="$t('login.password')"
          >
            <Input
              size="large"
              type="password"
              v-model.trim="formLogin.password"
            >
            </Input>
          </Form-item>
          <FormItem class="btn-success">
            <Button
              type="success"
              @click="postLogin('formLogin')"
            > {{$t('login.login')}} </Button>
          </FormItem>
        </Form>
        <div class="login-botton">
          <span @click="showReset()"> {{$t('login.forgetPassword')}}? </span>
          <Dropdown @on-click="langChange">
            <span> {{$t('login.language')}} <Icon type="ios-arrow-down"></Icon></span>
            <DropdownMenu slot="list">
              <DropdownItem name='zh'> 中文 </DropdownItem>
              <DropdownItem name='en'> English </DropdownItem>
              <DropdownItem> 日本語 </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <!--  忘记密码  -->
      <div
        class="reset"
        v-show="resetShow"
        @keydown.enter="putResetPwd('forgetPwdForm')"
      >
        <h2> {{$t('login.forgetPassword')}} </h2>
        <Form
          ref="forgetPwdForm"
          :model="forgetPwdForm"
          :rules="forgetPwdRuleValidate"
          label-position="top"
        >
          <Form-item
            prop="email"
            :label="$t('login.email')"
          >
            <Input
              size="large"
              type="text"
              v-model.trim="forgetPwdForm.email"
            >
            </Input>
          </Form-item>
          <Form-item
            prop="verifyCode"
            :label="$t('login.verCode')"
          >
            <Input
              size="large"
              type="text"
              v-model.trim="forgetPwdForm.verifyCode"
            >
            </Input>
            <Button
              type="success"
              shape="circle"
              :disabled="disabled"
              @click="putVerCode('forgetPwdForm')"
              class="forget-btn"
            > {{ title }} </Button>
          </Form-item>
          <Form-item
            prop="password"
            :label="$t('login.newPwd')"
          >
            <Input
              size="large"
              type="password"
              v-model.trim="forgetPwdForm.password"
            >
            </Input>
          </Form-item>
          <Form-item
            prop="resetPwd"
            :label="$t('login.againNewPwd')"
          >
            <Input
              size="large"
              type="password"
              v-model.trim="forgetPwdForm.resetPwd"
            >
            </Input>
          </Form-item>
          <FormItem class="btn-success">
            <Button
              type="success"
              @click="putResetPwd('forgetPwdForm')"
            > {{$t('common.confirm')}} </Button>
            <Button
              type="text"
              icon="md-arrow-back"
              @click="showLogin('forgetPwdForm')"
            > {{$t('common.back')}} </Button>
          </FormItem>
        </Form>
      </div>
      <!-- 第一次登陆修改密码 -->
      <div
        v-show="oneLoginShow"
        @keydown.enter="putFirstPwd('firstLoginForm')"
      >
        <h2> {{$t('login.accountSecurity')}} </h2>
        <Form
          ref="firstLoginForm"
          :model="firstLoginForm"
          :rules="firstRuleValidate"
          label-position="top"
        >
          <Form-item
            prop="oldPwd"
            :label="$t('login.oldPwd')"
          >
            <Input
              size="large"
              type="password"
              v-model.trim="firstLoginForm.oldPwd"
            >
            </Input>
          </Form-item>
          <Form-item
            prop="newPwd"
            :label="$t('login.newPwd')"
          >
            <Input
              size="large"
              type="password"
              v-model.trim="firstLoginForm.newPwd"
            >
            </Input>
          </Form-item>
          <Form-item
            prop="resetNewPwd"
            :label="$t('login.againNewPwd')"
          >
            <Input
              size="large"
              type="password"
              v-model.trim="firstLoginForm.resetNewPwd"
            >
            </Input>
          </Form-item>
          <FormItem class="btn-success">
            <Button
              type="success"
              @click="putFirstPwd('firstLoginForm')"
            > {{$t('common.confirm')}} </Button>
            <Button
              type="text"
              icon="md-arrow-back"
              @click="showFirstLogin('firstLoginForm')"
            > {{$t('common.back')}} </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  postLogin,
  putPwdVerifyCode,
  putLoginPwd,
  putPwdExpire
} from "@/api/api";

import qs from "qs";
import md5 from "js-md5";
import pwdValidate from "@/common/js/pwdVaildate.js";
import { resCode } from "common/js/code.js";

export default {
  data() {
    // 密码强度校验
    const pwdStrengthCheck = (rule, value, callback) => {
      if (value == "") {
        callback(new Error(this.$t("login.againEnterPassword")));
      } else {
        //  忘记密码验证
        if (rule.field == "resetPwd") {
          if (value !== this.forgetPwdForm.password) {
            callback(new Error(this.$t("login.twicePasswordNotSame")));
          } else {
            callback();
          }
        } else {
          // 密码过期验证
          if (value !== this.firstLoginForm.newPwd) {
            callback(new Error(this.$t("login.twicePasswordNotSame")));
          } else {
            callback();
          }
        }
      }
    };

    return {
      loginShow: true,
      resetShow: false,
      oneLoginShow: false,
      disabled: false,
      timer: null,
      title: this.$t("login.sendVerCode"),
      count: "",
      formLogin: {
        email: "",
        password: ""
      },
      forgetPwdForm: {
        email: "",
        verifyCode: "",
        password: "",
        resetPwd: ""
      },
      firstLoginForm: {
        oldPwd: "",
        newPwd: "",
        resetNewPwd: ""
      },
      loginRuleValidate: {
        email: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ]
      },
      forgetPwdRuleValidate: {
        email: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        verifyCode: [
          {
            required: true,
            message: this.$t("login.verCodeNotEmpty"),
            trigger: "blur"
          }
        ],
        password: [...pwdValidate],
        resetPwd: [
          {
            validator: pwdStrengthCheck,
            trigger: "blur"
          }
        ]
      },
      firstRuleValidate: {
        oldPwd: [
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        newPwd: [...pwdValidate],
        resetNewPwd: [
          {
            validator: pwdStrengthCheck,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    showReset() {
      this.loginShow = !this.loginShow;
      this.resetShow = !this.resetShow;
    },
    showLogin() {
      this.loginShow = !this.loginShow;
      this.resetShow = !this.resetShow;
      this.$refs["forgetPwdForm"].resetFields();
    },
    showFirstLogin() {
      this.loginShow = !this.loginShow;
      this.oneLoginShow = !this.oneLoginShow;
      this.$refs["firstLoginForm"].resetFields();
    },
    // 切换语言
    langChange(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("language", lang);
      location.reload();
    },
    // 登录
    postLogin(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let data = {
            email: this.formLogin.email,
            password: md5(this.formLogin.password)
          };
          postLogin(qs.stringify(data)).then(res => {
            if (res.status) {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("admin", res.data.admin);
              localStorage.setItem("name", res.data.name);
              localStorage.setItem("userId", res.data.userId);
              localStorage.setItem("email", res.data.email);
              if (res.data.admin) {
                this.$router.push({
                  name: "ADMIN_HOME"
                });
              } else {
                this.$router.push({
                  name: "PROJECT_SELECT"
                });
              }
            } else {
              this.$Message.error(resCode(this, res.code));
              if (res.code == "2004") {
                this.showFirstLogin();
              }
            }
          });
        }
      });
    },
    // 发送验证码
    putVerCode(name) {
      if (this.forgetPwdForm.email == "") {
        this.$Message.error(this.$t("login.emailVerCode"));
      } else {
        var data = {
          email: this.forgetPwdForm.email
        };
        putPwdVerifyCode(qs.stringify(data)).then(res => {
          if (res.status) {
            this.$Message.success(this.$t("login.verCodeCheck"));
            this.getCode();
          } else {
            this.$Message.error(resCode(this, res.code));
          }
        });
      }
    },
    // 修改密码
    putResetPwd(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var data = {
            email: this.forgetPwdForm.email,
            newPwd: md5(this.forgetPwdForm.password),
            code: this.forgetPwdForm.verifyCode
          };
          putLoginPwd(data).then(res => {
            if (res.status) {
              this.$Message.success(this.$t("common.successModified"));
              this.showLogin();
            } else {
              this.$Message.error(resCode(this, res.code));
            }
          });
        }
      });
    },
    // 修改密码(密码过期）
    putFirstPwd(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var data = {
            email: this.formLogin.email,
            password: md5(this.firstLoginForm.oldPwd),
            newPwd: md5(this.firstLoginForm.newPwd)
          };
          putPwdExpire(data).then(res => {
            if (res.status) {
              this.$Message.success(this.$t("common.successModified"));
              this.showFirstLogin();
            } else {
              this.$Message.error(resCode(this, res.code));
            }
          });
        }
      });
    },
    // 倒计时
    getCode() {
      const TIME_COUNT = 120;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.disabled = true;
        this.timer = setInterval(() => {
          if (this.count > 1 && this.count <= TIME_COUNT) {
            this.count--;
            this.title = this.$t("login.resend") + this.count;
          } else {
            this.disabled = false;
            clearInterval(this.timer);
            this.count = "";
            this.timer = null;
            this.title = this.$t("login.sendVerCode");
          }
        }, 1000);
      }
    }
  },
  watch: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.wrap-login {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("./../assets/login.jpg") no-repeat;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .wrap {
    width: 360px;
    margin: 145px auto;
    position: relative;
    background: #fff;
    padding: 25px;
    h2 {
      text-align: center;
      margin: 20px 0;
    }
  }
  .login {
    .login-botton {
      padding: 5px;
      cursor: pointer;
      .ivu-dropdown {
        float: right;
      }
    }
  }
  .reset {
    .forget-btn {
      padding: 4px 10px;
      position: absolute;
      top: 4px;
      right: 5px;
    }
  }
}
</style>
<style lang="scss" >
.wrap {
  .ivu-form-item-label {
    font-size: 14px;
  }
  .ivu-input {
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-radius: 0;
  }
  .ivu-input:focus {
    box-shadow: none;
  }
  .btn-success {
    text-align: center;
  }
  .ivu-btn-success {
    padding: 5px 40px;
  }
}
</style>


