<template>
  <div class="columns mt-0">
    <div class="column is-3 is-2-fullhd">
      <side-menu/>
    </div>
    <div class="column is-7">
      <slot/>
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/app/SideMenu'

export default {
  components: {
    SideMenu
  }
}
</script>
