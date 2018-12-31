// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import {getDate} from './utils'
import store from './store'
import '@/style/index.scss'
import 'normalize.css/normalize.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = getDate
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
