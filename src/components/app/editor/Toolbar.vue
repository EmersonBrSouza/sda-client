<template>
  <div class="toolbar columns">
    <div class="column is-2-fullhd is-3-desktop">
      <div class="columns right-line">
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
            <b-input type="number" min="1"></b-input>
          </b-field>
        </div>
      </div>
    </div>
    <div class="column is-2-fullhd is-4-desktop">
      <div class="columns right-line">
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
                <b-dropdown v-model="isPublic">
                  <button class="button" type="button" slot="trigger">
                      <template v-if="isPublic">
                          <b-icon icon="align-left"></b-icon>
                      </template>
                      <template v-else>
                          <b-icon icon="align-right"></b-icon>
                      </template>
                      <b-icon icon="caret-down"></b-icon>
                  </button>

                  <b-dropdown-item :value="true">
                      <div class="media">
                          <b-icon class="media-left" icon="align-left"></b-icon>
                          <div class="media-content">
                              <h3>Esquerda</h3>
                          </div>
                      </div>
                  </b-dropdown-item>

                  <b-dropdown-item :value="false">
                      <div class="media">
                          <b-icon class="media-left" icon="align-right"></b-icon>
                          <div class="media-content">
                              <h3>Direita</h3>
                          </div>
                      </div>
                  </b-dropdown-item>

                  <b-dropdown-item :value="false">
                      <div class="media">
                          <b-icon class="media-left" icon="align-center"></b-icon>
                          <div class="media-content">
                              <h3>Centralizado</h3>
                          </div>
                      </div>
                  </b-dropdown-item>

                  <b-dropdown-item :value="false">
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
              <button class="button">
                <b-icon icon="palette"></b-icon>
              </button>
            </div>
          </div>
        </div>
        <div class="column is-1 pl-0">
          <div class="columns is-multiline">
            <div class="column is-12 pb-0 pl-0 mb-10">
              <span class="label menu-label">PDF</span>
            </div>
            <div class="column is-12 pt-0 pl-0">
              <button class="button">
                <b-icon icon="download"></b-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      bold: false,
      italic: false,
      underline: false
    }
  },
  computed: {
    className () {
      return this.selectedFont.name.split(' ').join('')
    },
    ...mapGetters(['fonts', 'selectedFont', 'selectedFontIndex'])
  },
  methods: {
    selectFont (fontName) {
      console.log(fontName)
      this.setFont(fontName)
    },
    toggle (property) {
      this[property] = !this[property]
    },
    ...mapActions(['setFont'])
  }
}
</script>

<style lang='scss'>
  .toolbar{
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .right-line{
    border-right: 1px solid #eee;
  }
  .button.enabled{
    border: 1px solid green
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
