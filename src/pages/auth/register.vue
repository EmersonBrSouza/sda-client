<template>
    <div class="columns max-height" :style="backgroundConfig">
        <div class="column is-2"></div>
        <div class="column is-3 mt-15 mt-lg-60">
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
  data () {
    return {
      name: '',
      email: '',
      password: ''
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

      data.forEach(item => {
        let field = vm[item]

        if (!field.$dirty) return

        for (let i = 0; i < validators.length; i++) {
          console.log(validators[i])
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
