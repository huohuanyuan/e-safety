/**
 * 引入vue-i18n
 */
import Vue from 'vue';
import iView from 'iview';
import VueI18n from 'vue-i18n';

/**
 * 导入iview自带语言包
 */
import zh from 'iview/dist/locale/zh-CN';
import en from 'iview/dist/locale/en-US';

Vue.use(VueI18n);
Vue.locale = () => {};

const messages = {
  en: Object.assign(require('./en'), en), // 英文语言包
  zh: Object.assign(require('./zh'), zh), // 中文语言包
};

export const i18n = new VueI18n({
  locale: (() => {
    let lang = "";
    if (window.localStorage.getItem('language')) {
      lang = window.localStorage.getItem("language");
    } else {
      //获取浏览器语言
      lang = navigator.language || navigator.userLanguage;
      lang = lang.substr(0, 2);
      if (!["zh", "en"].includes(lang)) {
        lang = "zh"
      }
    }
    return lang;
  })(),
  messages // set locale messages
});

Vue.use(iView, {
  i18n: function (path, options) {
    let value = i18n.t(path, options);
    if (value !== null && value !== undefined) return value;
    return '';
  }
});
