<template>
  <b-form class="col text-left" @submit="addNewUser">
    <b-form-group id="input-register-email-group" label="Email"
                  label-for="input-register-email">
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <v-icon name="at"/>
          </div>
        </div>
        <b-form-input id="input-register-email" type="email" required placeholder="email@mail.com" v-model="regEmail"
                      :state="validationRegEmail"/>
      </div>
      <div class="input-group mt-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <v-icon name="at"/>
          </div>
        </div>
        <b-form-input id="input-register-email-repeat" type="email" required v-model="regRepEmail"
                      placeholder="Powtorz email (email@mail.com)" :state="validationRegEmail"/>
      </div>
    </b-form-group>
    <b-form-group id="input-register-password-group" label="Hasło"
                  label-for="input-register-password">
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <v-icon name="key"/>
          </div>
        </div>
        <b-form-input id="input-register-password" type="password" required placeholder="Hasło" v-model="regPassword"
                      :state="validationRegPassword"/>
      </div>
      <div class="input-group mt-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <v-icon name="key"/>
          </div>
        </div>
        <b-form-input id="input-register-password-repeat" type="password" required v-model="regRepPassword"
                      placeholder="Powtórz hasło" :state="validationRegPassword"/>
        <b-form-invalid-feedback :state="validationRegPassword">
          {{validationRegPasswordText}}
        </b-form-invalid-feedback>
      </div>
    </b-form-group>
    <b-form-group id="input-register-login-group" label="Nazwa użytkownika" label-for="input-register-login">
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <v-icon name="user"/>
          </div>
        </div>
        <b-form-input id="input-register-login" type="text" required v-model="regUsername"
                      placeholder="nazwa użytkownika" :state="validationRegUsername"/>

        <b-form-invalid-feedback :state="validationRegUsername">
          Błąd! Nazwa konta pieniężnego powinna zawierać 3-30 znaków
        </b-form-invalid-feedback>
      </div>
    </b-form-group>
    <b-form-invalid-feedback :state="validationRegResult">
      {{validationRegResultTxt}}
    </b-form-invalid-feedback>
    <b-button class="col mt-3" type="submit" variant="success">Zarejestruj</b-button>
  </b-form>
</template>

<script>
import Key from 'vue-material-design-icons/Key'
import At from 'vue-material-design-icons/At'
import UserController from '@/assets/js/UserController'
import router from '@/router'

export default {
  name: 'RegisterForm',
  components: {
    Key,
    At
  },
  data () {
    return {
      validationRegEmail: null,
      validationRegPassword: null,
      validationRegUsername: null,
      validationRegResult: null,
      validationRegResultTxt: '',
      validationRegPasswordText: '',
      alertNotEqual: 'Hasła się nie zgadzają!',
      alertComplexityToLow: 'Hasło powinno mieć 5 - 30 znaków, zawierać conajmniej 1 dużą literę, małą literę, ' +
          'cyfrę i znak specjalny (!@#%&,.?)',
      regEmail: '',
      regRepEmail: '',
      regPassword: '',
      regRepPassword: '',
      regUsername: ''
    }
  },
  methods: {
    validateEmail () {
      if (this.regEmail.length < 3 || this.regEmail.length > 30) {
        this.validationRegEmail = false
        return false
      } else {
        if (this.regEmail !== this.regRepEmail) {
          this.validationRegEmail = false
          return false
        }
        this.validationRegEmail = true
        return true
      }
    },
    validatePassword () {
      // (?=.*[!@#$%^&*()_+=,./?;:|{}])
      // (?=.*[!@#\$%\^&\*,.?])
      const regexPass = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&,.?+*\\-])(?=.{5,30})')
      if (!regexPass.test(this.regPassword)) {
        this.validationRegPassword = false
        this.validationRegPasswordText = this.alertComplexityToLow
        return false
      } else {
        if (this.regPassword !== this.regRepPassword) {
          this.validationRegPassword = false
          this.validationRegPasswordText = this.alertNotEqual
          return false
        }

        this.validationRegPasswordText = ''
        this.validationRegPassword = true
        return true
      }
    },
    validateUsername () {
      if (this.regUsername.length < 3 || this.regUsername.length > 30) {
        this.validationRegUsername = false
        return false
      } else {
        this.validationRegUsername = true
        return true
      }
    },
    validateAll () {
      return this.validateEmail() && this.validatePassword() && this.validateUsername()
    },
    addNewUser (event) {
      event.preventDefault()
      if (this.validateAll()) {
        const result = UserController.createNewUser(this.regEmail, this.regPassword, this.regUsername)
        return result.then(result => {
          console.log(result)

          if (result === 1) {
            const loginResultAPI = UserController.login(this.regEmail, this.regPassword)

            loginResultAPI.then(loginResult => {
              if (loginResult === 1) {
                router.push({ name: 'Dashboard' })
                return true
              } else {
                this.validationRegResult = false
                this.validationRegResultTxt = 'Błąd zewnętrzny!! Poprawnie utworzono konto, a nie można zalogować!'
                return false
              }
            })
          } else if (result === 0) {
            this.validationRegResult = false
            this.validationRegResultTxt = 'Podany użytkownik istnieje!'
            return false
          } else {
            this.validationRegResult = false
            this.validationRegResultTxt = 'Błąd zewnętrzny!'
            return false
          }
        })
      } else {
        return false
      }
    }
  },
  watch: {
    regPassword (val) {
      if (this.validationRegPassword !== null) {
        this.validatePassword()
      }
    },
    regRepPassword (val) {
      this.validatePassword()
    },
    regEmail (val) {
      if (this.validationRegEmail !== null) {
        this.validateEmail()
      }
    },
    regRepEmail (val) {
      this.validateEmail()
    }
  }
}
// TODO add information after login
</script>

<style scoped>

</style>
