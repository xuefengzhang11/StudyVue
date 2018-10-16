<template>
  <div id="app">
    <!--顶部-->
    <nav-top @tologrgstclick="toLogRgst"></nav-top>
    <loginregister v-if="is_log_rgst_show" :nowstatus="nowstatus"></loginregister>
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
      nowstatus: ''
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
