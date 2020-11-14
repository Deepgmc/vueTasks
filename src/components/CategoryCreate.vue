<template>
<div class="col s12 m6">
   <div>
      <div class="page-subtitle">
         <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
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
            Создать
            <i class="material-icons right">send</i>
         </button>
      </form>
   </div>
</div>
</template>

<script>
import {required, minValue, minLength, integer} from 'vuelidate/lib/validators'
export default {
   data: () => ({
      title: '',
      limit: 100
   }),
   validations: {
      title: {required, minLength: minLength(3)},
      limit: {required, integer, minValue: minValue(1)}
   },
   mounted(){
      M.updateTextFields()
   },
   methods: {
      async submitHandler(){
         if(this.$v.$invalid){
            this.$v.$touch()
            return
         }
         const formData = {
            title: this.title,
            limit: this.limit
         }

         try {
            const category = await this.$store.dispatch('createCategory', formData)
            this.title = ''
            this.limit = 100
            this.$v.$reset()
            this.$message('Категория успешно создана')
            this.$emit('created', category)
         } catch (e) {}
         
      }
   }
}
</script>
