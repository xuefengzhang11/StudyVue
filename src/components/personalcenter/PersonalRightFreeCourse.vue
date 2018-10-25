<template>
  <div class="container-fluid">
    <div class="col-md-12 foot">
      <div class="row study-choice">
        <div class="col-md-2 pre-study" @click.prevent.stop="enternextstudy" :class="{bgvisit:isnextstudy === true}">最近学习</div>
        <div class="col-md-2 pre-collect" @click.prevent.stop="entercollectcourse" :class="{bgvisit:iscollectcourse === true}">收藏课程</div>
        <div class="col-md-8"></div>
      </div>
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
    line-height: 50px;
    width: 150px;
    height: 50px;
    text-align: center;
    margin-top: 10px;
    font-size: 1.2em;
    border-radius: 10px;
  }
  .pre-study:hover{
    cursor: pointer;
    font-weight: bold;
  }
  .pre-collect{
    border-radius: 10px;
    line-height: 50px;
    width: 150px;
    height: 50px;
    text-align: center;
    margin-top: 10px;
    font-size: 1.2em;
  }
  .pre-collect:hover{
    cursor: pointer;
    font-weight: bold;
  }
  .study-choice {
    border-bottom: grey 1px solid;
  }
  .bgvisit{
    background: grey;
    color: white;
  }
  .bgvisit:hover{
    font-weight: normal;
  }
</style>
