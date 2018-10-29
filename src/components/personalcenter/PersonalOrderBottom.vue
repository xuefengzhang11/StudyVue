<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <!--模板开始-->
        <div class="clo-md-12 order"  v-for="ord in listord" :key="ord.id" :id="ord.id">
          <div class="row order-detail">
            <div class="col-md-12">
              <div class="row order-detail-top">
                <div class="order-tel">
                  <span class="col-md-1">
                      <img src="../../assets/icons/order.svg" alt="">
                  </span>
                  <span class="col-md-5 tel">
                    <span>订单编号：{{ord.number}}</span>
                  </span>
                  <span class="col-md-5 time">
                    <span v-text="ord.ordertime.slice(0,10)"></span>
                    <span v-text="ord.ordertime.slice(11,19)"></span>
                  </span>
                  <span class="col-md-2"></span>
                </div>
              </div>
              <div class="row white"></div>
              <div class="row order-detail-main">
                <div class="col-md-6 box">
                  <div class="main">
                    <span class="col-md-4">
                        <img :src="Global.IMG + ord.imgurl" alt="" class="order-img">
                    </span>
                    <span class="col-md-8">
                      <div class="row order-cour-name">
                          {{ord.course_name}}
                      </div>
                      <div class="row order-cour-info">
                          视频学习不限期，提供130天种类丰富的教学服务
                      </div>
                    </span>
                  </div>
                </div>
                <!--课程总价格-->
                <div class="col-md-3 order-allprice">
                  <span>￥</span>
                  <span>{{ord.course_price}}</span>
                </div>
                <div class="col-md-3" v-if="ord.status_id === 2">
                  <div class="row pagmoney">
                    立即支付
                  </div>
                  <div class="row cancel-order" @click="deleteOrder">
                    取消订单
                  </div>
                </div>
                <div class="col-md-3" v-if="ord.status_id === 1 || ord.status_id === 3" @click="deleteOrder">
                  <div class="row pagmoney">
                    删除订单
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
export default {
  props: [
    'nowTop',
    'tele'
  ],
  name: 'PersonalOrderBottom',
  inject: ['reload'],
  data () {
    return {
      msg: '购物车下部',
      nowStatus: this.nowTop,
      telephone: this.tele,
      listord: [],
      orderid: ''
    }
  },
  mounted: function () {
    this.getDate()
  },
  methods: {
    myFlush: function () {
      this.reload()
    },
    getDate: function () {
      let vm = this
      axios.get(vm.Global.HOST + 'order/getStatusOrder/' + vm.telephone + '/' + vm.nowStatus + '/')
        .then(function (response) {
          vm.listord = response.data.orders
          console.log(vm.listord)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteOrder: function (e) {
      let vm = this
      vm.orderid = $(e.target).parents('.order').attr('id')
      axios.get(vm.Global.HOST + 'order/deleteOrder/' + vm.orderid + '/')
        .then(function (response) {
          let res = response.res
          if (res === '删除成功') {
            vm.myFlush()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .order {
    background: white;
    box-shadow: 2px 2px 8px lightgrey;
    border-radius: 10px;
    box-sizing: border-box;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .order:hover{
    box-shadow: 5px 5px 10px lightgrey;
  }

  .order-detail {
    width: 780px;
    margin: auto;
    height: 210px;
  }

  .order-detail-top {
    height: 60px;
    border-bottom: solid rgba(128, 128, 128, 0.46) 1px;
  }

  .order-tel {
    height: 24px;
    margin-top: 20px;
  }

  .tel {
    padding-top: 3px;
    margin-left: -30px;
  }

  .time {
    color: grey;
    padding-top: 3px;
    margin-left: -30px;
  }

  .white {
    height: 20px;
  }

  .order-detail-main {
    height: 116px;
    /*background: #00f2ff;*/
  }

  .box {
    height: 116px;

    border-right: 1px solid rgba(128, 128, 128, 0.47);
  }

  .main {
    height: 90px;
    margin: auto;
  }

  .order-img {
    height: 90px;
    width: 120px;
    object-fit: cover;
    margin-left: -14px;
  }

  .order-cour-name {
    padding-left: 10px;
  }

  .order-cour-name:hover {
    cursor: pointer;
  }

  .order-cour-info {
    color: grey;
    padding-top: 2px;
    padding-left: 10px;
  }
  .order-allprice {
    height: 116px;
    color: red;
    padding-top: 40px;
    padding-left: 60px;
    border-right: 1px solid rgba(128, 128, 128, 0.49);
  }

  .pagmoney {
    width: 120px;
    height: 40px;
    background: rgba(253, 0, 0, 0.63);
    border-radius: 30px;
    color: white;
    margin: auto;
    margin-top: 15px;
    padding-left: 25px;
    padding-top: 10px;
  }
  .pagmoney:hover {
    background: rgba(253, 0, 0, 1);
    cursor: pointer;
  }
  .cancel-order {
    color: grey;
    padding-left: 65px;
    padding-top: 10px;
  }
  .cancel-order {
    cursor: pointer;
  }
</style>
