<template>
  <div>
    <!--职业路径logo-->
    <div class="container-fluid bg-gray">
      <div class="career-logo text-center">
        <span class="icon-career1"></span>
        <span class="icon-career2"></span>
      </div>
    </div>
    <!--职业路径视频部分-->
    <div class="container-fluid">
      <div class="courses">
        <!--课程模板-->
        <div class="course-container" v-for="(cour, i) in career.courses" :key="cour.id" :id="cour.id">
          <a href="#">
            <span class="rank">阶段<span v-text="i+1"></span></span>
            <span class="course-name" v-text="cour.name"></span>
            <!--左上角圆圈-->
            <div class="icon-circle"></div>
          </a>
          <span class="chapter-num" v-text="cour.chaptersNum"></span> 章 / <span class="section-num">{{cour | sectnum}}</span> 节
          <div class="row course center-block">
            <!-- 第一列 课程图片 -->
            <div class="col-md-2 course-img">
              <img :src="Global.IMG+cour.imgurl" alt="">
            </div>
            <div class="col-md-10">
              <!--第一行,放章节-->
              <div class="row center-block" style="height: 200px;">
                <!-- 一章占两列  章模板 -->
                <div class="col-md-2 chapter" v-for="(chap, i) in cour.chapters"
                     :key="chap.id" :id="chap.id" v-if="i<4" @click="toCourseDetail"
                >
                  <p class="chapter-rank dex"  v-text="i+1"></p>
                  <p class="chapter-name" v-text="chap.name"></p>
                  <p class="chapter-info">简介:
                    {{chap.introduce | more( 60,61)}}
                  </p>
                </div>
                <!--最多放四章,多于四章放省略号-->
              </div>
              <!--第二行,放总时长,学习人数-->
              <div class="row alltime">
                <div class="col-md-6">
                  <span>价格: </span><span class="career-price" v-text="cour.price"></span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>课程总时长: </span><span class="course-time">3小时</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="u_icon" v-text="cour.learn"></span>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-3 text-right"><span @click="joinCart">加入购物车</span></div>
                <div class="col-md-2 text-center" >
                  <span class="much" @click="toCourseDetail">更多&nbsp;&nbsp;&nbsp;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="career-finish">
        <span class="icon-finish">&nbsp;</span>
        <span class="tip">完成路径学习</span>
        <p class="career-plan-finish" v-text="cfinish"></p>
      </div>
    </div>

    <!--未购买提示框-->
    <NotBuy v-show="showNotBuy" @sureclick="showNotBuy=false"></NotBuy>
    <!--未登录提示-->
    <tiplogin v-show="isTipLogin" @sureclick="isTipLogin=false"></tiplogin>
    <!--加入购物车反馈信息-->
    <JoinCartMsg v-show="addCartBack" :joincartmsg="joincartmsg" @sureclick="addCartBack=false"></JoinCartMsg>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import NotBuy from './NotBuy'
import JoinCartMsg from './JoinCartMsg'

