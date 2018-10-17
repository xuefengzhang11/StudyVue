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
    <ArticleMain :artid="as"></ArticleMain>
  </div>
</template>

<script>
import ArticleMain from './ArticleMain'
import axios from 'axios'
// import $ from 'jquery'

export default {
  name: 'ArticleDetailContainer',
  data () {
    return {
      msg: '文章详情页',
      condition: '',
      as: ''
    }
  },
  components: {
    ArticleMain
  },
  created: function () {
    this.as = this.$route.params.artid
  },
  mounted: function () {
    this.getDate()
  },
  methods: {
    // 获取数据
    getDate: function () {
      let vm = this
      axios.get('http://localhost:8000/article/getArticleById/' + vm.as + '/')
        .then(function (response) {
          vm.article = response.data.article
          vm.user = response.data.user
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 搜索
    searchData: function () {
      // 跳转到article , 并且把查询条件传过去
      this.$router.push({
        // path: '/article',
        name: 'articlehome',
        params: {
          con: this.condition
        }
      })
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

  .article-content {
    width: 970px;
    min-height: 600px;
    margin: 20px auto;
  }
  /*搜索部分-开始*/
  .article-logo {
    width: 274px;
    height: 60px;
    background: url("../assets/icons/article-logo.png");
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
    background: url("../assets/icons/search.svg") no-repeat 4px 8px;
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

</style>
