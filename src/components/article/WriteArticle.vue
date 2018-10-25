<template>
  <div class="container-fluid">
    <div class="bg-write">
      <!--标题输入框-->
      <div class="title">
        <h1><input type="text" placeholder="在此输入文章标题" v-model="atitle"></h1>
      </div>
      <textarea class="signature" placeholder="在此输入文章简介" v-model="aintroduce"></textarea>
      <!--文本编辑器容器-->
      <div id="editor"></div>
      <div class="text-center bg-btn">
        <button id="b" class="=btn btn-lg btn-danger" @click="commitArticle">提交</button>
      </div>
    </div>
    <commitsuccess v-if="isTipWrite" @successClick="isTipWrite=false"></commitsuccess>
  </div>
</template>

<script>
import $ from 'jquery'
import E from 'wangeditor'

export default {
  name: 'WriteArticle',
  data () {
    return {
      msg: '写文章',
      editorContent: '',
      atitle: '',
      aintroduce: '',
      acontent: '',
      isTipWrite: false
    }
  },
  mounted () {
    let editor = new E('#editor')
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
      this.acontent = editor.txt.text()
    }
    editor.create()
  },
  created () {
    this.usertel = window.sessionStorage.getItem('usertel')
  },
  methods: {
    commitArticle: function () {
      let article = {
        'title': this.atitle,
        'introduce': this.aintroduce,
        'content': this.acontent
      }
      let vm = this
      $.ajax({
        url: vm.Global.HOST + 'article/commitArticle/' + this.usertel + '/',
        type: 'POST',
        data: JSON.stringify(article),
        success: function (response, textStatus, request) {
          let res = response.res
          if (res === '提交成功') {
            vm.isTipWrite = true
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    background: ghostwhite;
    margin: 0;
    padding: 0;
  }
  #editor {
    width: 800px;
    margin: 0 auto 5px;
    background: white;
  }
  .bg-write {
    width: 800px;
    margin: auto;
  }
  .title {
    margin-top: 30px;
  }
  .title input {
    border: 1px rgba(204, 204, 204, 0.9) solid;
    outline: none;
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 0.6em;
  }
  .title input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #aab2bd;
    /* placeholder字体大小  */
    font-size: 0.8em;
    /* placeholder位置  */
    text-align: center;
  }
  h1 {
    margin: 0;
  }
  .signature {
    width: 800px;
    margin-top: 10px;
    height: 50px;
  }
  #editor>div:last-child{
    padding-left: 10px;
  }
  .bg-btn {
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>
