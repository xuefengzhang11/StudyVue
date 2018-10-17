<template>
  <div>
    <CareerDiv></CareerDiv>
  </div>
</template>

<script>
import CareerDiv from './CareerDiv'
export default {
  name: 'CareerSearch',
  data () {
    return {
      msg: '职业路径搜索页'
    }
  },
  components: {CareerDiv}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
