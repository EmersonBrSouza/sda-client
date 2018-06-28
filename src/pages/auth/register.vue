<template>
    <div class="columns max-height" :style="backgroundConfig">
        <div class="column is-2"></div>
        <div class="column is-3 mt-15 mt-lg-60">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title is-3 has-text-left text-white">Crie a sua conta agora. <br> É simples!</h1>
                </div>
                <div class="column is-11">
                    <b-field label="Nome" custom-class="text-white">
                        <b-input type="text"/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <b-field label="Email" custom-class="text-white">
                        <b-input type="email"/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <b-field label="Senha" custom-class="text-white">
                        <b-input type="password"/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <button class="button is-pulled-right is-primary"> Criar a minha conta! </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    backgroundConfig () {
      return {
        background: 'url(' + require(`@/assets/img/background-machine.jpg`) + ')',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat'
      }
    }
  }
}
</script>

<style lang="scss">
    .max-height{ height: 100vh; }
</style>
