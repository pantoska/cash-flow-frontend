<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="loginContainer" v-bind:class="{'loginContainerLoading':isLoading}">
      <b-row>
        <b-col>
          <h2>Zaloguj się</h2>
        </b-col>
        <b-col>
          <h2>Zarejestruj się</h2>
        </b-col>
      </b-row>
      <b-row class="align-items-center">
        <b-col class="pr-4">
          <LoginForm @clicked="clickedLogin"/>
        </b-col>
        <b-col class="pl-4">
          <RegisterForm/>
        </b-col>
      </b-row>
      <div class="loginContainerLoad d-flex justify-content-center align-items-center"
           v-if="isLoading">
        <div class="spinner-border loginLoadSymbol" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Key from 'vue-material-design-icons/Key'
import At from 'vue-material-design-icons/At'
import LoginForm from '@/components/login/LoginForm'
import RegisterForm from '@/components/login/RegisterForm'

export default {
  name: 'LoginContainerComputer',
  components: {
    RegisterForm,
    LoginForm,
    Key,
    At
  },
  props:['isLoading'],
  methods: {
    clickedLogin (event) {
      this.$emit('clicked', true)
    }
  }
}
</script>

<style scoped>

</style>
