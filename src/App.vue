<template>
  <div id="app">
    <!--    <div id="nav">-->
    <!--      <router-link to="/">Home</router-link>-->
    <!--      |-->
    <!--      <router-link to="/about">About</router-link>-->
    <!--    </div>-->
    <!--    <router-link to="/dashboard">Dashboard</router-link>-->
    <!--    <router-link to="/login">Login</router-link>-->
    <transition name="fade">
      <component :is="layout">
        <router-view/>
      </component>
    </transition>
  </div>
</template>

<script>
  const defaultLayout = 'default'

  export default {
    computed: {
      layout () {
        return (this.$route.meta.layout || defaultLayout) + '-layout'
      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
