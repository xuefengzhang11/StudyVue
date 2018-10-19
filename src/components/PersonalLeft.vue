<template>
      <div class="con-left" style="height: 500px; background: ghostwhite;">
        <a :class="{gray_white:nowRight==='freeCourse'}"
           :data-value="'freeCourse'" @click="changeRight"
        >免费课程</a>
        <a :class="{gray_white:nowRight==='career'}" :data-value="'career'"
           @click="changeRight"
        >职业路径</a>
        <a :class="{gray_white:nowRight==='article'}" :data-value="'article'"
           @click="changeRight"
        >我的文章</a>
        <a :class="{gray_white:nowRight==='order'}" :data-value="'order'"
           @click="changeRight"
        >我的订单</a>
        <a>我的..</a>
      </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'PersonalLeft',
  data () {
    return {
      url: 'http://localhost:8000/',
      msg: '个人中心左侧',
      nowRight: 'freeCourse'
    }
  },
  methods: {
    changeRight: function (e) {
      this.nowRight = $(e.target).attr('data-value')
      // 发射给父组件，控制右边组件的显示
      this.$emit('changeright', this.nowRight)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a, a:hover {
    text-decoration: none;
    cursor: pointer;
  }
  .con-left a {
    display: block;
    width: 100%;
    text-align: center;
    line-height: 60px;
    height: 60px;
    color: black;
    font-size: 1.3em;
  }

  .con-left a:hover {
    font-weight: bold;
  }

  /* 红底白字 */
  .gray_white {
    background: red;
    color: white;
    font-weight: bold;
    border-radius: 0 30px 30px 0;
  }
</style>
