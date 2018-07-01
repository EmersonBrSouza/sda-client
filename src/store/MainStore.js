import Vue from 'vue'
import Vuex from 'vuex'
import {pages} from './modules/PageStore'
import {users} from './modules/UserStore'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    pages,
    users
  },
  plugins: [createPersistedState()]
})
