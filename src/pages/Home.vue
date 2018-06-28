<template>
    <div class="columns max-height is-centered" :style="backgroundConfig">
        <div class="column is-4 mt-15 mt-lg-60">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <vue-typer :text="text"
                               repeat="0"
                               erase-style='backspace'
                               erase-delay='70'
                               @erased='changeText'
                               :class="['title is-3 has-text-left']"/>
                </div>
                <!-- <div class="column is-11">
                    <b-field label="Email">
                        <b-input type="email"/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <b-field label="Senha">
                        <b-input type="password"/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <button class="button is-pulled-right is-primary"> Entrar na minha conta </button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { VueTyper } from 'vue-typer'

export default {
  data () {
    return {
      text: 'Frase de Efeito 1'
    }
  },
  components: {
    VueTyper
  },
  computed: {
    backgroundConfig () {
      return {
        background: 'url(' + require(`@/assets/img/bg-home.jpg`) + ')',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat'
      }
    }
  },
  methods: {
    changeText () { this.text = 'Frase de Efeito 2' }
  }
}
</script>

<style lang="scss">
    .max-height{ height: 100vh; }
</style>
