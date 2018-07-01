export const users = {
  state: {
    user: {},
    username: '',
    firstLogin: false
  },
  getters: {
    isLogged: state => { return Object.keys(state.user).length !== 0 }
  },
  actions: {
    fetchUser ({ commit }, user) {
      commit('FETCH_USER', user)
    }
  },
  mutations: {
    FETCH_USER (state, user) {
      state.user = user.user
      state.username = user.name
      state.firstLogin = user.firstLogin
    }
    // SET_FONT (state, payload) {
    //   state.fonts.map(item => {
    //     item.selected = false
    //     if (item.index === payload) item.selected = true
    //   })
    // }
  }
}
