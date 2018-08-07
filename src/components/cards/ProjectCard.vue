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
                <p class="subtitle is-6 mt-10 mb-5">
                    <b-icon size="is-small" icon="eye"></b-icon>
                    <span>{{ views }} visualizações</span>
                </p>
                <p class="subtitle is-7 pt-0">
                    <span> Criado em: {{ formattedDate }} </span>
                </p>
            </div>
        </div>
      </div>
      <div class="column is-12 pt-10">
        <div class="columns">
          <div class="column">
            <button class="button block">
              <b-icon icon="user-plus" size="is-small"></b-icon>
              <span> Convidar membros </span>
            </button>
          </div>
          <div class="column">
            <button class="button block is-info">
              <b-icon icon="pencil-alt" size="is-small"></b-icon>
              <span> Editar </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import date from 'date-fns'
import { pt } from 'date-fns/locale/pt'

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
    }
  },
  computed: {
    formattedDate () {
      return date.format(new Date(this.createdAt), 'DD/MM/YYYY', { locale: pt })
    }
  }
}
</script>
