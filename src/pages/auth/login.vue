<template>
    <div class="columns max-height" :style="backgroundConfig">
        <div class="column is-2"></div>
        <div class="column is-3 mt-15 mt-lg-60">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title is-3 has-text-left">Entre em sua conta e comece a usar.</h1>
                </div>
                <div class="column is-11">
                    <b-field label="Email" :type="errors.email ? 'is-danger':''" :message="errors.email">
                        <b-input type="email" v-model="$v.email.$model" @input="$v.email.$reset" @blur="$v.email.$touch()"/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <b-field label="Senha" :type="errors.password ? 'is-danger':''" :message="errors.password">
                        <b-input type="password" v-model="$v.password.$model" @blur="$v.password.$touch()" @input="$v.password.$reset" password-reveal/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <div class="columns is-vcentered">
                        <div class="column">
                            <router-link :to="{ name: 'password'}" class="is-pulled-left is-primary elegant-link"> Esqueci a minha senha </router-link>
                        </div>
                        <div class="column">
                            <button class="button is-pulled-right is-primary" @click="login"> Entrar na minha conta </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required, email, maxLength, minLength } from 'vuelidate/lib/validators'
import { auth, db } from '@/scripts/firebaseInit'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: '',
      externalErrors: []
    }
  },
  computed: {
    backgroundConfig () {
      return {
        background: 'url(' + require(`@/assets/img/bg-login.jpg`) + ')',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat'
      }
    },
    errors () {
      let data = ['email', 'password']
      let validators = ['required', 'email', 'minLength', 'maxLength']
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
    async login () {
      if (!this.$v.$anyError && this.$v.$anyDirty) {
        let vm = this
        let { email, password } = this.generateCredentials()

        auth.signInWithEmailAndPassword(email, password)
          .then(function (response) {
            var user = auth.currentUser

            db.collection('users').doc(user.uid).get()
              .then(function (doc) {
                if (doc.exists) {
                  let { name, description } = doc.data()
                  vm.fetchUser({user, name, description, firstLogin: false})
                  vm.$router.push({ name: 'dashboard' })
                }
              }).catch(function (error) {
                console.error('Error writing document: ', error)
              })
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
      let data = ['email', 'password']
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
        email: 'Por favor, insira um endereço de email válido',
        isAlpha: 'Números e símbolos especiais não são permitidos',
        minLength: 'A senha deve conter pelo menos 8 caracteres',
        maxLength: 'A senha deve conter no máximo 32 caracteres'
      }

      return messages[property]
    },
    ...mapActions(['fetchUser'])
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(32) }
  }
}
</script>

<style lang="scss">
    .max-height{ height: 100vh; }
</style>
