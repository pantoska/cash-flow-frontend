<template>
  <b-container fluid class="LoginPage min-vh-100 p-0">
    <LoginContainerComputer v-if="windowWidth > 768" @clicked="handleClick"
                            v-bind:is-loading="isLoading"/>
    <LoginContainerMobile v-else/>
  </b-container>
</template>

<script>
import LoginContainerComputer from '@/components/login/LoginContainerComputer'
import LoginContainerMobile from '@/components/login/LoginContainerMobile'

export default {
  name: 'LoginPage',
  components: { LoginContainerMobile, LoginContainerComputer },
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
    handleClick (event) {
      console.log(event)
      this.isLoading = !this.isLoading
      setTimeout(() => { this.isLoading = !this.isLoading }, 1000)
      // TODO run animation
    }
  }
}
</script>

<style scoped>
@import '../assets/css/loginPage.scss';
</style>
