<template>
  <div>
    <CourseSearchNav @searchnavclick="changeCon"></CourseSearchNav>
    <CourseDiv :dire="dire" :cate="cate" :degr="degr" :con="con"></CourseDiv>
  </div>
</template>

<script>

import CourseSearchNav from './CourseSearchNav'
import CourseDiv from './CourseDiv'
export default {
  name: 'CourseSearch',
  data () {
    return {
      dire: '0',
      cate: '0',
      degr: '0',
      con: '',
      msg: '课程搜索页'
    }
  },
  components: {CourseSearchNav, CourseDiv},
  methods: {
    changeCon: function (direid, cateid, degrid, con) {
      this.dire = direid
      this.cate = cateid
      this.degr = degrid
      this.con = con
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
