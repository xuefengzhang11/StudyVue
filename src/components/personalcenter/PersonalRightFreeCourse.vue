<template>
  <div>
    <div class="col-md-12 study-top a">
      <ul class="nav nav-pills study-choice">
        <!--<li role="presentation" class="active"><a href="#">Home</a></li>-->
        <li role="presentation" class="pre-study" @click.prevent.stop="enternextstudy"><a href="#" class="color pos-study">最近学习</a></li>
        <li role="presentation" class="pre-collect" @click.prevent.stop="entercollectcourse"><a href="#" class="color pos-collect" >收藏课程</a></li>
      </ul>
      <div>
        <!--最近学习-->
        <PersonalRightCourseNextStudy v-show="isnextstudy"></PersonalRightCourseNextStudy>
        <!--收藏课程-->
        <PersonalRightCourseCollectCourse v-show="iscollectcourse"></PersonalRightCourseCollectCourse>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalRightCourseNextStudy from './PersonalRightCourseNextStudy'
import PersonalRightCourseCollectCourse from './PersonalRightCourseCollectCourse'
export default {
  name: 'PersonalRightFreeCourse',
  data () {
    return {
      msg: '免费课程',
      isnextstudy: true,
      iscollectcourse: false
    }
  },
  created: function () {
    this.enternextstudy()
  },
  methods: {
    enternextstudy: function () {
      this.isnextstudy = true
      this.iscollectcourse = false
    },
    entercollectcourse: function () {
      this.iscollectcourse = true
      this.isnextstudy = false
    }
  },
  components: {
    PersonalRightCourseNextStudy,
    PersonalRightCourseCollectCourse
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pre-study{
    width: 150px;
    height: 50px;
    text-align: center;
    margin-top: 10px;
    font-size: 1.2em;
  }
  .pre-collect{
    width: 150px;
    height: 50px;
    text-align: center;
    margin-top: 10px;
    font-size: 1.2em;
  }
</style>
