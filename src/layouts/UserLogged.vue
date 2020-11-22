<template>
  <div class="app-window">
    <LeftNav/>
    <div class="app-container scrollable">
      <b-container fluid="xl" class="container-xxl">
        <slot/>
      </b-container>
    </div>
    <NewEntryContainer/>
  </div>
</template>

<script>
import LeftNav from '@/components/Basic/LeftNav'
import NewEntryContainer from '@/components/NewEntry/NewEntryContainer'

export default {
  name: 'UserLoggedLayout',
  components: { LeftNav, NewEntryContainer }
}
</script>

<style scoped>
@import '../assets/css/basicLoged.scss';

</style>
