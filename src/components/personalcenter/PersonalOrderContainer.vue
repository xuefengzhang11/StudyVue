<template>
    <div class="container order-container">
      <div class="row">
        <div class="col-md-2 order-text">我的订单</div>
        <a class="col-md-1 order-branch" id="4" @click="changeOrder">全部</a>
        <a class="col-md-1 order-branch" id="2" @click="changeOrder">未支付</a>
        <a class="col-md-1 order-branch" id="1" @click="changeOrder">已完成</a>
        <a class="col-md-1 order-branch" id="3" @click="changeOrder">已失效</a>
        <div class="col-md-4"></div>
        <a class="col-md-2 order-branch" @click="tocart">去我的购物车</a>
      </div>
      <PersonalOrderBottom v-if="isF" :nowTop="aa" :tele="this.usertel"></PersonalOrderBottom>
    </div>
</template>

<script>
import $ from 'jquery'
import PersonalOrderBottom from './PersonalOrderBottom'
export default {
  name: 'PersonalOrderContainer',
  data () {
    return {
      msg: '订单页',
      orderStatus: '',
      aa: '4',
      isF: true
    }
  },
  created: function () {
    this.usertel = window.sessionStorage.getItem('usertel')
  },
  methods: {
    changeOrder: function (e) {
      this.orderStatus = $(e.target).attr('id')
      this.aa = this.orderStatus
      // 强制刷新子组件
      this.isF = false
      this.$nextTick(() => {
        this.isF = true
      })
    },
    tocart: function () {
      this.$router.push({
        path: '/cart'
      })
    }
  },
  components: {
    PersonalOrderBottom
  }
}
</script>

<style scoped>
  a, a:hover {
    text-decoration: none;
    cursor: pointer;
    color: black;
  }
  .order-container{
    width: 1100px;
    margin-top: 20px;
  }
  .order-text{
    font-size: 2em;
  }
  .order-branch{
    height: 40px;
    font-size: 1.2em;
    line-height: 40px;
    border-radius: 50px;
    text-align: center;
  }
  .order-branch:hover{
    background: black;
    color: white;
  }
</style>
