<template>
  <!--节详情部分-->
  <div>
    <div class="container-fluid back" v-for="sect in section" :key="sect.id" :id="sect.id">
      <div class="row nav">
        <div class="col-md-5">
          <ul class="row nav-left">
            <li class="return"><span class="col-md-1 ret"><img @click="go" src="../../assets/icons/return.svg" alt="a"></span></li>
            <li><span class="col-md-11 cour" v-text="sect.name"></span></li>
            <!--<li><span class="col-md-4"></span></li>-->
          </ul>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-3">
          <ul class="row">
            <li><span class="col-md-3"></span></li>
            <li><span class="col-md-1 nav-right"><img src="../../assets/icons/qq.svg" alt=""></span></li>
            <li><span class="col-md-1 nav-right"><img src="../../assets/icons/weixin.svg" alt=""></span></li>
            <li><span class="col-md-1 nav-right"><img src="../../assets/icons/weibo.svg" alt=""></span></li>
            <li><span class="col-md-2"></span></li>
          </ul>
        </div>
      </div>
      <div class="row vidio">
        <div class="col-md-8">
          <!--视频背景图-->
          <div class="watch">
            <div class="logo">
              <div class="logo-in">
                <img src="../../assets/icons/logo.svg" alt="">
              </div>
              <div class="sign"><em>思达迪</em></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <!--模板-->
          <!--讲师信息简介-->
          <div class="info">
            <div class="row teac">
              <span class="col-md-12 name">
                <div class="row">
                  <span v-text="sect.name"></span>
                  <img src="../../assets/icons/hot.svg" alt="" style="width: 30px;height: 30px" v-if="sect.coursenum > 0">
                </div>
              </span>
            </div>
            <div class="row show">
              <p v-text="sect.introduce">
              </p>
            </div>
            <div class="collection">
              <!--模板-->
              <!--相关课程-->
              <div class="row hot-course" v-for="course in sect.coursedata" :key="course.id" :id="course.id" @click.prevent.stop="toCourseDetail">
                <div class="hot-font">
                  课程 <span style="margin-left: 160px;font-size: 0.8em;color:#bababa">收藏数：<span v-text="sect.coursenum"></span></span>
                </div>
                <div class="hot-video">
                  <span class="col-md-5">
                    <img src="../../assets/images/courses/1.jpg" alt="" class="hot-v-img">
                  </span>
                  <span class=" col-md-7">
                    <div class="row hot-name" v-text="course.name">
                    </div>
                    <div class="row price-all" style="color:rgba(68, 68, 68, 0.9)">
                      <p>价格:<span v-text="course.price"></span> · 学习人数:<span v-text="course.learn"></span></p>
                    </div>
                    <div class="row line">
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row  none">
        <div class="col-md-7">
          <div class="row comment">评论</div>
        </div>
        <div class="col-md-5"></div>
      </div>
      <div class="row contain">
        <div class="col-md-1"></div>
        <div class="col-md-6 push">
          <div class="row">
            <span class="col-md-2 all">全部</span>
            <span class="col-md-8"></span>
            <span class="col-md-2 publish">发布评论</span>
          </div>
          <!--模板-->
          <div class="row comment-contain">
            <!--发表评论组件-->
            <Commentary v-show="isUpCommentary" @closeupcom="isUpCommentary=false"></Commentary>
            <!--回复评论组件-->
            <ReplyCommentary v-show="isReplyCommentary" @closereplycom="isReplyCommentary=false"></ReplyCommentary>
            <!--未登录提示组件-->
            <tiplogin v-show="isTipLogin" @sureclick="isTipLogin=false"></tiplogin>
            <!--<span class="col-md-2"></span>-->
            <!--<span class="col-md-8 comment-box">-->
              <!--<div class="row">-->
              <!--<div class="col-md-2">-->
                <!--<img src="../../assets/images/careers/1.jpg" alt="" class="icon">-->
              <!--</div>-->
              <!--<div class="col-md-10">-->
                <!--<div class="row username">用户姓名</div>-->
                  <!--<div class="row comment-con">评论内容</div>-->
                  <!--<div class="row comment-bottom">-->
                    <!--<span class="col-md-2 good">-->
                      <!--<img src="../../assets/icons/like_before.svg" alt="" v-show="like">-->
                      <!--<img src="../../assets/icons/like_after.svg" alt="" v-show="!like">-->
                      <!--&nbsp;-->
                      <!--<span style="padding-top: 4px">0</span>-->
                    <!--</span>-->
                    <!--<span class="col-md-8"></span>-->
                    <!--<span class="col-md-2 date">-->
                      <!--年 - 月 - 日-->
                    <!--</span>-->
                  <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--</span>-->
            <!--<span class="col-md-2"></span>-->
          </div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-3 contain-course">
          <!--模板-->
          <!--推荐课程模板-->
          <div class="row hot-course" v-for="c in hotCourses" :id="c.id" :key="c.id" @click.prevent.stop="toCourseDetail">
            <div class="hot-font">
              推荐课程
            </div>
            <div class="hot-video">
            <span class="col-md-5">
              <img src="../../assets/images/courses/1.jpg" alt="" class="hot-v-img">
            </span>
              <span class=" col-md-7">
                <div class="row hot-name" v-text="c.name">
                </div>
                <div class="row price-all" style="color:lightgrey">
                <p><span v-text="c.cs_degree__name"></span>
                  <img src="../../assets/icons/user-logo.svg" alt="">
                  <span class="course-l-people" v-text="c.learn"></span>
                </p>
              </div>
              <div class="row line">
              </div>
            </span>
            </div>
          </div>
        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Commentary from './Commentary'
