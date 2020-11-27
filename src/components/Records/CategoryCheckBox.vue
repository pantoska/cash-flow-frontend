<template>
  <b-input-group>
    <b-form-checkbox-group
      v-model="selectedCategory"
      name="category"
      stacked
      class="text-left"
    >
      <div v-for="category in categoryList" :key="category.categoryId">
        <b-form-checkbox :value="category.categoryId">
          {{ category.name }}
        </b-form-checkbox>
        <b-form-checkbox-group
          v-model="selectedSubcategory"
          name="subcategory"
          stacked
          class="text-left pl-2"
        >
          <b-form-checkbox
            v-for="subcategory in category.subcategory"
            :key="subcategory.subcategoryId"
            :value="subcategory.subcategoryId"
          >
            {{ subcategory.name }}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </div>
    </b-form-checkbox-group>
  </b-input-group>
</template>

<script>
export default {
  name: "CategoryCheckBox",
  props: ["categoryList"],
  data() {
    return {
      selectedCategory: [],
      selectedSubcategory: [],
    };
  },
  methods: {
    emitData() {
      this.$emit("updateData", this.selectedCategory, this.selectedSubcategory);
    },
  },
  created() {
    for (let i = 0; i < this.categoryList.length; i++) {
      this.selectedCategory.push(this.categoryList[i].categoryId);

      for (let j = 0; j < this.categoryList[i].subcategory.length; j++) {
        this.selectedSubcategory.push(
          this.categoryList[i].subcategory[j].subcategoryId
        );
      }
    }
    this.emitData();
  },
  watch: {
    selectedCategory(val) {
      this.emitData();
    },
    selectedSubcategory(val) {
      this.emitData();
    },
  },
};
</script>

<style scoped></style>
