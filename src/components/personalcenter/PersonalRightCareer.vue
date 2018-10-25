<template>
  <div class="container-fluid">
    <div class="col-md-12 ">
      <ul class="nav nav-tabs border">
        <!--<li role="presentation" class="active"><a href="#">Home</a></li>-->
        <li role="presentation" class="note"><a href="#" class="color">我的路径</a></li>
      </ul>
      <div class="context" v-show="notcareer">
        你没有参与任何路径，可以先去找找<span class="go-career">路径</span>
      </div>
      <div class="mycollections" v-show="havecareer">
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

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a, a:hover {
    text-decoration: none;
  }
  .note{
    width: 150px;
    height: 50px;
    text-align: center;
    margin-top: 10px;
    font-size: 1.2em;
  }
  .color{
    color: #101010;
  }
  .context{
    text-align: center;
    line-height: 300px;
    color: rgba(34, 34, 34, 0.63);
    font-size: 1.3em;
  }
  .mycollections{
    height: 200px;
    /*background: red;*/
    padding: 10px 20px;
    border: solid 1px rgba(128, 128, 128, 0.56);
    border-radius: 20px;
    margin: 20px;
    background: white;
    box-shadow: 2px 2px 5px black;
  }
  .mycollections:hover{
    box-shadow: 2px 2px 15px black;
  }
  .go-career {
    color: blue;
  }
  .go-career:hover {
    cursor: pointer;
  }
</style>
