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
            <button class="btn-cart" @mouseenter.prevent.stop="enterShop" @mouseleave.prevent.stop="leaveShop">
              <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> 购物车
            </button>
            <div class="shopcart" v-show="shopHover"
                 @mouseenter.prevent.stop="enterShop" @mouseleave.prevent.stop="leaveshops">
              <div class="shopcart-text">我的购物车</div>
              <div class="shop-content container-fluid">
                <div class="shop-course row">
                  <div class="shop-dimg col-md-6">
                    <img src="../assets/images/courses/1.jpg" class="shop-img" />
                  </div>
                  <div class="shop-name col-md-6">买的课程名</div>
                  <div class="shop-price col-md-6">￥价格</div>
                </div>
                <div class="shop-course row">
                  <div class="shop-dimg col-md-6">
                    <img src="../assets/images/courses/1.jpg" class="shop-img" />
                  </div>
                  <div class="shop-name col-md-6">买的课程名</div>
                  <div class="shop-price col-md-6">￥价格</div>
                </div>
                <div class="shop-course row">
                  <div class="shop-dimg col-md-6">
                    <img src="../assets/images/courses/1.jpg" class="shop-img" />
                  </div>
                  <div class="shop-name col-md-6">买的课程名</div>
                  <div class="shop-price col-md-6">￥价格</div>
                </div>
                <div class="shop-course row">
                  <div class="shop-dimg col-md-6">
                    <img src="../assets/images/courses/1.jpg" class="shop-img" />
                  </div>
                  <div class="shop-name col-md-6">买的课程名</div>
                  <div class="shop-price col-md-6">￥价格</div>
                </div>
                <div class="shop-course row">
                  <div class="shop-dimg col-md-6">
                    <img src="../assets/images/courses/1.jpg" class="shop-img" />
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
              <img src="../assets/images/users/user-icon.jpg" alt="" class="user-top-img"
                   @mouseenter.prevent.stop="enterUser" @mouseleave.prevent.stop="leaveUser"
              >
            </span>
            <div class="person" v-show="isHover"
                 @mouseenter.prevent.stop="enterUser" @mouseleave.prevent.stop="leavesUser"
            >
              <div class="container user">
                <div class="row user-top">
                  <div class="row">
                    <div class="user-icon-box">
                      <div class="col-md-4">
                        <img src="../assets/images/users/user-icon.jpg" alt="" class="user-icon" >
                      </div>
                      <div class="col-md-4">
                        <div class="row user-name">
                          zhangxuefeng
                        </div>
                        <div class="row user-expen">
                          经验78&nbsp;&nbsp;积分0
                        </div>
                      </div>
                      <div class="col-md-4"></div>
                    </div>
                  </div>
                  <div class="row user-item">
                    <div class="col-md-12">
                      <div class="row">
                      <span class="col-md-6 my-user">
                        <img src="../assets/icons/my-course.svg" alt="">&nbsp;&nbsp;我的课程
                      </span>
                        <span class="col-md-6 my-user">
                        <img src="../assets/icons/article-logo.svg" alt="">&nbsp;&nbsp;我的文章
                      </span>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="row">
                      <span class="col-md-6 my-user">
                        <img src="../assets/icons/my-write-article.svg" alt="">&nbsp;&nbsp;订单中心
                      </span>
                        <span class="col-md-6 my-user">
                        <img src="../assets/icons/my-person-set.svg" alt="">&nbsp;&nbsp;个人设置
                      </span>
                      </div>
                    </div>
                  </div>
                  <div class="row my-white"></div>
                  <div class="row">
                    <div class="col-md-1 my-time">
                      <img src="../assets/icons/my-time.svg" alt="">
                    </div>
                    <div class="col-md-6">
                      <div class="row my-course-name">
                        课程名称aaaa
                      </div>
                      <div class="row my-chapter-name">
                        课程章名称aaaa
                      </div>
                    </div>
                    <div class="col-md-2"></div>
                    <div class="col-md-3 continue">
                      继续
                    </div>
                  </div>
                </div>
                <div class="row my-cancel">
                  安全退出
                </div>
              </div>
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
      isHover: false,
      shopHover: false,
      exist: false,
      person_exist: false
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
      if (vm.person_exist) {
        vm.isHover = true
        vm.person_exist = false
        setTimeout(function () {
          if (vm.person_exist === false) {
            vm.isHover = false
          }
        }, 300)
      }
    },
    enterUser: function () {
      let vm = this
      setTimeout(function () {
        vm.isHover = true
        vm.person_exist = true
        // console.log('enter..')
      }, 100)
    },
    leavesUser: function () {
      let vm = this
      setTimeout(function () {
        vm.isHover = false
        vm.person_exist = false
        // console.log('leave..')
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
        }, 300)
      }
    },
    enterShop: function () {
      let vm = this
      setTimeout(function () {
        vm.shopHover = true
        vm.exist = true
        // console.log('enter..')
      }, 100)
    },
    leaveshops: function () {
      let vm = this
      setTimeout(function () {
        vm.shopHover = false
        vm.exist = false
        // console.log('leave..')
      }, 100)
    },
    toPerson: function () {
      // 用户头像点击事件
      this.$router.push({
        path: '/person'
      })
    }
  }
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
    margin-left: 20px;
  }
  .user-img .person {
    position: absolute;
    right: 30px;
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
  }
  .user-top{
    width:280px;
    height:270px ;
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
    margin-left: 1px;
  }
  .my-user{
    width: 130px;
    height: 45px;
    background: lightgray;
    padding-left: -4px;
    padding-top: 10px;
    margin-left: 5px;
    margin-top: 5px;
  }
  .my-user img{
    width: 18px;
    height: 18px;
  }
  .my-white{
    height: 20px;
  }
  .my-time{
    padding-left: 25px;
  }
  .my-course-name{
    padding-left: 10px;
    font-size: 1.1em;
  }
  .my-chapter-name{
    padding-left: 10px;
    padding-top: 5px;
  }
  .continue{
    color: #09ff84;
    margin-left: 10px;
    padding-top: 25px;
  }
  .my-cancel{
    padding-left: 20px;
    padding-top: 15px;
  }
  .my-cancel:hover{
    cursor: pointer;
  }
  /*-----------------end---------------*/
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
    top: 60px;
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
    border-radius: 10px;
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
</style>
