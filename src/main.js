// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import global from './components/publicvue/Global'
// 导入组件
import NavTop from './components/publicvue/NavTop'
import NavBottom from './components/publicvue/NavBottom'
import Paging from './components/publicvue/Paging'
import LoginRegister from './components/publicvue/LoginRegister'
import TipLogin from './components/publicvue/TipLogin'
import Cart from './components/publicvue/Cart'
import CommitSuccess from './components/publicvue/CommitSuccess'
import VDistpicker from 'v-distpicker'

// 导入第三方库
// import $ from 'jquery'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.min'

Vue.config.productionTip = false

Vue.prototype.Global = global

/* 注册全局组件 */
// 头部导航栏组件
Vue.component('nav-top', NavTop)
// 底部导航栏组件
Vue.component('nav-bottom', NavBottom)
// 分页组件
Vue.component('paging', Paging)
// 登录注册模态框
Vue.component('loginregister', LoginRegister)
// 注册未登录提示组件
Vue.component('tiplogin', TipLogin)
// 注册购物车组件
Vue.component('cart', Cart)
// 提交成功
Vue.component('commitsuccess', CommitSuccess)
// 地点的三级联动
Vue.component('v-distpicker', VDistpicker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
