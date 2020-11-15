<template>
<div class="col s12 m6">
   <div>
      <div class="page-subtitle">
         <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
         <div class="input-field" >
            <select ref="select" v-model="current">
               <option
                  v-for="c of categories"
                  :key="c.id"
                  :value="c.id"

               >
                  {{c.title}}
               </option>
            </select>
            <label>Выберите категорию</label>
         </div>

         <div class="input-field">
            <input
                  id="name"
                  type="text"
                  v-model.trim="title"
                  :class="{invalid: ($v.title.$dirty && !$v.title.required) || ($v.title.$dirty && !$v.title.minLength)}"
            >
            <label for="name">Название</label>
            <span
               class="helper-text invalid"
               v-if="$v.title.$dirty && !$v.title.required"
            >
               Введите название
            </span>
            <span
               class="helper-text invalid"
               v-if="$v.title.$dirty && !$v.title.minLength"
            >
               Минимум {{$v.title.$params.minLength.min}} символа
            </span>
         </div>

         <div class="input-field">
            <input
                  id="limit"
                  type="number"
                  v-model.number.trim="limit"
                  :class="{invalid: ($v.title.$dirty && !$v.title.integer) || ($v.title.$dirty && !$v.title.required) || ($v.title.$dirty && !$v.title.minValue)}"
            >
            <label for="limit">Лимит</label>

            <span class="helper-text invalid"
               v-if="$v.limit.$dirty && !$v.limit.required"
            >
               Необходимо значение
            </span>
            <span class="helper-text invalid"
               v-if="$v.limit.$dirty && !$v.limit.minValue"
            >
               Минимальное значение {{$v.limit.$params.minValue.min}}
            </span>
            <span class="helper-text invalid"
               v-if="$v.limit.$dirty && !$v.limit.integer"
            >
               Необходимо ввести число
            </span>
         </div>

         <button class="btn waves-effect waves-light" type="submit">
            Обновить
            <i class="material-icons right">send</i>
         </button>
      </form>
   </div>
</div>
</template>

<script>
import {required, minValue, minLength, integer} from 'vuelidate/lib/validators'
export default {
   props: {
      categories: {
         type: Array,
         required: true
      }
   },
   data: () => ({
      select : null,
      title  : '',
      limit  : 100,
      current: null
   }),
   validations: {
      title: {required, minLength: minLength(3)},
      limit: {required, integer, minValue: minValue(1)}
   },
   watch: {
      current(catId){
         const {id, title, limit} = this.categories.find(c => c.id === catId)
         this.current = id
         this.title = title
         this.limit = limit
      }
   },
   created(){
      const {id, title, limit} = this.categories[0]
      this.current = id
      this.title = title
      this.limit = limit
   },
   methods: {
      async submitHandler(){
         if(this.$v.$invalid){
            this.$v.$touch()
            return
         }
         try {
            const categoryData = {
               id: this.current,
               title: this.title,
               limit: this.limit,
            }
            await this.$store.dispatch('updateCategory', categoryData)
            this.$message('Категория обновлена')
            this.$emit('updated', categoryData)
         } catch(e){}
      }
   },
   mounted(){
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
   },
   destroyed(){
      if(this.select && this.select.destroy) this.select.destroy()
   }
}
</script>
