<template>
  <!--节详情部分-->
  <div>
    <div class="container-fluid back" v-for="sect in section" :key="sect.id" :id="sect.id">
      <div class="row nav">
        <div class="col-md-5">
          <ul class="row nav-left">
            <li class="return">
              <span class="col-md-1 ret">
                <img @click="go" src="../../assets/icons/return.svg" alt="a">
              </span>
            </li>
            <li>
              <span class="col-md-11 cour" v-text="sect.name"></span>
            </li>
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
        <div class="col-md-9">
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
        <div class="col-md-3">
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
              &nbsp;&nbsp;&nbsp;&nbsp;<p v-text="sect.introduce">
              </p>
            </div>
            <div class="collection">
              <!--模板-->
              <!--相关课程-->
              <div class="row hot-course">
                <div class="hot-font">
                  课程 <span style="margin-left: 160px;font-size: 0.8em;color:#080808">收藏数：<span v-text="sect.coursenum"></span></span>
                </div>
                <div class="hot-video"  v-for="course in sect.coursedata" :key="course.id" :id="course.id" @click.prevent.stop="toCourseDetail">
                  <span class="col-md-5">
                    <img :src="Global.IMG + course.imgurl" alt="" class="hot-v-img">
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
      <div class="row none">
        <div class="col-md-7">
          <div class="row comment">评论</div>
        </div>
        <div class="col-md-5"></div>
      </div>
      <div class="row contain">
        <div class="col-md-1"></div>
        <div class="col-md-6 push">
          <!--模板-->
          <div class="row">
            <div class="col-md-12 article-bottom">
              <span class="img">
                <img :src="Global.IMG + section[0].userimg" alt="">
              </span>
              <span class="sta" @click="toComment">共同学习，写下你的评论</span>
              <div class="lines"></div>
              <div class="b-comment">
                <span class="comment-num">{{comment_num}}评论</span>
                <!--没有评论时显示-->
                <p class="no-comment" v-if="comment_num === 0" v-text="'暂无评论'"></p>
                <!--<div class="line"></div>-->
                <div class="com-content" v-else>
                  <!--评论展示模板-->
                  <div class="ucomment" v-for="comm in comments" :key="comm.id" :id="comm.id">
                    <div class="uimg">
                      <!--用户头像-->
                      <img :src="Global.IMG + comm.user.icon__iconurl" alt="">
                    </div>
                    <!--用户名-->
                    <div class="uname" v-text="comm.user.name"></div>
                    <!--点赞和评论-->
                    <div class="like_upcom" style="float: right">
                      <span class="like text-center">
                        <img src="../../assets/icons/like_before.svg" class="icon-like" alt="" v-if="!comm.like_flag" @click.stop.prevent="commentlike">
                        <img src="../../assets/icons/like_after.svg" class="icon-like" alt="" v-else @click.stop.prevent="commentlike">
                        <span class="like_num" v-text="comm.like"></span>
                      </span>
                      <span class="upcom text-center" @click="toReplay">回复</span>
                      <span class="dele" v-if="userid === comm.user.id" @click.stop.prevent="deletecomment">删除</span>
                    </div>
                    <!--评论内容-->
                    <div class="ucontent" v-text="comm.content"></div>
                    <!--子评论模板-->
                    <div class="ucomment son" v-for="reply in comm.replys" :key="reply.id" :id="reply.id">
                      <div class="uimg">
                        <img :src="Global.IMG + reply.user.icon__iconurl" alt="">
                      </div>
                      <!--二级评论用户名-->
                      <div class="uname" v-text="reply.user.name"></div>
                      <!--点赞二级评论-->
                      <div class="like_upcom" style="float: right">
                        <img src="../../assets/icons/like_before.svg" class="icon-like" alt="" v-if="!reply.like_flag" @click.stop.prevent="replylike">
                        <img src="../../assets/icons/like_after.svg" class="icon-like" alt="" v-else @click.stop.prevent="replylike">
                        <span class="like_num" v-text="reply.like"></span>
                        <span class="dele" v-if="userid === reply.user.id" style="margin-left: 10px" @click.stop.prevent="deletereply">删除</span>
                      </div>
                      <!--二级评论内容-->
                      <div class="ucontent" v-text="reply.content"></div>
                    </div>
                    <div class="commentline"></div>
                    <div>
                    </div>
                  </div>
                </div>
                <!--<div class="line"></div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-3 contain-course">
          <!--模板-->
          <!--推荐课程模板-->
          <div class="row hot-course">
            <div class="hot-font">
              推荐课程
            </div>
            <div class="hot-video" v-for="c in hotCourses" :id="c.id" :key="c.id" @click.prevent.stop="toCourseDetail">
              <span class="col-md-5">
                <img :src="Global.IMG + c.imgurl" alt="" class="hot-v-img">
              </span>
              <span class="col-md-7">
                <div class="row hot-name" v-text="c.name">
                </div>
                <div class="row price-all" style="color:lightgrey">
                  <p>
                    <span v-text="c.cs_degree__name"></span>
                    <img src="../../assets/icons/user-logo.svg" alt="">
                    <span class="course-l-people" v-text="c.learn"></span>
                  </p>
                </div>
                <div class="row courline">
                </div>
              </span>
            </div>
          </div>
        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
    <!--发表评论组件-->
    <Commentary v-if="isUpCommentary" @closeupcom="isUpCommentary=false" :secid="sectid" @toParentCode="showCode"></Commentary>
    <!--回复评论组件-->
    <ReplyCommentary v-if="isReplyCommentary" @closereplycom="isReplyCommentary=false" :commid="comment_id" @toParentCode="showCode"></ReplyCommentary>
    <!--未登录提示组件-->
    <tiplogin v-show="isTipLogin" @sureclick="isTipLogin=false"></tiplogin>
  </div>
