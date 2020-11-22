import Vue from 'vue'
import App from './App.vue'

import './assets/css/main.scss'

import UserLogged from '@/layouts/UserLogged'

Vue.component('user-logged-layout', UserLogged)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
