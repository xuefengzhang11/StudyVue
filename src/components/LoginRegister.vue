<template>
  <!--遮罩层-->
  <div class="zzc">
    <!--登录注册容器-->
    <div class="div-login-register">
      <div class="top">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="pre_login">
            <a href="#login" aria-controls="login" role="tab" data-toggle="tab" class="pos pos_login" @click="tologin">登录</a>
            <!--<span aria-controls="login" data-toggle="tab" class="pos pos_login">登录</span>-->
          </li>
          <li role="presentation" class="pre_register">
            <a href="#register" aria-controls="register" role="tab" data-toggle="tab" class="pos pos_register" @click="toregister">注册</a></li>
          <li>
            <button class="img" @click="closeMyself"></button>
          </li>
        </ul>
        <!-- Tab panes -->
        <div role="tabpanel" class="tab-pane def_login" id="login"  v-if="status === 'login'">
          <div class="midd">
            <form action="" id="btns_login">
              <p class="white"></p>
              <div class="text">
                <input type="text" id="tel_login" placeholder="请输入手机号或邮箱" name="tel_email" class="btn_tel" value="18204624196">
                <p class="warn" data-error-hide="请输入正确的邮箱或手机号"></p>
              </div>
              <div class="pwd">
                <input type="text" id="pwd_login" placeholder="请输入密码" name="pwd" class="btn_tel" value="123456">
                <p class="warn" data-error-hide="请输入6-16位密码，区分大小写，不能使用空格！"></p>
              </div>
              <div class="yzm">
                <input type="text" placeholder="请输入验证码" class="ver_code" value="3n3D">
                <img src="../assets/images/courses/timg.png" alt="" class="get_ver_yzm">
                <p class="warn" data-error-hide="验证码不正确，请重新输入"></p>
              </div>
              <div class="auto">
                <label for="auto_sign">
                  <input type="checkbox" id="auto_sign">自动登录
                </label>
                <a href="#" class="forget">忘记密码？</a>
              </div>
              <div class="btn">
                <input type="button" value="登录" class="log_reg">
              </div>
            </form>
          </div>
        </div>
        <div role="tabpanel" class="tab-pane def_register" id="register" v-if="status === 'register'">
          <div class="midd">
            <form action="" id="btns_register">
              <p class="white"></p>
              <div class="text">
                <input type="text" id="tel_register" placeholder="请输入手机号" class="btn_tel">
                <p class="warn" data-error-hide="请输入正确的邮箱或手机号"></p>
              </div>
              <div class="pwd">
                <input type="text" id="pwd_register" placeholder="请输入密码" class="btn_tel">
                <p class="warn" data-error-hide="输入密码不符合要求"></p>
              </div>
              <div class="pwd">
                <input type="text" id="yzm_register" placeholder="请输入验证码" class="ver_code" value="123456">
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
// import qs from 'qs'
// import $ from 'jquery'

export default {
  props: [
    'nowstatus'
  ],
  name: 'LoginRegister',
  data () {
    return {
      msg: '登录注册',
      status: this.nowstatus
    }
  },
  methods: {
    tologin: function () {
      this.status = 'login'
      console.log(this.status)
    },
    toregister: function () {
      this.status = 'register'
      console.log(this.status)
    },
    closeMyself: function () {
      this.$emit('on-close')
    }
    // getDate: function () {
    //   let tel = document.querySelector('#tel_login')
    //   let pwd = document.querySelector('#pwd_login')
    //   console.log(tel.value)
    //   console.log(pwd.value)
    //   let user = {
    //     'tel_email': tel.value,
    //     'pwd': pwd.value
    //   }
    //   $.ajax(
    //     {
    //       url: 'http://localhost:8000/user/login/',
    //       type: 'POST',
    //       data: JSON.stringify(user),
    //       dataType: 'json',
    //       contentType: 'application/json',
    //       success: function (response, textStatus, xhr) {
    //         console.log(response)
    //         console.log(textStatus)
    //       }
    //     }
    //   )
    // }
  }
}
</script>

 Add "scoped" attribute to limit CSS to this component only
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
  .div-login-register .img {
    width: 30px;
    height: 30px;
    margin-top: 12px;
    margin-left: 120px;
    background: url("../assets/icons/X.svg") no-repeat;
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
</style>
