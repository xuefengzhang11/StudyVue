<template>
  <!--课程头部-->
  <div class="container-fluid course_header">
    <div class="container">
      <div class="row" >
        <div class="col-md-4">
          <span>
            <router-link class="r-link" to="/course/">课程</router-link>
            <!--<span>课程</span>-->
            <!--:to="{path:'course/',query:{name:'hyy'}}"-->
          </span>&nbsp;&nbsp;\&nbsp;&nbsp;
          <span>
            <!--方向-->
            <router-link class="r-link"  v-text="course.cs_direction__name"
                         :to="{path:'/course/',query:{direid:course.cs_direction__id}}"
            >
            </router-link>
          </span>&nbsp;&nbsp;\&nbsp;&nbsp;
          <span>
            <!--分类-->
            <router-link class="r-link"  v-text="course.cs_category__name"
                         :to="{path:'/course/',query:{
                              direid:course.cs_direction__id,
                              cateid:course.cs_category__id,
                               }
                          }"
            >
            </router-link>
          </span>&nbsp;&nbsp;\&nbsp;&nbsp;
          <span>
            <span class="cour-name r-link" @click="myFlush" v-text="course.name">课程名</span>
          </span>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-4 text-right" :id="course.id">
          <img src="../../assets/icons/collect-de.svg" alt="" @click.stop.prevent="collectsection" v-show="flag">
          <img src="../../assets/icons/collect-su.svg" alt="" @click.stop.prevent="collectsection" v-show="!flag">
        </div>
      </div>
      <div class="row">
        <div class="col-md-12"><p class="course-name cour-name"></p></div>
      </div>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-10">
          难度&nbsp;&nbsp;<span class="course-degree cour-degr" v-text="course.cs_degree__name"></span>
          时长&nbsp;&nbsp;<span class="course-time">3小时</span>
          学习人数&nbsp;&nbsp;<span v-text="course.learn"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import axios from 'axios'
export default {
  name: 'CourseDetailTop',
  inject: ['reload'],
  props: ['course'],
  data () {
    return {
      msg: '课程详情页头部',
      flag: true,
      course_id: ''
    }
  },
  created: function () {
    this.getCourseId()
  },
  mounted: function () {
    this.course_id = this.course_id
    this.collectjudge()
  },
  methods: {
    getCourseId: function () {
      this.course_id = this.$route.params.courseid
    },
    myFlush: function () {
      this.reload()
    },
    collectsection: function () {
      let vm = this
      if (this.flag === true) {
        vm.tel = window.sessionStorage.getItem('usertel')
        axios.get('http://localhost:8000/course/insertCollectCourse/' + vm.course_id + '/' + vm.tel + '/')
          .then(function (response) {
            vm.collectcourse = response.data.code
            // console.log(response.data.code)
            if (vm.collectcourse === 888) {
              vm.flag = false
            }
            vm.myFlush()
          })
      } else {
        vm.tel = window.sessionStorage.getItem('usertel')
        // console.log(vm.tel)
        axios.get('http://localhost:8000/course/deteleCollectCourse/' + vm.course_id + '/' + vm.tel + '/')
          .then(function (response) {
            vm.collectcourse = response.data.code
            // console.log(response.data.code)
            if (vm.collectcourse === 888) {
              vm.flag = true
            }
            vm.myFlush()
          })
      }
    },
    collectjudge: function (e) {
      let vm = this
      vm.tel = window.sessionStorage.getItem('usertel')
      // console.log(vm.tel)
      axios.get('http://localhost:8000/course/collectJudge/' + vm.course_id + '/' + vm.tel + '/')
        .then(function (response) {
          vm.collectcourse = response.data.code
          if (vm.collectcourse === 888) {
            vm.flag = false
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .course_header {
    padding: 30px;
    background: rgba(96, 99, 114, 0.37);
  }

  .course_header .course-name {
    font-size: 2em;
    font-weight: bold;
    margin: 20px 0;
  }

  .course-degree:after, .course-time:after {
    content: ' . ';
    font-size: 25px;
    position: relative;
    top: -4px;
    margin: 0 5px;
  }

  .r-link{
    color: #3a3a3a;
    text-decoration: none;
  }
  .r-link:hover{
    color: black;
    cursor: pointer;
  }

</style>
