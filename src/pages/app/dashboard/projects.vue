<template>
  <admin-layout>
    <div class="columns is-multiline ml-30">
      <div class="column is-12">
        <div class="columns">
          <div class="column">
            <h1 class="title is-4">Meus Projetos</h1>
          </div>
          <div class="column">
            <button class="button is-success is-pulled-right" @click="toggleModal">
              <b-icon icon="file-alt"></b-icon>
              <span> Novo documento </span>
            </button>
          </div>
        </div>
      </div>
      <div class="column is-12" v-if="projects.length == 0 && !isLoading">
        <div class="columns is-multiline">
          <b-message type="is-info">
            Você ainda não possui projetos. Crie um agora mesmo!
          </b-message>
        </div>
      </div>
      <div class="column is-12">
        <div class="columns is-multiline">
          <project-card v-for="(project, index) in projects" :key="index"
                        :selected="selectedProject.id == project.id"
                        @click.native="selectProject(project.id)"
                        :title="project.title"
                        :createdAt="11111111">
          </project-card>
        </div>
      </div>
      <project-modal :open="openModal" @close="toggleModal"/>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '@/layouts/admin'
import ProjectCard from '@/components/cards/Project'
import ProjectModal from '@/components/admin/modals/ProjectModal'
import { db } from '@/scripts/firebaseInit'
import { mapGetters } from 'vuex'

export default {
  components: {
    AdminLayout,
    ProjectCard,
    ProjectModal
  },
  created () {
    let vm = this

    this.fetchProjects()
    this.$on('projectCreated', function (data) {
      vm.fetchProjects()
    })
  },
  data () {
    return {
      openModal: false,
      projects: []
    }
  },
  computed: {
    selectedProject (compare) {
      let selected = this.projects.filter(item => {
        if (item.selected) return item
      })[0]

      if (!selected) return {id: 0}
      return selected
    },
    ...mapGetters(['getUser'])
  },
  methods: {
    toggleModal () {
      this.openModal = !this.openModal
    },
    fetchProjects () {
      let vm = this

      db.collection('projects')
        .where(`members.${this.getUser.uid}`, '==', true)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            vm.projects.push({id: doc.id, title: doc.data().title, createdAt: doc.data().createdAt, selected: false})
          })
          vm.$set(vm, 'isLoading', false)
        })
        .catch(function (error) {
          console.log('Error getting document:', error)
        })
    },
    selectProject (id) {
      this.projects.map(item => {
        item.selected = false
        if (item.id === id) {
          item.selected = true
        }
        return item
      })
    }
  },
  props: {
    isLoading: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
  // .card.selected
</style>
