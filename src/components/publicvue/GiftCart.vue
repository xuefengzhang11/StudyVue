<template>

    <div class="mainbody cart" style="margin-top: 80px;">
      <div class="container">
        <!-- 购物车详情头 -->
        <table class="cart-header">
          <tbody>
          <tr>
            <td class="cart-col-select col-md-3 col-xs-3 col-sm-3">
              <div class="cart-select-all JSelectAll">
                <div class="mz-checkbox" v-if="isSelectAll==false"  @click="selectAll(),select=!select"></div>
                <div class="mz-checkbox checked" v-else="isSelectAll==true"  @click="selectNone(),select=!select"></div>
                <span class="cart-select-title">全选</span>
              </div>
            </td>
            <td class="cart-col-name col-md-3 hidden-xs hidden-sm">课程</td>
            <td class="cart-col-price col-md-2 hidden-xs hidden-sm">单价(元)</td>
            <td class="cart-col-total col-md-1 hidden-xs hidden-sm">小计(元)</td>
            <td class="cart-col-ctrl col-md-1 hidden-xs hidden-sm">操作</td>
          </tr>
          </tbody>
        </table>

        <!-- 购物清单信息列表 -->
        <div class="cart-merchant-list" v-for="(cart,index) in goodsList" :key="index" :id="cart.gifts_id">
          <div class="cart-merchant">
            <table class="cart-merchant-body">
              <tbody>
              <tr class="cart-product">

                <!--商品主图片-->
                <td class="cart-col-select col-md-3 col-xs-4 col-sm-4">
                  <div class="mz-checkbox" v-if="cart.select==false"  @click="cart.select=!cart.select"></div>
                  <div class="mz-checkbox checked" v-else="cart.select==true"  @click="cart.select=!cart.select"></div>
                  <a href="#" class="cart-product-link">
                    <img :src="cart.gifts__giftImg" class="cart-product-img" alt="" width="50">
                  </a>
                </td>

                <!--商品名字-->
                <td class="cart-col-name col-md-3 col-xs-8 col-sm-8">
                  <a href="#" class="cart-product-link">
                    <p v-text="cart.gifts__gift_name"></p>
                  </a>
                  <span class="cart-product-desc" v-text="cart.gifts__descr"></span>
                </td>

                <!--商品价格-->
                <td class="cart-col-price col-md-2 hidden-xs hidden-sm">
                  <p>
                    <span class="cart-product-price" v-text="cart.gifts__price"></span>
                  </p>
                </td>

                <!--小计-->
                <td class="cart-col-total col-md-1 hidden-xs hidden-sm">
                  <span class="cart-product-price total">{{cart.gifts__price*cart.cart_num}}</span>
                </td>

                <!--删除操作-->
                <td class="cart-col-ctrl col-md-1 hidden-xs hidden-sm">
                  <a href="#" title="删除" @click="deleteOne(index)">
                    <div class="cart-product-remove">
                      <span class="glyphicon glyphicon-remove"></span>
                    </div>
                  </a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 结算详情 -->
        <div class="cart-footer" id="cartFooter">
          <div class="container">
            <div class="cart-footer-left col-md-6 col-xs-4 col-sm-4">
              <div class="cart-select-all">
                <div class="mz-checkbox"></div>
                <span class="cart-select-title">全选</span>
              </div>

              <span class="cart-footer-count">
            共
            <span class="cart-footer-num" v-text="getTotal.totalNum"></span>
            件商品
           </span>
              <div class="mz-btn btn-danger" @click="deleteGoods()">清空购物车</div>
            </div>
            <div class="cart-footer-right col-md-5 col-md-offset-1 col-sm-offset-2 col-xs-8 col-sm-6">
          <span class="cart-footer-sum">
            <span class="cart-footer-text">已优惠</span>
            <span class="cart-footer-num red" id="totalDiscount">0.00</span>
            <span class="cart-footer-text">元， 合计(不含运费)：</span>
            <span class="cart-footer-total" id="totalPrice"  v-text="getTotal.totalPrice"></span>
          </span>
              <div class="mz-btn btn-success" id="cartSubmit">去结算</div>
            </div>
          </div>
        </div>
      </div>

    </div>




