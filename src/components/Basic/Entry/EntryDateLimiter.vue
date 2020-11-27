<template>
  <div class="d-flex">
    <div class="flex-grow-1 entry-line"><hr /></div>
    <div class="pl-4 pr-4 align-self-center font-weight-bold">{{ text }}</div>
    <div class="flex-grow-1 entry-line"><hr /></div>
  </div>
</template>

<script>
export default {
  name: "EntryDateLimiter",
  props: ["text"],
};
</script>
