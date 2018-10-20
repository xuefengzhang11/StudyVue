<template>
  <div class="container-fluid">
    <div class="col-md-12 foot">
      <div class="context" v-show="studynotarticle">
        你还没有创作文章，快去<span @click="toArticle" class="go-article">写文章</span>吧！
      </div>
      <div class="mycollections" v-show="studyarticle" v-for="art in article" :key="art.id" :id="art.id">
        <div class="collections-title">
          {{art.title}}
        </div>
        <p class="collections-introduce">{{art.introduce}}</p>
        <div class="row">
          <div class="col-md-2">
          </div>
          <div class="col-md-3">
            <div class="collections-time">{{art.upload.toString().slice(0,10)}}</div>
          </div>
          <div class="col-md-2">
            <div class="collections-like">
              <img src="../../assets/icons/like.svg"/>
              <span class="like-num">{{art.like}}</span>
            </div>
          </div>
          <div class="col-md-2">
            <div class="collections-delete" @click="deleteArticle">删除文章</div>
          </div>
          <div class="col-md-2">
            <router-link :to="{name: 'articledetailcontainer', params: {artid: art.id}}">
              <div class="collections-go">查看详情</div>
            </router-link>
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
  name: 'PersonalRightArticleCollect',
  data () {
    return {
      msg: '我的文章',
      studynotarticle: true,
      studyarticle: false,
      article: '',
      usertel: window.sessionStorage.getItem('usertel'),
      more: '',
      nums: 0
    }
  },
  created: function () {
    this.as = this.$route.params.artid
    window.sessionStorage.getItem('usertel')
  },
  mounted: function () {
    this.getDate()
  },
  methods: {
    // 判断数量
    judgeArticle: function () {
      if (this.nums) {
        console.log(12)
        this.studynotarticle = false
        this.studyarticle = true
      } else {
        console.log(34)
        this.studynotarticle = true
        this.studyarticle = false
      }
    },
    // 取数据
    getDate: function () {
      let vm = this
      axios.get('http://localhost:8000/article/getMyArticle/' + vm.usertel + '/')
        .then(function (response) {
          vm.article = response.data.article
          vm.nums = response.data.article.length
          vm.judgeArticle()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 跳转
    toArticle: function () {
      this.$router.push({
        path: '/article'
      })
    },
    // 删除文章
    deleteArticle: function (e) {
      let $courid = $(e.target).parents('.mycollections').attr('id')
      console.log($courid)
      let vm = this
      axios.get('http://localhost:8000/article/deleteArticle/' + $courid + '/')
        .then(function (response) {
          vm.collectcourse = response.data.code
          if (vm.collectcourse === '888') {
            vm.getDate()
          }
        })
    }
  },
  // 规定字数限制
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
  .context{
    text-align: center;
    line-height: 300px;
    color: rgba(34, 34, 34, 0.63);
    font-size: 1.3em;
  }
  .mycollections{
    height: 200px;
    /*background: red;*/
    padding: 10px 20px;
    border: solid 1px rgba(128, 128, 128, 0.56);
    border-radius: 20px;
    margin: 20px;
    background: white;
    box-shadow: 2px 2px 5px black;
  }
  .mycollections:hover{
    box-shadow: 2px 2px 15px black;
  }
  .mycollections .collections-title {
    font-size: 1.5em;
    color: black;
  }
  .mycollections .collections-introduce {
    margin-top: 10px;
    height: 80px;
    font-size: 1.2em;
    color: black;
  }
  .mycollections .collections-time {
    font-size: 1.3em;
    margin-top: 10px;
  }
  .mycollections .collections-like{
    font-size: 1.3em;
    color: black;
    margin-top: 10px;
  }
  .mycollections .collections-delete {
    width: 80px;
    height: 40px;
    border: solid 1px red;
    text-align: center;
    line-height: 40px;
    color: red;
  }
  .mycollections .collections-go {
    width: 80px;
    height: 40px;
    border: solid 1px red;
    text-align: center;
    line-height: 40px;
    color: red;
  }
  .collections-delete:hover{
    background: red;
    color: white;
    cursor: pointer;
  }

  .collections-go:hover{
    background: red;
    color: white;
    cursor: pointer;
  }
  .go-article {
    color: blue;
  }
  .go-article:hover {
    cursor: pointer;
  }
</style>
