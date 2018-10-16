<template>
  <!--底部-->
  <div class="container-fluid footer">
    <div class="container">
      <div class="row">
        <ul class="nav navbar-btn ">
          <li><a href="#" class="nav-btn">网站首页</a></li>
          <li><a href="#" class="nav-btn">企业合作</a></li>
          <li><a href="#" class="nav-btn">人才招聘</a></li>
          <li><a href="#" class="nav-btn">联系我们</a></li>
          <li><a href="#" class="nav-btn">讲师招募</a></li>
          <li><a href="#" class="nav-btn">常见问题</a></li>
          <li><a href="#" class="nav-btn">意见反馈</a></li>
          <li><a href="#" class="nav-btn">慕课大学</a></li>
          <li><a href="#" class="nav-btn">友情链接</a></li>
        </ul>
      </div>
      <div class="row text-center" style="color: rgba(245,245,245,0.6);">
        <span>Copyright © 2018 imooc.com All Rights Reserved | 京ICP备 12003892号-11</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBottom',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*底部*/
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
</style>
