var initialPage = { index: 1, selected: true }
var font = [
  { index: 1, name: 'Arial', fontName: "'Arial', sans-serif;", selected: true },
  { index: 2, name: 'Bitter', fontName: "'Bitter', serif;", selected: false },
  { index: 3, name: 'Catamaran', fontName: "'Catamaran', sans-serif;", selected: false },
  { index: 4, name: 'IM Fell English SC', fontName: "'IM Fell English SC', serif;", selected: false },
  { index: 5, name: 'Indie Flower', fontName: "'Indie Flower', cursive;", selected: false },
  { index: 6, name: 'Nunito', fontName: "'Nunito', sans-serif;", selected: false },
  { index: 7, name: 'Raleway', fontName: "'Raleway', sans-serif;", selected: false },
  { index: 8, name: 'Roboto', fontName: "'Roboto', sans-serif;", selected: false }
]

export const pages = {
  state: {
    pages: [ initialPage ],
    fonts: font,
    color: '#000'
  },
  getters: {
    pages: state => state.pages,
    quill: state => state.pages.filter(item => item.selected)[0],
    fonts: state => state.fonts,
    selectedFont: state => state.fonts.filter(item => item.selected)[0],
    selectedFontIndex: state => state.fonts.filter(item => item.selected)[0].index,
    selectedColor: state => state.color
  },
  actions: {
    createPage ({ commit }) {
      commit('CREATE_PAGE')
    },
    updatePage ({ commit }, payload) {
      commit('UPDATE_PAGE', payload)
    },
    deletePage ({ commit }, payload) {
      commit('DELETE_PAGE', payload)
    },
    selectQuill ({ commit, getters }, payload) {
      if (getters.quill.index === payload) return
      commit('SET_QUILL', payload)
    },
    setFont ({ commit }, payload) {
      commit('SET_FONT', payload)
    },
    setColor ({ commit }, payload) {
      commit('SET_COLOR', payload)
    }
  },
  mutations: {
    CREATE_PAGE (state) {
      let maxIndex = Math.max.apply(Math, state.pages.map(item => item.index)) + 1
      state.pages.push({ index: maxIndex, selected: false })
    },
    UPDATE_PAGE (state, payload) {
      state.pages.map(item => {
        if (item.index === payload.index) Object.assign(item, payload)
      })
    },
    DELETE_PAGE (state, payload) {
      state.pages = state.pages.filter(item => {
        if (item.index !== payload || state.pages.length === 1) return item
      })
    },
    SET_QUILL (state, payload) {
      state.pages.map(item => {
        item.selected = false
        if (item.index === payload) {
          item.selected = true
        }
      })
    },
    SET_FONT (state, payload) {
      state.fonts.map(item => {
        item.selected = false
        if (item.index === payload) item.selected = true
      })
    },
    SET_COLOR (state, payload) {
      state.color = payload
    }
  }
}
