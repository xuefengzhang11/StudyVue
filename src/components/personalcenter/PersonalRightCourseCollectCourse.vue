<template>
  <div>
    <div class="col-md-12 study-top a">
      <div class="context" v-show="notcollect">
        你还没有收藏课程，现在跟着我去<span class="look" @click.stop.prevent="tocourse">看看</span>吧
      </div>
        <!--收藏课程-->
      <div class="row def-study" v-show="iscollectcourse" v-for="(collect,i) in collectcourse" :key="i" :id="collect.course_id">
          <div class="col-md-1 course-time">
            <div class="study-year" v-text="collect.course_collecttime.toString().slice(0,4)"></div>
            <div class="study-data" v-text="collect.course_collecttime.toString().slice(5,10)"></div>
          </div>
          <div class="col-md-11 pull-right study-course">
            <div class="row circle"></div>
            <div class="row">
              <div class="col-md-3">
                <a href="#">
                  <img :src="Global.IMG+collect.cour_imgurl" class="study-img" id="collect.course_id" @click.prevent.stop="toCourseDetail">
                </a>
              </div>
              <div class="col-md-6" style="margin-left: 70px">
                <div class="row">
                  <span class="study-name" v-text="collect.course_name"
                        @click.prevent.stop="toCourseDetail">
                  </span>
                </div>
                <div class="row" style="margin-top: 80px">
                  <span>价格 : <span v-text="collect.course_price"></span></span>
                </div>
                <div class="row my-quest">
                  <span><span v-text="collect.coursenum" style="color: red;"></span>人收藏</span>
                </div>
              </div>
            </div>
            <div class="study-delete">继续学习</div>
            <div class="study-go" @click="deletecollectcourse">取消收藏</div>
          </div>
        </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import $ from 'jquery'
export default {
  name: 'PersonalRightCourseCollectCourse',
  inject: ['reload'],
  data () {
    return {
      msg: '免费课程',
      isnextstudy: false,
      iscollectcourse: true,
      nextstudy: '',
      notcollect: true,
      collect: false,
      legth: 0,
      collectcourse: ''
    }
  },
  mounted: function () {
    this.getcollectcourse()
  },
  methods: {
    // 判断最近学习的数量，从而改变前端样式
    judgeCollect: function () {
      if (this.legth) {
        this.notcollect = false
        this.collect = true
      } else {
        this.notcollect = true
        this.collect = false
      }
    },
    getcollectcourse: function () {
      let vm = this
      vm.tel = window.sessionStorage.getItem('usertel')
      axios.get(this.Global.HOST + 'course/getCollectCoursePersonal/' + vm.tel + '/')
        .then(function (response) {
          vm.collectcourse = response.data.collectcourse
          vm.legth = response.data.collectcourse.length
          vm.judgeCollect()
        })
    },
    myFlush: function () {
      this.reload()
    },
    deletecollectcourse: function (e) {
      let $courid = $(e.target).parents('.def-study').attr('id')
      let vm = this
      axios.get(this.Global.HOST + 'course/deleteCollectCoursePersonal/' + $courid + '/')
        .then(function (response) {
          vm.collectcourse = response.data.code
          if (vm.collectcourse === '888') {
            vm.getcollectcourse()
          }
        })
    },
    toCourseDetail: function (e) {
      let $courid = $(e.target).parents('.def-study').attr('id')
      if ($courid) {
        this.$router.push({
          name: 'coursedetail',
          params: {
            courseid: $courid
          }
        })
      }
    },
    tocourse: function () {
      this.$router.push({
        path: '/course'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .course-time .study-year{
    font-size: 1.5em;
    font-weight: bold;
    color: grey;
  }
  .course-time .study-data{
    margin-top: 3px;
    font-size: 0.9em;
    /*margin-left: 10px;*/
    color: grey;
  }
  .study-course{
    height: 200px;
    border-left: solid 1px rgba(141, 141, 141, 0.54);
  }
  .circle{
    width: 10px;
    height: 10px;
    background: #b4b4b4;
    border-radius: 50%;
    margin-left: -21px;
    outline: none;
  }
  .study-img{
    width: 220px;
    height: 150px;
    margin-top: 25px;
  }
  .study-name{
    font-size: 1.3em;
    font-weight: bold;

    position:absolute;
    top:30px;
  }
  .study-name:hover{
    cursor: pointer;
  }
  .my-quest{
    margin-top: 50px;
    font-size: 1.2em;
  }
  .study-delete{
    width: 80px;
    height: 40px;
    border: solid 1px red;
    text-align: center;
    line-height: 40px;
    color: red;
    position: absolute;
    right: 50px;
    top: 80px;
  }
  .study-go{
    width: 80px;
    height: 40px;
    border: solid 1px red;
    text-align: center;
    line-height: 40px;
    color: red;
    position: absolute;
    right: 50px;
    top: 135px;
  }
  .study-delete:hover{
    background: red;
    color: white;
    cursor: pointer;
  }

  .study-go:hover{
    background: red;
    color: white;
    cursor: pointer;
  }
  .look{
    color:blue;
  }
  .look:hover{
    cursor: pointer;
  }
  .context{
    text-align: center;
    line-height: 300px;
    font-size: 1.2em;
  }
</style>
