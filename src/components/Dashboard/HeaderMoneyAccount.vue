<template>
  <div class="money-account-box p-1 pl-4 m-1 float-left" :style="bgColor">
    <p>{{moneyAccountName}}</p>
    <p>{{amount}}</p>
  </div>
</template>

<script>
export default {
  name: 'HeaderMoneyAccount',
  props: ['moneyAccountName', 'color', 'amount'],
  computed: {
    bgColor () {
      return 'background-color:' + this.color
    }
  }
}
</script>

<style scoped>

</style>
