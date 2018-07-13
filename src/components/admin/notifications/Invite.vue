<template>
  <b-message type="is-info">
    <span>{{ emitter.name }} convidou você para editar o documento {{ project.title }} </span> <br>
    <div class="is-pulled-right mt-15">
      <button class="button is-success" @click="response(true)"> Aceitar </button>
      <button class="button is-danger" @click="response(false)"> Recusar </button>
    </div>
  </b-message>
</template>

<script>
export default {
  props: {
    emitter: {
      type: Object,
      default: () => { return { name: 'Alguém' } }
    },
    project: {
      type: Object,
      default: () => { return { title: 'Título do documento' } }
    }
  },
  methods: {
    response (response) {
      let data = {
        emitter: this.emitter,
        project: this.project,
        response: response
      }
      this.$emit('response', data)
    }
  }
}
</script>
