import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
    // component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "loginPage" */ '@/views/LoginPage')
  },

  {
    path: '/denied',
    name: 'Denied',
    component: () => import(/* webpackChunkName: "denied" */ '@/views/Error401')
  },

  {
    path: '*',
    name: 'PageNotFound',
    component: () => import(/* webpackChunkName: "error404" */ '@/views/Error404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: '/dist/',
  routes
})



export default router
