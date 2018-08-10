<template>
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <h1 class="title is-3"><b><span style="color:#7957d5">TEXT</span>ON</b></h1>
            </a>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="toggleMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu" :class="{'is-active':isActive}">
            <div class="navbar-start">
            </div>
            <div class="navbar-end">
                <div class="navbar-item" v-if="!isLogged">
                    <div class="field is-grouped is-multiline">
                        <p class="control">
                            <router-link class="button is-primary" :to="{ name: 'login'}">
                                <b-icon icon="sign-in-alt"></b-icon>
                                <span>Fazer Login</span>
                            </router-link>
                        </p>
                        <p class="control">
                            <router-link class="button is-warning" :to="{ name: 'register'}">
                                <b-icon icon="user-circle"></b-icon>
                                <span>Criar Conta</span>
                            </router-link>
                        </p>
                    </div>
                </div>
                <div class="navbar-item" v-else>
                    <span class="mr-10"> Bem vindo(a), {{ getUsername }} </span>
                    <span>
                        <b-dropdown position="is-bottom-left">
                            <b-icon icon="caret-down" size="is-small" slot="trigger"/>
                            <b-dropdown-item>
                                <router-link :to="{ name: 'projects' }" class="media dropdown-link">
                                    <b-icon class="media-left" icon="folder"></b-icon>
                                    <div class="media-content">
                                        <h3>Meus Projetos</h3>
                                    </div>
                                </router-link>
                            </b-dropdown-item>
                            <b-dropdown-item>
                                <router-link :to="{ name: 'profile' }" class="media dropdown-link">
                                    <b-icon class="media-left" icon="user"></b-icon>
                                    <div class="media-content">
                                        <h3>Meu Perfil</h3>
                                    </div>
                                </router-link>
                            </b-dropdown-item>
                            <hr class="dropdown-divider">
                            <b-dropdown-item>
                                <router-link :to="{ name: 'logout' }" class="media dropdown-link">
                                    <b-icon class="media-left" icon="sign-out-alt"></b-icon>
                                    <div class="media-content">
                                        <h3>Sair da Conta</h3>
                                    </div>
                                </router-link>
                            </b-dropdown-item>
                        </b-dropdown>
                    </span>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isActive: true
    }
  },
  computed: {
    ...mapGetters(['isLogged', 'getUsername'])
  },
  methods: {
    toggleMenu () {
      this.isActive = !this.isActive
    }
  }
}
</script>
