<template>
  <div class="container-fluid">
    <div class="col-md-12 foot">
      <div class="row border">
        <div class="col-md-2 note" @click.prevent.stop="changeArticle" :class="{bgvisit:studynote === true}">我的文章</div>
        <div class="col-md-2 collect" @click.prevent.stop="changeCollect" :class="{bgvisit:studycollect === true}">我的收藏</div>
        <div class="col-md-8"></div>
      </div>
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
  .note{
    line-height: 50px;
    width: 150px;
    height: 50px;
    text-align: center;
    margin-top: 10px;
    font-size: 1.2em;
    border-radius: 10px;
  }
  .note:hover{
    cursor: pointer;
    font-weight: bold;
  }
  .collect{
    border-radius: 10px;
    line-height: 50px;
    width: 150px;
    height: 50px;
    text-align: center;
    margin-top: 10px;
    font-size: 1.2em;
  }
  .collect:hover{
    cursor: pointer;
    font-weight: bold;
  }
  .border {
    border-bottom: grey 1px solid;
  }
  .bgvisit{
    background: grey;
    color: white;
  }
  .bgvisit:hover{
    font-weight: normal;
  }
</style>
