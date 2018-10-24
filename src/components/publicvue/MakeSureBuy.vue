<template>
  <!--遮罩层-->
  <div class="zzc">
    <!--未购买提示框容器-->
    <div class="tip-container">
      <div class="row">
        <div class="col-md-12 text-center" style="font-size: 1.3em; font-weight: 600; margin: 20px 0">
          确定购买吗？
        </div>
      </div>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-4 text-center">
          <button @click="$emit('quxiaoclick')">取消</button>
        </div>
        <div class="col-md-4 text-center">
          <button @click="$emit('sureclick')">确定</button>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MakeSureBuy',
  data () {
    return {
      msg: '确认购买？'
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
