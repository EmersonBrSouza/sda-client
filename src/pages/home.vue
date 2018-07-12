<template>
    <div class="columns max-height is-centered" :style="backgroundConfig">
        <div class="column is-5-fullhd is-7-desktop">
            <div class="columns is-multiline mt-90">
                <div class="column is-12 has-text-centered">
                    <vue-typer :text="typer.texts"
                               :repeat="0"
                               erase-style='backspace'
                               :erase-delay='40'
                               :type-delay='70'
                               :pre-erase-delay='3000'
                               @typed='toggleCitation'
                               @erased='toggleCitation'
                               @completed='showButton'
                               :class="['handlee']"/>
                </div>
                <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="{ enter: 5900, leave: 800 }">
                    <div class="column is-12 has-text-right" v-if="typer.showCitation" :key="save">
                        <span> - Johann Goethe</span>
                    </div>
                 </transition>
                <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="{ enter: 5900, leave: 800 }">
                    <div class="column is-12 has-text-centered" v-if="typer.showButton" >
                        <router-link v-if="!isLogged" :to="{ name: 'register' }" class="button is-primary"> Crie a sua conta agora! </router-link>
                        <router-link v-else :to="{ name: 'dashboard' }" class="button is-primary"> Crie um texto agora! </router-link>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { VueTyper } from 'vue-typer'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      typer: {
        texts: ['"Uma palavra escrita é semelhante \n a uma pérola."', 'Cuide bem do seu tesouro.\n Use {{ Nome do Aplicativo }}!'],
        showCitation: false,
        showButton: false,
        count: 0
      }
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
    },
    ...mapGetters(['isLogged'])
  },
  methods: {
    toggleCitation () {
      if (this.typer.count === 0) {
        this.typer.showCitation = !this.typer.showCitation
        this.typer.count++
      } else {
        this.typer.showCitation = false
      }
    },
    showButton () {
      this.typer.showButton = true
    }
  }
}
</script>

<style lang="scss">
    .max-height{ height: 100vh; }
    .handlee {
        font-family: 'Handlee', cursive; font-size: 3rem;
    }
    .animated {
      animation-duration: 3s;
      animation-fill-mode: both;
    }
</style>
