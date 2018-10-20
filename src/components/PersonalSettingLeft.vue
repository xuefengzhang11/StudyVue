<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 user">
        <!--悬浮时提醒更换头像-->
        <div class="user-img"  :class="{opacity_half:tipFlag}" @mouseenter="giveTip"
             @mouseleave="cancelTip" @click="toChange">
          <p class="change-tip" v-show="tipFlag">点击更换头像</p>
          <img :src="imgurl" alt=""
          >
        </div>
        <p class="user-name text-center" v-text="user.name"></p>
        <div class="u-title">账户管理</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 manager" style="height: 300px;">
        <span :class="{thisactive:nowRight==='userBind'}"
              :data-value="'userBind'" @click="changeRight"
        >账号绑定
        </span>
        <span :class="{thisactive:nowRight==='userInfo'}"
              :data-value="'userInfo'" @click="changeRight"
        >个人信息
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'

export default {
  name: 'PersonalSettingRight',
  data () {
    return {
      msg: '个人设置坐侧',
      url: 'http://localhost:8000/',
      nowRight: 'userBind',
      usertel: '',
      tipFlag: false,
      imgurl: '',
      user: {}
    }
  },
  created: function () {
    this.usertel = window.sessionStorage.getItem('usertel')
  },
  mounted () {
    this.getUser()
  },
  methods: {
    // 通过用户电话号码获取用户信息
    getUser: function () {
      let vm = this
      axios.get(this.url + 'user/getUser/' + this.usertel + '/')
        .then(function (response) {
          vm.user = response.data.user[0]
          vm.imgurl = 'http://pgu05jbff.bkt.clouddn.com/' + vm.user.icon__iconurl
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 点击左侧，改变右边路由显示
    changeRight: function (e) {
      this.nowRight = $(e.target).attr('data-value')
      // 发射给父组件，控制右边组件的显示
      this.$emit('changeright', this.nowRight)
    },
    // 鼠标进入，给出更换头像提醒
    giveTip: function () {
      this.tipFlag = true
    },
    // 鼠标出去，取消提示
    cancelTip: function () {
      this.tipFlag = false
    },
    // 弹出修改头像框
    toChange: function () {
      this.$emit('upclick')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .user {
    background: ghostwhite;
    padding: 30px 30px;
  }

  .user .user-img {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: auto;
  }

  .user .user-img:hover {
    cursor: pointer;
    box-shadow: 1px 1px 1px red, -1px -1px 1px red, 1px -1px 1px red, -1px 1px 1px red;
  }

  .user .user-img img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user .user-name {
    margin-top: 10px;
    color: black;
    font-size: 1.3em;
  }
  .u-title {
    font-size: 1.3em;
    font-weight: bold;
    color: black;
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
  }

  .manager {
    background: ghostwhite;
  }

  .manager span {
    display: block;
    width: 100%;
    text-align: center;
    line-height: 60px;
    height: 60px;
    color: black;
    font-size: 1.3em;
  }

  .manager span:hover {
    font-weight: bold;
    cursor: pointer;
  }

  /*选中状态*/
  .thisactive{
    background: red;
    color: white;
    font-weight: bold;
    border-radius: 0 30px 30px 0;
  }
  /*更换头像提示*/
  .change-tip {
    font-size: 0.8em;
    color: red;
    position: absolute;
    top: 50px;
    left: 15px;
  }
  .opacity_half{
    opacity: .9;
  }
</style>
