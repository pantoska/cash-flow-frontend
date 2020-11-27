<template>
  <div
    id="left-nav-container"
    class="d-flex flex-column justify-content-center"
  >
    <div class="mt-auto">
      <ul>
        <li v-bind:class="{ active: activeSite('Dashboard') }">
          <RouterLink to="/dashboard">
            <ViewDashboard class="nav-icon" />
          </RouterLink>
          <p class="nav-description">Dashboard</p>
        </li>
        <li v-bind:class="{ active: activeSite('Records') }">
          <RouterLink to="/records">
            <FormatListBulleted class="nav-icon" />
          </RouterLink>
          <p class="nav-description">Lista wydatków</p>
        </li>
        <li>
          <RouterLink to="" v-b-modal.new-entry-modal>
            <PlusCircle class="nav-icon" />
          </RouterLink>
          <p class="nav-description">Dodaj nowy wpis</p>
        </li>
        <li v-bind:class="{ active: activeSite('Settings') }">
          <RouterLink to="/settings">
            <Cog class="nav-icon" />
          </RouterLink>
          <p class="nav-description">Ustawienia</p>
        </li>
      </ul>
    </div>
    <div class="mt-auto">
      <ul>
        <li @click="handleLogout">
          <ExitToApp class="nav-icon" />
          <p class="nav-description">Wyloguj</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FormatListBulleted from "vue-material-design-icons/FormatListBulleted";
import ViewDashboard from "vue-material-design-icons/ViewDashboard";
import ExitToApp from "vue-material-design-icons/ExitToApp";
import PlusCircle from "vue-material-design-icons/PlusCircle";
import Cog from "vue-material-design-icons/Cog";
import UserController from "@/assets/js/UserController";
import router from "@/router";

export default {
  name: "LeftNav",
  components: {
    ViewDashboard,
    ExitToApp,
    FormatListBulleted,
    PlusCircle,
    Cog,
  },
  methods: {
    activeSite(linkSite) {
      if (Array.isArray(linkSite)) {
        return (
          linkSite.find((element) => element === this.$route.name) !== undefined
        );
      } else {
        return this.$route.name === linkSite;
      }
    },
    blockRedirect(e) {
      e.preventDefault();
    },
    handleLogout(event) {
      UserController.logout();
      router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/nav.scss";
</style>
