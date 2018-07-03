import Vue from 'vue'
import Vuex from 'vuex'
import {pages} from './modules/PageStore'
import {users} from './modules/UserStore'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const vuexCookie = new VuexPersistence({
  restoreState: (key, storage) => Cookies.getJSON(key),
  saveState: (key, state, storage) => Cookies.set(key, state, {
    expires: 3
  }),
  modules: ['users'], // only save user module
  filter: (mutation) => (mutation.type === 'FETCH_USER')
})

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
//   reducer: state => ({navigation: state.navigation}), // only save navigation module
//   filter: mutation => (mutation.type == 'addNavItem')
// })

export const store = new Vuex.Store({
  modules: {
    pages,
    users
  },
  plugins: [vuexCookie.plugin]
})
