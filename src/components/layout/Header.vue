<template>
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
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
                <div class="navbar-item">
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
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  data () {
    return {
      isActive: true
    }
  },
  methods: {
    toggleMenu () {
      this.isActive = !this.isActive
    }
  }
}
</script>
