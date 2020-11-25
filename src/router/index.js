import Vue from 'vue'
import VueRouter from 'vue-router'
import UserController from '@/assets/js/UserController'


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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (to.meta.requiresAuth) {
      if (UserController.isLoggedIn()) {
        if (to.matched.some(record => record.meta.requiresAdmin)) {
          if (to.meta.requiresAdmin) {
            if (UserController.userIsAdmin()) {
              next()
            } else {
              next({
                path: '/denied',
                query: { redirect: to.fullPath }
              })
            }
          } else {
            next()
          }
        } else {
          next()
        }
      } else {
        next({
          path: '/denied',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      next()
    }
  } else {
    if (to.name === 'Login' && UserController.isLoggedIn()) {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  }
})



export default router
