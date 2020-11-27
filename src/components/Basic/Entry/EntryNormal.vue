<template>
  <div class="d-flex entry-small">
    <div class="flex-grow-1">
      <p class="entry-account-name">
        {{ entryData.subcategory.category.name }}
      </p>
      <p class="entry-category-name">{{ entryData.subcategory.name }}</p>
    </div>
    <div class="flex-grow-1 align-self-center">
      <p class="entry-account-name">{{ entryData.note }}</p>
    </div>
    <div class="flex-grow-1 align-self-center">
      <p class="entry-account-name">{{ entryData.account.name }}</p>
    </div>
    <div class="entry-amount">
      {{ amount }}
    </div>
  </div>
</template>

<script>
export default {
  name: "EntryNormal",
  props: ["entryData", "amount"],
};
</script>
