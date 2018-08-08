<template>
  <div class="column is-4">
    <div class="card">
      <header class="card-header no-shadow">
        <p class="card-header-title">
          {{ title }}
        </p>
      </header>
      <div class="card-content pv-10">
        <div class="media">
            <div class="media-content">
                <div class="columns is-multiline">
                  <div class="column is-12 pb-0">
                    <p class="subtitle is-6">
                      <b-icon size="is-small" icon="eye"></b-icon>
                      <span>{{ views }} views</span>
                    </p>
                  </div>
                  <div class="column is-12">
                    <p class="subtitle is-7">
                      <span> Criado em: {{ formattedDate }} </span>
                    </p>
                  </div>
                </div>
            </div>
        </div>
      </div>
      <div class="column is-12 pt-10">
        <div class="columns">
          <div class="column">
            <button class="button block" @click="showInviteModal">
              <b-icon icon="user-plus" size="is-small"></b-icon>
              <span> Convidar membros </span>
            </button>
          </div>
          <div class="column">
            <button class="button block is-info" @click="openPage">
              <b-icon icon="pencil-alt" size="is-small"></b-icon>
              <span> Editar </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <invite-modal :open="inviteModal"></invite-modal>
  </div>
</template>

<script>
import date from 'date-fns'
import { pt } from 'date-fns/locale/pt'
import InviteModal from '@/components/admin/modals/InviteModal'

export default {
  props: {
    title: {
      type: String,
      default: 'Título do Texto'
    },
    views: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Number,
      default: 11111111
    },
    selected: {
      type: Boolean,
      default: false
    },
    redirectTo: {
      type: String,
      default: '#'
    }
  },
  computed: {
    formattedDate () {
      return date.format(new Date(this.createdAt), 'DD/MM/YYYY', { locale: pt })
    }
  },
  mounted () {
    let vm = this

    this.$on('close', function () {
      console.log('oi')
      vm.closeModal()
    })
  },
  data () {
    return {
      inviteModal: false
    }
  },
  components: {
    InviteModal
  },
  methods: {
    showInviteModal () {
      this.inviteModal = true
    },
    closeModal () {
      this.inviteModal = false
    },
    openPage () {
      this.$router.push({ name: 'editor', params: { id: this.redirectTo } })
    }
  }
}
</script>
