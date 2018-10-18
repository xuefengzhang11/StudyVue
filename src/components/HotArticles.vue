<template>
  <div class="container-fluid hot-article">
    <div class="row">
      <div class="col-md-12 text-center title">
        <span class="icon-article-l">&nbsp;</span>
        <span class="text-center">精彩文章</span>
        <span class="icon-article-r">&nbsp;</span>
      </div>
    </div>
    <div class="row articles center-block">
      <div class="col-md-6 art" v-for="hot in hotArticles" :key="hot.id" :id="hot.id"  @click.prevent.stop="toArticleDetail">
        <!--一个文章模板-->
        <div class="col-md-12 col-sm-12 col-xs-12 article">
            <a href="#">
                <h4 v-text="hot.title"></h4>
                <p class="article_introduce">{{hot.introduce | hotmot(130,140)}}</p>
                <div class="row">
                    <div class="col-md-5">
                        <img class="icon-user" src="../assets/images/courses/1.jpg" alt=""><span v-text="hot.user_name"></span>
                    </div>
                    <div class="col-md-4" v-text="hot.upload"></div>
                    <div class="col-md-3 text-center"><img class="icon-like" src="../assets/icons/like.svg" alt="">
                        <span v-text="hot.like"></span></div>
                </div>
            </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'

export default {
  name: 'HotArticles',
  data () {
    return {
      url: 'http://localhost:8000/',
      msg: '热门文章',
      hotArticles: [],
      hotmot: ''
    }
  },
  mounted: function () {
    let vm = this
    axios.get(this.url + 'article/hotArticle/')
      .then(function (response) {
        vm.hotArticles = response.data.articles
        // console.log(vm.hotArticles)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    toArticleDetail: function (e) {
      let $courid = $(e.target).parents('.col-md-6').attr('id')
      console.log($courid)
      if ($courid) {
        this.$router.push({
          // name -- params  类似于 ajax 中的 post -> this.$route.params.key
          // path -- query  类似于 ajax 中的 get -> this.$route.query.key
          // path: '/coursesdetail',
          name: 'articledetailcontainer',
          params: {
            artid: $courid
          }
        })
      }
    }
  },
  filters: {
    hotmot: function (i, a, len) {
      if (i.length <= a) {
        return i
      }
      i = i.toString()
      return i.substr(0, len) + '...'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    background: ghostwhite;
  }

  a, a:hover {
    text-decoration: none;
    color: black;
  }
  .title {
    margin: 30px 0;
    padding-top: 20px;
    font-weight: 500;
    font-size: 24px;
  }
  /*精彩文章*/
  .hot-article {
    padding-bottom: 40px;
    box-shadow: 2px 2px 10px gray;
  }

  .hot-article .articles {
    width: 1200px;
    padding: 0 50px 0 0;
    /*box-sizing: border-box;*/
  }

  .hot-article .articles .article {
    /*height: 200px;*/
    padding: 20px;
    border-radius: 10px;
    margin-left: 20px;
    margin-bottom: 30px;
    background: white;
    box-shadow: 2px 2px 5px gray;
  }
  .article h4{
    font-weight: 700;
  }
  .article .article_introduce {
    height: 80px;
  }
  .hot-article .articles .article:hover {
    box-shadow: 2px 2px 15px gray;
  }

  .articles .article img.icon-user {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .articles .article .icon-like {
    width: 15px;
    height: 15px;
    position: relative;
    top: -2px;
  }
  .icon-article-l {
    background: url("../assets/icons/home-icons.png") 0 -792px;
  }

  .icon-article-r {
    background: url("../assets/icons/home-icons.png") 0 -720px;
  }

</style>
