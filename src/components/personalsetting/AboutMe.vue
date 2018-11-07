<template>
  <div>
    <div class="adscreen about_bgimg row">
      <div class="row about_bgcol font">
        <h1>欢迎来到我们的团队</h1>
        <h2>WE ARE AN INNOVATIVE TEAM</h2>
        <h4>a platform to promote the development of programmers</h4>
        <h4>A place where dreams set sail</h4>
      </div>
      <div class="gly" role="alert" >
        <div class="glyphicon glyphicon-menu-down down_1" aria-hidden="true"></div>
        <div class="glyphicon glyphicon-menu-down down_2" aria-hidden="true"></div>
        <div class="glyphicon glyphicon-menu-down down_3" aria-hidden="true"></div>

      </div>
    </div>

    <!-------------------关于我们--------------------------->

    <div id="about_us" class="row">
      <h1>关于我们</h1>
      <div class="col-md-1"></div>
      <div class="col-md-10 about_us">
        <div id="about_us_1" class="col-md-4">
          <div class="icon-compass"><span><i class="icon-compass"></i></span></div>
          <h4>编程小白的第一课</h4>
          <p>思达迪针对于编程人员设计课程体系</p>
        </div>
        <div id="about_us_2" class="col-md-4">
          <div class="icon-monitor"><span><i class="icon-monitor"></i></span></div>
          <h4>程序员的梦工厂</h4>
          <p>为您量身打造您的职业路径</p>
        </div>
        <div id="about_us_3" class="col-md-4">
          <div class="icon-clock2"><span><i class="icon-clock2"></i></span></div>
          <h4>用业余时间学习编程</h4>
          <p>我们努力用更短的时间让您学到更多的东西</p>
        </div>
      </div>
    </div>

    <!-------------------关于团队--------------------------->

    <div id="about_team" class="row">
      <h1>我们的团队</h1>
      <div class="col-md-1"></div>
      <div class="col-md-10 about_server">
        <div class="about_server_1 col-md-3 server">
          <div class="icon-hand"><span><i class="icon-hand"></i></span></div>

          <h4>王一飞</h4>

        </div>
        <div class="about_server_2 col-md-3 server">
          <div class="icon-eye"><span><i class="icon-eye"></i></span></div>

          <h4>张雪凤</h4>

        </div>
        <div class="about_server_3 col-md-3 server">
          <div class="icon-server"><span><i class="icon-server"></i></span></div>

          <h4>华攸勇</h4>

        </div>
        <div class="about_server_4 col-md-3 server">
          <div class="icon-good"><span><i class="icon-good"></i></span></div>

          <h4>韩成斌</h4>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AboutMe',
  data () {
    return {
      msg: '个人设置页'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    box-shadow: 2px 2px 10px gray;
  }

  .header .logo {
    height: 60px;
    line-height: 70px;
  }

  .header .logo a {
    color: black;
  }

  .header .logo a:hover {
    text-decoration: none;
  }

  .header .logo img {
    position: relative;
    top: -7px;
  }

  .bg-header {
    background: whitesmoke;
  }

  .header .login-rgst a {
    font-size: 1.1em;
    margin-right: 0;
  }

  .header .btn-cart {
    height: 35px;
    border: none;
    border-radius: 30px;
    outline: none;
    margin-top: 12px;
  }

  .header .btn-cart:hover {
    color: red;
    box-shadow: 2px 2px 2px gray;
  }

  .header .nav-btn {
    display: inline-block;
    height: 60px;
    line-height: 60px;
    font-size: 1.2em;
    text-decoration: none;
    color: gray;
    margin-right: 20px;
  }

  .header .nav-btn:hover {
    color: darkslategrey;
  }

  /*----------关于我们--------*/

  .about_bgimg {
    background-image: url("../../assets/images/users/aboutme.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    height: 700px;
    width: 100%;
  }

  .about_bgcol {
    height: 700px;
    background-color: rgba(0, 0, 0, 0.50);
  }

  .about_bgcol h1 {
    color: #fbb040;
    font-size: 5em;
    margin-top: 3em;
    text-align: center;
  }

  .about_bgcol h2, .about_bgcol h4 {
    font-family: "Roboto", arial, sans-serif;
    color: #ffffff;
    line-height: 1.5em;
    text-align: center;
  }

  .gly {
    position: absolute;
    left: 40%;
    font-size: 6em;
    color: #fff;
    top: 90%;
    animation-name: chevron-thin-down;
    animation-duration: 0.4s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    /*Safari and Chrome: */
    -webkit-animation-name: chevron-thin-down;
    -webkit-animation-duration: 0.4s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;

  }
  .down_2 {
    margin-top: 0.5em;
    opacity: 0.7;
  }

  .down_3 {
    margin-top: 1em;
    opacity: 0.4;
  }

  @keyframes chevron-thin-down {
    0% {
      top: 83%;
    }
    100% {
      top: 86%;
    }
  }

  @-webkit-keyframes chevron-thin-down /*Safari and Chrome */
  {
    0% {
      top: 83%;
    }
    100% {
      top: 86%;
    }
  }
  div[id^='about'] > h1{
    padding-top: 3em;
    font-weight: bolder;
    text-align: center;
  }
  div[id^='about']:nth-child(2n+1){
    background-color: #eaeaea;
  }
  .about_us,.about_server{
    line-height: 2em;
    text-align: center;
    padding-bottom: 10em;
  }

  .about_us span,.about_team span{
    text-align: center;
    font-size: 5em;
    color: #ffffff;
  }
  .icon-compass{
    margin-top: 3.5em;
    margin-bottom: 3.5em;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    line-height: 12em;
    height: 12em;
    width: 12em;
    border-radius: 50%;
    background-image: url("../../assets/images/users/helloworld.jpg");
    background-size: cover;
    background-position: -50px;
  }
  .icon-monitor{
    margin-top: 3.5em;
    margin-bottom: 3.5em;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    line-height: 12em;
    height: 12em;
    width: 12em;
    border-radius: 50%;
    background-image: url("../../assets/images/users/mgc.jpg");
    background-size: cover;
    background-position: -50px;
  }
  .icon-clock2{
    margin-top: 3.5em;
    margin-bottom: 3.5em;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    line-height: 12em;
    height: 12em;
    width: 12em;
    border-radius: 50%;
    background-image: url("../../assets/images/users/study.jpg");
    background-size: cover;
    background-position: -30px;
  }

  /*-----------底部----------*/
  .footer {
    background: black;
  }

  .footer .nav-btn {
    text-decoration: none;
    color: gray;
  }

  .footer .nav-btn:hover {
    color: white;
    background: none;
  }

  .footer ul {
    display: flex;
    justify-content: center;
  }
  .icon-compass {
    background-image: url("../../assets/images/users/helloworld.jpg");
  }
  .icon-hand, .icon-eye, .icon-server, .icon-good{
    margin: 3.5em auto;
    text-align: center;
    line-height: 12em;
    height: 12em;
    width: 12em;
    border-radius: 50%;
    background-size: cover;
  }

  .icon-hand{
    background-image: url("../../assets/images/users/wyf.jpg");
  }
  .icon-eye{
    background-image: url("../../assets/images/users/zxf.jpg");
  }
  .icon-server{

    background-image: url("../../assets/images/users/hyy.jpg");
  }
  .icon-good{
    background-image: url("../../assets/images/users/hcb.jpg");
  }

</style>
