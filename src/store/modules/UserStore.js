export const users = {
  state: {
    user: {},
    username: '',
    description: '',
    firstLogin: false
  },
  getters: {
    isLogged: state => {
      if (!state.user) {
        return false
      } else if (Object.keys(state.user).length === 0) {
        return false
      } else return true
    },
    getUsername: state => state.username,
    getUser: state => state.user
  },
  actions: {
    fetchUser ({ commit }, user) {
      commit('FETCH_USER', user)
    },
    logout ({ commit }) {
      commit('LOGOUT')
    }
  },
  mutations: {
    FETCH_USER (state, user) {
      state.user = user.user
      state.username = user.name
      state.firstLogin = user.firstLogin
      state.description = user.description
    },
    LOGOUT (state) {
      state.user = {}
      state.username = ''
      state.description = ''
      state.firstLogin = false
    }
    // SET_FONT (state, payload) {
    //   state.fonts.map(item => {
    //     item.selected = false
    //     if (item.index === payload) item.selected = true
    //   })
    // }
  }
}
