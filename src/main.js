// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import libFlexible from 'lib-flexible'
import FastClick from 'fastclick'
import Waves from 'node-waves'

import 'swiper/dist/css/swiper.css'   // 轮播样式
import '@/common/sass/waves.scss'     // 波纹样式
import '@/common/stylus/base.styl'
import '@/common/sass/index.scss'

Vue.config.productionTip = false
Vue.prototype.axios = axios

Vue.use(libFlexible)                // 计算 rem
Vue.use(require('vue-wechat-title'))
Waves.init()                        // 波纹点击效果初始化
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
    FastClick.attach(document.body)
  }, false)
}

// 模拟数据
require('./api/api.js')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
