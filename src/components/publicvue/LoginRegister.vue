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
              <!--登录失败时的提示信息-->
              <p class="warn" v-text="loginError"></p>
              <div class="text">
                <input type="text" id="tel_login" @blur.prevent="showTip1" placeholder="请输入手机号或邮箱" class="btn_tel" v-model="tel_email">
                <p class="warn" v-show="isTip1">请输入正确的邮箱或手机号</p>
              </div>
              <div class="pwd">
                <input type="password" id="pwd_login" @blur.prevent="showTip2" placeholder="请输入密码" class="btn_tel" v-model="pwd">
                <p class="warn" v-show="isTip2">请输入6-16位密码，区分大小写！</p>
              </div>
              <div class="yzm">
                <input type="text" placeholder="请输入验证码" @blur.prevent="showTip3" class="ver_code" v-model="userIptValidate">
                <img @click="getValidate" :src="val_fname" alt="" class="get_ver_yzm">
                <p class="warn" v-show="isTip3">验证码不正确，请重新输入</p>
              </div>
              <div class="auto">
                <label for="auto_sign">
                  <input type="checkbox" id="auto_sign" checked>记住密码
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
              <p class="white" v-text="registerError"></p>
              <div class="text">
                <input type="text" placeholder="请输入手机号" @blur="showTip4" class="btn_tel" v-model="user_tel">
                <p class="warn" v-show="isTip4">请输入正确的手机号</p>
              </div>
              <div class="pwd">
                <input type="password" placeholder="请输入密码" @blur="showTip5" class="btn_tel" v-model="user_pwd">
                <p class="warn" v-show="isTip5">请输入6-16位密码，区分大小写！</p>
              </div>
              <div class="pwd">
                <input type="text" placeholder="请输入验证码" @blur="showTip6" class="ver_code" v-model="user_validate">
                <button type="button" class="get_ver" @click="sendValidate">获取验证码</button>
                <p class="warn" v-show="isTip6">请输入验证码</p>
              </div>
              <div class="auto">
                <label for="auto_sign">
                  <input type="checkbox" id="degree" checked>我已同意思达迪协议
                </label>
              </div>
              <div class="btn">
                <input type="button" @click.prevent.stop="register" value="注册" class="log_reg">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'

