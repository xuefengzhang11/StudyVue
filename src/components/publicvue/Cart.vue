<template>
  <div>
    <!--购物车有数据时-->
    <div v-if="courCarts.length>0" class="container car">
      <div class="row car-header">
        <div class="col-md-2 text-center" style="color: gray;">
          <input type="checkbox" @click="choiceAll" :checked="ischoiceAll"><span @click="choiceAll">全选</span>
        </div>
        <div class="col-md-6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;课程</div>
        <div class="col-md-2 text-center">价格</div>
        <div class="col-md-2 text-center">操作</div>
      </div>
      <div class="row line" style="margin-top: 0"></div>
      <!--模板-->
      <div class="row car-course" v-for="cour in courCarts" :key="cour.id" :id="cour.id" :cartid="cour.cartid">
        <div class="col-md-2 text-center">
          <input ref="ipt" class="ipt" type="checkbox" @click="choiceOne"
                 :flag="cour.coursecat__checked" :checked="cour.coursecat__checked">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div class="col-md-6">
          <span class="cour-img">
            <img :src="Global.IMG + cour.imgurl" alt="">
          </span>
          <span style="padding-left: 30px" v-text="cour.name"></span>
        </div>
        <div class="col-md-2 text-center price" :data-p="cour.price" style="font-weight: 600" v-text="'￥'+parseFloat(cour.price).toFixed(2)">
        </div>
        <div class="col-md-2 text-center">
          <span class="del" @click="delCourse">删除</span>
        </div>
        <div class="col-md-12 line"></div>
      </div>
      <div class="row car-footer">
        <div class="col-md-2">
          <span class="gotoorder" @click="toorder">我的订单中心</span>
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-2 text-center" v-text="'￥'+ totalPrice" style="color: red; font-size: 1.2em"></div>
        <div class="col-md-2 text-center">
          <span class="jiesuan" @click="isShow=true">结算</span>
        </div>
      </div>
    </div>
    <!--购物车没有数据-->
    <div v-else class="container car" style="height: 480px">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4 text-center" style="padding-top: 160px">
          <span style="font-size: 2em; color: #e8e8e8;">购物车内空空如也</span>
        </div>
        <div class="col-md-4"></div>
      </div>
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4 text-center" style="">
          <img src="../../assets/icons/cart-kong.svg" alt="">
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
    <MakeSureBuy v-if="isShow" @quxiaoclick="noBuy" @sureclick="goBuy"></MakeSureBuy>
    <MakeOrder :orderMsg="orderMsg" v-if="isShowMakeOrder" @close="isShowMakeOrder=false"></MakeOrder>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import MakeSureBuy from './MakeSureBuy'
import MakeOrder from './MakeOrder'

