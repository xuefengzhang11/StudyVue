<!--课程页的导航栏模板-->
<template>
    <!--导航栏部分-->
    <div class="search-nav text-center">
      <!--搜索-->
      <div class="search">
        <div class="search-ipt">
          <div class="ipt">
            <input type="text" placeholder="搜索感兴趣的内容" v-model="con" @keydown.enter="searchCourse">
          </div>
          <div class="search-icon" @click.prevent.stop="searchCourse">
            <span></span>
          </div>
        </div>
      </div>
      <!--导航-->
      <!--方向-->
      <div style="position: relative; display: inline-block;" class="text-left">
        <div class="nav-part">
          <span class="title">方向:</span>
          <ul id="ul-direction">
            <li :key="0">
            <span :id="0" :class="{gray_white:current_dire==0}"
                  @click.prevent.stop="changeDire"
            >全部
            </span>
            </li>
            <!--模板-->
            <li v-for="dire in directions" :key="dire.id">
            <span :class="{gray_white:current_dire==dire.id}"
                  :id="dire.id" v-text="dire.name" @click.prevent.stop="changeDire"
            >
            </span>
            </li>
          </ul>
        </div>
        <!--分类-->
        <div class="nav-part nav-cate">
          <span class="title">分类:</span>
          <ul id="ul-category">
            <li :key="0">
            <span :class="{gray_white:current_cate==0}" :id="0" :dire_id="0"
                  @click.prevent.stop="changeCate"
            >全部
            </span>
            </li>
            <!--模板-->
            <li v-for="cate in categorys" :key="cate.id">
            <span :class="{gray_white:current_cate==cate.id}" :dire_id="cate.ctgr_direction_id"
                  :id="cate.id" v-text="cate.name" @click.prevent.stop="changeCate"
            >
            </span>
            </li>
          </ul>
        </div>
        <!--难度-->
        <div class="nav-part">
          <span class="title">难度:</span>
          <ul id="ul-degree">
            <li :key="0">
            <span :id="0" :class="{gray_white:current_degr==0}"
                  @click.prevent.stop="changeDegr"
            >全部
            </span>
            </li>
            <!--模板-->
            <li v-for="degr in degrees" :key="degr.id">
            <span :class="{gray_white:current_degr==degr.id}"
                  :id="degr.id" v-text="degr.name" @click.prevent.stop="changeDegr"
            >
            </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'

