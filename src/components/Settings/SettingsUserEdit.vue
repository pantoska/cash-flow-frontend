<template>
  <div>
    <b-row>
      <b-col><h4>Zmień hasło</h4></b-col>
    </b-row>
    <b-row>
      <b-form class="col text-left" @submit="changePassword">
        <b-form-group
          id="input-actual-password-group"
          label="Login/email"
          label-for="input-actual-password"
        >
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <v-icon name="key" />
              </div>
            </div>
            <b-form-input
              id="input-actual-password"
              type="password"
              required
              placeholder="Aktualne hasło"
              :state="validationPassword"
              v-model="actualPassword"
            />
            <b-form-invalid-feedback :state="validationPassword">
              Hasło powinno zawierać 3 - 30 znaków.
            </b-form-invalid-feedback>
          </div>
        </b-form-group>
        <b-form-group
          id="input-new-password-group"
          label="Hasło"
          label-for="input-new-password"
        >
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <v-icon name="key" />
              </div>
            </div>
            <b-input
              id="input-new-password"
              type="password"
              required
              placeholder="Nowe hasło"
              :state="validationNewPassword"
              v-model="newPassword"
            />
          </div>
        </b-form-group>
        <b-form-group
          id="input-confirm-password-group"
          label="Potwierdź nowe hasło"
          label-for="input-confirm-password"
        >
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <v-icon name="key" />
              </div>
            </div>
            <b-input
              id="input-confirm-password"
              type="password"
              required
              placeholder="Powtórz nowe hasło"
              :state="validationNewPassword"
              v-model="newPasswordRep"
            />
            <b-form-invalid-feedback :state="validationNewPassword">
              {{ loginValidationMessage }}
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationNewPassword">
              Pomyślnie zmienione hasło
            </b-form-valid-feedback>
          </div>
        </b-form-group>
        <b-button class="col mt-5" type="submit" variant="warning"
          >Zmień hasło</b-button
        >
      </b-form>
    </b-row>
  </div>
</template>

<script>
import UserController from "@/assets/js/UserController";

export default {
  name: "SettingsUserEdit",
  data() {
    return {
      actualPassword: "",
      newPassword: "",
      newPasswordRep: "",
      validationPassword: null,
      validationNewPassword: null,
      alertNotEqual: "Hasła się nie zgadzają!",
      alertComplexityToLow:
        "Hasło powinno mieć 5 - 30 znaków, zawierać conajmniej 1 dużą literę, małą literę, " +
        "cyfrę i znak specjalny (!@#%&,.?)",
      loginValidationMessage: "",
    };
  },
  methods: {
    validateActual() {
      if (this.actualPassword.length < 3 || this.actualPassword.length > 30) {
        this.validationPassword = false;
        return false;
      } else {
        this.validationPassword = null;
        return true;
      }
    },
    validateNewPassword() {
      const regexPass = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&,.?+*\\-])(?=.{5,30})"
      );
      if (!regexPass.test(this.newPassword)) {
        this.validationNewPassword = false;
        this.loginValidationMessage = this.alertComplexityToLow;
        return false;
      } else {
        if (this.newPassword !== this.newPasswordRep) {
          this.validationNewPassword = false;
          this.loginValidationMessage = this.alertNotEqual;
          return false;
        }
      }

      this.loginValidationMessage = "";
      this.validationNewPassword = true;
      return true;
    },
    changePassword(event) {
      event.preventDefault();
      const vnp = this.validateNewPassword();
      const va = this.validateActual();
      console.log(va);

      if (!va || !vnp) {
        return false;
      }

      console.log(vnp);
      const result = UserController.changePassword(
        1,
        this.actualPassword,
        this.newPassword
      );
      if (result === true) {
        this.actualPassword = "";
        this.newPassword = "";
        this.newPasswordRep = "";
        this.validationPassword = true;
        this.validationNewPassword = true;
        return true;
      }
    },
  },
};
</script>

<style scoped></style>