export default {
  props: [
    'nowstatus'
  ],
  name: 'LoginRegister',
  data () {
    return {
      msg: '登录注册',
      logorregister: '',
      // -----登录部分data-----
      // 用户输入的电话或邮箱
      tel_email: '',
      // 用户输入的密码
      pwd: '',
      // 用户输入的验证码
      userIptValidate: '',
      // 服务器返回验证码图片名
      val_fname: '',
      // 服务器返回的验证码
      validate: '',
      // 登录提示信息
      loginError: '',
      // 是否显示前端验证错误提示
      isTip1: false,
      isTip2: false,
      isTip3: false,
      // -----注册部分data-----
      // 注册失败提示信息
      registerError: '',
      // 是否显示前端验证错误提示
      isTip4: false,
      isTip5: false,
      isTip6: false,
      // 用户输入的电话
      user_tel: '',
      // 用户输入的密码
      user_pwd: '',
      // 用户输入的验证码
      user_validate: '',
      // 可以获取验证码的间隔时间，秒
      seconds: 60
    }
  },
  created: function () {
    this.logorregister = this.nowstatus
  },
  mounted: function () {
    // 首次加载登录验证码图片
    this.getValidate()
  },
  watch: {
    nowstatus: function (now, before) {
      this.logorregister = this.nowstatus
    }
  },
  methods: {
    // 登录提交数据
    login: function () {
      this.loginError = ''
      // 登录提交之前先验证用户的输入
      this.showTip1()
      this.showTip2()
      this.showTip3()
      if (!this.isTip1 && !this.isTip2 && !this.isTip3) {
        // 前端通过验证通过
        let user = {
          'tel_email': this.tel_email,
          'pwd': this.pwd
        }
        let vm = this
        $.ajax({
          url: vm.Global.HOST + 'user/login/',
          type: 'POST',
          data: user,
          success: function (response, textStatus, request) {
            if (response.res === '登录成功') {
              // 存储用户
              window.sessionStorage.setItem('usertel', response.tel_email)
              // 存储token
              window.sessionStorage.setItem('token', response.token)
              vm.closeMyself()
              vm.$emit('logrgstsuccessclick')
            } else {
              // 登录失败，给出错误提示
              vm.loginError = response.res
            }
          }
        })
      }
    },
    // 点击获取验证码
    sendValidate: function (e) {
      let flag = this.showTip4()
      if (!flag) {
        // 更换按钮状态
        $(e.target).css('background', 'gray').attr('disabled', true)
        // 每一秒钟执行一次
        let timer = window.setInterval(() => {
          $(e.target).text(--this.seconds + '秒后获取')
          if (this.seconds < 1) {
            // 清除定时器
            window.clearInterval(timer)
            // 恢复原始状态
            $(e.target).css('background', 'white').attr('disabled', false).text('获取验证码')
            // 秒数重新变为60
            this.seconds = 60
          }
        }, 1000)
        // 发送ajax，后台调用接口发送验证码给用户
        let user = {
          'user_tel': this.user_tel
        }
        let vm = this
        $.ajax({
          url: this.Global.HOST + 'user/sendValidate/',
          type: 'POST',
          data: user,
          success: function (response, textStatus, request) {
            vm.registerError = response.msg
          }
        })
      }
    },
    // 用户注册
    register: function () {
      if (!this.isTip4 && !this.isTip5 && !this.isTip6) {
        let user = {
          'tel': this.user_tel,
          'pwd': this.user_pwd
        }
        let vm = this
        $.ajax({
          url: this.Global.HOST + 'user/register/',
          type: 'POST',
          data: user,
          success: function (response, textStatus, request) {
            if (response.res === '注册成功') {
              // 存储用户
              window.sessionStorage.setItem('usertel', vm.user_tel)
              // 存储token
              window.sessionStorage.setItem('token', response.token)
              vm.closeMyself()
              vm.$emit('logrgstsuccessclick')
            } else {
              // 注册失败
              vm.registerError = response.res
            }
          }
        })
      }
    },
    // 获取验证码图片
    getValidate: function () {
      let vm = this
      axios.get(this.Global.HOST + 'user/randomValidate/')
        .then(function (response) {
          vm.validate = response.data.validateIcon[0]
          vm.val_fname = vm.Global.IMG + response.data.validateIcon[1]
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 判断用户登录时输入的电话号或邮箱是否符合要求
    showTip1: function () {
      this.loginError = ''
      let TelRegex = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
      let EmailRegex = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (TelRegex.test(this.tel_email) || EmailRegex.test(this.tel_email)) {
        this.isTip1 = false
      } else {
        this.isTip1 = true
      }
      return this.isTip1
    },
    // 判断用户登录时输入的密码是否符合要求
    showTip2: function () {
      this.loginError = ''
      if (/\w{6,16}/.test(this.pwd)) {
        this.isTip2 = false
      } else {
        this.isTip2 = true
      }
      return this.isTip2
    },
    // 判断登录验证码是否正确
    showTip3: function () {
      this.loginError = ''
      if (this.userIptValidate.toString().toLowerCase() !== this.validate) {
        this.isTip3 = true
      } else {
        this.isTip3 = false
      }
      return this.isTip3
    },
    // 判断用户注册时输入的电话号是否符合要求
    showTip4: function () {
      this.registerError = ''
      let TelRegex = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
      if (TelRegex.test(this.user_tel)) {
        this.isTip4 = false
      } else {
        this.isTip4 = true
      }
      return this.isTip4
    },
    // 判断用户注册时输入的密码是否符合要求
    showTip5: function () {
      this.registerError = ''
      if (/\w{6,16}/.test(this.user_pwd)) {
        this.isTip5 = false
      } else {
        this.isTip5 = true
      }
      return this.isTip2
    },
    // 判断用户是否输入验证码
    showTip6: function () {
      this.registerError = ''
      if (this.user_validate) {
        this.isTip6 = false
      } else {
        this.isTip6 = true
      }
      return this.isTip6
    },
    // 切换未登录界面
    tologin: function () {
      this.logorregister = 'login'
    },
    // 切换未注册界面
    toregister: function () {
      this.logorregister = 'register'
    },
    // 关闭登录注册组件
    closeMyself: function () {
      this.status = ''
      this.$emit('on-close')
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
    /*z-index: 99;*/
    position: fixed;
    border-radius: 10px;
    margin-top: 100px;
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
    height: 30px;
    color: red;
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
  .warn{
    color: red;
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
  img:hover{
    cursor: pointer;
  }
</style>
