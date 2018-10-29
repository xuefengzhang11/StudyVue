<template>
  <div>
    <CourseDetailTop :course="course"></CourseDetailTop>
    <CourseDetailMain :course="course" @regetcourse="detailtodetail"></CourseDetailMain>
  </div>
</template>

<script>
import axios from 'axios'
import CourseDetailTop from './CourseDetailTop'
import CourseDetailMain from './CourseDetailMain'

export default {
  name: 'CourseDetailContainer',
  data () {
    return {
      msg: '课程详情页',
      courseid: '',
      course: {}
    }
  },
  created: function () {
    // 得到路由跳转传来的参数（课程ID）
    this.getCourseId()
  },
  mounted: function () {
    this.getCourseDetail()
  },
  methods: {
    // 得到路由跳转传来的参数（课程ID）
    getCourseId: function () {
      this.courseid = this.$route.params.courseid
      window.sessionStorage.setItem('courid', this.courseid)
    },
    getCourseDetail: function () {
      // 通过课程Id获取课程详情
      let vm = this
      axios.get(this.Global.HOST + 'course/getCourse/' + this.courseid + '/')
        .then(function (response) {
          vm.course = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    detailtodetail: function (courseid) {
      this.courseid = courseid
      this.getCourseDetail()
    }
  },
  watch: {
    $router (to, from) {
      // 监听路由的变化
    }
  },
  // 注册子组件
  components: {CourseDetailTop, CourseDetailMain}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
