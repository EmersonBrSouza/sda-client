<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <toolbar/>
    </div>
    <div class="column is-12">
      <div class="columns mt-10 bg-document">
        <div class="column is-1"></div>
        <div class="column is-10">
          <div class="toolbar"></div>
          <page v-for="page in pages" :key="page.index" :selected="page.selected"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Page from './editor/Page'
import Toolbar from './editor/Toolbar'
export default {
  components: {
    Page,
    Toolbar
  },
  data () {
    return {
      pages: [{ index: 1, selected: true, quill: null, ref: `page${this.index}` }]
    }
  },
  mounted () {
    let vm = this
    vm.$on('page_created', function (payload) {
      if (vm.pages.length === 1) {
        vm.pages[0].quill = payload.quill
      }
    })
  },
  methods: {
    newPage () {
      this.pages.push({index: 2, selected: false, quill: null, ref: `page${this.index}`})
    }
  }
}
</script>

<style lang="scss">
  .bg-document{
    background: #EEEEEE;
  }
</style>
