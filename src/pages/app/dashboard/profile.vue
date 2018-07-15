<template>
  <admin-layout>
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title is-4">Perfil de {{ getUsername|capitalize }}</h1>
      </div>
      <div class="column is-12">
        <div class="columns is-multiline">
          <div class="column is-4">
            <h1 class="mb-15">Dados Pessoais</h1>
            <b-field label="Nome">
              <b-input type="text" :value="getUsername"/>
            </b-field>
            <b-field label="Fale um pouco sobre você">
              <b-input type="textarea" maxlength="500"/>
            </b-field>
            <button class="button is-pulled-right is-primary"> Salvar Alterações </button>
          </div>
          <div class="column is-2"></div>
          <div class="column is-6">
            <h1>Suas notificações</h1>
            <div class="columns is-multiline">
              <div v-if="!notifications" class="column is-12 has-text-centered mt-30">
                <b-message>
                  Não existem notificações no momento.
                </b-message>
              </div>
              <div v-else class="column is-12 has-text-centered mt-30" v-for="(notification, index) in notifications" :key="index">
                <invite-notification
                  v-if="notification.type == 'INVITE'"
                  :id="notification.index"
                  :emitter="notification.emitter"
                  :project="notification.project"
                  @response="responseInvite"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '@/layouts/admin'
import InviteNotification from '@/components/admin/notifications/Invite'

import { db, firestore } from '@/scripts/firebaseInit'
import { mapGetters } from 'vuex'

export default {
  components: {
    AdminLayout,
    InviteNotification
  },
  computed: {
    ...mapGetters(['getUser', 'getUsername'])
  },
  created () {
    this.getNotifications()
  },
  data () {
    return {
      notifications: []
    }
  },
  filters: {
    capitalize (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods: {
    getNotifications () {
      // let notificationStructure = { emitter: { name: Emerson, id: Sei la}, project: {title: 'Título doido', id: 'token'}, type: 'INVITE', alreadyRead: false}
      let vm = this
      db.collection('users')
        .doc(`${this.getUser.uid}`)
        .get()
        .then(function (doc) {
          if (!doc.exists) return
          let result = doc.data().notifications.filter((notification, index) => {
            if (!notification.alreadyRead) {
              notification.index = index
              return notification
            }
          })
          vm.notifications = result
        })
    },
    responseInvite (payload) {
      let docRef = db.collection('projects').doc(`${payload.project.id}`)
      let getter = `members.${this.getUser.uid}`

      if (payload.response) {
        let data = JSON.parse(`{"${getter}":${payload.response}}`)
        docRef.update(data)
      } else {
        let data = JSON.parse(`{"${getter}": ""}`)
        data[getter] = firestore.FieldValue.delete()
        docRef.update(data)
      }

      this.resetNotification(payload.id)
    },
    resetNotification (notificationId) {
      let dbRef = db.collection('users').doc(this.getUser.uid)
      let vm = this

      db.runTransaction((t) => {
        return t.get(dbRef).then((doc) => {
          if (!doc.exists) return

          let notifications = doc.data().notifications || []
          notifications[notificationId].alreadyRead = true
          t.set(dbRef, { notifications: notifications }, { merge: true })
          vm.getNotifications()
        })
      })
    }
  }
}
</script>
