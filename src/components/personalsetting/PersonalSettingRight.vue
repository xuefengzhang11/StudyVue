<template>
  <div>
    <PersonalSettingRightBind v-show="nowRight==='userBind'"></PersonalSettingRightBind>
    <PersonalSettingRightPInfo v-show="nowRight==='userInfo'" @uuclick="toUpdateUser" @click="toUpdateUser" ></PersonalSettingRightPInfo>
  </div>
</template>

<script>
import PersonalSettingRightBind from './PersonalSettingRightBind'
import PersonalSettingRightPInfo from './PersonalSettingRightPInfo'
export default {
  props: ['nowRight'],
  name: 'PersonalSettingLeft',
  data () {
    return {
      msg: '个人设置右侧'
    }
  },
  components: {
    PersonalSettingRightBind,
    PersonalSettingRightPInfo
  },
  methods: {
    toUpdateUser: function () {
      this.$emit('upuclick')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
