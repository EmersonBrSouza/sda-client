import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Home from '@/pages/home'
import Register from '@/pages/auth/register'
import Login from '@/pages/auth/login'

import DashboardProjects from '@/pages/app/dashboard/projects'
import DashboardProfile from '@/pages/app/dashboard/profile'
import Editor from '@/pages/app/Editor'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/home', name: 'home', component: Home },
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/editor', name: 'editor', component: Editor },
    { path: '/dashboard/', name: 'dashboard', component: DashboardProjects },
    { path: '/dashboard/projetos', name: 'projects', component: DashboardProjects },
    { path: '/dashboard/perfil', name: 'profile', component: DashboardProfile }
  ]
})
