// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入组件
import NavTop from './components/NavTop'
import NavBottom from './components/NavBottom'
import Paging from './components/Paging'
import LoginRegister from './components/LoginRegister'

// 导入第三方库
// import $ from 'jquery'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.min'

Vue.config.productionTip = false

/* 注册全局组件 */
// 头部导航栏组件
Vue.component('nav-top', NavTop)
// 底部导航栏组件
Vue.component('nav-bottom', NavBottom)
// 分页组件
Vue.component('paging', Paging)
// 登录注册模态框
Vue.component('loginregister', LoginRegister)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
