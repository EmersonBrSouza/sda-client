<template>
    <div class="columns max-height" :style="backgroundConfig">
        <div class="column is-2"></div>
        <div class="column is-3 mt-15 mt-lg-60">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title is-3 has-text-left">Não se preocupe, vamos resolver.</h1>
                </div>
                <div class="column is-11" v-if='!mailSent'>
                    <b-field label="Nos diga qual é o seu email" :type="errors.email ? 'is-danger':''" :message="errors.email">
                        <b-input type="email" v-model="$v.email.$model" @input="$v.email.$reset" @blur="$v.email.$touch()" placeholder="exemplo@email.com"/>
                    </b-field>
                </div>
                <div class="column is-11" v-if='!mailSent'>
                    <div class="columns is-vcentered">
                        <div class="column">
                            <button class="button is-pulled-right is-primary" @click="send"> Enviar email de recuperação </button>
                        </div>
                    </div>
                </div>
                <div class="column is-11" v-if='mailSent'>
                    <div class="columns is-vcentered">
                      <div class="column is-12">
                        <h1 class="subtitle is-6 has-text-left">Agora você só precisar clicar no link que enviamos para o seu email: <strong>{{$v.email.$model}}</strong> </h1>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { auth } from '@/scripts/firebaseInit'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      mailSent: false,
      externalErrors: []
    }
  },
  computed: {
    backgroundConfig () {
      return {
        background: 'url(' + require(`@/assets/img/bg-forget.jpg`) + ')',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat'
      }
    },
    errors () {
      let data = ['email']
      let validators = ['required', 'email']
      let errors = {}
      let app = this
      let vm = this.$v

      let exists = function (field, property) {
        return field.hasOwnProperty(property)
      }

      if (this.externalErrors) {
        Object.assign(errors, this.externalErrors)
        this.clearExternalErrors()
      }

      data.forEach(item => {
        let field = vm[item]

        if (!field.$dirty) return

        for (let i = 0; i < validators.length; i++) {
          if (exists(field, validators[i]) && !field[validators[i]]) {
            errors[item] = app.getMessages(validators[i])
            return
          }
        }
      })

      return errors
    }
  },
  methods: {
    async send () {
      if (!this.$v.$anyError && this.$v.$anyDirty) {
        let vm = this
        let { email } = this.generateCredentials()

        auth.sendPasswordResetEmail(email)
          .then(function () {
            vm.mailSent = true
          })
          .catch(function (error) {
            console.log(error.code)
            switch (error.code) {
              case 'auth/user-not-found':
                vm.externalErrors = { email: 'Não existe uma conta cadastrada com esse email' }
                break
              case 'auth/invalid-email':
                vm.externalErrors = { email: vm.getMessages('email') }
                break
              case 'auth/user-disabled':
                vm.externalErrors = { email: 'Sua conta foi suspensa! Entre em contato com a nossa equipe para mais detalhes.' }
                break
              case 'auth/wrong-password':
                vm.externalErrors = { password: 'Senha incorreta' }
                break
            }
          })
      }
    },
    generateCredentials () {
      let data = ['email']
      let vm = this
      let credentials = {}

      data.forEach((el, i) => { credentials[el] = vm.$v[el].$model })
      return credentials
    },
    clearExternalErrors () {
      this.externalErrors = []
    },
    getMessages (property) {
      let messages = {
        required: 'Campo Obrigatório',
        email: 'Por favor, insira um endereço de email válido'
      }

      return messages[property]
    },
    ...mapActions(['fetchUser'])
  },
  validations: {
    email: { required, email }
  }
}
</script>

<style lang="scss">
    .max-height{ height: 100vh; }
</style>
