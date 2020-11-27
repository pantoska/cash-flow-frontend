<template>
  <div>
    <Header/>
    <b-row>
      <b-col>

      </b-col>
      <b-col>
        <LastEntry/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import LeftNav from '@/components/Basic/LeftNav'
import Header from '@/components/Dashboard/Header'
import LastEntry from '@/components/Dashboard/LastEntry'

export default {
  name: 'Dashboard',
  components: { LastEntry, Header, LeftNav }
}
</script>

<style scoped>

</style>