import ReplyCommentary from './ReplyCommentary'
import $ from 'jquery'
export default {
  name: 'SectionDetail',
  components: {Commentary, ReplyCommentary},
  data () {
    return {
      url: 'http://localhost:8000/',
      msg: '课程详情主体',
      flag: true,
      like: true,
      section: '',
      // 当前文章评论数
      comment_num: '0',
      // 当前文章的一级评论、二级评论
      comments: {},
      // 发表评论组件
      isUpCommentary: false,
      // 回复评论组件
      isReplyCommentary: false,
      // 是否显示登录提示
      isTipLogin: false,
      hotCourses: ''
    }
  },
  created: function () {
    this.getSectionId()
  },
  mounted: function () {
    this.getSectiondata()
    this.getHotCourse()
    // this.getComments()
  },
  methods: {
    // 得到节的id
    getSectionId: function () {
      let sectid = this.$route.params.sectid
      this.sectid = sectid
    },
    // 得到本节的内容和这个节的课程的内容
    getSectiondata: function () {
      this.careerid = window.sessionStorage.getItem('courid')
      let vm = this
      axios.get(this.url + 'course/getSectiondata/' + vm.sectid + '/' + vm.careerid + '/')
        .then(function (response) {
          vm.section = response.data.data
        })
    },
    // 得到热门课程
    getHotCourse: function () {
      // 获取热门课程
      let vm = this
      axios.get(this.url + 'course/getHotCourse/')
        .then(function (response) {
          vm.hotCourses = response.data.hotCourses
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 获取所有评论
    // getComments () {
    //   let vm = this
    //   axios.get(this.Global.HOST + 'article/getComment/' + this.articleid + '/')
    //     .then(function (response) {
    //       vm.comment_num = response.data.comments.length
    //       vm.comments = response.data.comments
    //       console.log(vm.Global.IMG)
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // },
    // 点击发表评论
    toComment: function () {
      let usertel = window.sessionStorage.getItem('usertel')
      if (usertel) {
        // 用户已经登录
        this.isUpCommentary = true
      } else {
        // 用户未登录
        this.isTipLogin = true
      }
    },
    // 点击回复
    toReplay: function () {
      // 获取当前用户电话号码
      let usertel = window.sessionStorage.getItem('usertel')
      if (usertel) {
        // 用户已经登录
        this.isReplyCommentary = true
      } else {
        // 用户未登录
        this.isTipLogin = true
      }
    },
    // 跳转到相关的CourseDetail页
    toCourseDetail: function (e) {
      let $courseid = $(e.target).parents('.hot-course').attr('id')
      if ($courseid) {
        this.$router.push({
          path: '/coursedetail',
          name: 'coursedetail',
          params: {
            courseid: $courseid
          }
        })
      }
    },
    // 返回上一页
    go: function () {
      this.$router.go(-1)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body p h1 ul li {
    margin: 0;
    padding: 0;
  }

  ul li {
    list-style: none;
  }

  .back {
    background: rgba(201, 228, 230, 0.14);
  }

  /*头部*/
  .nav {
    height: 80px;
    background: white;
  }

  .nav-left {
    /*width: 460px;*/
    height: 60px;

  }

  .nav span:hover {
    cursor: pointer;
  }

  .return {
    margin-top: 30px;
  }
  .ret{
    /*width: 40px;*/
    height: 50px;
  }
  .cour {
    /*width: 600px;*/
    height: 80px;
    color: #000;
    font-size: 1.7em;
    margin-top: -5px;
    position: absolute;
  }

  .nav-right {
    margin-top: 30px;
    margin-left: 20px;
  }

  /*视频部分开始*/
  .vidio {
    /*height: 500px;*/
    background: rgba(126, 126, 126, 0.89);
  }

  .watch {
    width: 1005px;
    height: 480px;
    margin-left: 40px;
    background: #202020;
    background-size: cover;
    margin-top: 8px;
    border-radius: 30px;
    box-sizing: border-box;
  }
  .logo{
    width: 900px;
    height: 440px;
    background: lightgrey;
    margin: auto;
    margin-top: 3px;
    position: relative;
    z-index: 999;
  }
  .logo-in{
    width: 110px;
    height: 110px;
    margin: auto;
    padding-top: 170px;
  }
  .logo-in img{
    width: 80px;
    height: 80px;

  }
  .sign{
    font-size: 3.5em;
    font-weight: 700;
    margin-top: 110px;
    margin-left: 350px;
  }
  .info {
    width: 400px;
    height: 370px;
    margin-left: 70px;
    margin-top: 20px;

  }

  .teac {
    width: 360px;
    height: 60px;
    position: relative;
    left: 30px;
    top: 5px;
  }

  .teac span {
    cursor: pointer;
  }

  .icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-sizing: border-box;
  }

  .name {
    width: 370px;
    height: 60px;
    font-size:1.5em;
    margin-left: 5px;
  }

  .name div {
    height: 30px;
    color: #ffffff;
    margin-top: 2px;
  }

  .show {
    width: 360px;
    color: #000000;
    font-size: 1.2em;
    margin-left: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 180%;
    letter-spacing: 1.3px
  }
  .collection {
    margin-left: 30px;
    /*margin-top: 10px;*/
    font-size: 1.2em;
    color:white;
    position: absolute;
    top:300px;
  }
  /*留白部分*/
  .none {
    height: 80px;
    background: #fff;
    border: none;
    outline: none;
    box-shadow: 2px 2px 5px rgba(135, 135, 135, 0.59);
  }

  .comment {
    height: 80px;
    font-size: 1.5em;
    line-height: 85px;
    color: #1b1b1b;
    margin-left: 400px;
  }

  .contain {
    height: 400px;
    /*margin-top:20px;*/
  }

  .push {
    width: 800px;
    height: 40px;
    margin-top: 20px;
  }

  .all {
    width: 70px;
    height: 40px;
    background: gray;
    line-height: 40px;
    text-align: center;
    border-radius: 30px;
    font-size: 1.2em;
    color: white;
  }

  .publish {
    width: 100px;
    height: 40px;
    line-height: 40px;
    border-radius: 30px;
    font-size: 1.2em;
    color: white;
    background: #b6b6b6;
    margin-left: 80px;
  }

  .comment-contain {
    width: 800px;
    height: 173px;
    background: white;
    border-radius: 30px;
    margin-top: 30px;
  }

  .comment-box {
    width: 700px;
    height: 130px;
    margin-top: 20px;
    margin-left: 50px;
  }

  .username {
    font-size: 1.3em;
    margin-left: -30px;
  }

  .comment-con {
    margin-left: -30px;
    margin-top: 5px;
  }

  .comment-bottom {
    width: 650px;
    height: 40px;
    margin-left: -30px;
    margin-top: 40px;
  }

  .good {
    width: 70px;
    height: 40px;
    /*background: rgba(128, 128, 128, 0.95);*/
    border-radius: 30px;
    box-sizing: border-box;
    padding-top: 5px;
    padding-left: 15px;
    font-size: 1.4em;
  }

  .good:hover {
    cursor: pointer;
  }

  .date {
    color: rgba(128, 128, 128, 0.95);
    padding-top: 10px;
  }
  /*推荐课程*/
  .contain-course{
    margin-top: 30px;
  }
  .hot-course {
    width: 340px;
    height: 140px;
    /*margin-left: 10px;*/
  }

  .hot-font {
    height: 30px;
    font-size: 1.3em;
    color: rgba(68, 68, 68, 0.9);
  }

  .hot-video {
    width: 340px;
    height: 80px;
    margin-top: 10px;
  }

  .hot-v-img {
    width: 120px;
    height: 80px;
    object-fit: cover;
    margin-left: -13px;
    border-radius: 15px;
    box-sizing: border-box;
  }

  .hot-v-img:hover {
    cursor: pointer;
  }

  .hot-name {
    height: 30px;
    font-size: 1.3em;
    color: rgba(64, 64, 64, 0.8);
  }
  .line{
    width: 180px;
    height: 8px;
    border-bottom: 1px rgba(128, 128, 128, 0.6) solid;
  }
  .price-all{
    margin-top: 13px;
  }
  .price-all span{
    color: rgba(64, 64, 64, 0.8);
  }
</style>