</template>

<script>
import axios from 'axios'
import Commentary from './Commentary'
import ReplyCommentary from './ReplyCommentary'
import $ from 'jquery'
export default {
  name: 'SectionDetail',
  inject: ['reload'],
  components: {Commentary, ReplyCommentary},
  data () {
    return {
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
      hotCourses: '',
      sectid: '',
      // 点赞状态
      like_flag: '',
      comment_id: '',
      userid: ''
    }
  },
  created: function () {
    this.getSectionId()
  },
  mounted: function () {
    this.getSectiondata()
    this.getHotCourse()
    this.getComments()
  },
  methods: {
    myFlush: function () {
      this.reload()
    },
    // 得到节的id
    getSectionId: function () {
      let sectid = this.$route.params.sectid
      this.sectid = sectid
    },
    // 得到本节的内容和这个节的课程的内容
    getSectiondata: function () {
      this.careerid = window.sessionStorage.getItem('courid')
      let vm = this
      axios.get(this.Global.HOST + 'course/getSectiondata/' + vm.sectid + '/' +
        vm.careerid + '/' + window.sessionStorage.getItem('usertel') + '/')
        .then(function (response) {
          vm.section = response.data.data
        })
    },
    // 得到热门课程
    getHotCourse: function () {
      // 获取热门课程
      let vm = this
      axios.get(this.Global.HOST + 'course/getHotCourse/')
        .then(function (response) {
          vm.hotCourses = response.data.hotCourses
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 获取所有评论
    getComments: function () {
      let vm = this
      vm.tel = window.sessionStorage.getItem('usertel')
      if (!vm.tel) {
        vm.tel = ''
      }
      axios.get(this.Global.HOST + 'course/getComment/' + vm.sectid + '/' + vm.tel + '/')
        .then(function (response) {
          vm.comment_num = response.data.comments.length
          vm.comments = response.data.comments
          vm.userid = response.data.user_id
        })
        .catch(function (error) {
          console.log(error)
        })
    },
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
    toReplay: function (e) {
      // 获取当前用户电话号码
      let usertel = window.sessionStorage.getItem('usertel')
      if (usertel) {
        let $comid = $(e.target).parents('.ucomment').attr('id')
        this.comment_id = $comid
        // 用户已经登录
        this.isReplyCommentary = true
      } else {
        // 用户未登录
        this.isTipLogin = true
      }
    },
    // 跳转到相关的CourseDetail页
    toCourseDetail: function (e) {
      let $courseid = $(e.target).parents('.hot-video').attr('id')
      if ($courseid) {
        this.$router.push({
          path: '/coursedetail/',
          name: 'coursedetail',
          params: {
            courseid: $courseid
          }
        })
      }
    },
    // 评论点赞
    commentlike: function (e) {
      let $commid = $(e.target).parents('.ucomment').attr('id')
      let vm = this
      vm.tel = window.sessionStorage.getItem('usertel')
      if (vm.tel) {
        axios.get(this.Global.HOST + 'course/insertCommentLike/' + $commid + '/' + vm.tel + '/')
          .then(function (response) {
            vm.commentlike = response.data.code
            vm.myFlush()
          })
      } else {
        // 用户未登录
        this.isTipLogin = true
      }
    },
    // 评论回复点赞
    replylike: function (e) {
      let $replyid = $(e.target).parents('.son').attr('id')
      let vm = this
      vm.tel = window.sessionStorage.getItem('usertel')
      if (vm.tel) {
        axios.get(this.Global.HOST + 'course/insertReplyLike/' + $replyid + '/' + vm.tel + '/')
          .then(function (response) {
            vm.replylike = response.data.code
            vm.myFlush()
          })
      } else {
        // 用户未登录
        this.isTipLogin = true
      }
    },
    // 接受评论传过来的code
    showCode: function (data) {
      if (data === 'success') {
        this.isUpCommentary = false
        this.isReplyCommentary = false
        this.myFlush()
      }
    },
    // 删除视频评论
    deletecomment: function (e) {
      let $comid = $(e.target).parents('.ucomment').attr('id')
      let vm = this
      axios.get(this.Global.HOST + 'course/deleteSectionComment/' + vm.sectid + '/' + $comid + '/')
        .then(function (response) {
          vm.code = response.data.code
          vm.myFlush()
        })
    },
    // 删除评论回复
    deletereply: function (e) {
      let $comid = $(e.target).parents('.ucomment').attr('id')
      let vm = this
      axios.get(this.Global.HOST + 'course/deleteReply/' + $comid + '/')
        .then(function (response) {
          vm.code = response.data.code
          vm.myFlush()
        })
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
    height: 100%;
  }

  /*头部*/
  .nav {
    background: white;
  }

  .nav-left {
    height: 60px;

  }

  .nav span:hover {
    cursor: pointer;
  }

  .return {
    margin-top: 30px;
  }
  .ret{
    height: 50px;
  }
  .cour {
    height: 40px;
    color: #000;
    font-size: 1.7em;
    margin-top: -5px;
  }

  .nav-right {
    margin-top: 30px;
    margin-left: 20px;
  }

  /*视频部分开始*/
  .vidio {
    background: rgba(126, 126, 126, 0.89);
  }

  .watch {
    width: 1005px;
    height: 480px;
    margin: auto;
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
    margin: 3px auto 0;
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
    margin-top: 20px;
  }

  .teac {

    position: relative;
    top: 5px;
  }

  .teac span {
    cursor: pointer;
  }

  .name {
    font-size:1.5em;
  }

  .name div {
    color: #ffffff;
    margin-top: 2px;
  }

  .show {
    width: 340px;
    color: #000000;
    font-size: 1.2em;
    margin-top: 10px;
    margin-bottom: 10px;
    letter-spacing: 1.4px;
  }
  .collection {
    font-size: 1.2em;
    color:white;
  }
  /*留白部分*/
  .none {
    height: 80px;
    background: #fff;
    border: none;
    outline: none;
    box-shadow: 2px 2px 5px rgba(135, 135, 135, 0.59);
    clear: both;
  }

  .comment {
    height: 80px;
    font-size: 1.5em;
    line-height: 85px;
    color: #1b1b1b;
    margin-left: 400px;
  }

  .push {
    width: 800px;
    margin-top: 20px;
  }

  /*推荐课程*/
  .contain-course{
    margin-top: 30px;
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
    margin-bottom: 20px;
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
    /*height: 30px;*/
    font-size: 1.1em;
    color: rgba(64, 64, 64, 0.8);
  }
  .courline{
    width: 200px;
    position: absolute;
    top:80px;
    border-bottom: 1px rgba(128, 128, 128, 0.6) solid;
  }
  .commentline{
    width: 700px;
    border-bottom: 1px rgba(128, 128, 128, 0.6) solid;
  }
  .line{
    width: 170px;
    border-bottom: 1px rgba(70, 70, 70, 0.6) solid;
  }
  .lines{
    width: 730px;
    border-bottom: 1px rgba(70, 70, 70, 0.6) solid;
  }
  .price-all span{
    color: rgba(64, 64, 64, 0.8);
  }

  .article-bottom {
    box-shadow: 0 2px 5px gray;
    margin-right: 20px;
    padding: 20px 35px 20px;
    border-radius: 10px;
    background: white;
    margin-bottom: 100px;
  }

  .article-bottom .sta {
    display: inline-block;
    width: 600px;
    height: 50px;
    line-height: 40px;
    background: #e8e8ef;
    border-radius: 10px;
    color: gray;
    font-size: 1.2em;
    padding: 5px 30px;
    margin-left: 20px;
  }
  .article-bottom .img {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: red;
  }
  .article-bottom .img img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  .b-comment  .comment-num {
    font-size: 18px;
    font-weight: 700;
    color: black;
  }
  .com-content{
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid #ceced5;
    margin: 20px 0;
  }
  .ucomment{
    overflow: hidden;
  }
  .ucomment .uimg {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
    margin-top: 10px;
  }
  .ucomment .uimg img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  .like:hover, .upcom:hover{
    cursor: pointer;
    color: black !important;
  }
  .icon-like {
    position: relative;
    top: -3px;
  }
  .upcom{
    display: inline-block;
    width: 50px;
    height: 30px;
    line-height: 30px;
  }
  .ucontent{
    clear: both;
    padding-left: 50px;
  }
  .son{
    padding-left: 50px;
    padding-top: 10px;
  }
  .com-content .uname{
    float: left;
    height: 50px;
    line-height: 50px;
    font-size: 1.1em;
    font-weight: 700;
  }
  .dele:hover{
    cursor: pointer;
  }
  .contain{
    height: 100%;
  }
  .no-comment{
    margin-top: 15px;
  }
</style>
