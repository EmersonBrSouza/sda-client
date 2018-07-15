<template>
    <div class="column is-3-fullhd is-4-desktop">
        <div class="card" :class="{'selected': selected}">
            <div class="card-image">
                <figure class="image is-4by3">
                    <span class="card-options">
                        <b-dropdown v-model="navigation" position="is-bottom-left">
                            <a class="navbar-item" slot="trigger">
                                <b-icon icon="ellipsis-v" size="is-small"></b-icon>
                            </a>
                            <b-dropdown-item custom>
                                Convidar Membros
                            </b-dropdown-item>
                            <hr class="dropdown-divider">
                        </b-dropdown>
                    </span>
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-6"> {{ title }} </p>
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

<style lang="scss">
  .options{
      z-index: 400;
  }
</style>
