<template>
  <div class="d-flex entry-small">
    <div class="flex-grow-1">
      <p class="entry-account-name">{{entryData.moneyAccountName}}</p>
      <p class="entry-category-name">{{entryData.subcategoryName}}</p>
    </div>
    <div class="entry-amount">
      {{amount}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EntrySmall',
    props: ['entryData', 'amount'],
    computed: {

    }
  }
</script>
