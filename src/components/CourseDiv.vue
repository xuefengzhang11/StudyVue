<!--课程页课程和分页部分-->
<template>
  <!--<router-link to="/">Home</router-link>-->
  <div class="container content">
    <div class="row">
      <div class="col-md-3" v-for="c in all_courses" :id="c.id"
           :key="c.id" @click.prevent.stop="toCourseDetail"
      >
          <div class="content-video">
            <div class="course_img">
              <img src="../assets/images/courses/1.jpg" alt="">
            </div>
            <div class="course_info">
              <span class="info_name" v-text="c.name"></span>
              <div><span v-text="c.cs_degree__name">${c.degree}</span>&nbsp;&nbsp;&nbsp;<span class="u_icon" v-text="c.learn"></span></div>
              <span class="intro" v-text="c.introduce.length < 65 ? c.introduce : c.introduce.slice(0, 65) + '···'">课程介绍</span>
            </div>
          </div>
      </div>
    </div>
    <paging :ac="alllength" :count="pagesize" :currentIndex="pageIndex" @indexclick="getIndex" v-show="pagesize>1"></paging>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'

export default {
  name: 'CourseDiv',
  props: ['dire', 'cate', 'degr', 'con'],
  data () {
    return {
      url: 'http://localhost:8000/',
      pageIndex: 1,
      all_courses: [],
      pagesize: 10,
      alllength: 10
    }
  },
  mounted: function () {
    this.getCourses()
    this.getCount()
  },
  methods: {
    // 获取课程(多条件：方向、分类、难度、页码)
    getCourses: function () {
      let vm = this
      axios.get(this.url + 'course/getCourses/' + this.dire + ',' + this.cate + ',' +
        this.degr + ',' + this.con + ',' + this.pageIndex + '/')
        .then(function (response) {
          vm.all_courses = response.data.courses
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 获取课程总数（多条件）
    getCount: function () {
      let vm = this
      axios.get(this.url + 'course/getCoursesCount/' + this.dire +
        ',' + this.cate + ',' + this.degr + ',' + this.con + '/')
        .then(function (response) {
          vm.alllength = response.data.alllength
          vm.pagesize = Math.ceil(vm.alllength / 8)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    toCourseDetail: function (e) {
      let $courid = $(e.target).parents('.col-md-3').attr('id')
      if ($courid) {
        this.$router.push({
          name: 'coursedetail',
          params: {
            courseid: $courid
          }
        })
      }
    },
    getIndex: function (i) {
      this.pageIndex = i
      this.getCourses()
    },
    setIndex: function () {
      this.pageIndex = 1
    }
  },
  watch: {
    // 监听搜索条件的变化，发生变化时重新搜索课程
    $props: {
      handler: function (n, o) {
        console.log('深度监听new')
        console.log(n)
        console.log('深度监听old')
        console.log(o)
        this.setIndex()
        this.getCourses()
        this.getCount()
      },
      deep: true
    }
  }
}
</script>

<!-- 课程页课程和分页部分CSS -->
<style scoped>
  .content {
    margin: auto;
    width: 1100px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .content > div > div {
    width: 277.5px;
  }

  /*课程容器div*/
  .content .content-video {
    flex: 1;
    min-width: 250px;
    max-width: 250px;
    box-sizing: border-box;
    border-radius: 15px;
    height: 300px;
    margin-top: 20px;
    background: white;
    box-shadow: 2px 2px 5px gray;
  }

  .content .content-video:hover {
    cursor: pointer;
    box-shadow: 2px 2px 15px gray;
  }

  /*课程图片容器div*/
  .content .content-video .course_img {
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    border-radius: 15px 15px 0 0;
    background: pink;
  }

  .content .content-video .course_img img {
    width: 100%;
    height: 100%;
    border-radius: 15px 15px 0 0;
    object-fit: cover;
  }

  /*课程介绍部分容器div */
  .content .content-video .course_info {
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    padding: 10px 20px;
    color: gray;
  }
  .content .course_info .intro{
    font-size: 0.7em;
  }

  /*课程内容介绍部分*/
  .content .course_info .info_name {
    font-size: 1.2em;
    color: black;
  }

  .content .course_info > div {
    margin: 5px 0;
  }

  .content .course_info .u_icon {
    display: inline-block;
    height: 20px;
    padding-left: 17px;
    margin-bottom: -5px;
    background: url('../assets/icons/user-logo.svg') no-repeat;
  }
</style>
