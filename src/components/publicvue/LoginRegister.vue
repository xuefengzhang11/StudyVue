<template>
  <!--遮罩层-->
  <div class="zzc">
    <!--登录注册容器-->
    <div class="div-login-register">
      <div class="top">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation">
            <a role="tab" :class="{active: logorregister === 'login'}" data-toggle="tab" class="pos" @click="tologin">登录</a>
          </li>
          <li role="presentation">
            <a role="tab" :class="{active: logorregister === 'register'}" data-toggle="tab" class="pos" @click="toregister">注册</a></li>
          <li>
            <!--叉叉-->
            <button class="img" @click="closeMyself"></button>
          </li>
        </ul>
        <!-- Tab panes -->
        <!--登录-->
        <div role="tabpanel" class="tab-pane def_login" id="login"  v-if="logorregister === 'login'">
          <div class="midd">
            <form action="" id="btns_login">
              <p class="white"></p>
              <div class="text">
                <input type="text" id="tel_login" placeholder="请输入手机号或邮箱" class="btn_tel" v-model="tel_email">
                <p class="warn" data-error-hide="请输入正确的邮箱或手机号"></p>
              </div>
              <div class="pwd">
                <input type="text" id="pwd_login" placeholder="请输入密码" class="btn_tel" v-model="pwd">
                <p class="warn" data-error-hide="请输入6-16位密码，区分大小写，不能使用空格！"></p>
              </div>
              <div class="yzm">
                <input type="text" placeholder="请输入验证码" class="ver_code" v-model="valiimg">
                <img src="../../assets/images/courses/timg.png" alt="" class="get_ver_yzm">
                <p class="warn" data-error-hide="验证码不正确，请重新输入"></p>
              </div>
              <div class="auto">
                <label for="auto_sign">
                  <input type="checkbox" id="auto_sign">自动登录
                </label>
                <a href="#" class="forget">忘记密码？</a>
              </div>
              <div class="btn">
                <input type="button" value="登录" class="log_reg" @click="login">
              </div>
            </form>
          </div>
        </div>
        <!--注册-->
        <div role="tabpanel" class="tab-pane def_register" id="register" v-if="logorregister === 'register'">
          <div class="midd">
            <form action="" id="btns_register">
              <p class="white"></p>
              <div class="text">
                <input type="text" placeholder="请输入手机号" class="btn_tel" v-model="tel">
                <p class="warn" data-error-hide="请输入正确的邮箱或手机号"></p>
              </div>
              <div class="pwd">
                <input type="text" placeholder="请输入密码" class="btn_tel" v-model="tel">
                <p class="warn" data-error-hide="输入密码不符合要求"></p>
              </div>
              <div class="pwd">
                <input type="text" placeholder="请输入验证码" class="ver_code" v-model="validate">
                <button type="button" class="get_ver">获取验证码</button>
                <p class="warn" data-error-hide="验证码不正确，请重新输入"></p>
              </div>
              <div class="auto">
                <label for="auto_sign">
                  <input type="checkbox" id="degree">我已同意思达迪协议
                </label>
              </div>
              <div class="btn">
                <input type="button" value="注册" class="log_reg">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import Qs from 'qs'
import $ from 'jquery'

