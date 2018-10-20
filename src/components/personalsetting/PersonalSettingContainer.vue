<template>
  <div>
    <!--内容-->
    <div class="container-fluid" style="padding-top: 20px; background: white;">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <PersonalSettingLeft v-if="hackReset"
              @changeright="showRight" @upclick="changeStatus"
            ></PersonalSettingLeft>
          </div>
          <div class="col-md-9">
            <PersonalSettingRight :nowRight="rightPart"></PersonalSettingRight>
          </div>
        </div>
      </div>
    </div>
    <!--修改用户头像-->
    <ChangeUserIcon v-if="showChangeIcon" @cancelclick="changeStatus"
                    @sureclick="changeSuccess"
    ></ChangeUserIcon>
  </div>
</template>

<script>
import PersonalSettingLeft from './PersonalSettingLeft'
import PersonalSettingRight from './PersonalSettingRight'
import ChangeUserIcon from './ChangeUserIcon'
// import axios from 'axios'

export default {
  name: 'PersonalSetting',
  data () {
    return {
      msg: '个人设置页',
      rightPart: 'userBind',
      // 强制刷新子组件
      hackReset: true,
      showChangeIcon: false,
      changed: false
    }
  },
  methods: {
    // 点击左侧展示右侧
    showRight: function (rightFlag) {
      this.rightPart = rightFlag
    },
    // 显示更换头像组件
    changeStatus: function () {
      this.showChangeIcon = !this.showChangeIcon
    },
    // 修改头像成功、刷新
    changeSuccess: function () {
      this.changeStatus()
      this.changed = true
      // 通知父组件更新（头部导航）
      this.$emit('upfather')
      // 强制刷新子组件
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
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
