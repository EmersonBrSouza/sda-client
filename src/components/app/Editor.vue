<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <toolbar/>
    </div>
    <div class="column is-12">
      <div class="columns mt-10 bg-document">
        <div class="column is-1"></div>
        <div class="column is-10">
          <div class="toolbar"><button @click="pingServer"> Nova Página </button></div>
          <page v-for="page in pages" :key="page.index" :selected="page.selected" :index="page.index"  @click.native="selectPage(page.index)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Page from './editor/Page'
import Toolbar from './editor/Toolbar'
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'

$(window).on('scroll', function (e) {
  var fix = $('.dynamic-fix')
  var navbarHeight = $('.is-fixed-top').height()

  if ($(window).scrollTop() > navbarHeight - 50) {
    fix.css('top', navbarHeight)
    fix.addClass('fix-top')
  } else {
    fix.removeClass('fix-top')
  }
})
export default {
  components: {
    Page,
    Toolbar
  },
  computed: {
    ...mapGetters(['selectedPage', 'pages'])
  },
  methods: {
    ...mapActions(['selectPage', 'createPage', 'deletePage'])
  },
  mounted () {
    let vm = this

    vm.$on('fullPage', function (data) {
      vm.createPage()
    })

    vm.$on('deleteBlank', function (data) {
      vm.deletePage(data.index)
    })
  }
}
</script>

<style lang="scss">
  .bg-document{
    background: #EEEEEE;
  }
</style>
