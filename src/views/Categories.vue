<template> 
   <div>
   <div class="page-title">
      <h3>Категории</h3>
   </div>
   <section>
      <Loader v-if="loading" />
      <div class="row" v-else>

         <CategoryCreate @created="addNewCategory" />

         <CategoryEdit
            v-if="categories.length"
            :categories="categories"
            :key="categories.length + updateCount"
            @updated="updateHandler"
         />
         <p v-else class="center">Категории не созданы</p>
      </div>
   </section>
   </div>
</template>

<script>

import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
   name: 'categories',
   data: () => ({
      categories : [],
      loading    : true,
      default    : [],
      updateCount: 0
   }),
   async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false
   },
   components: {
      CategoryCreate, CategoryEdit
   },
   methods: {
      addNewCategory(newCategory) {
         this.categories.push(newCategory)
      },
      updateHandler(category){
         const findCategory = this.categories.findIndex(c => c.id === category.id)
         this.categories[findCategory].title = category.title
         this.categories[findCategory].limit = category.limit
         this.updateCount++
      }
   }
}
</script>
