<template>
  <div class="container-fluid text-center bg-danger"
       style="height: 100px;"
  >
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      msg: '轮播图'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
