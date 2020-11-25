<template>
  <div class="entry-opened">
    <ul>
      <li>{{entryData.categoryName}}</li>
      <li>{{entryData.subcategoryName}}</li>
      <li>{{entryData.moneyAccountName}}</li>
      <li v-if="entryData.is_income">Przychód</li>
      <li v-else>Rozchód</li>
      <li>{{dateTxt}}</li>
      <li>{{entryData.note}}</li>
    </ul>
    <div class="entry-amount">
      {{amount}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EntryOpened',
    props: ['entryData', 'amount'],
    data () {
      return {
        dateTxt: this.entryData.date.replace('T', ' ')
      }
    }
  }
</script>

<style scoped>

</style>
