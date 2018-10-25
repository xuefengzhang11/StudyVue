<template>
  <div>
    <div class="col-md-12 study-top a">
      <div>
        <!--最近学习-->
        <div class="row def-study" v-show="isnextstudy" v-for="next in nextstudy" :key="next.section_id" :id="next.courid">
          <div class="col-md-1 course-time">
            <div class="study-year" v-text="next.history_watchtime.toString().slice(0,4)"></div>
            <div class="study-data"  v-text="next.history_watchtime.toString().slice(5,10)"></div>
          </div>
          <div class="col-md-11 pull-right study-course" :id="next.section_id">
            <div class="row circle"></div>
            <div class="row">
              <div class="col-md-3">
                <a href="#">
                  <img :src="Global.IMG + next.cour_imgurl" class="study-img" @click.prevent.stop="toCourseDetail">
                </a>
              </div>
              <div class="col-md-6" style="margin-left: 70px;width: 350px">
                <div class="row">
                  <span class="study-name" v-text="next.course_name"></span>
                </div>
                <div class="row" style="margin-top: 80px">
                  <span>学习至 1- <span v-text="next.section_id"></span>&nbsp;&nbsp;<span v-text="next.section_name"></span></span>
                </div>
                <div class="row my-quest">
                  <span>学习人数: <span v-text="next.course_learn"></span></span>
                </div>
              </div>
            </div>
            <div class="study-delete" @click="deletenextstudy">删除课程</div>
            <div class="study-go" @click.prevent.stop="toCourseDetail">继续学习</div>
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
  name: 'PersonalRightCourseNextStudy',
  data () {
    return {
      msg: '免费课程',
      isnextstudy: true,
      iscollectcourse: false,
      nextstudy: '',
      collectcourse: ''
    }
  },
  created: function () {
    this.getnextstudy()
  },
  methods: {
    getnextstudy: function () {
      let vm = this
      vm.tel = window.sessionStorage.getItem('usertel')
      axios.get(this.Global.HOST + 'course/getFreeCoursePersonal/' + vm.tel + '/')
        .then(function (response) {
          vm.nextstudy = response.data.nextstudy
        })
    },
    deletenextstudy: function (e) {
      let $courid = $(e.target).parents('.def-study').attr('id')
      let vm = this
      axios.get(this.Global.HOST + 'course/deleteFreeCoursePersonal/' + $courid + '/')
        .then(function (response) {
          vm.collectcourse = response.data.code
          if (vm.collectcourse === '888') {
            vm.getnextstudy()
          }
        })
    },
    toCourseDetail: function (e) {
      let $sectid = $(e.target).parents('.study-course').attr('id')
      this.$router.push({
        path: '/sectiondetail',
        name: 'sectiondetail',
        params: {
          sectid: $sectid
        }
      })
    }
  },
  components: { SectionDetail }
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
  .my-quest{
    /*margin-top: 50px;*/
    font-size: 1.2em;
    line-height: 70px;
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
</style>
