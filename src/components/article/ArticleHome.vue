<template>
  <div>
    <div class="container-fluid bg-white" style="box-shadow: 2px 2px 5px lightgrey">
      <div class="container" style="margin: 10px auto">
        <div class="row">
          <!--文章logo-->
          <div class="col-md-3">
            <a href="#">
              <div class="article-logo"></div>
            </a>
          </div>
          <!--搜索输入框-->
          <div class="col-md-7 text-center search">
            <div class="search-ipt">
              <div class="ipt">
                <input type="text" placeholder="搜索感兴趣的内容" v-model.trim="condition" @keydown.enter="searchData">
              </div>
              <div class="search-icon" @click="searchData">
                <span></span>
              </div>
            </div>
          </div>
          <!--发表文章按钮-->
          <div class="col-md-2 text-center btn-seed-art">
            <button>写文章</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container articles row">
      <div class="col-md-4 art" v-for="article in list" :key="article.id" id="article.id">
        <!--一个文章模板-->
        <router-link :to="{name: 'articledetailcontainer', params: {artid: article.id}}">
          <div class="col-md-12 col-sm-12 col-xs-12 article">
            <a href="#">
              <h4>
                {{article.title | more(14,16)}}</h4>
              <p class="art-p">{{article.introduce | more(50,60)}}</p>
              <div class="row">
                <div class="col-md-5">
                  <img class="icon-user" src="" alt=""><span v-text="article.userinfo__name"></span>
                </div>
                <div class="col-md-4" v-text="article.upload.slice(0,10)"></div>
                <div class="col-md-3 text-center"><img class="icon-like" src="../../assets/icons/like.svg" alt="">
                  <span v-text="article.like"></span></div>
              </div>
            </a>
          </div>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <!--分页组件-->
        <paging :ac="alllenght" :currentIndex="pageIndex" @indexclick="getIndex" :count="pagesize" v-show="pagesize>1"></paging>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ArticleHome',
  data () {
    return {
      msg: '文章首页加搜索',
      // 输入所要搜索的东西
      condition: '',
      // 文章数据
      list: [],
      // 过滤器
      more: '',
      // 当前页
      pageIndex: 1,
      // 页码总数
      pagesize: 1,
      // 文章总数
      alllenght: 0
    }
  },
  created: function () {
    let con = this.$route.params.con
    if (con) {
      this.condition = con
    }
  },
  mounted: function () {
    this.getDate()
    this.getPageSize()
  },
  methods: {
    // 获取数据
    getDate: function () {
      let vm = this
      axios.get(vm.Global.HOST + 'article/getArticle/' + vm.pageIndex + '/' + vm.condition + '/')
        .then(function (response) {
          vm.list = response.data.articles
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 获取分页数和文章总数
    getPageSize: function () {
      let vm = this
      axios.get(vm.Global.HOST + 'article/acountArticle/' + vm.condition + '/')
        .then(function (response) {
          vm.alllenght = response.data.acount
          vm.pagesize = Math.ceil(response.data.acount / 12)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 搜索
    searchData: function () {
      this.pageIndex = 1
      this.getDate()
      this.getPageSize()
    },
    // 点击分页
    getIndex: function (i) {
      this.pageIndex = i
      this.getDate()
    }
  },
  // 超过规定字数，用省略号
  filters: {
    more: function (i, a, len) {
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

  /*搜索部分-开始*/
  .article-logo {
    width: 274px;
    height: 60px;
    background: url("../../assets/icons/article-logo.png");
  }

  .search {
    height: 60px;
    line-height: 60px;
  }

  /*搜索div*/
  .search .search-ipt {
    width: 700px;
    height: 40px;
    margin: auto;
  }

  .search .search-ipt > div {
    float: left;
  }

  /*搜索输入框*/
  .search .search-ipt .ipt input {
    outline: none;
    width: 600px;
    height: 40px;
    background: whitesmoke;
    padding: 0 15px;
    box-sizing: border-box;
    border: none;
    border-radius: 10px 0 0 10px;
    font-size: 1.1em;
    color: gray;
  }

  /*搜索图标*/
  .search .search-ipt .search-icon {
    width: 40px;
    height: 40px;
    margin-top: 10px;
    border-radius: 0 10px 10px 0;
    box-sizing: border-box;
    background: whitesmoke;
  }

  .search .search-ipt .search-icon span {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url("../../assets/icons/search.svg") no-repeat 4px 8px;
  }

  .search .search-ipt .search-icon span:hover {
    cursor: pointer;
  }

  /*写文章按钮*/
  .btn-seed-art button {
    outline: none;
    width: 90px;
    height: 40px;
    margin-top: 10px;
    color: white;
    background: #37f;
    border: none;
    border-radius: 20px;
  }

  /*搜索部分-结束*/
  /*文章部分*/
  .articles {
    margin: 50px auto;
    min-height: 500px;
  }
  .articles .article {
    color: black;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
    background: white;
    box-shadow: 2px 2px 5px gray;
  }

  .articles .article h4 {
    font-weight: 700;
    /*height: 50px;*/
  }

  .articles .art-p {
    height: 70px;
  }
  .articles .article:hover {
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
  }

  .article a > div > div {
    padding-right: 0;
  }

  .article a {
    color: black;

  }

</style>
