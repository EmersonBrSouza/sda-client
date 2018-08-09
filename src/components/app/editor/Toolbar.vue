<template>
  <div class="toolbar columns dynamic-fix">
    <div class="column is-2-fullhd is-3-desktop">
      <div class="columns">
        <div class="column is-6 pr-0">
          <b-field label="Fonte" custom-class="menu-label mb-5">
            <b-select :class="className" v-model="selectedFontIndex" @input="selectFont">
                <option v-for="font in fonts" :key="font.index" :value="font.index">
                  <span > {{ font.name }} </span>
                </option>
            </b-select>
          </b-field>
        </div>
        <div class="column is-6 pl-10">
          <b-field label="Tamanho" custom-class="menu-label mb-5">
            <b-select v-model="fontSize" @input="selectFontSize">
                <option v-for="font in fontSizes" :key="font.index" :value="font.size">
                  <span > {{ font.size }} </span>
                </option>
            </b-select>
          </b-field>
        </div>
      </div>
    </div>
    <div class="column is-3-fullhd is-4-desktop">
      <div class="columns">
        <div class="column is-4 pr-0">
          <div class="columns is-multiline">
            <div class="column is-12 pb-0 mb-10">
              <span class="label menu-label">Estilo</span>
            </div>
            <div class="column is-12 pt-0">
              <button class="button" :class="{'enabled':bold}" @click="toggle('bold')">
                <b-icon icon="bold"></b-icon>
              </button>
              <button class="button" :class="{'enabled':italic}" @click="toggle('italic')">
                <b-icon icon="italic"></b-icon>
              </button>
              <button class="button" :class="{'enabled':underline}" @click="toggle('underline')">
                <b-icon icon="underline"></b-icon>
              </button>
            </div>
          </div>
        </div>
        <div class="column is-4 pl-10">
          <div class="columns is-multiline">
            <div class="column is-12 pb-0 mb-10">
              <span class="label menu-label">Alinhamento</span>
            </div>
            <div class="column is-12 pt-0">
                <b-dropdown v-model="align">
                  <button class="button" type="button" slot="trigger">
                      <template v-if="align === 'left'">
                          <b-icon icon="align-left"></b-icon>
                      </template>
                      <template v-else-if="align === 'right'">
                          <b-icon icon="align-right"></b-icon>
                      </template>
                      <template v-else-if="align === 'center'">
                          <b-icon icon="align-center"></b-icon>
                      </template>
                      <template v-else-if="align === 'justify'">
                          <b-icon icon="align-justify"></b-icon>
                      </template>
                      <b-icon icon="caret-down"></b-icon>
                  </button>

                  <b-dropdown-item :value="align === 'left'" @click="selectAlign('left')">
                      <div class="media">
                          <b-icon class="media-left" icon="align-left"></b-icon>
                          <div class="media-content">
                              <h3>Esquerda</h3>
                          </div>
                      </div>
                  </b-dropdown-item>

                  <b-dropdown-item :value="align === 'right'" @click="selectAlign('right')">
                      <div class="media">
                          <b-icon class="media-left" icon="align-right"></b-icon>
                          <div class="media-content">
                              <h3>Direita</h3>
                          </div>
                      </div>
                  </b-dropdown-item>

                  <b-dropdown-item :value="align === 'center'" @click="selectAlign('center')">
                      <div class="media">
                          <b-icon class="media-left" icon="align-center"></b-icon>
                          <div class="media-content">
                              <h3>Centralizado</h3>
                          </div>
                      </div>
                  </b-dropdown-item>

                  <b-dropdown-item :value="align === 'justify'" @click="selectAlign('justify')">
                      <div class="media">
                          <b-icon class="media-left" icon="align-justify"></b-icon>
                          <div class="media-content">
                              <h3>Justificado</h3>
                          </div>
                      </div>
                  </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
        <div class="column is-2 pl-0">
          <div class="columns is-multiline">
            <div class="column is-12 pb-0 mb-10">
              <span class="label menu-label">Cor</span>
            </div>
            <div class="column is-12 pt-0">
              <button class="button" @click="toggle('showPicker')">
                <b-icon icon="palette" :style="{color: colors}"></b-icon>
              </button>
              <chrome-picker :value="colors" v-if="showPicker" class="color-picker" @input="updateColor"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueColor from 'vue-color'

export default {
  data () {
    return {
      bold: false,
      italic: false,
      underline: false,
      align: 'left',
      colors: '#000',
      showPicker: false,
      fontSize: 12
    }
  },
  components: {
    'chrome-picker': VueColor.Chrome
  },
  computed: {
    className () {
      return this.selectedFont.name.split(' ').join('')
    },
    ...mapGetters(['fonts', 'fontSizes', 'selectedFont', 'selectedFontIndex', 'selectedFontSize'])
  },
  methods: {
    selectFont (fontName) {
      this.setFont(fontName)
    },
    selectAlign (align) {
      this.align = align
      this.setAlign(align)
      if (align === 'left') this.setAlign('justify')
    },
    toggle (property) {
      let styles = ['italic', 'bold', 'underline']
      this[property] = !this[property]
      if (styles.includes(property)) this.updateFontStyle({ property: property, value: this[property] })
    },
    updateColor (data) {
      this.colors = data.hex
      this.setColor(data.hex)
    },
    selectFontSize () {
      this.setFontSize(this.fontSize)
    },
    ...mapActions(['setAlign', 'setFont', 'setFontSize', 'setColor', 'updateFontStyle'])
  }
}
</script>

<style lang='scss'>
  .toolbar{
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .fix-top{
    position: fixed;
    background-color: white;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    z-index: 10;
    width: 100%;
    left: 0;
    box-shadow: 0px 0px 3px rgba(0,0,0,.6);
  }
  .right-line{
    border-right: 1px solid #eee;
  }
  .button.enabled{
    border: 2px solid #7957d5;
  }
  .color-picker{
    z-index: 10001;
  }

  .Arial > * > *{ font-family: 'Arial', sans-serif; }
  .Bitter > * > * { font-family: 'Bitter', serif; }
  .Catamaran > * > * { font-family: 'Catamaran', sans-serif; }
  .IMFellEnglishSC > * > * { font-family: 'IM Fell English SC', sans-serif; }
  .IndieFlower > * > * { font-family: 'Indie Flower', cursive; }
  .Nunito > * > * { font-family: 'Nunito', sans-serif; }
  .Raleway > * > * { font-family: 'Raleway', sans-serif; }
  .Roboto > * > * { font-family: 'Roboto', sans-serif; }
</style>
