<template>
  <b-form class="col text-left" @submit="loginEvent">
    <b-form-group id="input-login-login-group" label="Login/email" label-for="input-login-login">
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <v-icon name="at"/>
          </div>
        </div>
        <b-form-input id="input-login-login" type="text" required placeholder="email@mail.com"
                      :state="loginValidation" v-model="loginEmail"/>
      </div>
    </b-form-group>
    <b-form-group id="input-login-password-group" label="Hasło" label-for="input-login-password">
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <v-icon name="key"/>
          </div>
        </div>
        <b-input id="input-login-password" type="password" required placeholder="Hasło" :state="loginValidation"
                 v-model="loginPassword"/>
        <b-form-invalid-feedback :state="loginValidation">
          {{loginValidationMessage}}
        </b-form-invalid-feedback>
      </div>
    </b-form-group>
    <b-button class="col mt-5" type="submit" variant="success">Zaloguj</b-button>
  </b-form>
</template>

<script>
// TODO delete imports
import Key from 'vue-material-design-icons/Key'
import At from 'vue-material-design-icons/At'
import UserController from '@/assets/js/UserController'
import router from '@/router'

export default {
  name: 'LoginForm',
  components: {
    Key,
    At
  },
  data () {
    return {
      loginValidationMessage: 'Ełoł cepie!',
      loginValidation: null,
      loginEmail: '',
      loginPassword: ''
    }
  },
  methods: {
    loginClick (event) {
      this.$emit('clicked', true)
    },
    loginEvent (event) {
      event.preventDefault()
      if (this.loginEmail.length < 3 || this.loginEmail.length > 30 ||
          this.loginPassword.length < 3 || this.loginPassword.length > 30) {
        this.loginValidation = false
        this.loginValidationMessage = 'Podane hasło, lub email mają nie odpowiednią długość (3 - 30)'
        return false
      }
      const result = UserController.login(this.loginEmail, this.loginPassword)
      return result.then(result => {
        if (result === 1) {
          router.push({ name: 'Dashboard' })
          return true
        }
        if (result === -1) {
          this.loginValidation = false
          this.loginValidationMessage = 'Podano błędne dane logowania'
          return false
        } else {
          this.loginValidation = false
          this.loginValidationMessage = 'Błąd zewnętrzny!'
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
