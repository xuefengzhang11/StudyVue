<template>
<div class="zzc">
  <div class="tab-content">
    <form action="" >
      <div class="row alter-text">
        <div class="col-md-1"></div>
        <div class="col-md-9">修改密码</div>
        <div class="col-md-2">
          <img src="../../assets/icons/X.svg">
        </div>
      </div>
      <div class="original-password">
        <span class="original-text">请输入原密码：</span>
        <input type="password" class="btn_tel" id="oldpwd" placeholder="输入原始密码" data-validate="require-password">

        <p class="warn" data-error-hide="请输入6-16位密码，区分大小写，不能使用空格！"></p>
      </div>
      <div class="original-password">
        <span class="original-text">请输入新密码：</span>
        <input type="password" class="btn_tel" id="pwd1" placeholder="输入新密码">
        <p class="warn" data-error-hide="请输入6-16位密码，区分大小写，不能使用空格！"></p>
      </div>
      <div class="original-password">
        <span class="original-text">请确认新密码：</span>
        <input type="password" class="btn_tel" id="pwd2" placeholder="再次输入新密码">
        <p class="warn" data-error-hide="请输入6-16位密码，区分大小写，不能使用空格！"></p>
      </div>

      <input type="button" value="确认" class="confirm" id="save">
      <input type="button" value="取消" class="cancel" id="close">
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'UpdateUserPassword'
}
</script>

<style scoped>
  .zzc {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 999;
    top: 0;
  }
  .tab-content{
    width: 490px;
    height: 350px;
    /*background: yellow;*/
    /*position: absolute;*/
    /*left: 50%;*/
    /*transform: translate(-50%,50%);*/
    border-radius: 20px;
    border: solid 1px black;
  }
  .alter-text{
    margin-top: 20px;
    font-size: 1.4em;
    font-weight: bold;
  }
  .original-password{
    margin-top: 5px;
    margin-left: 60px;
  }
  .original-text{
    font-size: 1.3em;
  }
  .btn_tel{
    width: 250px;
    height: 40px;
    outline: none;
    border: solid 1px black;
    padding-left: 10px;
    border-radius: 3px;
  }
  .warn{
    height: 30px;
  }
  .confirm{
    width: 60px;
    height: 35px;
    border-radius: 40px;
    text-align: center;
    line-height: 35px;
    background: #126693;
    color: white;
    position: absolute;
    left: 150px;
    top:280px;
    opacity: 0.8;
    outline: none;
    border: none;
  }
  .cancel{
    width: 60px;
    height: 35px;
    border-radius: 40px;
    border: solid 1px black;
    text-align: center;
    line-height: 35px;
    position: absolute;
    left: 280px;
    top:280px;
    outline: none;
    background: white;
  }
  .confirm:hover{
    opacity: 1;
  }
</style>
