<template>
    <div class="columns max-height" :style="backgroundConfig">
        <div class="column is-2"></div>
        <div class="column is-3 mt-15 mt-lg-60">
            <div class="columns is-multiline">
                <div class="column is-12">
                    <h1 class="title is-3 has-text-left">Entre em sua conta e comece a usar.</h1>
                </div>
                <div class="column is-11">
                    <b-field label="Email" :type="$v.email.$anyError ? 'is-danger':''" :message="errors.email">
                        <b-input type="email" v-model="$v.email.$model" @input="$v.email.$reset" @blur="$v.email.$touch()"/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <b-field label="Senha" :type="$v.password.$anyError ? 'is-danger':''" :message="errors.password">
                        <b-input type="password" v-model="$v.password.$model" @blur="$v.password.$touch()" @input="$v.password.$reset"/>
                    </b-field>
                </div>
                <div class="column is-11">
                    <div class="columns is-vcentered">
                        <div class="column">
                            <span class="is-pulled-left is-primary"> Esqueci a minha senha </span>
                        </div>
                        <div class="column">
                            <button class="button is-pulled-right is-primary"> Entrar na minha conta </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Form from 'vform'
import { required, email, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: ''
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
      let errors = {}
      let vm = this.$v

      let exists = function (field, property) {
        return field.hasOwnProperty(property)
      }

      data.forEach(item => {
        let field = vm[item]

        if (field.$dirty) {
          if (!field.required && exists(field, 'required')) errors[item] = 'Campo Obrigatório'
          else if (!vm[item].email && exists(field, 'email')) errors[item] = 'Por favor, insira um endereço de email válido'
          else if (!vm[item].minLength && exists(field, 'minLength')) errors[item] = 'A senha deve conter pelo menos 8 caracteres'
          else if (!vm[item].maxLength && exists(field, 'maxLength')) errors[item] = 'A senha deve conter no máximo 32 caracteres'
        }
      })

      return errors
    }
  },
  methods: {
    async register () {
      if (!this.$v.$anyError && this.$v.$anyDirty) {
        let form = new Form(this.generateCredentials())

        let { data } = await form.post('http://localhost:8000/login')
        console.log(data)
      }
    },
    generateCredentials () {
      let data = ['email', 'password']
      let vm = this
      let credentials = {}

      data.forEach((el, i) => { credentials[el] = vm.$v[el].$model })
      return credentials
    }
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
