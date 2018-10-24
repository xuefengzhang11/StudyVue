<template>
  <div class="container-fluid hot-course bg-success">
    <!--热门课程 顶部图标-->
    <div class="row">
      <div class="col-md-12 title text-center">
        <span class="icon-course-l">&nbsp;</span>
        <span class="text-center">热门课程</span>
        <span class="icon-course-r">&nbsp;</span>
      </div>
    </div>
    <div class="container courses">
      <div class="row">
        <!--一个课程div模板-->
        <div class="col-md-3" v-for="hc in hotCourses" :key="hc.id"
             :id="hc.id"  @click.prevent.stop="toCourseDetail"
        >
          <div class="content-video">
            <div class="course_img"><img :src="Global.IMG+hc.imgurl" alt=""></div>
            <div class="course_info">
              <span class="info_name" v-text="hc.name">课程名称</span>
              <div><span v-text="hc.cs_degree__name">难度</span><span class="u_icon">{{hc.learn}}</span><span></span></div>
              <span class="intro" v-text="hc.introduce.length < 65 ? hc.introduce : hc.introduce.slice(0, 65) + '···'">课程介绍</span>
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

export default {
  name: 'HotCourses',
  data () {
    return {
      msg: '热门课程',
      hotCourses: []
    }
  },
  mounted: function () {
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
      let $courid = $(e.target).parents('.col-md-3').attr('id')
      if ($courid) {
        this.$router.push({
          // name -- params  类似于 ajax 中的 post -> this.$route.params.key
          // path -- query  类似于 ajax 中的 get -> this.$route.query.key
          // path: '/coursesdetail',
          name: 'coursedetail',
          params: {
            courseid: $courid
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*热门课程*/
  .title {
    margin: 30px 0;
    padding-top: 20px;
    font-weight: 500;
    font-size: 24px;
  }

  .hot-course {
    padding-bottom: 40px;
    box-shadow: 2px 2px 10px gray;
  }

  /*课程容器div*/
  .hot-course .courses .content-video {
    width: 250px;
    box-sizing: border-box;
    border-radius: 15px;
    height: 300px;
    box-shadow: 2px 2px 5px gray;
  }

  .hot-course .courses .content-video:hover {
    cursor: pointer;
    box-shadow: 2px 2px 15px gray;
  }

  /*课程图片容器div*/
  .courses .content-video .course_img {
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    border-radius: 15px 15px 0 0;
    background: pink;
  }

  .courses .content-video .course_img img {
    width: 100%;
    height: 100%;
    border-radius: 15px 15px 0 0;
    object-fit: cover;
  }

  /*课程介绍部分容器div */
  .courses .content-video .course_info {
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    padding: 10px 20px;
    background: white;
    color: gray;
    border-radius: 0 0 15px 15px;
  }

  /*课程内容介绍部分*/
  .courses .course_info .info_name {
    font-size: 1.2em;
    color: black;
  }
  .course_info .intro{
    font-size: 0.7em;
  }

  .courses .course_info > div {
    margin: 5px 0;
  }

  .u_icon {
    display: inline-block;
    height: 20px;
    padding-left: 17px;
    margin-bottom: -5px;
    background: pink;
    background: url('../../assets/icons/user-logo.svg') no-repeat;
  }
  .icon-course-l {
    background: url("../../assets/icons/home-icons.png") 0 -216px;
  }

  .icon-course-r {
    background: url("../../assets/icons/home-icons.png") 0 -144px;
  }
</style>
