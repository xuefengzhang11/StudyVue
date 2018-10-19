<template>
  <div class="container-fluid" style="padding-top: 20px; background: white;">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <PersonalSettingLeft @changeright="showRight"></PersonalSettingLeft>
        </div>
        <div class="col-md-9">
          <PersonalSettingRight :nowRight="rightPart"></PersonalSettingRight>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalSettingLeft from './PersonalSettingLeft'
import PersonalSettingRight from './PersonalSettingRight'

export default {
  name: 'PersonalSetting',
  data () {
    return {
      msg: '个人设置页',
      rightPart: 'userBind'
    }
  },
  methods: {
    showRight: function (rightFlag) {
      this.rightPart = rightFlag
    }
  },
  components: {
    PersonalSettingLeft,
    PersonalSettingRight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
