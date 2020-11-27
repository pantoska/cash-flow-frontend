<template>
  <b-row>
    <b-col class="component-box m-2 px-4 py-3">
      <b-row>
        <b-col>
          <h2 class="text-left">Ostatnie wpisy:</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <EntryList :entry-data-list="exampleEntry"/>
        </b-col>
        <!--        <b-col class="d-table">-->
        <!--          <Entry color="#DB6" category-name="Jedzenie" amount="15,00zł"/>-->
        <!--          <Entry color="#DB6" category-name="Jedzenie" amount="150,00zł"/>-->
        <!--          <Entry color="#DB6" category-name="Jedzenie" amount="1500,00zł"/>-->
        <!--          <Entry color="#DB6" category-name="Jedzenie" amount="15000,00zł"/>-->
        <!--          <Entry color="#DB6" category-name="Jedzenie" amount="150000,00zł"/>-->
        <!--          <Entry color="#DB6" category-name="Jedzenie" amount="1500000,00zł"/>-->
        <!--          <Entry color="#DB6" category-name="Jedzenie" amount="15000000,00zł"/>-->
        <!--          <Entry color="#DB6" category-name="Jedzenie" amount="150000000,00zł"/>-->
        <!--          <Entry color="#DB6" category-name="Jedzenie" amount="1500000000,00zł"/>-->
        <!--          <Entry color="#DB6" category-name="Jedzenie" amount="15000000000,00zł"/>-->
        <!--        </b-col>-->
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import EntryList from '@/components/Basic/Entry/EntryList'
import EntryController from '../../assets/js/EntryController'

export default {
  name: 'LastEntry',
  components: { EntryList },
  data () {
    return {
      exampleEntry: []
    }
  },
  created () {
    this.exampleEntry = EntryController.getEntry(0, 0)
  }
}
</script>

<style scoped>

</style>
