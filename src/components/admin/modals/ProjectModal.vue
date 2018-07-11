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
                            type="is-success"
                            message="Tudo certo. Você pode usar esse nome.">
                            <b-input maxlength="100"></b-input>
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <div class="columns">
                            <div class="column is-7">
                                <b-field label="Convidar Membros">
                                    <b-input type="email" placeholder="membro@email.com"></b-input>
                                </b-field>
                            </div>
                            <div class="column align-self-end">
                                <button class="button is-info justify-content-between">
                                  <b-icon icon="user-plus" size="is-small"></b-icon>
                                  <span>Convidar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="column is-12">
                        <button class="button is-primary is-pulled-right">
                          <span>Criar o documento</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>