export default {
  props: [
    'nowstatus'
  ],
  name: 'LoginRegister',
  data () {
    return {
      msg: '登录注册',
      url: 'http://localhost:8000/',
      // 用户电话
      tel: '',
      // 用户电话或邮箱
      tel_email: '14796686075',
      // 用户密码
      pwd: '123456',
      // 用户确认密码
      valiimg: '3n3D',
      validate: '666666',
      logorregister: ''
    }
  },
  created: function () {
    this.logorregister = this.nowstatus
  },
  watch: {
    nowstatus: function (now, before) {
      this.logorregister = this.nowstatus
    },
    logorregister: function (now, before) {

    }
  },
  methods: {
    tologin: function () {
      this.logorregister = 'login'
    },
    toregister: function () {
      this.logorregister = 'register'
    },
    closeMyself: function () {
      this.status = ''
      this.$emit('on-close')
    },
    // 登录提交数据
    login: function () {
      let user = {
        'tel_email': this.tel_email,
        'pwd': this.pwd
      }
      let vm = this
      $.ajax({
        url: this.url + 'user/login/',
        type: 'POST',
        data: user,
        success: function (response, textStatus, request) {
          let res = response.res
          if (res[0] === '登录成功') {
            // 存储用户
            window.sessionStorage.setItem('usertel', res[1])
            vm.closeMyself()
            vm.$emit('logrgstsuccessclick')
          }
        }
      })
    },
    // 用户注册
    register: function () {
      let user = {
        'tel_email': this.tel_email,
        'pwd': this.pwd,
        'validate': this.validate
      }
      let vm = this
      $.ajax({
        url: this.url + 'user/register/',
        type: 'POST',
        data: user,
        success: function (response, textStatus, request) {
          let res = response.res
          console.log(res)
          if (res === '注册成功') {
            vm.closeMyself()
            vm.$emit('logrgstsuccessclick')
          }
        }
      })
    }
  }
}
</script>

 <!--Add "scoped" attribute to limit CSS to this component only-->
<style scoped>
  /*遮罩层*/
  .zzc {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 999;
    top: 0;
  }
  /*登录注册div样式*/
  .div-login-register {
    width: 360px;
    height: 400px;
    background: white;
    z-index: 99;
    position: fixed;
    margin-top: 150px;
    margin-left: 500px;
  }
  .top {
    width: 320px;
    height: 50px;
    margin: auto;
  }
  .pos {
    width: 80px;
    height: 50px;
    font-size: 1.2em;
  }
  .pos:hover{
    cursor: pointer;
  }
  .div-login-register .img {
    width: 30px;
    height: 30px;
    margin-top: 12px;
    margin-left: 120px;
    background: url("../../assets/icons/X.svg") no-repeat;
    border: none;
    outline: none;
  }
  .midd {
    width: 300px;
    height: 270px;
    margin: auto;
  }

  .white {
    height: 30px;;
  }
  .text {
    height: 70px;
    margin-top: -10px;
  }
  .btn_tel {
    height: 50px;
    background: white;
    width: 300px;
    outline: none;
    border-radius: 9px;
    border: 1px solid #575757;
    box-sizing: border-box;
    font-size: 1.2em;
    padding-left: 15px;
  }
  .warn {
    height: 20px;
  }
  .pwd {
    height: 70px;
  }
  .yzm {
    height: 70px;

  }
  .yzm.img{
    height: 70px;
    width: 100%;
  }
  .auto {
    width: 300px;
    height: 20px;
  }
  .forget {
    color: black;
    float: right;
  }
  .forget:hover {
    text-decoration: none;
  }
  .btn {
    height: 50px;
    width: 300px;
    margin-top: 20px;
  }
  /*登录注册按钮*/
  .log_reg {
    height: 50px;
    width: 300px;
    background: rgba(255, 0, 0, 0.6);
    color: white;
    font-size: 1.2em;
    border-radius: 24px;
    outline: none;
    border: none;
    box-sizing: border-box;
    position: relative;
    top: -7px;
    left: -14px;
  }
  .tab-content form input[id],.get_ver{
    background: #ffc;
  }
  /*验证码输入框*/
  .ver_code {
    width: 170px;
  }
  .ver_code,.get_ver{
    height: 50px;
    background: white;
    outline: none;
    border-radius: 9px;
    border: 1px solid #575757;
    box-sizing: border-box;
    font-size: 1.2em;
    padding-left: 15px;
  }
  /*获取验证码*/
  .get_ver {
    width: 110px;
    float: right;
    text-align: center;
  }
  .get_ver_yzm {
    width: 120px;
    height: 50px;
    float: right;
    text-align: right;
  }
  .active{
    background: #eee;
  }
</style>
