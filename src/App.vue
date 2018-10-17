<template>
  <div id="app">
    <!--顶部-->
    <nav-top @tologrgstclick="toLogRgst"></nav-top>
    <loginregister v-if="is_log_rgst_show" :nowstatus="nowstatus" @on-close="closeDialog" v-show="isShow"></loginregister>
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
      is_log_rgst_show: false,
      nowstatus: '',
      isShow: true
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
      this.is_log_rgst_show = true
      this.nowstatus = cur
      // console.log(this.nowstatus)
      this.isShow = true
    },
    closeDialog: function () {
      this.isShow = false
      // 把绑定的弹窗数组 设为false即可关闭弹窗
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
