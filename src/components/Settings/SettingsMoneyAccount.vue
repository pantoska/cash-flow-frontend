<template>
  <div>
    <b-list-group class="mt-4">
      <b-list-group-item
        v-for="mAccount in moneyAccounts"
        :key="mAccount.accountId"
      >
        <SettingsMoneyAccountItem :money-account="mAccount" />
      </b-list-group-item>
      <b-list-group-item>
        <b-row>
          <b-col>
            <b-input
              type="text"
              v-model="newMoneyAccountName"
              placeholder="Nazwa nowe konta pieniężnego"
            />
            <b-form-invalid-feedback :state="validationMoneyAccountCreate">
              Błąd! Nazwa konta pieniężnego powinna zawierać 3-20 znaków
            </b-form-invalid-feedback>
          </b-col>
          <b-col cols="3" offset="1">
            <b-button variant="success" @click="addNewMoneyAccount"
              >Dodaj</b-button
            >
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import SettingsMoneyAccountItem from "@/components/Settings/SettingsMoneyAccountItem";
import MoneyAccountController from "@/assets/js/MoneyAccountController";

export default {
  name: "SettingsMoneyAccount",
  components: { SettingsMoneyAccountItem },
  data() {
    return {
      newMoneyAccountName: "",
      moneyAccounts: [],
      validationMoneyAccountCreate: null,
    };
  },
  methods: {
    addNewMoneyAccount() {
      if (
        this.newMoneyAccountName.length < 3 ||
        this.newMoneyAccountName > 20
      ) {
        this.validationMoneyAccountCreate = false;
        return false;
      }

      if (MoneyAccountController.addnewMoneyAccount(this.newMoneyAccountName)) {
        this.newMoneyAccountName = "";
        this.validationMoneyAccountCreate = null;
        this.getMoneyAccounts();
      } else {
        alert("Błąd zewnętrzny!");
      }
    },
    getMoneyAccounts() {
      this.moneyAccounts = [];
      this.moneyAccounts = MoneyAccountController.getAllMoneyAccount();
    },
  },
  created() {
    this.getMoneyAccounts();
  },
};
</script>

<style scoped></style>
