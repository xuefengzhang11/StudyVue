<template>
    <div class="container-fluid header bg-header">
      <div class="container">
        <div class="row">
          <div class="col-md-2 text-right">
            <div class="logo">
              <span><em class="h2"><router-link style="color: black;" class="r-link" to="/">思达迪</router-link></em></span>
              <span><router-link to="/"><img src="../assets/icons/logo.svg"></router-link></span>
            </div>
          </div>
          <div class="col-md-5 header-nav ">
            <!--<router-link to="/">Home</router-link>-->
            <span class="nav-btn"><router-link class="r-link" to="/course">免费课程</router-link></span>
            <span class="nav-btn"><router-link class="r-link" to="/career">职业路径</router-link></span>
            <span class="nav-btn">实战</span>
            <span class="nav-btn">猿问</span>
            <span class="nav-btn"><router-link class="r-link" to="/article">手记</router-link></span>
            <span class="nav-btn">找工作</span>
          </div>
          <div class="col-md-4 text-right">
            <button class="btn-cart">
              <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> 购物车
            </button>
          </div>
          <!--登录注册链接-->
          <div v-if="!islogin" class="col-md-1 login-rgst">
            <span class="nav-btn" @click.prevent.stop="toLoginRegister">登录</span> /
            <span class="nav-btn" @click.prevent.stop="toLoginRegister">注册</span>
          </div>
          <!--登录成功后的用户头像-->
          <div v-else class="col-md-1 user-img">
            <span>
              <img src="../assets/images/users/user-icon.jpg" alt=""
                   @mouseenter.prevent.stop="enterUser" @mouseleave.prevent.stop="leaveUser"
              >
            </span>
            <div class="person" v-show="isHover"
                 @mouseenter.prevent.stop="enterUser" @mouseleave.prevent.stop="leaveUser"
            >
              <h1>用户信息</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
// 用户头像悬停触发事件

export default {
  name: 'NavTop',
  props: ['nowstatus', 'islogin'],
  data () {
    return {
      // 登录状态
      // islogin: false
      // 悬浮状态
      isHover: false
    }
  },
  methods: {
    toLoginRegister: function (e) {
      let $d = $(e.target).text()
      let cur = $d === '登录' ? 'login' : 'register'
      // console.log(cur)
      this.$emit('tologrgstclick', cur)
    },
    leaveUser: function () {
      let vm = this
      setTimeout(function () {
        vm.isHover = false
        console.log('leave..')
      }, 500)
    },
    enterUser: function () {
      let vm = this
      setTimeout(function () {
        vm.isHover = true
        console.log('enter..')
      }, 100)
    }
  }
}
</script>

<!-- 头部导航栏CSS -->
<style scoped>
  .user-img{
    position: relative;
  }
  .user-img .person {
    position: absolute;
    right: 30px;
    top: 60px;
    width: 300px;
    height: 200px;
    border-radius: 10px;
    background: lightpink;
    /*z-index: 999;*/
  }
  /*.user-img .person:hover{*/
    /*cursor: pointer;*/
  /*}*/
  body {
    margin: 0;
    padding: 0;
    background: ghostwhite;
  }
  .header .r-link{
    color: gray;
    text-decoration: none;
  }
  .header .r-link:hover{
    color: black;
  }
  /*头部*/
  .header {
    box-shadow: 2px 2px 10px gray;
  }

  .header .logo {
    height: 60px;
    line-height: 70px;
  }

  .header .logo img {
    position: relative;
    top: -7px;
  }

  .bg-header {
    background: whitesmoke;
  }

  .header .user-img span {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 55px;
    border-radius: 50%;
  }

  .header .user-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .header .btn-cart {
    height: 35px;
    border: none;
    border-radius: 30px;
    outline: none;
    margin-top: 12px;
  }

  .header .btn-cart:hover {
    color: red;
    box-shadow: 2px 2px 2px gray;
  }

  .header .nav-btn {
    display: inline-block;
    height: 60px;
    line-height: 60px;
    font-size: 1.2em;
    text-decoration: none;
    color: gray;
    margin-right: 20px;
  }
  .login-rgst .nav-btn{
    font-size: 0.7em;
    margin-right: 0;
  }

  .header span:hover {
    color: darkslategrey;
    cursor: pointer;
  }
</style>
