<template>
  <admin-layout>
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1>Perfil de Emerson</h1>
      </div>
      <div class="column is-12">
        <div class="columns is-multiline">
          <div class="column is-4">
            <h1 class="mb-15">Dados Pessoais</h1>
            <b-field label="Nome">
              <b-input type="text"/>
            </b-field>
            <b-field label="Fale um pouco sobre você">
              <b-input type="textarea" maxlength="500"/>
            </b-field>
            <button class="button is-pulled-right is-primary"> Salvar Alterações</button>
          </div>
          <div class="column is-2"></div>
          <div class="column is-6">
            <h1>Suas notificações</h1>
            <div class="columns is-multiline">
              <div v-if="true" class="column is-12 has-text-centered mt-30">
                  Não existem notificações no momento.
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
export default {
  components: {
    AdminLayout
  }
}
</script>
