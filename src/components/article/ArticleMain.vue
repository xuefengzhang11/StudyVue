<template>
  <div>
    <div class="article-content">
      <div class="row">
        <!--左侧--文章主体-->
        <div class="col-md-8 bg-white article-container">
          <!--&lt;!&ndash;文章标题&ndash;&gt;-->
          <h2 class="text-center" v-text="article.title"></h2>
          <!--&lt;!&ndash;发表时间、点赞数&ndash;&gt;-->
          <div class="row">
              <div class="col-md-3 text-left">
                  <span class="up_time" v-text="article.upload"></span>
              </div>
              <div class="col-md-6"></div>
              <div class="col-md-3 text-right">
                  <img src="../../assets/icons/like.svg" class="icon-like" alt="">
                  <span class="like_num" v-text="article.like"></span>
              </div>
          </div>
          <p class="introduce" v-html="article.introduce"></p>
          <!--&lt;!&ndash;文章内容&ndash;&gt;-->
          <p class="content" v-html="article.content"></p>
        </div>
        <!--右侧--作者信息 作者其他文章 相关视频-->
        <div class="col-md-3">
          <!--作者全部信息-->
          <div class="row">
            <div class="col-md-12 user-info"  style="padding-left: 30px;">
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
            <div class="col-md-12 article related-art" v-for="i in arttitle" :key="i.id" :id="i.id" @click.prevent.stop="changeIId">
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
          <div class="row hot-course" v-for="hot in hotarticle" :key="hot.id" :id="hot.id" @click.prevent.stop="changeHotId">
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
</template>

<script>
import axios from 'axios'
import $ from 'jquery'

export default {
  props: ['artid'],
  name: 'ArticleMain',
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
      articleid: ''
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
  },
  methods: {
    // 获取数据
    getDate: function () {
      let vm = this
      axios.get('http://localhost:8000/article/getArticleById/' + vm.articleid + '/')
        .then(function (response) {
          vm.article = response.data.article
          vm.user = response.data.user
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getuserart: function () {
      let vm = this
      axios.get('http://localhost:8000/article/getUserArticle/' + vm.articleid + '/')
        .then(function (response) {
          vm.artcount = response.data.nums
          vm.arttitle = response.data.uu_articles
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    gethotart: function () {
      let vm = this
      axios.get('http://localhost:8000/article/hotArticle/')
        .then(function (response) {
          vm.hotarticle = response.data.articles
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

  .article-content .article-container {
    box-shadow: 0 2px 5px gray;
    margin-right: 20px;
    padding: 10px 20px;
    border-radius: 10px;
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

  .article-content .introduce{
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
  .hot-course .course-degree{
    margin-left: 5px;
  }
  .hot-course a {
    display: inline-block;
    margin: 10px 0;
  }
</style>
