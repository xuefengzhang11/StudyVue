<template>
    <div>
      <div class="container-fluid header bg-header">
        <div class="container">
          <div class="row">
            <div class="col-md-2 text-right">
              <div class="logo">
                <span><em class="h2"><router-link style="color: black;" class="r-link" to="/">思达迪</router-link></em></span>
                <span><router-link to="/"><img src="../../assets/icons/logo.svg"></router-link></span>
              </div>
            </div>
            <div class="col-md-5 header-nav ">
              <!--<router-link to="/">Home</router-link>-->
              <span class="nav-btn"><router-link class="r-link" to="/course">免费课程</router-link></span>
              <span class="nav-btn"><router-link class="r-link" to="/career">职业路径</router-link></span>
              <span class="nav-btn"><router-link class="r-link" to="/article">手记</router-link></span>
              <!--<span class="nav-btn">猿问</span>-->
              <!--<span class="nav-btn">找工作</span>-->
            </div>
            <!--购物车-->
            <div class="col-md-4 text-right">
              <button class="btn-cart" @click="toMyCart" @mouseover.prevent.stop="enterShop" @mouseout.prevent.stop="leaveShop">
                <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> 购物车
              </button>
              <!--购物车悬浮-->
              <div class="shopcart" v-show="shopHover"
                   @mouseenter.prevent.stop="enterShop" @mouseleave.prevent.stop="leaveshops">
                <div class="shopcart-text">我的购物车</div>
                <div class="shop-content container-fluid">
                  <div class="shop-course row">
                    <div class="shop-dimg col-md-6">
                      <img src="../../assets/images/courses/1.jpg" class="shop-img" />
                    </div>
                    <div class="shop-name col-md-6">买的课程名</div>
                    <div class="shop-price col-md-6">￥价格</div>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-6 shop-center">我的订单中心</div>
                    <div class="col-md-6 shop-car">去购物车</div>
                  </div>
                </div>
              </div>
            </div>
            <!--登录注册链接-->
            <div v-if="!islogin" class="col-md-1 login-rgst">
              <span class="nav-btn" @click.prevent.stop="toLoginRegister">登录</span> /
              <span class="nav-btn" @click.prevent.stop="toLoginRegister">注册</span>
            </div>
            <!--登录成功后的用户头像-->
            <div v-else class="col-md-1 user-img">
            <span>
              <img :src="imgurl" alt="" class="user-top-img" @click="toPerson"
                   @mouseenter.prevent.stop="enterUser" @mouseleave.prevent.stop="leaveUser"
              >
            </span>
              <div class="person" v-show="isHover"
                   @mouseenter.prevent.stop="enterUser" @mouseleave.prevent.stop="leavesUser"
              >
                <!--用户头像悬浮-->
                <div class="container user">
                  <div class="row user-top">
                    <div class="row">
                      <div class="user-icon-box">
                        <div class="col-md-4">
                          <img @click="toPerson" :src="imgurl" alt="" class="user-icon"
                          >
                        </div>
                        <div class="col-md-4">
                          <div class="row user-name" v-text="user.name"></div>
                          <div class="row user-expen">
                            {{user.job__name}}&nbsp;&nbsp;&nbsp;&nbsp;{{user.gender__name}}
                          </div>
                        </div>
                        <div class="col-md-4"></div>
                      </div>
                    </div>
                    <div class="row user-item">
                      <div class="col-md-12">
                        <div class="row">
                      <span class="col-md-6 my-user" @click.prevent.stop="toPerson">
                        <img src="../../assets/icons/my-course.svg" alt="">&nbsp;&nbsp;我的课程
                      </span>
                          <span class="col-md-6 my-user" @click.prevent.stop="toPersonArticle">
                        <img src="../../assets/icons/article-logo.svg" alt="">&nbsp;&nbsp;我的文章
                      </span>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="row">
                      <span class="col-md-6 my-user" @click.prevent.stop="toPersonOrder">
                        <img src="../../assets/icons/my-write-article.svg" alt="">&nbsp;&nbsp;订单中心
                      </span>
                          <span class="col-md-6 my-user" @click.prevent.stop="toPersonalSetting">
                        <img src="../../assets/icons/my-person-set.svg" alt="">&nbsp;&nbsp;个人设置
                      </span>
                        </div>
                      </div>
                    </div>
                    <div class="row my-white"></div>
                    <div class="row" :id="collectcourse.sectid">
                      <div class="col-md-1 my-time">
                        <img src="../../assets/icons/my-time.svg" alt="">
                      </div>
                      <div class="col-md-7">
                        <div class="row my-course-name" v-text="collectcourse.course_name">
                        </div>
                        <div class="row my-chapter-name">
                          <span v-text="collectcourse.chapter_index"></span>- <span v-text="collectcourse.section_index"></span>&nbsp;&nbsp;<span v-text="collectcourse.section_name"></span>
                        </div>
                      </div>
                      <div class="col-md-1"></div>
                      <div class="col-md-3 continue" @click.stop.prevent="towatchdetail">
                        继续
                      </div>
                    </div>
                  </div>
                  <div class="row my-cancel" @click="logout">
                    安全退出
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--未登录提示框-->
      <tiplogin v-if="isTipLogin" @sureclick="isTipLogin=false"></tiplogin>
    </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import SectionDetail from '../course/SectionDetail'

