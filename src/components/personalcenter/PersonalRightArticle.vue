<template>
  <div class="container-fluid">
    <div class="col-md-12 foot">
      <ul class="nav nav-tabs border">
        <!--<li role="presentation" class="active"><a href="#">Home</a></li>-->
        <li role="presentation" class="note" @click.prevent.stop="changeArticle"><a href="#" class="color">我的文章</a></li>
        <li role="presentation" class="collect" @click.prevent.stop="changeCollect"><a href="#" class="color">我的收藏</a></li>
      </ul>
      <PersonalRightArticleMyart v-show="studynote"></PersonalRightArticleMyart>
      <PersonalRightArticleCollect v-show="studycollect"></PersonalRightArticleCollect>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import PersonalRightArticleMyart from './PersonalRightArticleMyart'
import PersonalRightArticleCollect from './PersonalRightArticleCollect'
export default {
  name: 'PersonalRightArticle',
  data () {
    return {
      msg: '我的文章',
      studynote: true,
      studycollect: false
    }
  },
  components: {
    PersonalRightArticleMyart,
    PersonalRightArticleCollect
  },
  created: function () {
    this.changeArticle()
  },
  methods: {
    // 随点击，改变样式
    changeArticle: function () {
      this.studynote = true
      this.studycollect = false
    },
    changeCollect: function () {
      this.studynote = false
      this.studycollect = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a, a:hover {
    text-decoration: none;
  }
  .note{
    width: 150px;
    height: 50px;
    text-align: center;
    margin-top: 10px;
    font-size: 1.2em;
  }
  .collect{
    width: 150px;
    height: 50px;
    text-align: center;
    margin-top: 10px;
    font-size: 1.2em;
  }
  .color{
    color: #101010;
  }
  .border {
    border-bottom: grey 1px solid;
  }
</style>
