<template>
  <div class="entry-box d-flex">
    <div class="entry-category-icon-box">
      <div :style="getCategoryColor">
        {{ getCategoryIcon }}
      </div>
    </div>
    <div
      class="entry-data-box flex-grow-1"
      :class="getMoneyColor"
      v-if="!openedEntryView"
    >
      <EntrySmall
        v-if="entrySize === 'small'"
        :entry-data="entryData"
        :amount="getAmount"
      />
      <EntryNormal v-else :entry-data="entryData" :amount="getAmount" />
    </div>
    <div class="entry-data-box flex-grow-1" :class="getMoneyColor" v-else>
      <EntryOpened />
    </div>
    <div class="entry-menu-button">
      <div>
        <ChevronDown
          :size="25"
          v-if="!openedEntryView"
          @click="onClickExpandEntryView"
        />
        <ChevronUp :size="25" v-else @click="onClickExpandEntryView" />
      </div>
    </div>
  </div>
</template>

<script>
import ChevronDown from "vue-material-design-icons/ChevronDown";
import ChevronUp from "vue-material-design-icons/ChevronUp";
import EntrySmall from "@/components/Basic/Entry/EntrySmall";
import EntryNormal from "@/components/Basic/Entry/EntryNormal";
import EntryOpened from "@/components/Basic/Entry/EntryOpened";

export default {
  name: "Entry",
  components: {
    EntryOpened,
    EntryNormal,
    EntrySmall,
    ChevronDown,
    ChevronUp,
  },
  data() {
    return {
      openedEntryView: false,
    };
  },
  props: ["entryData", "entrySize"],
  computed: {
    getCategoryIcon() {
      return this.entryData.subcategory.category.name[0];
    },
    getCategoryColor() {
      return (
        "background-color:" + this.entryData.subcategory.category.color.color
      );
    },
    getAmount() {
      const gr = this.entryData.amount % 100;
      if (gr < 10) {
        return Math.floor(this.entryData.amount / 100) + ",0" + gr + "zł";
      } else {
        return Math.floor(this.entryData.amount / 100) + "," + gr + "zł";
      }
    },
    getMoneyColor() {
      if (this.entryData.amount < 0) {
        return "outcome";
      } else {
        return "income";
      }
    },
  },
  methods: {
    onClickExpandEntryView(event) {
      this.openedEntryView = !this.openedEntryView;
    },
  },
};
</script>
