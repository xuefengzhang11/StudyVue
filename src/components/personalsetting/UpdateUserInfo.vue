<template>
  <div class="zzc">
    <div class="tab-content">
      <form action="">
        <div class="row edit-text">
          <div class="col-md-1"></div>
          <div class="col-md-9">编辑个人信息</div>
          <div class="col-md-2">
            <img src="../../assets/icons/X.svg">
          </div>
        </div>
        <div class="information-name">
          <span class="information-text">昵称：</span>
          <input type="text" class="btn_tel">
        </div>
        <div class="information-name">
          <span class="information-text">职位：</span>
          <span class="dropdown">
                <button class="btn btn-default dropdown-toggle information-dropdown" type="button" id="dropdownMenu1"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    请选择职位
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu information-menu" aria-labelledby="dropdownMenu1">
                    <li><a href="#">学生</a></li>
                    <li><a href="#">java工程师</a></li>
                    <li><a href="#">python工程师</a></li>
                  <!--<li><a href="#">Separated link</a></li>-->
                </ul>
            </span>
        </div>
        <div class="information-name">
          <span class="information-text">所在地区：</span>
          <span class="dropdown">
                <button class="btn btn-default dropdown-toggle information-address" type="button" id="dropdownMenu2"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    省
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu information-ar" aria-labelledby="dropdownMenu2">
                    <li><a href="#">北京</a></li>
                    <li><a href="#">上海</a></li>
                    <li><a href="#">天津</a></li>
                  <!--<li><a href="#">Separated link</a></li>-->
                </ul>
            </span>
          <span class="dropdown">
                <button class="btn btn-default dropdown-toggle information-address" type="button" id="dropdownMenu3"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    市
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu information-ar" aria-labelledby="dropdownMenu3">
                    <li><a href="#">北京</a></li>
                    <li><a href="#">上海</a></li>
                    <li><a href="#">天津</a></li>
                  <!--<li><a href="#">Separated link</a></li>-->
                </ul>
            </span>
          <span class="dropdown">
                <button class="btn btn-default dropdown-toggle information-address" type="button" id="dropdownMenu4"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    县
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu information-ar" aria-labelledby="dropdownMenu4">
                    <li><a href="#">北京</a></li>
                    <li><a href="#">上海</a></li>
                    <li><a href="#">天津</a></li>
                  <!--<li><a href="#">Separated link</a></li>-->
                </ul>
            </span>

        </div>
        <div class="information-name">
          <span class="information-text">性别：</span>
          <label class="information-sex"><input type="radio" hidefocus="true" value="0" checked="checked" name="sex">&nbsp;&nbsp;保密</label>
          <label class="information-sex"><input type="radio" hidefocus="true" value="0" checked="checked" name="sex">&nbsp;&nbsp;男</label>
          <label class="information-sex"><input type="radio" hidefocus="true" value="0" checked="checked" name="sex">&nbsp;&nbsp;
            女</label>

        </div>
        <div class="information-name">
          <span class="information-signature">个性签名：</span>
          <textarea class="signature"></textarea>
          <p class="signature-text">还可以输入<span class="word">128</span>个字符</p>
        </div>
        <input type="button" value="确认" class="confirm">
        <input type="button" value="取消" class="cancel">

      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateUserInfo'
}
</script>

<style scoped>
  /*遮罩层*/
  .zzc {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 999;
    top: 0;
  }
  .tab-content {
    width: 490px;
    height: 470px;
    /*background: yellow;*/
    position: absolute;
    left: 50%;
    transform: translate(-50%, 30%);
    border-radius: 20px;
    border: solid 1px black;

  }

  .edit-text {
    margin-top: 20px;
    font-size: 1.4em;
    font-weight: bold;

  }

  .information-name {
    margin-top: 20px;
    text-align: right;
    margin-right: 60px;
  }

  .information-text {
    font-size: 1.3em;
  }

  .btn_tel {
    width: 250px;
    height: 40px;
    outline: none;
    border: solid 1px black;
    padding-left: 10px;
    border-radius: 3px;
  }

  .information-dropdown {
    width: 250px;
    height: 40px;
    background: white;
    border: solid 1px black;
  }

  .information-menu {
    min-width: 250px;
    margin-top: 13px;
  }

  .information-sex {
    margin-left: 34px;
    font-size: 1.2em;
  }

  .information-signature {
    font-size: 1.3em;
    vertical-align: top;
  }

  .signature-text {
    font-size: 0.9em;
  }

  .signature {
    width: 250px;
    height: 80px;
    outline: none;
    border: solid 1px black;
    padding-left: 10px;
    border-radius: 3px;
    padding-top: 10px;
  }

  .confirm {
    width: 60px;
    height: 35px;
    border-radius: 40px;
    text-align: center;
    line-height: 35px;
    background: #126693;
    color: white;
    position: absolute;
    left: 150px;
    top: 410px;
    opacity: 0.8;
    outline: none;
    border: none;
  }

  .cancel {
    width: 60px;
    height: 35px;
    border-radius: 40px;
    border: solid 1px black;
    text-align: center;
    line-height: 35px;
    position: absolute;
    left: 280px;
    top: 410px;
    outline: none;
    background: white;
  }

  .confirm:hover {
    opacity: 1;

  }

  .information-address {
    width: 81px;
    height: 40px;
    background: white;
    border: solid 1px black;
  }

  .information-ar{
    min-width: 81px;
    margin-top: 13px;
  }

</style>
