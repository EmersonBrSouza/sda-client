// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import 'animate.css/animate.css'
import { store } from './store/MainStore'
import Vuelidate from 'vuelidate'
import VueSocketio from 'vue-socket.io'
import VueTimers from 'vue-timers'

Vue.config.productionTip = false
Vue.use(Buefy, { defaultIconPack: 'fas' })
Vue.use(VueSocketio, 'http://localhost:3000')
Vue.use(Vuelidate)
Vue.use(VueTimers)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
