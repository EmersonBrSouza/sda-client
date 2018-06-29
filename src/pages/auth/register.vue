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
                        <b-input type="text" v-model='$v.name.$model'/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <b-field label="Email" custom-class="text-white">
                        <b-input type="email" v-model='$v.email.$model'/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <b-field label="Senha" custom-class="text-white">
                        <b-input type="password" v-model='$v.password.$model'/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <button class="button is-pulled-right is-primary" @click="register"> Criar a minha conta! </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Form from 'vform'
import { isAlpha } from '@/scripts/global/validators'
import { required, email, maxLength, minLength } from 'vuelidate/lib/validators'
export default {
  computed: {
    backgroundConfig () {
      return {
        background: 'url(' + require(`@/assets/img/background-machine.jpg`) + ')',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat'
      }
    }
  },
  methods: {
    async register () {
      if (!this.$v.$anyError && this.$v.$anyDirty) {
        let form = new Form(this.generateCredentials())

        let { data } = await form.post('http://localhost:8000/register')

        console.log(data)
      }
    },
    generateCredentials () {
      let data = ['name', 'email', 'password']
      let vm = this
      let credentials = {}

      data.forEach((el, i) => { credentials[el] = vm.$v[el].$model })
      return credentials
    }
  },
  validations: {
    name: { required, isAlpha },
    email: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(32) }
  }
}
</script>

<style lang="scss">
    .max-height{ height: 100vh; }
</style>
