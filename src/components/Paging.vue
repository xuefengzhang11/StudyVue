<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-md-12">
        <h1>{{msg}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Paging',
  data () {
    return {
      msg: '分页组件'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
