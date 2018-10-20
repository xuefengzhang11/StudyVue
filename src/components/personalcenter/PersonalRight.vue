<template>
  <div>
    <PersonalRightFreeCourse v-show="nowRight==='freeCourse'"></PersonalRightFreeCourse>
    <PersonalRightCareer v-show="nowRight==='career'"></PersonalRightCareer>
    <PersonalRightArticle v-show="nowRight==='article'"></PersonalRightArticle>
    <PersonalRightOrder v-show="nowRight==='order'"></PersonalRightOrder>
  </div>
</template>

<script>
import PersonalRightFreeCourse from './PersonalRightFreeCourse'
import PersonalRightCareer from './PersonalRightCareer'
import PersonalRightArticle from './PersonalRightArticle'
import PersonalRightOrder from './PersonalRightOrder'

export default {
  props: ['nowRight'],
  name: 'PersonalRight',
  data () {
    return {
      url: 'http://localhost:8000/',
      msg: '个人中心右侧'
    }
  },
  components: {
    PersonalRightFreeCourse,
    PersonalRightCareer,
    PersonalRightArticle,
    PersonalRightOrder
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
