<template>
  <!--遮罩层-->
  <div class="zzc">
    <!--发表评论容器-->
    <div class="com-container">
      <div class="row">
        <div class="col-md-6" style="font-size: 1.3em; font-weight: 600; margin-bottom: 10px">
          发表评论
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-2 text-center">
          <span class="quxiao text-right" @click="$emit('closeupcom')"></span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <textarea placeholder="评论" v-model="comment_content"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-md-9"></div>
        <div class="col-md-3 text-center">
          <button @click="submit">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  props: ['secid'],
  name: 'Commentary',
  data () {
    return {
      msg: '发评论',
      comment_content: '',
      sectionid: ''
    }
  },
  created: function () {
    // 跳转所需的id
    this.sectionid = this.secid
  },
  methods: {
    // 添加文章评论内容
    submit: function () {
      let vm = this
      vm.tel = window.sessionStorage.getItem('usertel')
      if (vm.comment_content) {
        let sectioncomment = {
          'usertel': vm.tel,
          'sectionid': vm.sectionid,
          'comment_content': vm.comment_content
        }
        $.ajax({
          url: vm.Global.HOST + 'course/insertSectionCommet/',
          type: 'POST',
          data: sectioncomment,
          success: function (response, textStatus, request) {
            vm.res = response.code
            if (vm.res === 888) {
              vm.$emit('toParentCode', 'success')
            }
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*提交按钮*/
  button {
    border: none;
    outline: none;
    width: 60px;
    height: 30px;
    background: blue;
    color: white;
    border-radius: 30px;
  }
  button:hover{
    color: black;
  }
  /*输入框*/
  textarea {
    outline: none;
    width: 100%;
    height: 100px;
    padding: 10px;
    margin-bottom: 10px;
  }
  /*取消叉叉*/
  .quxiao {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url("../../assets/icons/X.svg");
  }
  .quxiao:hover{
    cursor: pointer;
  }
  /*发表评论容器*/
  .com-container {
    width: 400px;
    border-radius: 10px;
    padding: 20px;
    background: white;
    margin: 150px auto;
  }
  /*遮罩层*/
  .zzc {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 999;
    top: 0;
  }
</style>
