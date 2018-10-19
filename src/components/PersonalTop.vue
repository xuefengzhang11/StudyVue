<template>
  <div class="u-detail">
    <div class="container">
      <div class="row">
        <div class="col-md-2 u-left">
          <img src="../assets/images/users/user-icon.jpg" alt="">
        </div>
        <div class="col-md-6 u-mid">
          <p class="u-name" v-text="user.name"></p>
          <p class="u-sex-job">
            <span class="u-sex" v-text="user.gender__name"></span>&nbsp;&nbsp;
            <span class="u-job" v-text="user.job__name"></span>
          </p>
          <p>个性签名：
            <span class="u-info" v-text="user.introduce"></span>
          </p>
        </div>
        <div class="col-md-4 u-right">
          <div class="u-learn">
            <p>1h</p>
            <span>学习时长</span>
          </div>
          <div class="u-exp">
            <p>42</p>
            <span>经验</span>
          </div>
          <div class="u-score">
            <p>88</p>
            <span>积分</span>
          </div>
          <div class="u-love">
            <p>25</p>
            <span>关注</span>
          </div>
          <div class="u-fans">
            <p>0</p>
            <span>粉丝</span>
          </div>
          <div>
            <button class="btn-user-set" @click="toPSetting">个人设置</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PersonalTop',
  data () {
    return {
      url: 'http://localhost:8000/',
      msg: '个人中心头部',
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
    // 跳转个人设置页
    toPSetting: function () {
      this.$router.push({
        path: '/setting'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .u-detail {
    margin-bottom: 30px;
    height: 150px;
    padding-top: 15px;
    background: rgba(0, 0, 0, 0.75);
    box-shadow: 2px 2px 5px gray;
  }

  .u-detail .u-left {
    width: 120px;
    height: 120px;
    padding: 0;
  }

  .u-detail .u-left img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .u-detail .u-mid {
    padding-left: 20px;
    color: white;
  }

  .u-detail .u-mid p:last-child {
    color: rgba(255, 255, 255, 0.55);
  }

  .u-mid .u-name {
    padding-top: 15px;
    font-size: 1.4em;
    font-weight: bold;
  }

  .u-detail .u-right > div {
    display: inline-block;
    text-align: center;
    padding: 30px 5px 0;
  }

  .u-detail .u-right p {
    padding: 0;
    margin: 0;
    color: rgba(255, 255, 255, .8);
    font-weight: 700;
    font-size: 24px;
  }

  .u-detail .u-right span {
    font-size: 14px;
    color: rgba(255, 255, 255, .8);;
  }

  .u-right button {
    outline: none;
    border: 1px solid rgba(255, 255, 255, .4);
    color: rgba(255, 255, 255, .8);
    background: rgba(0, 0, 0, 0.65);
    padding: 8px 16px;
    line-height: 20px;
    border-radius: 18px;
    position: relative;
    top: -15px;
  }

  .u-right button:hover {
    border: 1px solid lavender;
  }
</style>
