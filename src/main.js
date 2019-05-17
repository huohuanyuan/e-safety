// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {
  router
} from './router/index.js'

import './common/css/index.scss';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './theme/index.less';
import store from './store';

Vue.use(iView);

// 处理时间
import moment from "moment";

// 导入语言
import {
  i18n
} from './lang/index';

Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: {
    App
  },
  template: '<App/>'
})

//过滤器
/**
 * 时间过滤函数
 * @param { Date } value：需要过滤的时间
 * @param { String }formatString：过滤后的格式，默认“YYYY-MM-DD”
 * @return 格式化后的时间，当value为空时返回的字段，默认返回"--"
 */
Vue.filter('moment', function (value, formatString, nullMsg) {
  formatString = formatString || 'YYYY MM DD  hh:mm:ss';
  nullMsg = nullMsg || "--";
  if (value) {
    return moment(value).format(formatString);
  } else {
    return nullMsg
  }

})
