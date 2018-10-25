<template>
  <div class="container-fluid">
      <div class="col-md-12 border">
        <div class="col-md-2 bgvisit">我的路径</div>
        <div class="col-md-10"></div>
      </div>
      <div class="context" v-show="notcareer">
        你没有参与任何路径，可以先去找找<span class="go-career" @click="toCareer">路径</span>
      </div>
      <div class="col-md-12 study-top a" v-show="havecareer">
      <div class="row def-study">
        <div class="col-md-1 course-time">
          <!--next.history_watchtime.toString().slice(0,4)-->
          <div class="study-year">年</div>
          <div class="study-data">天</div>
        </div>
        <div class="col-md-11 pull-right study-course">
          <div class="row circle"></div>
          <div class="row">
            <div class="col-md-3">
              <a href="#">
                <!--:src="Global.IMG + next.cour_imgurl"-->
                <img src="../../assets/images/courses/1.jpg" class="study-img">
              </a>
            </div>
            <div class="col-md-6" style="margin-left: 70px">
              <div class="row">
                <span class="study-name">课程名</span>
              </div>
              <div class="row" style="margin-top: 80px">
                <span>学习至 1- <span>2</span>&nbsp;&nbsp;<span>3</span></span>
              </div>
              <div class="row my-quest">
                <span>学习人数: <span>3</span></span>
              </div>
            </div>
          </div>
          <div class="study-delete">删除课程</div>
          <div class="study-go">继续学习</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalRightCareer',
  data () {
    return {
      msg: '职业路径',
      notcareer: true,
      havecareer: false
    }
  },
  methods: {
    toCareer: function () {
      this.$router.push({
        path: '/career'
      })
    }
  }
  // judgeCollect: function () {
  //   if (this.nums) {
  //     this.notcareer = false
  //     this.havecareer = true
  //   } else {
  //     this.notcareer = true
  //     this.havecareer = false
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .context{
    text-align: center;
    line-height: 300px;
    color: rgba(34, 34, 34, 0.63);
    font-size: 1.3em;
  }
  .go-career {
    color: blue;
  }
  .go-career:hover {
    cursor: pointer;
  }
  .bgvisit{
    line-height: 50px;
    width: 150px;
    height: 50px;
    text-align: center;
    margin-top: 10px;
    font-size: 1.2em;
    border-radius: 10px;
    background: grey;
    color: white;
  }
  .border {
    border-bottom: grey 1px solid;
  }
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
</style>
