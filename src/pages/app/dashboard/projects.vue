<template>
  <admin-layout>
    <div class="columns is-multiline ml-30">
      <div class="column is-12">
        <h1>Meus Projetos</h1>
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
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '@/layouts/admin'
import ProjectCard from '@/components/cards/Project'
export default {
  components: {
    AdminLayout,
    ProjectCard
  }
}
</script>
