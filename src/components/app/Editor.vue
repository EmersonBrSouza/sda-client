<template>
  <div class="columns mt-10 bg-document">
    <div class="column is-1"></div>
    <div class="column is-10">
      <div class="toolbar"></div>
      <page/>
      <page/>
    </div>
  </div>
</template>

<script>
import Page from './editor/Page'
export default {
  components: {
    Page
  },
  mounted () {
    this.$on('page_created', function () {
      console.log('oi')
    })
  }
}
</script>

<style lang="scss">
  .bg-document{
    background: #EEEEEE;
  }
</style>
