// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import axios from 'axios';
import localStorage from 'store';
import libFlexible from 'lib-flexible';
import FastClick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import Waves from 'node-waves';

import 'swiper/dist/css/swiper.css';   // 轮播样式
import '@/common/sass/waves.scss';     // 波纹样式
import '@/common/stylus/base.styl';
import '@/common/sass/index.scss';

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.localStorage = localStorage;

Vue.use(libFlexible);                // 计算 rem;
Vue.use(require('vue-wechat-title'));

Vue.use(VueLazyload, {    // 图片懒加载;
  preLoad: 1.3,
  error: require('@/common/img/404.png'),
  loading: require('@/common/img/loader.png')
})
Waves.init();   // 波纹点击效果初始化;
//   按钮class         waves-effect waves-button
//
//   图标class         waves-effect waves-circle
//
//   块级容器          waves-effect waves-block
//
//   白色透明class     waves-light
//
//   浮动阴影class     waves-float

if ('addEventListener' in document) { // 解决移动端300毫秒延迟
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false)
}

// 模拟数据
require('./api/api.js');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

console.log('%c黎聪：GitHub：https://github.com/licong96', 'text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:16px')
