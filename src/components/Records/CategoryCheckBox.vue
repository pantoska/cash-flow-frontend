<template>
  <b-input-group>
    <b-form-checkbox-group v-model="selectedCategory" name="category" stacked class="text-left">
      <div v-for="category in categoryList" :key="category.categoryId">
        <b-form-checkbox :value="category.id_category">
          {{category.name}}
        </b-form-checkbox>
        <b-form-checkbox-group v-model="selectedSubcategory" name="subcategory" stacked class="text-left pl-2">
          <b-form-checkbox v-for="subcategory in category.subcategory" :key="subcategory.subcategoryId"
                           :value="subcategory.id_subcategory">
            {{subcategory.name}}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </div>
    </b-form-checkbox-group>
  </b-input-group>
</template>

<script>
  export default {
    name: 'CategoryCheckBox',
    props: ['categoryList'],
    data () {
      return {
        selectedCategory: [],
        selectedSubcategory: []
      }
    },
    methods: {
      emitData () {
        this.$emit('updateData', this.selectedCategory, this.selectedSubcategory)
      },
      checkAll () {
        if (this.categoryList !== undefined) {
          for (let i = 0; i < this.categoryList.length; i++) {
            this.selectedCategory.push(this.categoryList[i].id_category)

            for (let j = 0; j < this.categoryList[i].subcategoryList.length; j++) {
              this.selectedSubcategory.push(this.categoryList[i].subcategoryList[j].id_subcategory)
            }
          }
          this.emitData()
        }
      }
    },
    created () {
      this.checkAll()
    },
    watch: {
      selectedCategory (val) {
        this.emitData()
      },
      selectedSubcategory (val) {
        this.emitData()
      },
      categoryList () {
        this.checkAll()
      }
    }
  }
</script>

<style scoped>

</style>
