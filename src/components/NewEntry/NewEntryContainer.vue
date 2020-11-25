<template>
  <b-modal id="new-entry-modal" size="lg" centered title="Dodaj nowy wpis" v-model="showModal">
    <template v-slot:default>
      <b-row>
        <b-col sm="7" class="new-entry-modal-left py-4">
          <b-row class="mt-3">
            <b-col/>
            <b-col>
              <b-button-group>
                <b-button @click="transactionType = 1" :class="{'btn-success':transactionType === 1 }">Przychód
                </b-button>
                <b-button @click="transactionType = 2" :class="{'btn-danger':transactionType === 2 }">Wydatek</b-button>
                <b-button @click="transactionType = 3" :class="{'btn-info':transactionType === 3 }">Transfer</b-button>
              </b-button-group>
            </b-col>
            <b-col/>
          </b-row>
          <NewEntryIncomeOutcome :money-accounts-list="moneyAccounts" :category-list="categoryList"
                                 :amount-prop="amount"
                                 v-if="transactionType === 1" income="true" :key="keyNewEntryIncomeOutcome"
                                 @updateParent="getDataIncomeOutcome" :sig-validate="sigValidate"/>
          <NewEntryIncomeOutcome :money-accounts-list="moneyAccounts" :category-list="categoryList"
                                 :amount-prop="amount"
                                 v-else-if="transactionType === 2" income="false" :key="keyNewEntryIncomeOutcome * -1"
                                 @updateParent="getDataIncomeOutcome" :sig-validate="sigValidate"/>
          <NewEntryTransfer :money-accounts-list="moneyAccounts" v-else-if="transactionType === 3" :amount-prop="amount"
                            @updateParent="getDataTransfer" :sig-validate="sigValidate"/>
        </b-col>
        <b-col sm="5" class="py-3 align-self-center">
          <b-row>
            <b-col>
              <b-form-group label="Data:">
                <b-input type="datetime-local" v-model="entryTime"/>
                <b-form-invalid-feedback :state="dateValidation">
                  Data nie powinna byc z przyszłości!
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Notatka:">
                <b-textarea v-model="note" placeholder="Notatka"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </template>
    <template v-slot:modal-footer>
      <p class="font-weight-bold pr-4" v-if="showInsertStatus" :class="{'text-success':insertDateOk === true,
      'text-danger': insertDateOk === false}">{{insertStatusText}}</p>
      <b-button variant="primary" @click="addNewEntryAndClose">
        Dodaj
      </b-button>
      <b-button variant="primary" @click="addNewEntry">
        Dodaj następny
      </b-button>
      <b-button @click="showModal=false">
        Anuluj
      </b-button>
    </template>
  </b-modal>
</template>