</template>

<script>
  import axios from 'axios'
export default {
  name: 'GiftCart',
  data () {
    return {

      // 判断是不是选中
      select:false,

      goodsList:[],

      check_goods: [] //已选择的商品
    }

  },

  mounted:function () {

    // 获取用户购物车信息
    this.getUserCarts();
  },

  methods:{

    // 获取用户购物车信息
    getUserCarts:function(){
      // 登录成功时存储用户id，这里默认 1
      // 根据用户id获取用户购物车信息
      let vm = this;
      axios({
        method:'POST',
        url:this.GLOBAL.HOST+'gift/getallcarts/',
        data:{"userinfo_id":1}
      })
      .then(function (response) {
        vm.goodsList = response.data.carts;
        // 设置所有商品为未选中状态
        vm.goodsList.map(function (cart) {
          vm.$set(cart, 'select', false);
        })
      })
      .catch(function (error) {
        console.log(error)
      });
    },

    // [全选按钮]全部选中
    selectAll:function(){
      for(let i=0;i<this.goodsList.length;i++){
        this.goodsList[i].select=true;
      }
    },

    // 商品列表不全部选中 改变[全选按钮]状态
    selectNone:function(){
      for(let i=0;i<this.goodsList.length;i++){
        this.goodsList[i].select=false;
      }
    },


    deleteOne:function(index){
      //选中之后删除
      //this.goodsList=this.goodsList.filter(function (item) {return !item.select});
      //点击删除按钮后直接删除
      this.goodsList.splice(index,1);
    },
    deleteGoods:function(){
      this.goodsList=this.goodsList.filter(function (item) {return !item.select});

    },

    // 商品类减
    reduce_num(cart){
      if(cart.cart_num<=1){
        cart.cart_num = 1;
      }else{
        cart.cart_num--;
      }
    },

    // 商品类加
    add_num(cart){
      cart.cart_num++;
    }
  },

  computed:{

    // 判断商品列表是否全选
    isSelectAll:function(){
      //如果每一条数据的select都为true，返回true，否则返回false;
      return this.goodsList.every(function (val) { return val.select});
    },

    // 计算商品价格总和
    getTotal:function(){
      //获取goodsList中select为true的数据。
      let _proList=this.goodsList.filter(function (val) { return val.select}),totalPrice=0;
      for(let i=0,len=_proList.length;i<len;i++){
        //总价累加
        totalPrice+=_proList[i].cart_num*_proList[i].gifts__price;
      }
      //选择产品的件数就是_proList.length，总价就是totalPrice
      return {totalNum:_proList.length,totalPrice:totalPrice}
    }
  },




}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  body{
    padding: 0;
  }

  a{
    text-decoration: none;
  }

  .cart{
    min-height: 600px;
    padding-bottom:100px;

  }

  /*购物车主体部分*/
  .mainbody{
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  /*购物车详情头*/
  .cart .cart-header {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    background-color: #fff;
    color: #333;
    border-bottom: 1px solid #efefef;
  }
  .cart .cart-select-all .cart-select-title {
    display: inline-block;
    vertical-align: middle
  }
  .cart .mz-checkbox {
    margin-right: 10px
  }
  .cart .cart-col-name {
    text-align: left;
  }

  .cart .cart-col-price {
    text-align: center
  }

  .cart .cart-col-number {
    text-align: center
  }

  .cart .cart-col-total {
    text-align: center
  }

  .cart .cart-col-ctrl {
    text-align: right;
    padding-right: 40px
  }

  /*顶部全选按钮*/
  .mz-checkbox {
    display: inline-block;
    width: 17px;
    height: 17px;
    border: 1px solid #bdbdbd;
    border-radius: 2px;
    background-color: #fff;
    text-align: center;
    font-size: 10px;
    line-height: 17px
  }


  /*此处注意: 点击改变状态*/
  .mz-checkbox.checked {
    border-color: #00c3f5;
    background-color: #00c3f5
  }
  .mz-checkbox.checked:before {
    content: '\e013';
    color: #fff;
    font-family: 'Glyphicons Halflings';
  }

  .cart .cart-col-select {
    text-align: left;
    padding-left: 30px;
  }
  .cart .cart-select-all {
    display: inline-block;
    color: #333;
    line-height: 0
  }
  .cart .cart-select-all,.mz-checkbox {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    cursor: pointer
  }

  /*购物清单信息列表*/
  .cart-merchant,.cart-merchant-list {
    width: 100%;
    margin-bottom: 10px;
  }
  .cart-merchant {
    background-color: #fff;
  }
  .cart-merchant.disabled {
    background-color: #fafafc;
  }
  .cart-merchant.disabled .cart-merchant-body {
    width: 100%;
    opacity: .5;
  }
  .cart-merchant.disabled .cart-product-price.total,.cart-merchant.disabled .cart-product-remove {
    color: #666;
  }

  .cart-merchant.disabled .cart-product-remove:hover {
    background-color: #ddd
  }


  .cart-merchant .cart-merchant-header .cart-select-all {
    color: #666;
    font-weight: 400;
  }

  .cart-merchant .cart-merchant-body {
    width: 100%;
    border-bottom: 1px solid #efefef;
  }
  .cart-merchant-body tbody{
    width: 100%;
  }
  .cart-product {
    width: 100%;
    height: 150px;
    border-top: 1px solid #efefef;
  }
  .cart-product .cart-product-link {
    display: inline-block;
    vertical-align: middle;
    color: #666;
  }
  .cart-product .cart-col-select .cart-product-link {
    margin-left: 35px
  }

  .cart-product .cart-col-name .cart-product-link {
    display: inline;
    line-height: 22px;
    width: 100%
  }
  .cart-product .cart-product-img {
    width: 100px;
    height: 100px
  }
  .cart-product .cart-col-name p {
    width: 256px;
    height: 1.5em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .cart-product .cart-col-name .cart-product-desc {
    color: #999;
    font-size: 12px;
  }
  .cart-product .cart-product-price {
    font-size: 16px;
    color: #666;
    font-weight: bolder
  }
  .cart-product .cart-product-price:before {
    content: '￥'
  }
  .cart-product .cart-product-number-adder {
    position: relative
  }

  .cart-product .cart-product-number-max {
    display: none;
    position: absolute;
    top: 46px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 14px;
    margin-top: 4px;
    color: #999
  }

  .cart-product .cart-product-number-max.show {
    display: block
  }
  .cart-product .cart-product-discount,.cart-product .cart-product-remove,.cart-product .mz-adder {
    display: inline-block;
    vertical-align: middle
  }

  .mz-adder {
    width: 140px;
    height: 40px;
    border: 1px solid #efefef;
    border-radius: 4px;
    background-color: #fff
  }
  .mz-adder .mz-adder-add,.mz-adder .mz-adder-subtract {
    position: relative;
    float: left;
    width: 40px;
    height: 100%;
    cursor: pointer;
    background-color: transparent;
    outline: 0;
    padding: 0;
    margin: 0;
    border: none
  }

  .mz-adder .mz-adder-add:after,.mz-adder .mz-adder-add:before,.mz-adder .mz-adder-subtract:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transition: background-color .5s
  }

  .mz-adder .mz-adder-add.disabled,.mz-adder .mz-adder-subtract.disabled {
    cursor: no-drop
  }

  .mz-adder .mz-adder-add:before,.mz-adder .mz-adder-subtract:before {
    margin-top: -1px;
    margin-left: -6px;
    width: 12px;
    height: 2px;
    background-color: #333
  }

  .mz-adder .mz-adder-add:hover:before,.mz-adder .mz-adder-subtract:hover:before {
    background-color: #00c3f5
  }

  .mz-adder .mz-adder-add.disabled:before,.mz-adder .mz-adder-subtract.disabled:before {
    background-color: #999!important
  }

  .mz-adder .mz-adder-num {
    float: left;
    width: 58px;
    height: 100%;
    line-height: 40px;
    text-align: center;
    border-left: 1px solid #efefef;
    border-right: 1px solid #efefef
  }
  .mz-adder .mz-adder-num .mz-adder-input {
    width: 100%;
    height: 100%;
    border: none;
    outline: 0;
    padding: 0;
    margin: -4px 0 0;
    background-color: transparent;
    font-size: 14px;
    color: #333
  }

  .mz-adder .mz-adder-add:hover:after {
    background-color: #00c3f5
  }

  .mz-adder .mz-adder-add.disabled:after {
    background-color: #999!important
  }

  .mz-adder .mz-adder-add:after {
    margin-top: -6px;
    margin-left: -1px;
    width: 2px;
    height: 12px;
    background-color: #333
  }

  .mz-adder .mz-adder-num .mz-adder-input,.mz-btn {
    display: inline-block;
    text-align: center;
    vertical-align: middle
  }
  .cart-product .cart-product-remove {
    width: 24px;
    height: 24px;
    border-radius: 100%;
    background-color: transparent;
    transition: all .7s;
    text-align: center;
    line-height: 24px;
    font-size: 14px;
    cursor: pointer;
    color: #bdbdbd;
  }
  .cart-product .cart-product-remove:hover {
    background-color: #efefef;
  }

  /*结算详情*/
  .cart-footer {
    position: relative;
    width: 100%;
    height: 70px;
    font-size: 14px;
    color: #666;
    line-height: 67px;
    transition: background-color 1s;
  }

  .cart-footer .container {
    width: 1142px;
    background-color: #fff;
    height: 100%;
    padding-left: 0;
  }

  .cart-footer.fixed {
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    margin-bottom: 0;
    box-shadow: 0 -2px 5px rgba(153,153,153,.2);
    background-color: rgba(255,255,255,.95)
  }

  .cart-footer .cart-footer-left {
    padding-left: 30px;
    height: 100%
  }

  .cart-footer .cart-footer-right {
    height: 100%;
    padding-left: 30px
  }

  .cart-footer .cart-remove-selected {
    color: #999;
    margin: 0 30px 0 20px;
    cursor: pointer;
    vertical-align: middle
  }

  .cart-footer .cart-footer-count,.cart-footer .cart-footer-sum {
    vertical-align: middle
  }

  .cart-footer .cart-footer-num {
    margin: 0 5px;
    color: #333;
    font-weight: bolder
  }

  .cart-merchant,.cart-merchant-list {
    margin-bottom: 10px
  }

  .cart-footer .cart-footer-num.blue {
    color: #00c3f5
  }

  .cart-footer .cart-footer-num.red {
    color: #e02b41
  }

  .cart-footer .cart-footer-total {
    font-size: 20px;
    font-weight: bolder;
    color: #e02b41;
    margin-right: 30px;
    vertical-align: baseline
  }

  .cart-footer .cart-footer-total:before {
    content: '￥';
  }
  .mz-btn {
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;
    outline: 0;
    cursor: pointer;
    font-size: 14px;
    min-width: 58px;
    min-height: 34px;
    line-height: 34px;
    transition: .5s all;
    padding: 0 20px
  }
  .mz-btn.success {
    color: #fff;
    border-color: #00c3f5;
    background-color: #00c3f5
  }

  .mz-btn.success:hover {
    border-color: #40d2f8;
    background-color: #40d2f8
  }

  .mz-btn.success:active {
    border-color: #08Aee2;
    background-color: #08Aee2;
  }






</style>
