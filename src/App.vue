<template>
  <div id="app">
    <!--顶部-->
    <nav-top @tologrgstclick="toLogRgst" :islogin="islogin" @logout="funcb"></nav-top>
    <loginregister :nowstatus="nowstatus" @on-close="closeDialog" v-if="isShow"
                   @logrgstsuccessclick="funca"
    >

    </loginregister>
    <div style="min-height: 520px;">
      <!--中间-->
      <router-view v-if="isRouterAlive"></router-view>
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
      // 模态框显示登录还是注册 login register
      nowstatus: '',
      isShow: false,
      islogin: false
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
    },
    funcb: function () {
      this.islogin = false
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
