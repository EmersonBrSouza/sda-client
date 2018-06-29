<template>
    <aside class="menu has-text-left ph-15">
        <p class="menu-label">
            Minha Conta
        </p>
        <ul class="menu-list">
            <li>
                <router-link :to="{name: 'projects'}" :class="{'is-active': $route.name == 'projects' || $route.name == 'dashboard'}">
                    <b-icon icon="folder"/>
                    <span>Meus Projetos</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{name: 'profile'}" :class="{'is-active': $route.name == 'profile'}">
                    <b-icon icon="user"/>
                    <span>Meu Perfil</span>
                </router-link>
            </li>
        </ul>
        <p class="menu-label">
            Gerenciar Time
        </p>
        <ul class="menu-list">
            <li><a><b-icon icon="plus-circle"/> <span>Convidar Membros</span></a></li>
            <li><a><b-icon icon="list"/> <span>Ver Membros</span></a></li>
        </ul>
        <p class="menu-label">
            Estatísticas
        </p>
        <ul class="menu-list">
            <li><a><b-icon icon="chart-line"/> <span>Visualizações</span></a></li>
            <li><a><b-icon icon="history"/> <span>Histórico de Edições</span></a></li>
        </ul>
    </aside>
</template>

<script>
export default {
  computed: {
    routeName () {
      return this.$route.name
    }
  }
}
</script>
