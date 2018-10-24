<template>
  <div>
    <div class="article-content">
      <div class="row">
        <div class="col-md-8">
          <div class="row">
            <!--左侧文章主题-->
            <div class="col-md-12 bg-white article-container">
              <!--&lt;!&ndash;文章标题&ndash;&gt;-->
              <h2 class="text-center" v-text="article.title"></h2>
              <!--&lt;!&ndash;发表时间、点赞数&ndash;&gt;-->
              <div class="row">
                <div class="col-md-3 text-left">
                  <span class="up_time" v-text="article.upload"></span>
                </div>
                <div class="col-md-6"></div>
                <div class="col-md-3 text-right">
                  <img src="../../assets/icons/like_before.svg" class="icon-like" alt="" v-if="!like_flag" @click="articlelike">
                  <img src="../../assets/icons/like_after.svg" class="icon-like" alt="" v-else @click="articlelike">
                  <span class="like_num" v-text="article.like"></span>
                </div>
              </div>
              <p class="introduce" v-html="article.introduce"></p>
              <!--&lt;!&ndash;文章内容&ndash;&gt;-->
              <p class="content" v-html="article.content"></p>
            </div>
            <!--左侧评论-->
            <div class="col-md-12 article-bottom">
              <span class="img">
                <img src="../../assets/images/users/user-icon.jpg" alt="">
              </span>
              <span class="sta" @click="toComment">共同学习，写下你的评论</span>
              <div class="line"></div>
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
                        <img src="../../assets/icons/like_before.svg" class="icon-like" alt="" v-if="!comm.like_flag" @click="commentlike">
                        <img src="../../assets/icons/like_after.svg" class="icon-like" alt="" v-else @click="commentlike">
                        <span class="like_num" v-text="comm.like"></span>
                      </span>
                      <span class="upcom text-center" @click="toReplay">回复</span>
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
                        <img src="../../assets/icons/like_before.svg" class="icon-like" alt="" v-if="!reply.like_flag" @click="replylike">
                        <img src="../../assets/icons/like_after.svg" class="icon-like" alt="" v-else @click="replylike">
                        <span class="like_num" v-text="reply.like"></span>
                      </div>
                      <!--二级评论内容-->
                      <div class="ucontent" v-text="reply.content"></div>
                    </div>
                    <div class="line"></div>
                    <div>
                    </div>
                  </div>
                </div>
                <!--<div class="line"></div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3" style="margin-left: 60px">
          <div class="row">
            <!--右侧-->
            <div class="col-md-12">
              <!--作者全部信息-->
              <div class="row">
                <div class="col-md-12 user-info" style="padding-left: 30px;">
                  <div class="row">
                    <!--&lt;!&ndash;作者头像&ndash;&gt;-->
                    <div class="col-md-3 text-center">
                      <span class="user-logo">
                          <a href="#"><img src="../../assets/images/users/user-icon.jpg" alt=""></a>
                      </span>
                    </div>
                    <!--&lt;!&ndash;作者信息&ndash;&gt;-->
                    <div class="col-md-7">
                      <a href="#"><span class="user-name" v-text="user.name"></span></a>
                      <span class="user-job" v-text="user.user_job"></span>
                      <a href="#">共发表 <span class="article-num" v-text="artcount"></span> 篇文章</a>
                    </div>
                  </div>
                </div>
              </div>
              <!--作者其他文章-->
              <div class="row">
                <div class="col-md-8">
                  <div class="title">作者相关文章</div>
                </div>
                <div class="col-md-4 more text-center"><a href="#">更多 &gt;</a></div>
              </div>
              <div class="row">
                <!--一个文章模板-->
                <div class="col-md-12 article related-art" v-for="i in arttitle" :key="i.id" :id="i.id"
                     @click.prevent.stop="changeIId">
                  <a href="#">
                    <span class="icon-article">&nbsp;</span>
                    <!--文章标题-->
                    <span class="article-title">{{i.title | mot(10,12)}}</span>
                  </a>
                </div>
              </div>
              <!--相关课程-->
              <div class="row">
                <div class="col-md-12 title">热门文章</div>
              </div>
              <div class="row hot-course" v-for="hot in hotarticle" :key="hot.id" :id="hot.id"
                   @click.prevent.stop="changeHotId">
                <!--模板-->
                <a href="#">
                  <div class="course-img">
                    <img src="../../assets/images/users/user-icon.jpg" alt="">
                  </div>
                  <div class="" style=" border-bottom: 1px rgba(128,128,128,0.22) solid;">
                    <div class="course-name">{{hot.title | mot(6,8)}}</div>
                    <span class="course-degree" v-text="hot.user_name"></span>
                    <img src="../../assets/icons/like.svg" alt="" style="margin-left: 5px">
                    <span class="course-l-people" v-text="hot.like"></span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--发表评论组件-->
    <Commentary v-if="isUpCommentary" @closeupcom="isUpCommentary=false" :artid="articleid" @toParentCode="showCode"></Commentary>
    <!--回复评论组件-->
    <ReplyCommentary v-if="isReplyCommentary" @closereplycom="isReplyCommentary=false" :commid="comment_id" @toParentCode="showCode"></ReplyCommentary>
    <!--未登录提示组件-->
    <tiplogin v-show="isTipLogin" @sureclick="isTipLogin=false"></tiplogin>
  </div>
