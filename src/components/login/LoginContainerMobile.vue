<template>
  <div class="loginContainerMobile">
    <div class="d-flex justify-content-center min-vh-100 align-items-center">
      <b-col class="p-0">
        <div id="tabs">
          <h4 v-on:click="changeTab(0)" id="login-button" v-bind:class="{'selected-buttun':loginTab}">Zaloguj</h4>
          <h4 v-on:click="changeTab(1)" id="register-button" v-bind:class="{'selected-buttun':registerTab}">
            Zarejestruj</h4>
        </div>
        <b-row class="mt-5">
          <LoginForm v-if="tab === 0"/>
          <RegisterForm v-else/>
        </b-row>
      </b-col>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/login/LoginForm'
import RegisterForm from '@/components/login/RegisterForm'

export default {
  name: 'LoginContainerMobile',
  components: {
    RegisterForm,
    LoginForm
  },
  data () {
    return {
      tab: 0,
      loginTab: true,
      registerTab: false
    }
  },
  methods: {
    changeTab (to) {
      if (to === 0) {
        this.tab = 0
        this.loginTab = true
        this.registerTab = false
      } else {
        this.tab = 1
        this.loginTab = false
        this.registerTab = true
      }
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0;
  width: 6em;
  height: 2.3em;
  padding: 0.5em;
  background: var(--main-white-background);
}

#tabs {
  border-bottom: solid 1px #CCC;
  height: 3.6em;
}

#register-button {
  float: right;
}

#login-button {
  float: left;
}

.selected-buttun {
  height: 2.4em;
  border: solid 1px #CCC;
  border-bottom: none;
}

</style>
