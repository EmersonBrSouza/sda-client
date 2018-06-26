<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <toolbar/>
    </div>
    <div class="column is-12">
      <div class="columns mt-10 bg-document">
        <div class="column is-1"></div>
        <div class="column is-10">
          <div class="toolbar"><button @click="createPage"> Nova Página </button></div>
          <page v-for="page in pages" :key="page.index" :selected="page.selected" :index="page.index"  @click.native="selectQuill(page.index)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Page from './editor/Page'
import Toolbar from './editor/Toolbar'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Page,
    Toolbar
  },
  computed: {
    ...mapGetters(['quill', 'pages'])
  },
  methods: {
    ...mapActions(['selectQuill', 'createPage'])
  }
}
</script>

<style lang="scss">
  .bg-document{
    background: #EEEEEE;
  }
</style>
