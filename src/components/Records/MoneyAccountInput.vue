<template>
  <b-input-group>
    <b-form-checkbox-group v-model="selected" name="moneyAccount" stacked class="text-left">
      <b-form-checkbox v-for="account in accountList" :key="account.id_m_acc" :value="account.id_m_acc">
        {{account.accountName}}
      </b-form-checkbox>
    </b-form-checkbox-group>
  </b-input-group>
</template>

<script>
  export default {
    name: 'MoneyAccountInput',
    props: ['accountList'],
    data () {
      return {
        selected: []
      }
    },
    methods: {
      selectAll () {
        for (let i = 0; i < this.accountList.length; i++) {
          this.selected.push(this.accountList[i].id_m_acc)
        }
        this.$emit('updateData', this.selected)
      }
    },
    created () {
      this.selectAll()
    },
    watch: {
      selected (val) {
        this.$emit('updateData', this.selected)
      },
      accountList () {
        this.selectAll()
      }
    }
  }
</script>

<style scoped>

</style>
