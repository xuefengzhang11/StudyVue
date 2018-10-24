<template>
  <div id="app">
    <!--顶部-->
    <nav-top @tologrgstclick="toLogRgst" v-if="hackReset" :islogin="islogin" @logout="funcb"></nav-top>
    <loginregister :nowstatus="nowstatus" @on-close="closeDialog" v-if="isShow"
                   @logrgstsuccessclick="funca"
    >

    </loginregister>
    <div style="min-height: 520px;">
      <!--中间-->
      <router-view v-if="isRouterAlive" @upfather="funcc"></router-view>
    </div>
    <!--底部-->
    <nav-bottom></nav-bottom>
  </div>
</template>

<script>

export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,
      // 强制子组件刷新
      hackReset: true,
      // 模态框显示登录还是注册 login register
      nowstatus: '',
      isShow: false,
      islogin: false
    }
  },
  created () {
    let usertel = window.sessionStorage.getItem('usertel')
    if (usertel) {
      this.islogin = true
    }
  },
  methods: {
    // 刷新界面的方法
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    toLogRgst: function (cur) {
      this.nowstatus = cur
      this.isShow = true
    },
    closeDialog: function () {
      this.isShow = false
      // 把绑定的弹窗数组 设为false即可关闭弹窗
    },
    funca: function () {
      this.islogin = true
      // 强制刷新NavTop组件
      this.funcc()
    },
    funcb: function () {
      this.islogin = false
    },
    // 更换用户头像后刷新头部
    funcc: function () {
      // 给子组件绑定hackReset,强制刷新子组件
      this.hackReset = false
      // this.hackReset = true
      this.$nextTick(() => {
        this.hackReset = true
      })
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    background: ghostwhite;
  }
</style>
