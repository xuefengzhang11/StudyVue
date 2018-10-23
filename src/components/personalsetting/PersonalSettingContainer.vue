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
            <PersonalSettingRight :nowRight="rightPart" v-if="hackResetUpdate"
                                  @upuclick="updateUser"
            ></PersonalSettingRight>
          </div>
        </div>
      </div>
    </div>
    <!--修改用户头像-->
    <ChangeUserIcon v-if="showChangeIcon" @cancelclick="changeStatus"
                    @sureclick="changeSuccess"
    ></ChangeUserIcon>
    <UpdateUserInfo v-if="showUpdateUser" @updateuserclick="updateUser"
                    @updateclick="updateSuccess"
    ></UpdateUserInfo>
    <!--@updatesureclick="updateSuccess"-->
  </div>
</template>

<script>
import PersonalSettingLeft from './PersonalSettingLeft'
import PersonalSettingRight from './PersonalSettingRight'
import ChangeUserIcon from './ChangeUserIcon'
import UpdateUserInfo from './UpdateUserInfo'
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
      changed: false,
      // 修改用户信息
      showUpdateUser: false,
      updated: false,
      hackResetUpdate: true
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
    },
    // 显示修改用户信息组建
    updateUser: function () {
      this.showUpdateUser = !this.showUpdateUser
    },
    // 修改个人信息成功、刷新
    updateSuccess: function () {
      this.updateUser()
      this.updated = true
      // 强制刷新子组件
      this.hackResetUpdate = false
      this.$nextTick(() => {
        this.hackResetUpdate = true
      })
    }
  },
  components: {
    PersonalSettingLeft,
    PersonalSettingRight,
    ChangeUserIcon,
    UpdateUserInfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
