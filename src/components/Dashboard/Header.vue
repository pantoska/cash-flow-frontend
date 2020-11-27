<template>
  <b-row>
    <b-col class="component-box m-2 px-4 py-3 mt-3">
      <b-row >
        <b-col class="d-flex align-items-center">
          <div>
            <h2 class="text-left mb-0">Witaj Stefan!</h2>
          </div>
        </b-col>
        <b-col>
          <div class="text-center float-right pr-3">
            <p class="pb-0 mb-0">Saldo:</p>
            <h3>150,00zł</h3>
          </div>
        </b-col>
      </b-row>
      <hr/>
      <b-row>
        <b-col class="money-account-container">
          <HeaderMoneyAccount color="#9F9" money-account-name="Gotówka" amount="10,00zł"/>
          <HeaderMoneyAccount color="#9F9" money-account-name="Gotówka1" amount="10,00zł"/>
          <HeaderMoneyAccount color="#9F9" money-account-name="Gotówka2" amount="10,00zł"/>
          <HeaderMoneyAccount color="#9F9" money-account-name="Gotówka3" amount="10,00zł"/>
          <HeaderMoneyAccount color="#9F9" money-account-name="Gotówka4" amount="10,00zł"/>
          <HeaderMoneyAccount color="#9F9" money-account-name="Gotówka5" amount="10,00zł"/>
          <HeaderMoneyAccount color="#9F9" money-account-name="Gotówka6" amount="10,00zł"/>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import HeaderMoneyAccount from '@/components/Dashboard/HeaderMoneyAccount'
export default {
  name: 'Header',
  components: { HeaderMoneyAccount }
}
</script>

<style scoped>

</style>
