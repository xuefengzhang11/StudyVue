<template>
  <!--遮罩层-->
  <div class="zzc">
    <div class="tip-container">
      <div class="row">
        <div class="col-md-12 text-center" style="font-size: 1.3em; font-weight: 600; margin-bottom: 10px">
          提交成功！
        </div>
      </div>
      <div class="row">
        <div class="col-md-8"></div>
        <div class="col-md-4 text-center">
          <button @click="$emit('successClick')">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommitSuccess',
  data () {
    return {
      msg: '提交成功'
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
  .tip-container {
    width: 300px;
    border-radius: 10px;
    padding: 30px;
    background: white;
    margin: 150px auto;
    z-index: 999;
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
