<template>
  <div>
    <div>
      <!--头部-->
      <PersonalTop></PersonalTop>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <PersonalLeft @changeright="showRight"></PersonalLeft>
        </div>
        <div class="col-md-9">
          <PersonalRight :nowRight="rightPart"></PersonalRight>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalTop from './PersonalTop'
import PersonalLeft from './PersonalLeft'
import PersonalRight from './PersonalRight'

export default {
  name: 'PersonalCenterContainer',
  data () {
    return {
      msg: '个人中心',
      rightPart: 'freeCourse'
    }
  },
  methods: {
    showRight: function (rightFlag) {
      this.rightPart = rightFlag
    }
  },
  components: {
    // 个人中心头部
    PersonalTop,
    // 个人中心左侧
    PersonalLeft,
    // 个人中心右侧
    PersonalRight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