export default {
  name: 'NavTop',
  props: ['nowstatus', 'islogin'],
  data () {
    return {
      // 悬浮状态
      isHover: false,
      isTipLogin: false,
      shopHover: false,
      exist: false,
      person_exist: false,
      user: {},
      imgurl: '',
      collectcourse: ''
    }
  },
  created: function () {
    this.usertel = window.sessionStorage.getItem('usertel')
  },
  mounted () {
    this.getUser()
    this.getNextStudy()
  },
  methods: {
    // 通过用户电话号码获取用户信息
    getUser: function () {
      let vm = this
      axios.get(this.Global.HOST + 'user/getUser/' + this.usertel + '/')
        .then(function (response) {
          vm.user = response.data.user[0]
          vm.imgurl = vm.Global.IMG + vm.user.icon__iconurl
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    toLoginRegister: function (e) {
      let $d = $(e.target).text()
      let cur = $d === '登录' ? 'login' : 'register'
      this.$emit('tologrgstclick', cur)
    },
    leaveUser: function () {
      let vm = this
      if (vm.person_exist) {
        vm.isHover = true
        vm.person_exist = false
        setTimeout(function () {
          if (vm.person_exist === false) {
            vm.isHover = false
          }
        }, 200)
      }
    },
    enterUser: function () {
      this.isHover = true
      this.person_exist = true
    },
    leavesUser: function () {
      let vm = this
      setTimeout(function () {
        vm.isHover = false
        vm.person_exist = false
      }, 100)
    },
    leaveShop: function () {
      let vm = this
      if (vm.exist) {
        vm.shopHover = true
        vm.exist = false
        setTimeout(function () {
          if (vm.exist === false) {
            vm.shopHover = false
          }
          console.log('leave..')
        }, 200)
      }
    },
    enterShop: function () {
      this.shopHover = true
      this.exist = true
    },
    leaveshops: function () {
      let vm = this
      setTimeout(function () {
        vm.shopHover = false
        vm.exist = false
      }, 100)
    },
    // 用户登出
    logout: function () {
      // 清除session
      window.sessionStorage.removeItem('usertel')
      // 将父组件中的islogin改为false
      this.$emit('logout')
    },
    // 用户头像点击事件,跳转个人中心-》我的课程
    toPerson: function () {
      this.$router.push({
        path: '/personal'
      })
    },
    // 跳转个人中心-》我的文章
    toPersonArticle: function () {
      this.$router.push({
        name: 'personal',
        params: {
          leftF: 'article'
        }
      })
    },
    // 跳转个人中心-》订单中心
    toPersonOrder: function () {
      let usertel = window.sessionStorage.getItem('usertel')
      if (usertel) {
        this.$router.push({
          path: '/order'
        })
      } else {
        this.isTipLogin = true
      }
    },
    // 跳转到个人设置toPersonArticle
    toPersonalSetting: function () {
      this.$router.push({
        path: '/setting'
      })
    },
    // 前往购物车
    toMyCart: function () {
      let usertel = window.sessionStorage.getItem('usertel')
      if (usertel) {
        this.$router.push({
          path: '/cart'
        })
      } else {
        this.isTipLogin = true
      }
    },
    getNextStudy: function () {
      this.usertel = window.sessionStorage.getItem('usertel')
      let vm = this
      axios.get(this.Global.HOST + 'course/getNextData/' + vm.usertel + '/')
        .then(function (response) {
          vm.collectcourse = response.data.data
        })
    },
    towatchdetail: function (e) {
      let $sectid = $(e.target).parents('.row').attr('id')
      this.$router.push({
        path: '/sectiondetail',
        name: 'sectiondetail',
        params: {
          sectid: $sectid
        }
      })
    }
  },
  components: { SectionDetail }
}
</script>

<!-- 头部导航栏CSS -->
<style scoped>
  <!-- 登录成功显示的用户信息 -->
  .user-img{
    width: 60px;
    height: 90px;
    position: relative;
    /*top:30px;*/
    margin-left: 10px;
  }
  .user-img .person {
    position: absolute;
    right: 20px;
    top: 80px;
    width: 314px;
    height: 330px;
    border-radius: 10px;
    background: #ffffff;
    z-index: 999;
  }

  .user{
    width: 314px;
    height: 330px;
    border-radius: 10px;
    box-shadow: 2px 2px 10px gray;
  }
  .user-top{
    width:280px;
    height:280px ;
    margin: auto;
    border-bottom: 1px solid rgba(171, 171, 171, 0.76);
  }
  .user-icon-box{
    width: 280px;
    height: 80px;
    /*background: pink;*/
    margin-left: 15px;
  }
  .user-icon{
    width:60px;
    height:60px;
    border-radius:50%;
    box-sizing: border-box;
    margin-top: 10px;
  }
  .user-name{
    margin-top: 20px;
    margin-left: -20px;
    font-size: 1.2em;
  }
  .user-expen{
    margin-top: 5px;
    margin-left: -20px;
    color:grey;
    font-size: 0.9em;
  }
  .user-item{
    width: 280px;
    height: 100px;
    margin-top: 10px;
    margin-left: 2px;
  }
  .my-user{
    width: 130px;
    height: 50px;
    background: lightgray;
    padding-left: -4px;
    padding-top: 15px;
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 5px;
  }
  .my-user img{
    width: 18px;
    height: 18px;
  }
  .my-white{
    height: 20px;
    margin-top: 13px;
  }
  .my-time{
    padding-left: 25px;
  }
  .my-course-name{
    padding-left: 10px;
    font-size: 1.1em;
  }
  .my-chapter-name{
    /*padding-left: 10px;*/
    padding-top: 7px;
    font-size: 0.6em;
  }
  .continue{
    color: #09ff84;
    /*margin-left: 20px;*/
    padding-top: 28px;
  }
  .continue:hover{
    cursor: pointer;
  }
  .my-cancel{
    padding-left: 20px;
    padding-top: 15px;
  }
  .my-cancel:hover{
    cursor: pointer;
  }
  /*-----------------end---------------*/
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
    position: relative;
    z-index: 999;
  }

  .header .logo {
    height: 60px;
    line-height: 90px;
  }

  .header .logo img {
    position: relative;
    top: -7px;
  }

  .bg-header {
    background: rgb(244, 244, 244);
    height: 80px;
  }

  .user-top-img{
    /*display: inline-block;*/
    width: 40px;
    height: 40px;
    line-height: 60px;
    border-radius: 50%;
    margin-top: 20px;
    margin-left: 40px;
  }
  /*.header .user-img img {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*object-fit: cover;*/
    /*border-radius: 50%;*/
  /*}*/
  .header .btn-cart {
    height: 35px;
    border: none;
    border-radius: 30px;
    outline: none;
    margin-top: 22px;
  }

  .header .btn-cart:hover {
    color: red;
    box-shadow: 2px 2px 2px gray;
  }
  .header .nav-btn {
    display: inline-block;
    height: 60px;
    line-height: 80px;
    font-size: 1.3em;
    text-decoration: none;
    color: #565656;
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
  .header .shopcart{
    padding: 20px;
    position: absolute;
    right: 10px;
    top: 80px;
    width: 300px;
    height: 410px;
    border-radius: 10px;
    background: white;
    z-index: 999;
    box-shadow: 2px 2px 10px gray;
  }
  .header .shopcart .shopcart-text {
    color: black;
    text-align: left;
    font-size: 1.2em;
    padding-bottom: 10px;
    border-bottom: grey 1px solid;
  }
  .header .shopcart .shop-course {
    height: 100px;
    padding: 10px 0;
  }
  .shopcart .shop-content {
    height: 300px;
    border-bottom: grey 1px solid;
    overflow: auto;
  }
  .shop-course .shop-dimg {
    text-align: left;
  }
  .shop-course .shop-dimg .shop-img {
    width: 100px;
    height: 80px;
    border-radius: 5px;
  }
  .shopcart .shop-course .shop-name {
    height: 20px;
    text-align: left;
  }
  .shopcart .shop-course .shop-price {
    height: 20px;
    text-align: left;
    margin-top: 40px;
  }
  .shopcart .shop-center {
    margin-top: 15px;
    text-align: left;
  }
  .shopcart .shop-car {
    width: 100px;
    height: 30px;
    background: red;
    margin-top: 10px;
    margin-left: 30px;
    border-radius: 50px;
    line-height: 30px;
    text-align: center;
  }
  .my-cancel{
    padding-right: 40px;
    text-align: right;
  }
</style>
