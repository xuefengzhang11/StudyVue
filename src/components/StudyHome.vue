<template>
  <div>
    <Carousel></Carousel>
    <HomeContent></HomeContent>
  </div>
</template>

<script>
import Carousel from './Carousel'
import HomeContent from './HomeContent'

export default {
  name: 'StudyHome',
  data () {
    return {
      msg: '网站首页'
    }
  },
  components: {Carousel, HomeContent}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
