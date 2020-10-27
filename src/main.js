import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import $ from 'jquery'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.min.js"
import 'assets/css/global.css'
import 'assets/font/iconfont.css'

import SockService  from "utils/socket_service";
SockService.Instance.connect()
// 将全局的SockService挂载到Vue的原型对象上
// 在别的组件中，用this.$socket
Vue.prototype.$socket = SockService.Instance


// 将全局的echarts挂载到Vue的原型对象上
// 在别的组件中，用this.$echarts
Vue.prototype.$echarts = window.echarts

// 请求基准路径的配置
axios.defaults.baseURL = 'http://127.0.0.1:8888'
// 将axios挂载到Vue原型对象上  在别的组件中，用this.$http
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
