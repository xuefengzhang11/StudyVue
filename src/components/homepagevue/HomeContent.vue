<template>
  <div>
    <HotCourses></HotCourses>
    <HotArticles></HotArticles>
    <HotCareer></HotCareer>
  </div>
</template>

<script>
import HotCourses from './HotCourses'
import HotArticles from './HotArticles'
import HotCareer from './HotCareer'

export default {
  name: 'HomeContent',
  data () {
    return {
      msg: 'study首页内容部分'
    }
  },
  components: {
    HotCourses,
    HotArticles,
    HotCareer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  /*---*/
  .title > span {
    display: inline-block;
    width: 112px;
    height: 72px;
    line-height: 72px;
  }

  .icon-article-l {
    background: url("../../assets/icons/home-icons.png") 0 -792px;
  }

  .icon-article-r {
    background: url("../../assets/icons/home-icons.png") 0 -720px;
  }

  .icon-career-l {
    background: url("../../assets/icons/home-icons.png") 0 -72px;
  }

  .icon-career-r {
    background: url("../../assets/icons/home-icons.png") 0 0;
  }
</style>
