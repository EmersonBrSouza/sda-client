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
    color: '#000',
    fontSize: '12',
    fontStyle: { italic: false, bold: false, underline: false },
    align: 'left'
  },
  getters: {
    pages: state => state.pages,
    selectedPage: state => state.pages.filter(item => item.selected)[0],
    fonts: state => state.fonts,
    selectedFont: state => state.fonts.filter(item => item.selected)[0],
    selectedFontIndex: state => state.fonts.filter(item => item.selected)[0].index,
    selectedColor: state => state.color,
    selectedFontSize: state => state.fontSize + 'px',
    bold: state => state.fontStyle.bold,
    italic: state => state.fontStyle.italic,
    underline: state => state.fontStyle.underline,
    selectedAlign: state => state.align
  },
  actions: {
    createPage ({ commit }) {
      commit('CREATE_PAGE')
    },
    deletePage ({ commit }, payload) {
      commit('DELETE_PAGE', payload)
    },
    selectPage ({ commit, getters }, payload) {
      if (getters.selectedPage.index === payload) return
      commit('SET_SELECTED_PAGE', payload)
    },
    setFont ({ commit }, payload) {
      commit('SET_FONT', payload)
    },
    setColor ({ commit }, payload) {
      commit('SET_COLOR', payload)
    },
    setFontSize ({ commit }, payload) {
      commit('SET_FONT_SIZE', payload)
    },
    setAlign ({ commit }, payload) {
      commit('SET_ALIGN', payload)
    },
    updateFontStyle ({ commit }, payload) {
      commit('SET_FONT_STYLE', payload)
    }
  },
  mutations: {
    CREATE_PAGE (state) {
      let maxIndex = Math.max.apply(Math, state.pages.map(item => item.index)) + 1
      state.pages.push({ index: maxIndex, selected: false })
    },
    DELETE_PAGE (state, payload) {
      let nextSelected = function () {
        let minDiff = Number.MAX_SAFE_INTEGER

        for (let i = 0; i < state.pages.length; i++) {
          let isLessThanPayload = Math.abs(payload - state.pages[i].index) < minDiff
          let notSameIndex = state.pages[i].index !== payload

          if (isLessThanPayload && notSameIndex) {
            minDiff = state.pages[i].index
          }
        }
        return minDiff
      }
      state.pages = state.pages.filter(item => {
        if (item.index === nextSelected()) item.selected = true
        if (item.index !== payload || state.pages.length === 1) return item
      })
    },
    SET_SELECTED_PAGE (state, payload) {
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
    SET_ALIGN (state, payload) {
      state.align = payload
    },
    SET_COLOR (state, payload) {
      state.color = payload
    },
    SET_FONT_SIZE (state, payload) {
      state.fontSize = payload
    },
    SET_FONT_STYLE (state, payload) {
      state.fontStyle[payload.property] = payload.value
    }
  }
}
