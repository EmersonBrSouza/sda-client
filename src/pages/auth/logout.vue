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
      }).catch(function (error) {
        vm.logout()
        error = null
      })
    },
    ...mapActions(['logout'])
  }
}
</script>
