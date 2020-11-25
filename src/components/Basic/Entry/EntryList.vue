<template>
  <div class="entry-list-container">
    <ul>
      <li v-for="(item, index) in entryDataList" :key="item.expenseId">
        <EntryDateLimiter :text="getActualDate(item.date)" v-if="printDate(index)"/>
        <EntryLimiter v-else/>
        <Entry :entry-data="item" :entry-size="getEntrySizeType"/>
      </li>
    </ul>
  </div>
</template>

<script>
  import Entry from '@/components/Basic/Entry/Entry'
  import EntryDateLimiter from '@/components/Basic/Entry/EntryDateLimiter'
  import EntryLimiter from '@/components/Basic/Entry/EntryLimiter'

  export default {
    name: 'EntryList',
    components: {
      EntryLimiter,
      EntryDateLimiter,
      Entry
    },
    props: ['entryDataList'],
    data () {
      return {
        entryListWidth: 0
      }
    },
    created () {
      window.addEventListener('resize', this.handleResize)
    },
    mounted () {
      this.handleResize()
    },
    methods: {
      handleResize () {
        // console.log(this.$el.clientWidth)
        this.entryListWidth = this.$el.clientWidth
      },
      printDate: function (index) {
        if (index === 0) {
          return true
        } else {
          return (new Date(this.entryDataList[index].date) < new Date(this.entryDataList[index - 1].date))
        }
      },
      getActualDate (date) {
        date = new Date(date)
        return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
      }
    },
    computed: {
      getEntrySizeType () {
        if (this.entryListWidth > 600) {
          return 'normal'
        } else {
          return 'small'
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/entryStyle.scss";

</style>
