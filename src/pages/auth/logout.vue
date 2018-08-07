<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex'
import { auth } from '@/scripts/firebaseInit'
export default {
  mounted () {
    this.exit()
  },
  methods: {
    exit () {
      let vm = this
      auth.signOut().then(function () {
        vm.logout()
        vm.$router.push({ name: 'home' })
      }).catch(function (error) {
        vm.$router.push({ name: 'home' })
        vm.logout()
        error = null
      })
    },
    ...mapActions(['logout'])
  }
}
</script>
