<template>
  <div>
    <!--职业路径logo-->
    <div class="container-fluid bg-gray">
      <div class="career-logo text-center">
        <span class="icon-career1"></span>
        <span class="icon-career2"></span>
      </div>
    </div>
    <!--职业路径-->
    <div class="container">
      <div class="row careers">
        <!--一个职业计划模板-->
        <div class="col-md-3 career-container" v-for="career in allcareers" :key="career.id" :id="career.id" @click.stop.prevent="toCareerDetail">
          <div class="career">
            <a href="#">
              <!--<router-link :to="{ name: 'careerdetail',params: { id: d.id }}"></router-link>-->
              <!--&lt;!&ndash;图片&ndash;&gt;-->
              <div class="career-img">
                <img src="../assets/images/careers/1.jpg" alt="">
              </div>
              <!--&lt;!&ndash;简介&ndash;&gt;-->
              <div class="career-info">
                <p class="career-title">{{career.name}}</p>
                <p><span v-text="career.coursesNum"></span>课 · <span>{{career | chapnum}}</span>章 · <span >{{career | sectnum}}</span>节
                <span class="u_icon" v-text="career.learn"></span></p>
                <p class="career-detail">{{career.introduce | more(25,30)}}</p>
                <div class="row a">
                  <div class="col-md-6">￥<span class="career-price" v-text="career.price"></span></div>
                  <div class="col-md-6 text-right"><span>详情</span></div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!--分页-->
    <div class="row">
      <div class="col-md-12">
        <paging :count="pagesize" :ac="alllenght" @indexclick="getIndex" v-show="pagesize>1"></paging>
      </div>
    </div>
  </div>
</template>

<script>
import CareerDetail from './CareerDetail'
import $ from 'jquery'
import axios from 'axios'
import Paging from './Paging'
export default {
  name: 'CareerHome',
  data () {
    return {
      msg: '职位导航',
      allcareers: [],
      more: '',
      course: '',
      // 页码总数
      pagesize: 0,
      // 职业总数
      alllenght: 0,
      // 当前页
      pageIndex: 1
    }
  },
  mounted: function () {
    this.getData()
    this.getPageSize()
  },
  methods: {
    // 数据
    getData: function () {
      var vm = this
      axios.get('http://localhost:8000/career/getcareer/' + vm.pageIndex + '/')
        .then(function (response) {
          vm.allcareers = response.data.careers
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 获取分页数和职业总数
    getPageSize: function () {
      let vm = this
      axios.get('http://localhost:8000/career/getcount/')
        .then(function (response) {
          vm.alllenght = response.data.account
          vm.pagesize = Math.ceil(response.data.account / 8)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    toCareerDetail: function (e) {
      let $careid = $(e.target).parents('.career-container').attr('id')
      if ($careid) {
        this.$router.push({
          path: 'careerdetail/',
          name: 'careerdetail',
          params: {
            careerid: $careid
          }
        })
      }
    },
    getIndex: function (i) {
      this.pageIndex = i
      this.getData()
    }
  },
  filters: {
    'more': function (data, a, len) {
      if (data.length <= a) {
        return data
      }
      data = data.toString()
      return data.substr(0, len) + '...'
    },
    'chapnum': function (career) {
      let cnum = 0
      for (let cour of career.courses) {
        cnum += cour.chaptersNum
      }
      return cnum
    },
    'sectnum': function (career) {
      let snum = 0
      for (let cour of career.courses) {
        for (let chap of cour.chapters) {
          snum += chap.sectionsNum
        }
      }
      return snum
    }
  },
  components: { CareerDetail, Paging }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a,a:hover{
    text-decoration: none;
  }
  /*职业路径logo*/
  .bg-gray {
    background: gray;
  }
  body{
    background: ghostwhite;
  }
  .career-logo {
    height: 96px;
  }

  .career-logo span {
    display: inline-block;
    height: 96px;
  }

  .icon-career1 {
    width: 188px;
    background: url("../assets/icons/icon-career.png");
  }

  .icon-career2 {
    width: 480px;
    margin-left: 30px;
    background: url("../assets/icons/icon-career2.png") 0 -48px;
  }

  /*职业路径部分*/
  .careers {
    /*width: 1100px;*/
    margin: 30px auto;
  }
  .career-container{
    padding: 30px 20px;
    height: 360px;
    /*margin-bottom: 20px;*/
  }
  .career-container .career{
    height: 300px;
  }
  .career .career-img {
    width: 100%;
    height: 150px;
  }
  .career .career-img img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    /*阴影*/
    box-shadow: 0 2px 5px black;
  }
  .career-container .career:hover div.career-img img {
    position: relative;
    top: -5px;
    box-shadow: 0 2px 15px black;
  }
  .career-container .career:hover p.career-title{
    color: blue;
  }
  .career .career-info{
    padding: 10px 10px 0;
  }
  .career span, .career p.career-detail, .career a{
    color: gray;
  }
  span{
    font-size: 12px;
    padding-top: 10px;
  }
  p.career-detail{
    height: 48px;
  }
  .career-container .career:hover span{
    color: black;
  }
  .career-container .career:hover a{
    color: black;
  }
  .career-container .career:hover p.career-detail{
    color: black;
  }
  .career .career-info .career-title{
    font-size: 1.2em;
    color: black;
    font-weight: bold;
  }
  .u_icon {
    display: inline-block;
    height: 20px;
    padding-left: 17px;
    margin-bottom: -5px;
    /*margin-left: 40px;*/
    float:right;
    padding-top: 2px;
    background: pink;
    background: url('../assets/icons/user-logo.svg') no-repeat;
  }
  .a{
    height: 19px;
    margin-bottom: 20px;
  }
</style>
