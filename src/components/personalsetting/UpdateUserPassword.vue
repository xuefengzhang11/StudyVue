<template>
<div class="zzc">
  <div class="tab-content">
    <form action="" >
      <div class="row alter-text">
        <div class="col-md-1"></div>
        <div class="col-md-9">修改密码</div>
        <div class="col-md-2" @click="toupdatepwd">
          <img src="../../assets/icons/X.svg">
        </div>
      </div>
      <div class="original-password">
        <span class="original-text">请输入原密码：</span>
        <input type="password" class="btn_tel" id="oldpwd" placeholder="输入原始密码" data-validate="require-password" v-model="uoldpwd">
        <p class="warn" v-if="isTipPwd1">与原密码不符，请重新输入</p>
      </div>
      <div class="original-password">
        <span class="original-text">请输入新密码：</span>
        <input type="password" class="btn_tel" id="pwd1" placeholder="输入新密码" @blur="showNewPwd" v-model="unewpwd">
        <p class="warn" v-if="isTipPwd2">请输入6-16位密码，区分大小写，不能使用空格！</p>
      </div>
      <div class="original-password">
        <span class="original-text">请确认新密码：</span>
        <input type="password" class="btn_tel" id="pwd2" placeholder="再次输入新密码" @blur="showAgainNewPwd" v-model="uagainnewpwd">
        <p class="warn" v-if="isTipPwd3">两次输入不同，请重新输入！</p>
      </div>

      <div class="container-fluid bg-input">
        <div class="row">
          <div class="col-md-6 bg-confirm">
            <input type="button" value="确认" class="confirm" @click="updateUserPwd">
          </div>
          <div class="col-md-6">
            <input type="button" value="取消" class="cancel" @click="toupdatepwd">
          </div>
        </div>
      </div>

    </form>
  </div>
</div>
</template>

<script>
// import axios from 'axios'
import $ from 'jquery'
export default {
  name: 'UpdateUserPassword',
  data () {
    return {
      msg: '修改个人信息',
      url: 'http://localhost:8000/',
      uoldpwd: '',
      unewpwd: '',
      uagainnewpwd: '',
      isTipPwd1: false,
      isTipPwd2: false,
      isTipPwd3: false
    }
  },
  created () {
    this.usertel = window.sessionStorage.getItem('usertel')
  },
  methods: {
    // 关闭模态框
    toupdatepwd: function () {
      this.$emit('updatepwdclick')
    },
    // 修改用户密码
    updateUserPwd: function () {
      this.showNewPwd()
      this.showAgainNewPwd()
      if (this.isTipPwd2 === false && this.isTipPwd3 === false) {
        let user = {
          'usertel': this.usertel,
          'oldpwd': this.uoldpwd,
          'newpwd': this.unewpwd
        }
        let vm = this
        $.ajax({
          url: this.url + 'user/updatePwd/',
          type: 'POST',
          data: JSON.stringify(user),
          success: function (response, textStatus, request) {
            let res = response.res
            // console.log(response.res)
            if (res === '修改成功') {
              vm.closeMyself()
              vm.$emit('updateUserPwdclick')
              vm.isTipPwd1 = false
            } else if (res === '与原密码不符') {
              vm.isTipPwd1 = true
            } else {
              vm.isTipPwd1 = false
            }
          }
        })
      }
    },
    // 判断新密码格式
    showNewPwd: function () {
      let PwdRegex = /\w{6,16}/
      if (PwdRegex.test(this.unewpwd)) {
        this.isTipPwd2 = false
      } else {
        this.isTipPwd2 = true
      }
      return this.isTipPwd2
    },
    // 判断重新输入的格式
    showAgainNewPwd: function () {
      if (this.unewpwd === this.uagainnewpwd) {
        this.isTipPwd3 = false
      } else {
        this.isTipPwd3 = true
      }
      return this.isTipPwd3
    },
    closeMyself: function () {
      this.status = ''
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped>
  .zzc {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .tab-content{
    width: 490px;
    height: 350px;
    background: white;
    position: absolute;
    left: 50%;
    transform: translate(-50%,50%);
    border-radius: 20px;
    border: solid 1px black;
  }
  .alter-text{
    margin-top: 20px;
    font-size: 1.4em;
    font-weight: bold;
  }
  .original-password{
    height: 60px;
    margin-top: 10px;
    margin-left: 60px;
  }
  .original-text{
    font-size: 1.3em;
  }
  .btn_tel{
    width: 250px;
    height: 40px;
    outline: none;
    border: solid 1px black;
    padding-left: 10px;
    border-radius: 3px;
  }
  .warn{
    margin-left: 50px;
    height: 30px;
    color: red;
  }
  .bg-input {
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .bg-confirm {
    text-align: right;
  }
  .confirm {
    width: 60px;
    height: 35px;
    border-radius: 40px;
    text-align: center;
    line-height: 35px;
    background: #126693;
    color: white;
    opacity: 0.8;
    outline: none;
    border: none;
  }

  .cancel {
    width: 60px;
    height: 35px;
    border-radius: 40px;
    border: solid 1px black;
    text-align: center;
    line-height: 35px;
    outline: none;
    background: white;
  }

  .confirm:hover {
    opacity: 1;

  }
</style>
