import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './lang' // Internationalization

import VueClipboards from 'vue-clipboard2'

import '@/styles/index.scss' // global css

import CustComponents from './components/index'

import App from './App'
import router from './router'
import store from './store'
import moment from 'moment'
// import BaiduMap from 'vue-baidu-map'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) })

Vue.use(CustComponents)

Vue.use(VueClipboards)

// Vue.use(BaiduMap, {
//   /* 需要注册百度地图开发者来获取你的ak */
//   ak: '87nNWmzP1Sj6R6DgL8HseKOtgHsZk5nL'
// })

Vue.config.productionTip = false

// 过滤器 时间戳
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD') {
  if (dataStr) {
    return moment(dataStr).format(pattern)
  } else {
    return dataStr
  }
})

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
