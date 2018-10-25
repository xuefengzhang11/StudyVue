<template>
  <div class="container-fluid hot-career">
    <div class="row">
      <div class="col-md-12 text-center title">
        <span class="icon-career-l">&nbsp;</span>
        <span class="text-center">热门职业</span>
        <span class="icon-career-r">&nbsp;</span>
      </div>
    </div>
    <div class="row container careers center-block">
      <!--一个职业计划div模板-->
      <div class="col-md-3" v-for="he in hotCareer" :key="he.id" :id="he.id"  @click.prevent.stop="toCareerDetail">
          <div class="career">
              <a href="#">
                  <div class="career-img">
                    <img :src="Global.IMG + he.imgurl" alt="">
                  </div>
                  <div class="career-info">
                      <p class="career-title">{{he.name | hotmot(15,16)}}</p>
                      <p>
                        <span v-text="he.coursesNum"></span>课/
                        <span>{{he | chapnum}}</span>章/
                        <span>{{he | sectnum}}</span>节
                        <span class="u-icon" v-text="he.learn"></span></p>
                      <p class="career-detail">{{he.introduce | hotmot(45,48)}}</p>
                  </div>
              </a>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
export default {
  name: 'HotCareer',
  data () {
    return {
      msg: '热门文章',
      hotCareer: [],
      coursecount: [],
      hotmot: ''
    }
  },
  mounted: function () {
    let vm = this
    axios.get(this.Global.HOST + 'career/hotCareer/')
      .then(function (response) {
        vm.hotCareer = response.data.hotCareers
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    toCareerDetail: function (e) {
      let $courid = $(e.target).parents('.col-md-3').attr('id')
      if ($courid) {
        this.$router.push({
          // name -- params  类似于 ajax 中的 post -> this.$route.params.key
          // path -- query  类似于 ajax 中的 get -> this.$route.query.key
          // path: '/coursesdetail',
          name: 'careerdetail',
          params: {
            careerid: $courid
          }
        })
      }
    }
  },
  filters: {
    hotmot: function (i, a, len) {
      if (i.length <= a) {
        return i
      }
      i = i.toString()
      return i.substr(0, len) + '...'
    },
    'chapnum': function (career) {
      let cnum = 0
      for (let cour of career.courses) {
        cnum += cour.chaptersNum
      }
      return cnum
    },
    'sectnum': function (career) {
      let snum = 0
      for (let cour of career.courses) {
        for (let chap of cour.chapters) {
          snum += chap.sectionsNum
        }
      }
      return snum
    }
  }
}
</script>

<style scoped>
  body {
    background: ghostwhite;
  }

  a, a:hover {
    text-decoration: none;
    color: black;
  }
  .title {
    margin: 30px 0;
    padding-top: 20px;
    font-weight: 500;
    font-size: 24px;
  }
  /*热门职业*/
  .hot-career {
    padding-bottom: 40px;
    box-shadow: 2px 2px 10px gray;
  }

  .careers {
    padding: 0;
  }

  .careers .career {
    width: 250px;
    height: 300px;
    margin: 20px;
    border-radius: 15px;
    box-sizing: border-box;
    box-shadow: 2px 2px 5px gray;
  }

  .careers .career:hover {
    box-shadow: 2px 2px 15px gray;
  }

  .careers .career .career-img {
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    border-radius: 15px 15px 0 0;
    background: pink;
  }

  .careers .career .career-img img {
    width: 100%;
    height: 100%;
    border-radius: 15px 15px 0 0;
    object-fit: cover;
  }

  .career .career-info {
    padding: 10px 10px 0;
    border-radius: 0 0 15px 15px;
    height: 150px;
    background: white;
  }
  .career .career-info .u-icon{
    display: inline-block;
    height: 20px;
    padding-left: 17px;
    margin-bottom: -5px;
    /*margin-left: 40px;*/
    float:right;
    padding-top: 2px;
    background: pink;
    background: url('../../assets/icons/user-logo.svg') no-repeat;
  }
  .career .career-info .career-title {
    font-size: 1.1em;
    font-weight: bold;
  }
  .icon-career-l {
    background: url("../../assets/icons/home-icons.png") 0 -1080px;
  }

  .icon-career-r {
    background: url("../../assets/icons/home-icons.png") 0 -1008px;
  }
</style>
