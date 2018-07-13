<template>
    <b-modal :active="open" has-modal-card @close="closeModal">
        <div class="card">
            <div class="card-header">
                <p class="title is-4 pv-10 ml-10">
                    Novo Documento
                </p>
            </div>
            <div class="card-content">
                <div class="columns is-multiline">
                    <div class="column is-6">
                        <b-field label="Título do Documento"
                            :type ="errors.title ? 'is-danger': ''"
                            :message="errors.title">
                            <b-input maxlength="100" v-model="title"></b-input>
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <div class="columns">
                            <div class="column is-7">
                                <b-field label="Convidar Membros"
                                         :type ="errors.email ? 'is-danger': ''"
                                         :message="errors.email">
                                    <b-input type="email" placeholder="membro@email.com" v-model="member" @keydown.enter.native="addMember"></b-input>
                                </b-field>
                            </div>
                        </div>
                    </div>
                    <div class="column is-12">
                        <h1> Convidados </h1>
                        <div class="columns is-multiline">
                            <div class="column is-10">
                                <b-tag size="is-medium"
                                       class="is-info mr-10 mt-5"
                                       :closable="true" v-for="(person,index) in members"
                                       :key="index"
                                       @close = removeMember(person.email)>
                                    {{ person.email }}
                                </b-tag>
                            </div>
                        </div>
                    </div>
                    <div class="column is-12">
                        <button class="button is-primary is-pulled-right" @click="createDocument">
                          <span>Criar o documento</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>

<script>
import { db, firestore } from '@/scripts/firebaseInit'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      title: '',
      members: [],
      member: '',
      errors: {}
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    },
    addMember () {
      this.checkEmailOnServer(this.member)
    },
    createDocument () {
      this.errors.title = ''
      if (this.title.length === 0) {
        this.errors = {title: 'Dê um título ao documento'}
        return
      }

      let data = {}

      data.title = this.title
      data.members = this.parseMembers()
      data.createdAt = firestore.FieldValue.serverTimestamp()

      db.collection('projects')
        .add(data)
        .then(function (doc) {
          console.log(doc.id)
        })
    },
    checkEmailOnServer (email) {
      if (email === this.getUser.email || this.members.includes(email)) return
      let vm = this
      // let response = await db.collection('users').where('email', '==', email).get()
      db.collection('users')
        .where('email', '==', email)
        .get()
        .then(function (querySnapshot) {
          if (querySnapshot.size === 0) {
            vm.errors = {email: 'Usuário não encontrado'}
            return
          }
          querySnapshot.forEach(doc => {
            vm.errors = {email: ''}
            vm.members.push({email: email, token: doc.data().token})
            vm.member = ''
          })
        })
    },
    parseMembers () {
      let stringify = ''
      this.members.forEach(function (el) {
        stringify += '"' + el.token + '": false,'
      })
      stringify = `{ ${stringify} "${this.getUser.uid}":true }`
      console.log(stringify)
      return JSON.parse(stringify)
    },
    removeMember (email) {
      this.members = this.members.filter((item) => { if (item.email !== email) return item })
    }
  }
}
</script>
