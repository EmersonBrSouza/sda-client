<template>
    <div class="columns max-height" :style="backgroundConfig">
        <div class="column is-2"></div>
        <div class="column is-3-fullhd is-4-desktop mt-15 mt-lg-60">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title is-3 has-text-left">Crie a sua conta agora. <br> É simples!</h1>
                </div>
                <div class="column is-11">
                    <b-field label="Nome" :type="errors.name ? 'is-warning': ''" :message="errors.name">
                        <b-input type="text" v-model='$v.name.$model' @input="$v.name.$reset" @blur="$v.name.$touch()"/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <b-field label="Email" :type="errors.email ? 'is-warning': ''" :message="errors.email">
                        <b-input type="email" v-model='$v.email.$model' @input="$v.email.$reset" @blur="$v.email.$touch()"/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <b-field label="Senha" :type="errors.password ? 'is-warning': ''" :message="errors.password">
                        <b-input type="password" v-model='$v.password.$model' @input="$v.password.$reset" @blur="$v.password.$touch()"/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <button class="button is-pulled-right is-primary" @click="register" :disabled="isLoading">
                      <b-icon icon="spinner" class="fa-spin" v-if="isLoading"></b-icon>
                      <span> Criar a minha conta! </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { isAlpha } from '@/scripts/global/validators'
import { required, email, maxLength, minLength } from 'vuelidate/lib/validators'
import { auth, db } from '@/scripts/firebaseInit'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      externalErrors: [],
      isLoading: false
    }
  },
  computed: {
    backgroundConfig () {
      return {
        background: 'url(' + require(`@/assets/img/background-register2.jpg`) + ')',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat'
      }
    },
    errors () {
      let data = ['name', 'email', 'password']
      let validators = ['required', 'email', 'isAlpha', 'minLength', 'maxLength']
      let errors = {}
      let vm = this.$v
      let app = this

      let exists = (field, property) => { return field.hasOwnProperty(property) }

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
    async register () {
      if (!this.$v.$anyError && this.$v.$anyDirty) {
        let vm = this
        let { name, email, password } = this.generateCredentials()
        this.isLoading = true

        auth.createUserWithEmailAndPassword(email, password)
          .then(function (response) {
            var user = auth.currentUser

            db.collection('users').doc(user.uid).set({
              token: user.uid,
              name: name,
              email: email,
              notifications: []
            }).then(function () {
              vm.isLoading = false
              vm.fetchUser({user, name, firstLogin: true})
              vm.$router.push({ name: 'login' })
            }).catch(function (error) {
              console.error('Error writing document: ', error)
            })
          })
          .catch(function (error) {
            vm.isLoading = false
            switch (error.code) {
              case 'auth/email-already-in-use':
                vm.externalErrors = { email: 'Já existe uma conta cadastrada com este email.' }
                break
              case 'auth/invalid-email':
                vm.externalErrors = { email: vm.getMessages('email') }
                break
              case 'auth/operation-not-allowed':
                vm.externalErrors = { email: 'Sua conta foi suspensa! Entre em contato com a nossa equipe para mais detalhes.' }
                break
              case 'auth/weak-password':
                vm.externalErrors = { password: 'A senha informada é fraca. Tente uma combinação mais segura.' }
                break
            }
          })
      }
    },
    generateCredentials () {
      let data = ['name', 'email', 'password']
      let vm = this
      let credentials = {}

      data.forEach((el, i) => { credentials[el] = vm.$v[el].$model })
      return credentials
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
    clearExternalErrors () {
      this.externalErrors = []
    },
    ...mapActions(['fetchUser'])
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
