import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var initialPage = { index: 1, selected: true }
var font = [
  { name: 'Arial', fontName: "'Arial', sans-serif;", selected: true },
  { name: 'Bitter', fontName: "'Bitter', serif;", selected: false },
  { name: 'Catamaran', fontName: "'Catamaran', sans-serif;", selected: false },
  { name: 'IM Fell English SC', fontName: "'IM Fell English SC', serif;", selected: false },
  { name: 'Indie Flower', fontName: "'Indie Flower', cursive;", selected: false },
  { name: 'Nunito', fontName: "'Nunito', sans-serif;", selected: false },
  { name: 'Raleway', fontName: "'Raleway', sans-serif;", selected: false },
  { name: 'Roboto', fontName: "'Roboto', sans-serif;", selected: false }
]

export const store = new Vuex.Store({
  state: {
    pages: [ initialPage ],
    fonts: font
  },
  getters: {
    pages: state => state.pages,
    quill: state => state.pages.filter(item => item.selected)[0],
    fonts: state => state.fonts,
    selectedFont: state => state.fonts.filter(item => item.selected)[0]
  },
  actions: {
    createPage ({ commit }) {
      commit('CREATE_PAGE')
    },
    updatePage ({ commit }, payload) {
      commit('UPDATE_PAGE', payload)
    },
    selectQuill ({ commit }, payload) {
      commit('SET_QUILL', payload)
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
    SET_QUILL (state, payload) {
      state.pages.map(item => {
        item.selected = false
        if (item.index === payload) item.selected = true
      })
    }
  }
})
