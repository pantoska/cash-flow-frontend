<template>
  <b-input-group>
    <b-form-checkbox-group
      v-model="selected"
      name="moneyAccount"
      stacked
      class="text-left"
    >
      <b-form-checkbox
        v-for="account in accountList"
        :key="account.accountId"
        :value="account.accountId"
      >
        {{ account.name }}
      </b-form-checkbox>
    </b-form-checkbox-group>
  </b-input-group>
</template>

<script>
export default {
  name: "MoneyAccountInput",
  props: ["accountList"],
  data() {
    return {
      selected: [],
    };
  },
  methods: {},
  created() {
    for (let i = 0; i < this.accountList.length; i++) {
      this.selected.push(this.accountList[i].accountId);
    }
    this.$emit("updateData", this.selected);
  },
  watch: {
    selected(val) {
      this.$emit("updateData", this.selected);
    },
  },
};
</script>

<style scoped></style>
