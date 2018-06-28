<template>
  <div id="app" class="flex-grow">
    <custom-header/>
    <div class="columns">
      <div class="column is-12">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import CustomHeader from '@/components/layout/Header'
import SideMenu from '@/components/app/SideMenu'
import ProjectCard from '@/components/cards/Project'

export default {
  name: 'App',
  components: {
    CustomHeader,
    SideMenu,
    ProjectCard
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/app.scss';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
