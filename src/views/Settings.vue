<template>
  <div class="py-4">
    <b-row>
      <b-col class="component-box m-2 p-4">
        <b-row>
          <b-col>
            <h3>Edytor kont pieniężnych</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <SettingsMoneyAccount />
          </b-col>
        </b-row>
      </b-col>
      <b-col class="component-box m-2 p-4">
        <b-row>
          <b-col>
            <h3>Edytor konta</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <SettingsUserEdit />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import SettingsMoneyAccount from "@/components/Settings/SettingsMoneyAccount";
import SettingsUserEdit from "@/components/Settings/SettingsUserEdit";
// import CategoryController from '@/assets/js/CategoryController'

export default {
  name: "Settings",
  components: { SettingsUserEdit, SettingsMoneyAccount },
  data() {
    return {};
  },
  created() {},
};
</script>

<style scoped></style>