export default {
  name: 'CourseSearchNav',
  data () {
    return {
      url: 'http://localhost:8000/',
      msg: '课程页搜索导航',
      con: '',
      current_dire: 0,
      current_cate: 0,
      current_degr: 0,
      directions: [],
      categorys: [],
      degrees: []
    }
  },
  created: function () {
    // 获取由router-link 跳转传过来的参数
    let direid = this.$route.query.direid
    let cateid = this.$route.query.cateid
    this.current_dire = !direid ? this.current_dire : direid
    this.current_cate = !cateid ? this.current_cate : cateid
    this.myemit()
  },
  mounted: function () {
    this.getDirection()
    this.getCategory()
    this.getDegree()
  },
  updated: function () {
    // 处理分类导航 hover 显示全部(jQuery 操作DOM元素)
    let $NavCate = $('.nav-cate')
    let CateH = $NavCate.height()
    if (CateH > 140) {
      $NavCate.addClass('nav_cate')
      $NavCate.next().css('marginTop', '150px')
    } else {
      $NavCate.removeClass('nav_cate')
      $NavCate.next().css('marginTop', '0')
    }
  },
  methods: {
    // 加载课程方向
    getDirection: function () {
      let vm = this
      axios.get(this.url + 'course/direction/')
        .then(function (response) {
          vm.directions = response.data.directions
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 加载课程分类(通过方向id查询得出)
    getCategory: function () {
      let vm = this
      axios.get(this.url + 'course/category/' + this.current_dire + '/')
        .then(function (response) {
          vm.categorys = response.data.categorys
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 加载课程难度
    getDegree: function () {
      let vm = this
      axios.get(this.url + 'course/degree/')
        .then(function (response) {
          vm.degrees = response.data.degrees
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 方向导航点击
    changeDire: function (e) {
      let direid = e.target.id
      this.current_dire = direid
      this.current_cate = 0
      this.getCategory()
      this.myemit()
    },
    // 分类导航点击事件
    changeCate: function (e) {
      let cateid = e.target.id
      if (cateid !== '0') {
        let direid = e.target.attributes.dire_id.value
        this.current_dire = direid
      }
      this.current_cate = cateid
      this.getCategory()
      this.myemit()
    },
    // 难度导航点击事件
    changeDegr: function (e) {
      let degrid = e.target.id
      this.current_degr = degrid
      this.myemit()
    },
    searchCourse: function () {
      // this.current_dire = 0
      // this.current_cate = 0
      // this.current_degr = 0
      // this.getDirection()
      // this.getCategory()
      // this.getDegree()
      this.myemit()
    },
    // 定义一个发射方法
    myemit: function () {
      this.$emit('searchnavclick', this.current_dire, this.current_cate, this.current_degr, this.con)
    }
  }
}

</script>

<!-- 课程页导航栏CSS -->
<style scoped>
  ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  /*搜索和导航*/
  .search-nav {
    width: 100%;
    /*border-bottom: 1px solid gray;*/
    box-shadow: 0 2px 15px gray;
  }
  /*搜索部分-开始*/
  .search-nav .search {
    width: 1100px;
    height: 85px;
    line-height: 85px;
    margin: auto;
    border-bottom: 1px solid lightgray;
  }

  /*搜索div*/
  .search-nav .search .search-ipt {
    width: 500px;
    height: 40px;
    margin: auto;
  }

  .search-nav .search .search-ipt > div {
    float: left;
  }

  /*搜索输入框*/
  .search-nav .search .search-ipt .ipt input {
    outline: none;
    width: 445px;
    height: 40px;
    background: white;
    padding: 0 15px;
    box-sizing: border-box;
    border: none;
    border-radius: 10px 0 0 10px;
    font-size: 1.1em;
    color: gray;

  }

  /*搜索图标*/
  .search-nav .search .search-ipt .search-icon {
    width: 40px;
    height: 40px;
    margin-top: 22px;
    border-radius: 0 10px 10px 0;
    box-sizing: border-box;
    background: white;
  }

  .search-nav .search .search-ipt .search-icon span {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url("../assets/icons/search.svg") no-repeat 4px 3px;
  }

  .search-nav .search .search-ipt .search-icon span:hover {
    cursor: pointer;
  }

  /*搜索部分-结束*/
  /*导航部分*/
  .search-nav .nav-part {
    width: 1100px;
    border-bottom: 1px solid whitesmoke;
    box-sizing: border-box;
    margin: auto;
  }

  /*方向、分类、难度*/
  .search-nav .nav-part .title {
    display: inline-block;
    width: 60px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-weight: bold;
    position: absolute;
  }

  .search-nav .nav-part ul {
    width: 1040px;
    margin-left: 60px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
  }

  .search-nav .nav-part > ul li {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
  }

  .search-nav .nav-part li span {
    padding: 5px;
    border-radius: 10px;
    color: black;
  }

  .search-nav .nav-part li span:hover {
    color: white;
    background: #bebebe;
    cursor: pointer;
  }

  #ul-category, #ul-direction {
    border-bottom: 1px solid lightgray;
  }
  .nav_cate{
    position: absolute;
    left: 0;
    max-height: 150px;
    overflow: hidden;
  }
  .nav_cate:hover {
    border-radius: 20px;
    background: ghostwhite;
    box-shadow: 0 0 5px gray;
    max-height: 300px;
    z-index: 3;
  }
  .gray_white {
    background: gray;
    color: white !important;
  }
  .margin_top{
    margin-top: 150px;
  }
</style>
