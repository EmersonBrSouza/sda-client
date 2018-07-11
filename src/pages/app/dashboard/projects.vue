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
      <div class="column is-12">
        <div class="columns is-multiline">
          <project-card></project-card>
          <project-card></project-card>
          <project-card></project-card>
          <project-card></project-card>
          <project-card></project-card>
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

export default {
  components: {
    AdminLayout,
    ProjectCard,
    ProjectModal
  },
  data () {
    return {
      openModal: false
    }
  },
  methods: {
    toggleModal () {
      this.openModal = !this.openModal
    }
  }
}
</script>
