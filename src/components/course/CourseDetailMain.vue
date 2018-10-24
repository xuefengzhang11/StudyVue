<template>
  <!--课程详情部分-->
  <div class="container course_detail">
    <div class="row">
      <!--章节部分-->
      <div class="col-md-7">
        <div class="row">
          <div class="col-md-12">
            <div class="course_info">
              <p class="cour-info" v-text="'简介：'+ course.introduce"></p>
            </div>
            <div class="chapters">
              <!--章模板-->
              <div class="chapter" v-for="(chap,i) in course.chapters" :key="chap.id">
                <p class="chapter-name" v-text="'第'+(parseInt(i)+1)+'章：'+chap.name">第一章：章名</p>
                <p class="chapter-info" v-text="chap.introduce"></p>
                <div class="sections">
                  <!--节模板-->
                  <div class="section" v-for="(sect,i) in chap.sections" :key="sect.id" :id="sect.id" @click.stop.prevent="toSectionDetail">
                    <span class="icon-section">&nbsp;</span>
                    <span class="sect-name" v-text="'第'+(parseInt(i)+1)+'节：'+sect.name"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--推荐的热门课程-->
      <div class="col-md-5">
        <div class="hot_course">
          <p style="margin-left:20px; font-weight: 700">推荐课程</p>
          <!--推荐课程模板-->
          <div class="cour" v-for="c in hotCourses" :id="c.id" :key="c.id" @click.prevent.stop="toCourseDetail">
            <div class="course_img">
              <img :src="Global.IMG + c.imgurl" alt="">
            </div>
            <div style="border-bottom: 1px rgba(128,128,128,0.22) solid; width: 251.86px; height: 70px">
              <div class="course-name" v-text="c.name"></div>
              <span class="course-degree" v-text="c.cs_degree__name"></span>
              <img src="../../assets/icons/user-logo.svg" alt="">
              <span class="course-l-people" v-text="c.learn"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import SectionDetail from '../course/SectionDetail'
export default {
  name: 'CourseDetailMain',
  props: ['course'],
  data () {
    return {
      msg: '课程详情主体',
      courseid: '',
      hotCourses: {}
    }
  },
  mounted: function () {
    // 获取热门课程
    let vm = this
    axios.get(this.Global.HOST + 'course/getHotCourse/')
      .then(function (response) {
        vm.hotCourses = response.data.hotCourses
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    toCourseDetail: function (e) {
      this.courseid = $(e.target).parents('.cour').attr('id')
      if (this.courseid) {
        // 跳转到当前页面(返回父组件重新加载)
        this.$emit('regetcourse', this.courseid)
      }
    },
    toSectionDetail: function (e) {
      // 添加到最近学习，再跳转到详情页(课程节id，用户电话号码)
      // 节ID
      let $sectid = $(e.target).parents('.section').attr('id')
      // 用户电话号码
      let usertel = window.sessionStorage.getItem('usertel')
      if ($sectid) {
        let vm = this
        axios.get(this.Global.HOST + 'course/addSectionHistory/' + $sectid + '/' + usertel + '/')
          .then(function (response) {
            if (response.data.res === '成功') {
              vm.$router.push({
                path: 'sectiondetail/',
                name: 'sectiondetail',
                params: {
                  sectid: $sectid
                }
              })
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  },
  components: { SectionDetail }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .course_detail {
    min-height: 500px;
    margin-top: 50px;
  }
  .course_detail .course_info, .course_detail .chapter {
    padding: 20px;
    margin: 10px 0;
    border-radius: 5px;
    box-shadow: 2px 2px 5px gray;
  }
  .course_detail .chapter .chapter-name {
    font-size: 1.3em;
    font-weight: bold;
  }
  .chapter .section span {
    display: inline-block;
    /*width: 100%;*/
    height: 40px;
    border-radius: 5px;
    padding: 0 15px;
    line-height: 40px;
  }
  .chapter .section:hover {
    cursor: pointer;
    background: pink;
    border-radius: 10px;
    color: red;
  }
  .chapter .section:hover > span.icon-section {
    background: url("../../assets/icons/enter_red.svg") no-repeat 0 5px;
  }
  .course_detail .chapter .section .icon-section {
    display: inline-block;
    width: 5px;
    height: 40px;
    background: url("../../assets/icons/enter_gray.svg") no-repeat 0 5px;
  }

  /*--右侧-*/
  .course_detail .hot_course {
    margin-top: -10px;
    padding: 20px;
  }

  .course_detail .hot_course div.cour > div {
    margin-left: 20px;
    float: left;
  }

  .course_detail .hot_course .course_img {
    display: inline-block;
    width: 90px;
    height: 70px;
  }

  .course_detail .hot_course .course_img img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    object-fit: cover;
  }

  .course_detail .hot_course .course-name {
    font-size: 1.2em;
    padding-top: 10px;
  }

  .course_detail .hot_course div.cour {
    display: inline-block;
    margin: 10px 0;
  }

  .course_detail .hot_course .cour:hover{
    cursor: pointer;
  }

  .course_detail .chapter-info {
    font-size: 0.6em;
    color: gray;

  }
  .course_detail .chapters,.course_detail .course_info {
    background: white;
  }
</style>