export default {
  name: 'Cart',
  inject: ['reload'],
  data () {
    return {
      msg: '购物车',
      courCarts: [],
      courIdsStatus: [],
      totalPrice: '',
      ischoiceAll: false,
      isShow: false,
      isShowMakeOrder: false,
      orderMsg: ''
    }
  },
  mounted () {
    this.getCourCarts()
  },
  components: {MakeSureBuy, MakeOrder},
  methods: {
    myFlush: function () {
      this.reload()
    },
    // 得到购物车的所有数据
    getCourCarts: function () {
      let tel = window.sessionStorage.getItem('usertel')
      let vm = this
      axios.get(this.Global.HOST + 'order/getCourCarts/' + tel + '/')
        .then(function (response) {
          vm.courCarts = response.data.carts
          vm.$nextTick(() => {
            vm.getCourIds()
            vm.getTotalPrice()
            vm.isCheckAll()
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    // 得到所有已选中的课程的id集合
    getCourIds: function () {
      this.courIdsStatus = []
      setTimeout(() => {
        let ipts = this.$refs.ipt
        if (ipts) {
          for (let ipt of ipts) {
            // 获取id
            let cid = $(ipt).parents('.car-course').attr('id')
            // 获取flag
            let flag = ipt.getAttribute('flag')
            if (!flag) {
              flag = false
            } else {
              flag = true
            }
            this.courIdsStatus.push({'id': cid, 'checked': flag})
          }
        }
      }, 1)
    },

    // 计算所有的已被选中的课程的总价
    getTotalPrice: function () {
      setTimeout(() => {
        let totalPrice = 0.00
        let ipts = this.$refs.ipt
        if (ipts) {
          for (let ipt of ipts) {
            // 获取flag
            let flag = ipt.getAttribute('flag')
            if (flag) {
              totalPrice += parseFloat($(ipt).parents('.car-course').find('.price').attr('data-p'))
            }
          }
        }
        this.totalPrice = totalPrice.toFixed(2)
      }, 1)
    },

    // 点击删除，删除购物车数据
    delCourse: function (e) {
      // 获取购物数据id
      let cartid = $(e.target).parents('.car-course').attr('cartid')
      let vm = this
      axios.get(this.Global.HOST + 'order/delCartById/' + cartid + '/')
        .then(function (response) {
          if (response.data.res === '删除成功') {
            vm.getCourCarts()
            vm.myFlush()
          } else {
            alert(response.data.res)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    // 检测是否为全选
    isCheckAll: function () {
      setTimeout(() => {
        let ipts = this.$refs.ipt
        let count = 0
        if (ipts) {
          for (let ipt of ipts) {
            // 获取flag
            let flag = ipt.getAttribute('flag')
            if (flag) {
              count += 1
            }
          }
          if (count === ipts.length) {
            this.ischoiceAll = true
          } else {
            this.ischoiceAll = false
          }
        }
      }, 1)
    },

    // 全选点击事件
    choiceAll: function () {
      let bflag
      if (this.ischoiceAll) {
        // 若已经处于全选状态-> 取消全选
        bflag = 'False'
      } else {
        bflag = 'True'
      }
      let vm = this
      let usertel = window.sessionStorage.getItem('usertel')
      axios.get(this.Global.HOST + 'order/choiceAllOrNot/' + bflag + '/' + usertel + '/')
        .then(function (response) {
          if (response.data.res === '成功') {
            vm.getCourCarts()
          } else {
            alert(response.data.res)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    // 单条购物数据选择取消事件
    choiceOne: function (e) {
      // 获取购物数据id
      let cartid = $(e.target).parents('.car-course').attr('cartid')
      let usertel = window.sessionStorage.getItem('usertel')
      // 修改状态，重新加载
      let vm = this
      axios.get(this.Global.HOST + 'order/ChangeCartById/' + cartid + '/' + usertel + '/')
        .then(function (response) {
          if (response.data.res === '修改成功') {
            vm.getCourCarts()
          } else {
            alert(response.data.res)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    // 确认购买
    goBuy: function () {
      // 当前用户
      let usertel = window.sessionStorage.getItem('usertel')
      console.log(usertel)
      console.log(this.courIdsStatus)
      let ids = this.courIdsStatus
      let vm = this
      axios.post(this.Global.HOST + 'order/goBuy/' + usertel + '/', ids)
        .then(function (response) {
          if (response.data.res === '成功') {
            vm.getCourCarts()
            vm.isShow = false
            vm.orderMsg = '购买成功'
            vm.isShowMakeOrder = true
          } else {
            alert(response.data.res)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    // 取消购买
    noBuy: function () {
      // 当前用户
      let usertel = window.sessionStorage.getItem('usertel')
      console.log(usertel)
      console.log(this.courIdsStatus)
      let ids = this.courIdsStatus
      let vm = this
      axios.post(this.Global.HOST + 'order/noBuy/' + usertel + '/', ids)
        .then(function (response) {
          if (response.data.res === '成功') {
            vm.getCourCarts()
            vm.isShow = false
            vm.orderMsg = '取消成功'
            vm.isShowMakeOrder = true
          } else {
            alert(response.data.res)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    toorder: function () {
      this.$router.push({
        path: '/order'
      })
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
    box-sizing: border-box;
  }

  /*购物车头部*/
  .car-header{
    height: 60px;
    line-height: 60px;
    font-size: 1.2em;
  }
  .car-header span:hover{
    cursor: pointer;
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
  .jiesuan:hover{
    cursor: pointer;
    box-shadow: 2px 2px 10px black;
  }
  .gotoorder {
    width: 200px;
    height: 50px;
    line-height: 50px;
    font-size: 1.3em;
    font-weight: 600;
    text-align: center;
    margin-left: 20px;
  }
  .gotoorder:hover{
    cursor: pointer;
  }
</style>
