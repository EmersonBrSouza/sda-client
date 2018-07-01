import Vue from 'vue'
import Router from 'vue-router'
import { store } from '@/store/MainStore'
import HelloWorld from '@/components/HelloWorld'

import Home from '@/pages/home'
import Register from '@/pages/auth/register'
import PasswordReset from '@/pages/auth/password/reset'
import Login from '@/pages/auth/login'
import Logout from '@/pages/auth/logout'

import DashboardProjects from '@/pages/app/dashboard/projects'
import DashboardProfile from '@/pages/app/dashboard/profile'
import Editor from '@/pages/app/Editor'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/home', name: 'home', component: Home },
    { path: '/cadastro', name: 'register', component: Register, meta: { denyToAuth: true } },
    { path: '/login', name: 'login', component: Login, meta: { denyToAuth: true } },
    { path: '/recuperar-senha', name: 'password', component: PasswordReset, meta: { denyToAuth: true } },
    { path: '/editor', name: 'editor', component: Editor, meta: { requiresAuth: true } },
    { path: '/dashboard/', name: 'dashboard', component: DashboardProjects, meta: { requiresAuth: true } },
    { path: '/dashboard/projetos', name: 'projects', component: DashboardProjects, meta: { requiresAuth: true } },
    { path: '/dashboard/perfil', name: 'profile', component: DashboardProfile, meta: { requiresAuth: true } },
    { path: '/logout', name: 'logout', component: Logout, meta: { requiresAuth: true } }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    middlewares.needAuth(next)
  } else if (to.matched.some(record => record.meta.denyToAuth)) {
    middlewares.denyToAuth(next)
  } else {
    next()
  }
})

const middlewares = {
  needAuth: function (next) {
    if (!store.getters.isLogged) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  },
  denyToAuth: function (next) {
    if (store.getters.isLogged) {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  }
}
export {router}