</template>

<script>
import Commentary from './Commentary'
import ReplyCommentary from './ReplyCommentary'
import axios from 'axios'
import $ from 'jquery'

export default {
  props: ['artid'],
  inject: ['reload'],
  name: 'ArticleMain',
  components: {Commentary, ReplyCommentary},
  data () {
    return {
      msg: '文章详情页',
      // 过滤器
      mot: '',
      condition: '',
      // 文章数据
      article: {},
      // 用户数据
      user: {},
      // 用户所写的文章总数
      artcount: '',
      // 用户所写的文章标题
      arttitle: '',
      // 热门文件
      hotarticle: [],
      articleid: '',
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
      // 点赞状态
      like_flag: '',
      // 评论id
      comment_id: ''
    }
  },
  created: function () {
    // 跳转所需的id
    this.articleid = this.artid
  },
  mounted: function () {
    this.getDate()
    this.getuserart()
    this.gethotart()
    this.getComments()
  },
  methods: {
    myFlush: function () {
      this.reload()
    },
    // 获取所有评论
    getComments: function () {
      let vm = this
      let tel = window.sessionStorage.getItem('usertel')
      if (!tel) {
        tel = ''
      }
      axios.get(this.Global.HOST + 'article/getComment/' + this.articleid + '/' + tel + '/')
        .then(function (response) {
          vm.comment_num = response.data.comments.length
          vm.comments = response.data.comments
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 获取数据
    getDate: function () {
      let tel = window.sessionStorage.getItem('usertel')
      if (!tel) {
        // 未登录时
        tel = ''
      }
      let vm = this
      axios.get(this.Global.HOST + 'article/getArticleById/' + this.articleid + '/' + tel + '/')
        .then(function (response) {
          vm.article = response.data.article
          vm.like_flag = vm.article.like_flag
          vm.user = response.data.user
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getuserart: function () {
      let vm = this
      axios.get(this.Global.HOST + 'article/getUserArticle/' + vm.articleid + '/')
        .then(function (response) {
          vm.artcount = response.data.nums
          vm.arttitle = response.data.uu_articles
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    changeHotId: function (e) {
      let aid = $(e.target).parents('.hot-course').attr('id')
      if (aid) {
        this.articleid = aid
        this.getDate()
      }
    },
    changeIId: function (e) {
      let bid = $(e.target).parents('.related-art').attr('id')
      if (bid) {
        this.articleid = bid
        this.getDate()
      }
    },
    gethotart: function () {
      let vm = this
      axios.get(this.Global.HOST + 'article/hotArticle/')
        .then(function (response) {
          vm.hotarticle = response.data.articles
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 获取当前用户头像
    // 发表评论需要用户登录，未登录时用一个默认头像。

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
    // 文章点赞
    articlelike: function () {
      let vm = this
      vm.tel = window.sessionStorage.getItem('usertel')
      if (vm.tel) {
        if (this.like_flag === false) {
          axios.get(this.Global.HOST + 'article/insertArticleLike/' + vm.articleid + '/' + vm.tel + '/')
            .then(function (response) {
              vm.articlelike = response.data.code
              if (vm.articlelike === 999) {
                vm.like_flag = true
              }
              vm.myFlush()
            })
        } else {
          axios.get(this.Global.HOST + 'article/deteleArticleLike/' + vm.articleid + '/' + vm.tel + '/')
            .then(function (response) {
              vm.articlelike = response.data.code
              // console.log(response.data.code)
              if (vm.articlelike === 999) {
                vm.like_flag = false
              }
              vm.myFlush()
            })
        }
      } else {
        // 用户未登录
        this.isTipLogin = true
      }
    },
    // 评论点赞
    commentlike: function (e) {
      let $commid = $(e.target).parents('.ucomment').attr('id')
      let vm = this
      vm.tel = window.sessionStorage.getItem('usertel')
      if (vm.tel) {
        axios.get(this.Global.HOST + 'article/insertCommentLike/' + $commid + '/' + vm.tel + '/')
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
        axios.get(this.Global.HOST + 'article/insertReplyLike/' + $replyid + '/' + vm.tel + '/')
          .then(function (response) {
            vm.replylike = response.data.code
            vm.myFlush()
          })
      } else {
        // 用户未登录
        this.isTipLogin = true
      }
    },
    // 接受文章评论传过来的code
    showCode: function (data) {
      if (data === 'success') {
        this.isUpCommentary = false
        this.isReplyCommentary = false
        this.myFlush()
      }
    }
  },
  filters: {
    mot: function (i, a, len) {
      if (i.length <= a) {
        return i
      }
      i = i.toString()
      return i.substr(0, len) + '...'
    }
  }
}
</script>

<style scoped>
  /*评论部分*/
  .like{
    display: inline-block;
    width: 50px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    color: #ceced5 !important;
  }
  .upcom{
    display: inline-block;
    width: 50px;
    height: 30px;
    line-height: 30px;
    /*padding-top: 1px;*/
  }
  .like:hover, .upcom:hover{
    cursor: pointer;
    color: black !important;
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
  }
  .ucomment .uimg img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .com-content .uname{
    float: left;
    height: 50px;
    line-height: 50px;
    font-size: 1.1em;
    font-weight: 700;
  }

  .ucontent{
    clear: left;
    padding-left: 50px;
  }
  .son{
    padding-left: 50px;
  }
  /*评论部分*/

  .line {
    margin: 10px 0;
    height: 1px;
    background: #ceced5;
  }

  a, a:hover {
    text-decoration: none;
  }

  body {
    margin: 0;
    padding: 0;
    background: ghostwhite;
  }

  .bg-white {
    background: white;
  }

  /*文章内容部分*/
  .article-content {
    width: 970px;
    min-height: 600px;
    margin: 20px auto;
  }

  .article-content .article-container, .article-bottom {
    box-shadow: 0 2px 5px gray;
    margin-right: 20px;
    padding: 10px 20px;
    border-radius: 10px;
  }

  .article-bottom {
    background: white;
    margin-top: 30px;
    line-height: 40px;
    padding-left: 35px;
    padding-right: 35px;

  }

  .article-bottom .sta {
    display: inline-block;
    width: 520px;
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

  .bg-white {
    background: white;
  }

  .article-content span {
    color: gray;
  }

  .article-content .icon-like {
    position: relative;
    top: -3px;
  }

  .article-content .introduce {
    margin-top: 20px;
    font-size: 1.3em;
  }

  .article-content .content {
    margin-top: 30px;
  }

  /* 右侧作者信息*/
  .user-info {
    height: 100px;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 2px 2px 5px gray;
    background: whitesmoke;
    color: gray;
  }

  .user-info a, .more a {
    color: gray;
  }

  .user-info span {
    display: inline-block;
  }

  .user-info .user-logo {
    width: 50px;
    height: 50px;
  }

  .user-info .user-logo img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-info .user-logo img:hover {
    box-shadow: 0 0 15px black;
  }

  .user-info .user-name {
    font-size: 1.2em;
    font-weight: bold;
    color: black;
    width: 200px;
    height: 30px;
  }

  .user-info .user-job {
    width: 400px;
    height: 30px;
  }

  .user-info .article-num {
    font-weight: bold;
  }

  /*作者热门文章部分*/
  .title {
    font-size: 1.3em;
    font-weight: bold;
    margin: 20px 0 10px -15px;
    /*margin-top: 20px;*/
  }

  .more {
    height: 55px;
    padding-top: 25px;
  }

  .article {
    border-bottom: 1px solid lightgrey;
    padding: 10px 0;
  }

  .article a > span {
    display: inline-block;
    height: 32px;
    line-height: 32px;
  }

  .article .icon-article {
    width: 32px;
    background: url("../../assets/icons/article-logo.svg");
  }

  /*相关视频推荐*/
  .hot-course {
    margin-top: -5px;
    padding: -15px;
  }

  .hot-course a > div {
    float: left;
  }

  .hot-course .course-img {
    display: inline-block;
    width: 90px;
    height: 50px;
  }

  .hot-course .course-img img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    object-fit: cover;
  }

  .hot-course .course-name {
    font-size: 1em;
    /*padding-top: 10px;*/
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .hot-course .course-degree {
    margin-left: 5px;
  }

  .hot-course a {
    display: inline-block;
    margin: 10px 0;
  }
</style>
