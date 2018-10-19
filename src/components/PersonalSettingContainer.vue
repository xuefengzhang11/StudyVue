<template>
  <div>
    <!--内容-->
    <div class="container-fluid" style="padding-top: 20px; background: white;">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <PersonalSettingLeft @changeright="showRight"
            @upclick="changeStatus"
            ></PersonalSettingLeft>
          </div>
          <div class="col-md-9">
            <PersonalSettingRight :nowRight="rightPart"></PersonalSettingRight>
          </div>
        </div>
      </div>
    </div>
    <!--修改密码-->
    <ChangeUserIcon v-if="showChangeIcon" @cancelclick="changeStatus"
    ></ChangeUserIcon>
  </div>
</template>

<script>
import PersonalSettingLeft from './PersonalSettingLeft'
import PersonalSettingRight from './PersonalSettingRight'
import ChangeUserIcon from './ChangeUserIcon'

export default {
  name: 'PersonalSetting',
  data () {
    return {
      msg: '个人设置页',
      rightPart: 'userBind',
      showChangeIcon: false
    }
  },
  methods: {
    showRight: function (rightFlag) {
      this.rightPart = rightFlag
    },
    // 显示更换头像组件
    changeStatus: function () {
      this.showChangeIcon = !this.showChangeIcon
    }
  },
  components: {
    PersonalSettingLeft,
    PersonalSettingRight,
    ChangeUserIcon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
