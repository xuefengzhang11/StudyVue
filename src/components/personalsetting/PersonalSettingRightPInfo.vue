<template>
  <div class="content">
    <div class="con-msg">
      <div class="u-title">
        个人信息
      </div>
      <span style="position: absolute; right: 50px; top: 20px;" @click="toUpdate">
                             <div>修改</div>
                         </span>
      <!--昵称 职位 城市 性别 个性签名-->
      <div class="u-n">
        <div class="u-i bg-gw">昵称</div>
        <div class="u-name">sx_hyy</div>
      </div>
      <div class="u-n">
        <div class="u-i bg-gw">性别</div>
        <div class="u-sex" v-text="user.gender__name"></div>
      </div>
      <div class="u-n">
        <div class="u-i bg-gw">生日</div>
        <div class="u-sex" v-text="user.birthday"></div>
      </div>
      <div class="u-n">
        <div class="u-i bg-gw">职位</div>
        <div class="u-job" v-text="user.job__name"></div>
      </div>
      <div class="u-n">
        <div class="u-i bg-gw">城市</div>
        <div class="u-city" v-text="user.city"></div>
      </div>
      <div class="u-n">
        <div class="u-i bg-gw">个性签名</div>
        <div class="u-info" v-text="user.introduce"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PersonalSettingRightPInfo',
  data () {
    return {
      msg: '右侧个人信息',
      url: 'http://localhost:8000/',
      usertel: '',
      user: {}
    }
  },
  created: function () {
    this.usertel = window.sessionStorage.getItem('usertel')
  },
  mounted: function () {
    let vm = this
    axios.get(this.url + 'user/getUser/' + this.usertel + '/')
      .then(function (response) {
        vm.user = response.data.user[0]
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    // 弹出修改用户个人信模态框
    toUpdate: function () {
      this.$emit('uuclick')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content {
    padding: 10px 30px;
  }
  .u-title {
    font-size: 1.5em;
    font-weight: bold;
    color: black;
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
  }

  .u-n > div {
    float: left;
    height: 60px;
  }
  .u-i {
    margin-top: 10px;
    width: 120px;
    line-height: 80px !important;
    font-size: 1.4em;
    font-weight: bold;
    text-align: center;
  }

  .u-name, .u-job, .u-city, .u-sex, .u-info {
    margin-top: 10px;
    margin-left: 20px;
    padding-left: 30px;
    width: 80%;
    border-bottom: 1px solid gray;
    box-sizing: border-box;
    font-size: 1.2em;
    line-height: 70px;
  }
</style>