<script>
  import MoneyAccountController from '@/assets/js/MoneyAccountController'
  import CategoryController from '@/assets/js/CategoryController'
  import EntryController from '@/assets/js/EntryController'
  import NewEntryIncomeOutcome from '@/components/NewEntry/NewEntryIncomeOutcome'
  import NewEntryTransfer from '@/components/NewEntry/NewEntryTransfer'

  export default {
    name: 'NewEntry',
    components: {
      NewEntryTransfer,
      NewEntryIncomeOutcome
    },
    data () {
      return {
        showModal: false,
        transactionType: 2,
        moneyAccounts: [],
        categoryList: [],
        entryTime: null,
        dateValidation: null,
        note: '',
        accountId: null,
        sourceAccountId: null,
        destinationAccountId: null,
        amount: null,
        categoryId: null,
        subcategoryId: null,
        income: null,
        sigValidate: false,
        insertDateOk: false,
        showInsertStatus: false,
        insertStatusText: null,
        keyNewEntryIncomeOutcome: 0
      }
    },
    created () {
      this.getMoneyAccounts()
      this.getCategoryList()
      const now = new Date()
      this.entryTime = now.toISOString()
      this.entryTime = this.entryTime.substr(0, 19)
      // this.entryTime = now.getFullYear() + '-'
      // if (now.getMonth() + 1 < 10) {
      //   this.entryTime += '0' + (now.getMonth() + 1)
      // } else {
      //   this.entryTime += (now.getMonth() + 1)
      // }
      // this.entryTime += '-'
      // if (now.getDate() < 10) {
      //   this.entryTime += '0' + now.getDate()
      // } else {
      //   this.entryTime += now.getDate()
      // }
      //
      // this.entryTime += 'T'
      // if (now.getHours() < 10) {
      //   this.entryTime += '0' + now.getHours()
      // } else {
      //   this.entryTime += now.getHours()
      // }
      // this.entryTime += ':'
      // if (now.getMinutes() < 10) {
      //   this.entryTime += '0' + now.getMinutes()
      // } else {
      //   this.entryTime += now.getMinutes()
      // }
    },
    methods: {
      updateParent () {
        this.$emit('addedNewEntry')
      },
      getMoneyAccounts () {
        MoneyAccountController.getAllMoneyAccount().then(result => {
          if (result !== -1) {
            this.moneyAccounts = result
            ++this.keyNewEntryIncomeOutcome
          }
        })
      },
      getCategoryList () {
        CategoryController.getCategoryAndSubcategory().then(result => {
          if (result !== -1) {
            if (result === undefined) {
              result = []
            }
            this.categoryList = result
            ++this.keyNewEntryIncomeOutcome
          } else {
            alert('Błąd zewnętrzny!!')
          }
        })
      },
      getDataIncomeOutcome (accountId, amount, categoryId, subcategoryId, income) {
        this.accountId = accountId
        this.amount = amount
        this.categoryId = categoryId
        this.subcategoryId = subcategoryId
        this.income = income
      },
      getDataTransfer (sourceAccountId, destinationAccountId, amount) {
        this.sourceAccountId = sourceAccountId
        this.destinationAccountId = destinationAccountId
        this.amount = amount
      },
      validateEntryData (val) {
        this.dateValidation = new Date(this.entryTime) <= new Date()
      },
      validateData () {
        if (this.transactionType < 3) {
          if (this.accountId === null) {
            return false
          }
          if (this.categoryId === null) {
            return false
          }
          if (this.subcategoryId === null) {
            return false
          }
        } else {
          if (this.sourceAccountId === null) {
            return false
          }
          if (this.destinationAccountId === null) {
            return false
          }
        }
        if (this.amount < 0.01 || this.amount > 9999999.99) {
          return false
        }

        const amountReg = new RegExp('^[0-9]{1,7}.[0-9]{2}$')
        if (!amountReg.test(this.amount)) {
          return false
        }

        if (new Date() < new Date(this.entryTime)) {
          return false
        }

        return true
      },
      addNewEntry () {
        if (this.processAddNewEntry()) {
          this.amount = 0
          this.note = ''
          this.sigValidate = false
        }
      },
      addNewEntryAndClose () {
        if (this.processAddNewEntry()) {
          this.showModal = false
        }
      },
      processAddNewEntry () {
        this.sigValidate = true
        if (this.validateData() === false) {
          this.showInertStatusFun(false, 'Błąd danych! Sprawdź, czy wszystko wypełniłes dobrze.')
          return false
        }

        const amount = this.amount.replace('.', '')
        const entryDate = new Date(this.entryTime)

        let res
        if (this.transactionType === 1) {
          res = EntryController.addNewEntryIncomeOutcome(this.accountId, amount, this.subcategoryId,
            entryDate, this.note, 'INCOME')
        } else if (this.transactionType === 2) {
          res = EntryController.addNewEntryIncomeOutcome(this.accountId, (amount * -1), this.subcategoryId,
            entryDate, this.note, 'EXPENSE')
        } else if (this.transactionType === 3) {
          res = EntryController.addNewEntryTransfer(this.sourceAccountId, this.destinationAccountId, amount,
            entryDate, this.note, 'TRANSFER')
        } else {
          this.showInertStatusFun(false, 'Błąd wewnętrzny!')
          return false
        }

        return res.then(res => {
          if (res !== 1) {
            this.showInertStatusFun(false, 'Błąd dodawania nowego wpisu!')
            return false
          }

          this.showInertStatusFun(true, 'Pomyślnie dodano!')
          this.updateParent()
          return true
        })
      },
      hideStatus () {
        this.showInsertStatus = false
      },
      showInertStatusFun (success, information) {
        this.showInsertStatus = true
        this.insertDateOk = success
        this.insertStatusText = information
        setTimeout(this.hideStatus, 7000)
      }
    },
    watch: {
      entryTime (val) {
        this.validateEntryData()
      },
      sigValidate (val) {
        if (this.sigValidate === true) {
          this.validateEntryData()
        } else {
          this.dateValidation = null
        }
      },
      showModal (val) {
        if (val === true) {
          this.getMoneyAccounts()
          this.getCategoryList()
        }
      }
    }
  }
</script>

<style scoped>
  .new-entry-modal-left {
    background: var(--main-color);
  }
</style>
