<template>
  <div>
    <b-row v-if="editMode === false">
      <b-col class="align-self-center text-left">
        {{ moneyAccount.name }}
      </b-col>
      <b-col cols="3" class="p-0">
        <b-button variant="warning" @click="editMode = true">
          <Pencil />
          Edytuj
        </b-button>
      </b-col>
      <b-col cols="3" class="p-0" @click="deleteMAccount">
        <b-button variant="danger">
          <Delete />
          Usuń
        </b-button>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col class="align-self-center text-left">
        <b-input type="text" v-model="moneyAccountEditText" />
        <b-form-invalid-feedback :state="validationMoneyAccountEdit">
          Błąd! Nazwa konta pieniężnego powinna zawierać 3-20 znaków
        </b-form-invalid-feedback>
      </b-col>
      <b-col cols="3" class="p-0">
        <b-button variant="success" @click="confirmEdit">
          <Check />
          Zmień
        </b-button>
      </b-col>
      <b-col cols="3" class="p-0" @click="cancelEdit">
        <b-button>
          <Cancel />
          Anuluj
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Pencil from "vue-material-design-icons/Pencil";
import Delete from "vue-material-design-icons/Delete";
import Check from "vue-material-design-icons/Check";
import Cancel from "vue-material-design-icons/Cancel";
import MoneyAccountController from "@/assets/js/MoneyAccountController";

export default {
  name: "SettingsMoneyAccountItem",
  components: {
    Pencil,
    Delete,
    Check,
    Cancel,
  },
  props: ["moneyAccount"],
  data() {
    return {
      editMode: false,
      moneyAccountEditText: this.moneyAccount.name,
      validationMoneyAccountEdit: null,
    };
  },
  methods: {
    cancelEdit() {
      this.moneyAccountEditText = this.moneyAccount.name;
      this.editMode = false;
    },
    confirmEdit() {
      if (
        this.moneyAccountEditText.length < 3 ||
        this.moneyAccountEditText.length > 20
      ) {
        this.validationMoneyAccountEdit = false;
        return false;
      } else {
        this.validationMoneyAccountEdit = null;
      }

      if (this.moneyAccountEditText === this.moneyAccount.name) {
        this.editMode = false;
        return false;
      }

      if (
        MoneyAccountController.editMoneyAccount(
          this.moneyAccount.accountId,
          this.moneyAccountEditText
        )
      ) {
        this.updateParent();
        this.editMode = false;
      } else {
        alert("Błąd zewętrzny! Nie można zmienić nazwy konta pienięznego!");
      }
    },
    updateParent() {
      this.$emit("updateParent");
    },
    deleteMAccount() {
      this.$bvModal
        .msgBoxConfirm(
          "Czy na pewno chcesz usunac to konto pieniężne?" +
            "Wszystkie wpisy z tego konta zostana przeniesione do wirtualnego konta pieniężnego 'Usunięte konta'.",
          {
            title: "Potwierdź usunięcie konta pienięznego",
            okVariant: "danger",
          }
        )
        .then((value) => {
          if (value === true) {
            if (
              MoneyAccountController.deleteMoneyAccount(
                this.moneyAccount.accountId
              )
            ) {
              this.updateParent();
            } else {
              alert("Błąd zewnętrzny!!");
            }
          }
        });
    },
  },
};
</script>

<style scoped></style>
