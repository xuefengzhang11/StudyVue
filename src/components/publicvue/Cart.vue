<template>
    <div class="container car bg-danger">
      <div class="row car-header">
        <div class="col-md-2 text-center" style="color: gray;">
          <input type="checkbox">全选
        </div>
        <div class="col-md-6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;课程</div>
        <div class="col-md-2 text-center">价格</div>
        <div class="col-md-2 text-center">操作</div>
      </div>
      <div class="row line" style="margin-top: 0"></div>
      <!--模板-->
      <div class="row car-course" v-for="cour in courCarts" :key="cour.id" :id="cour.id">
        <div class="col-md-2 text-center">
          <input class="ipt" type="checkbox" :checked="cour.coursecat__checked">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div class="col-md-6">
          <span class="cour-img">
            <img :src="Global.IMG + cour.imgurl" alt="">
          </span>
          <span style="padding-left: 30px" v-text="cour.name"></span>
        </div>
        <div class="col-md-2 text-center" style="font-weight: 600" v-text="'￥'+parseFloat(cour.price).toFixed(2)">
        </div>
        <div class="col-md-2 text-center">
          <span class="del">删除</span>
        </div>
        <div class="col-md-12 line"></div>
      </div>
      <div class="row car-footer">
        <div class="col-md-8"></div>
        <div class="col-md-2 text-center" style="color: red; font-size: 1.2em">
          ￥总价
        </div>
        <div class="col-md-2 text-center">
          <span class="jiesuan">结算</span>
        </div>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'

export default {
  name: 'Cart',
  data () {
    return {
      msg: '购物车',
      courCarts: [],
      courIdsStatus: ''
    }
  },
  mounted () {
    this.getCourCarts()
  },
  methods: {
    // 得到购物车的所有数据
    getCourCarts: function () {
      let tel = window.sessionStorage.getItem('usertel')
      let vm = this
      axios.get(this.Global.HOST + 'order/getCourCarts/' + tel + '/')
        .then(function (response) {
          vm.courCarts = response.data.carts
          console.log(vm.courCarts)
          vm.getCourIds()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 得到所有已选中的课程的id集合
    getCourIds: function () {
      setTimeout(() => {
        let $ipts = $('.car-course input.ipt')
        console.log($ipts)
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*购物车*/
  .car {
    width: 70%;
    margin: 30px auto 0;
    background: white;
    border-radius: 20px;
    /*padding: 0 40px;*/
    box-sizing: border-box;
  }
  /*购物车头部*/
  .car-header {
    height: 60px;
    line-height: 60px;
    font-size: 1.2em;
  }
  .car-course {
    height: 110px;
    line-height: 100px;
  }
  .cour-img {
    display: inline-block;
    width: 180px;
    height: 85px;
  }
  .cour-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .line {
    height: 1px;
    width: 100%;
    background: lightgrey;
    margin: 15px auto;
  }
  .car-footer {
    height: 100px;
    line-height: 100px;
  }
  .del{
    cursor: pointer;
  }
  .del:hover{
    color: red;
  }
  .jiesuan {
    display: inline-block;
    width: 100px;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    background: red;
    color: white;
    font-size: 1.5em;
    font-weight: 600;
  }
</style>
