<template>
  <div>
    <b-row class="mt-4 mb-4">
      <b-col offset="2">
        <b-form-datepicker id="start-date-datapicker" v-model="startDate"
                           :date-format-options="{ year: 'numeric', month: 'long', day: '2-digit', weekday: 'short' }"/>
      </b-col>
      <b-col>
        <b-form-datepicker id="end-date-datapicker" v-model="endDate"
                           :date-format-options="{ year: 'numeric', month: 'long', day: '2-digit', weekday: 'short' }"/>
      </b-col>
      <b-col offset="1" class="align-self-center">
        Suma: {{sumTxt}}zł
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="9">
        <div class="component-box p-3  entry-block">
          <b-row>
            <b-col v-if="dataToShow.length > 0">
              <EntryList :entry-data-list="dataToShow" :key="entryListKey"/>
            </b-col>
            <b-col v-else>
              <h2>Brak danych do pokazania!</h2>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col sm="3">
        <div class="component-box py-3 px-4">
          <b-row>
            <b-col class="mb-4">
              <h4>Konta</h4>
              <MoneyAccountInput :account-list="moneyAccounts" @updateData="updateMoneyAccountsData"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mt-3">
              <h4>Kategorie</h4>
              <CategoryCheckBox :category-list="category" @updateData="updateCategoryData"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mt-3">
              <b-button variant="success" @click="filterEntry">Filtruj</b-button>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import EntryList from '@/components/Basic/Entry/EntryList'
  import EntryController from '../assets/js/EntryController'
  import MoneyAccountController from '../assets/js/MoneyAccountController'
  import CategoryController from '../assets/js/CategoryController'
  import MoneyAccountInput from '@/components/Records/MoneyAccountInput'
  import CategoryCheckBox from '@/components/Records/CategoryCheckBox'
  import MoneyController from '@/assets/js/MoneyController'

  export default {
    name: 'Records',
    components: {
      CategoryCheckBox,
      MoneyAccountInput,
      EntryList
    },
    data () {
      return {
        startDate: new Date(),
        endDate: new Date(),
        dataToShow: [],
        allData: [],
        moneyAccounts: [],
        category: [],
        selected: {
          moneyAccounts: [],
          selectedCategory: [],
          selectedSubcategory: []
        },
        entryListKey: 0,
        sumTxt: 0
      }
    },
    methods: {
      updateMoneyAccountsData (data) {
        this.selected.moneyAccounts = data
      },
      updateCategoryData (category, subcategory) {
        this.selected.selectedCategory = category
        this.selected.selectedSubcategory = subcategory
      },
      filterProcessElement (element) {
        if (this.selected.moneyAccounts.indexOf(element.moneyAccountId) === -1) {
          return false
        }
        if (element.type < 2) {
          if (this.selected.selectedCategory.indexOf(element.categoryId) === -1) {
            return false
          }
          if (this.selected.selectedSubcategory.indexOf(element.subcategoryId) === -1) {
            return false
          }
        }
        return true
      },
      filterEntry (event) {
        this.dataToShow = []

        if (this.allData !== undefined) {
          const allSize = this.allData.length
          for (let i = 0; i < allSize; ++i) {
            if (this.filterProcessElement(this.allData[i])) {
              this.dataToShow.push(this.allData[i])
            }
          }
          ++this.entryListKey
        }
      },
      dateSetHours (date, start) {
        if (start) {
          date.setHours(0)
          date.setMinutes(0)
          date.setSeconds(0)
        } else {
          date.setHours(23)
          date.setMinutes(59)
          date.setSeconds(59)
        }

        return date
      },
      changeDateRange () {
        let startDate = new Date(this.startDate)
        let endDate = new Date(this.endDate)
        startDate = this.dateSetHours(startDate, true)
        endDate = this.dateSetHours(endDate, false)

        this.getEntry(startDate, endDate)
      },
      getEntry (startDate, endDate, filter = true) {
        EntryController.getEntry(startDate, endDate).then(result => {
          if (result !== -1) {
            this.allData = result

            if (filter === true) {
              this.filterEntry(null)
            } else {
              this.dataToShow = this.allData
            }
            // EntryController.addCategoryToEntryList(result).then(r => {
            //   this.allData = r
            // })
            //   .then(r => {
            //
            //   })
          }
        })
      }
    },
    created () {
      this.startDate.setMonth(this.startDate.getMonth() - 1)

      //  this.allData = EntryController.getEntry(0, 0)
      this.getEntry(this.startDate, this.endDate, false)
      this.dataToShow = JSON.parse(JSON.stringify(this.allData))
      MoneyAccountController.getAllMoneyAccount(true).then(result => {
        if (result !== -1) {
          this.moneyAccounts = result
        }
      })
      CategoryController.getCategoryAndSubcategory().then(result => {
        if (result !== -1) {
          this.category = result
        }
      })
    },
    watch: {
      startDate (val) {
        this.changeDateRange()
      },
      endDate (val) {
        this.changeDateRange()
      },
      dataToShow () {
        let sum = 0

        if (this.dataToShow !== undefined) {
          const size = this.dataToShow.length
          for (let i = 0; i < size; ++i) {
            sum += this.dataToShow[i].amount
          }
        }

        this.sumTxt = MoneyController.amountToString(sum)
      }
    }
  }
</script>

<style scoped>
  .entry-block {
    min-height: 80vh;
  }
</style>
