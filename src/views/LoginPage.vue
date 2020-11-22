<template>
  <b-container fluid class="LoginPage min-vh-100 p-0">
    <LoginContainerComputer v-if="windowWidth > 768" @loadingAnimation="handleLoadingAnimation"
                            v-bind:is-loading="isLoading"/>
    <LoginContainerMobile v-else @loadingAnimation="handleLoadingAnimation" :is-loading="isLoading"/>
  </b-container>
</template>

<script>
  import LoginContainerComputer from '@/components/login/LoginContainerComputer'
  import LoginContainerMobile from '@/components/login/LoginContainerMobile'

  export default {
    name: 'LoginPage',
    components: {
      LoginContainerMobile,
      LoginContainerComputer
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
      handleLoadingAnimation (event) {
        this.isLoading = event === true

        // TODO run animation
      }
    }
  }
</script>

<style scoped>
  @import '../assets/css/loginPage.scss';
</style>
