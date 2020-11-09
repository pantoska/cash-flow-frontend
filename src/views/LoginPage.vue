<template>
  <b-container fluid class="LoginPage min-vh-100 p-0">
    <h1>Page</h1>
  </b-container>
</template>

<script>

  export default {
    name: 'LoginPage',
    components: {
    },
    data () {
      return {
        windowWidth: 0,
        isLoading: false
      }
    },
    created () {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    },
    methods: {
      handleResize () {
        this.windowWidth = window.innerWidth
      },

    }
  }
</script>

<style scoped>
  @import '../assets/css/loginPage.scss';
</style>