export default {
  name: 'CareerDetail',
  data () {
    return {
      msg: '',
      careerid: 0,
      career: [],
      more: '',
      sectnum: '',
      flag: false,
      cfinish: '',
      showNotBuy: false,
      isTipLogin: false,
      // 添加购物车反馈信息
      addCartBack: false,
      joincartmsg: '添加成功'
    }
  },
  components: {NotBuy, JoinCartMsg},
  mounted: function () {
    this.getData()
  },
  created: function () {
    this.getCareerId()
    if (!this.careerid) {
      this.careerid = sessionStorage.getItem('tempid')
    }
  },
  methods: {
    // 得到数据
    getData: function () {
      let vm = this
      window.sessionStorage.setItem('tempid', this.careerid)
      axios.get(this.Global.HOST + 'career/getcareerdetail/' + this.careerid + '/')
        .then(function (response) {
          vm.career = response.data.careers
          vm.cfinish = vm.career.careers.finish
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 得到职业的id
    getCareerId: function () {
      let cid = this.$route.params.careerid
      this.careerid = cid
    },
    // 跳转到课程详情页(首先看是否购买)
    toCourseDetail: function (e) {
      let $courid = $(e.target).parents('.course-container').attr('id')
      let usertel = window.sessionStorage.getItem('usertel')
      if (!usertel) {
        // 提示未登录
        this.isTipLogin = true
      } else {
        // 发送ajax 判断用户是否购买
        let vm = this
        axios.get(this.Global.HOST + 'order/isBuy/' + $courid + '/' + usertel + '/')
          .then(function (response) {
            if (response.data.res === '已购买') {
              vm.$router.push({
                path: 'coursedetail/' + $courid
              })
            } else {
              // 未购买
              vm.showNotBuy = true
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      //
    },
    // 加入购物车
    joinCart: function (e) {
      // 获取当前课程id
      let $courid = $(e.target).parents('.course-container').attr('id')
      let usertel = window.sessionStorage.getItem('usertel')
      if (!usertel) {
        // 提示未登录
        this.isTipLogin = true
      } else {
        // 加入购物车
        let vm = this
        axios.get(this.Global.HOST + 'order/joinCart/' + $courid + '/' + usertel + '/')
          .then(function (response) {
            vm.joincartmsg = response.data.res
            // 弹出反馈信息
            vm.addCartBack = true
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  },
  filters: {
    'sectnum': function (cour) {
      let snum = 0
      for (let chap of cour.chapters) {
        snum += chap.sectionsNum
      }
      return snum
    },
    // 字的个数
    'more': function (intro, minlen, len) {
      if (intro.length <= minlen) {
        return intro
      }
      // 将传过来的数据变为字符串
      intro = intro.toString()
      return intro.substr(0, len) + '...'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  a,a:hover{
    text-decoration: none;
  }
  /*职业路径logo*/
  .bg-gray {
    background: gray;
  }
  body{
    background: ghostwhite;
  }
  .career-logo {
    height: 96px;
  }

  .career-logo span {
    display: inline-block;
    height: 96px;
  }

  .icon-career1 {
    width: 188px;
    background: url("../../assets/icons/icon-career.png");
  }

  .icon-career2 {
    width: 480px;
    margin-left: 30px;
    background: url("../../assets/icons/icon-career2.png") 0 -48px;
  }

  /*职业路径视频部分*/
  .courses {
    width: 1002px;
    margin: 40px auto 0;
    padding: 0 20px;
  }
  .courses .course-container {
    width: 100%;
    padding-left: 30px;
    padding-bottom: 20px;
    color: gray;
    border-left: 1px purple dashed;
    box-sizing: border-box;
    position: relative;
  }

  .course-container span.rank {
    display: inline-block;
    height: 25px;
    line-height: 25px;
    font-size: 1.1em;
    background: blue;
    padding: 0 10px;
    color: white;
    border-radius: 5px;
  }

  .course-container span.course-name {
    margin-left: 20px;
    margin-right: 10px;
    font-size: 1.2em;
    font-weight: bold;
    color: blue;
  }

  .course-container .course {
    width: 100%;
    height: 250px;
    margin-top: 15px;
    background: white;
    box-shadow: 2px 2px 5px gray;
  }
  .alltime{
    margin-top: 20px;
    color: gray;
  }

  .course .course-img {
    padding-left: 0;
    height: 250px;
  }

  .course .course-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .center-block{
    display: flex;
    justify-content: space-between;
  }
  .course .chapter {
    color: white;
    height: 180px;
    width: 167px;
    max-width: 167px;
    margin-top: 25px;
    padding: 20px 10px;
    border-radius: 10px;
    background: whitesmoke;
    margin-right: 20px;
    position: relative;
  }

  .chapter p.chapter-name {
    font-size: 1.2em;
    color: black;
  }

  .chapter p.chapter-info {
    font-size: 0.8em;
    color: gray;
  }

  .chapter p.chapter-rank {
    font-size: 3em;
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .chapter:hover {
    cursor: pointer;
    background: white;
    box-shadow: 2px 3px 2px lightgrey, -2px -1px 2px lightgrey;
  }
  .alltime{
    color: gray;
  }
  .alltime span:hover{
    cursor: pointer;
  }
  .much{
    background: url("../../assets/icons/more.svg") no-repeat 22px -2px;
  }
  .u_icon {
    display: inline-block;
    height: 20px;
    padding-left: 20px;
    padding-top: 2px;
    margin-bottom: -5px;
    background: pink;
    background: url('../../assets/icons/user-logo.svg') no-repeat;
  }

  .course-container .icon-circle {
    width: 32px;
    height: 32px;
    position: absolute;
    left: -16px;
    top: -2px;
    background: url("../../assets/icons/icon-circle-purple.svg");
  }
  .course-container>a:hover>div.icon-circle{
    background: url("../../assets/icons/icon-circle-blue.svg");
  }

  .career-finish {
    width: 1002px;
    margin: auto;
    padding: 0 2px;
  }
  .career-finish .tip {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    font-size: 1.5em;
    font-weight: bold;
    color: blue;
  }
  .career-finish .icon-finish {
    display: inline-block;
    width: 32px;
    height: 32px;
    position: relative;
    top: -8px;
    left: 3px;
    background: url("../../assets/icons/icon-career-flag.svg") no-repeat
  }
  .career-finish .career-plan-finish {
    padding-left: 50px;
    color: gray;
    font-size: 1.1em;
    margin-bottom: 30px;
  }
</style>
