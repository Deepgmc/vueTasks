<template>
   <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
         <div class="navbar-left">
            <a href="#" @click.prevent="$emit('click')">
               <i class="material-icons black-text">dehaze</i>
            </a>
            <span class="black-text">{{date | date('datetime')}}</span>
         </div>

         <ul class="right hide-on-small-and-down">
            <li>
               <a
                     class="dropdown-trigger black-text"
                     href="#"
                     data-target="dropdown-user"
                     ref="dropdownUser"
               >
                  {{name}}
                  <i class="material-icons right">arrow_drop_down</i>
               </a>

               <ul id='dropdown-user' class='dropdown-content'>
                  <li>
                     <router-link to="/profile" class="black-text">
                        <i class="material-icons">account_circle</i>Профиль
                     </router-link>
                  </li>
                  <li class="divider" tabindex="-1"></li>
                  <li>
                     <!-- <router-link to="/login" class="black-text" @click.prevent="logout">
                        <i class="material-icons">assignment_return</i>Выйти
                     </router-link> -->
                     <span class="black-text" @click.prevent="logout">
                        <i class="material-icons">assignment_return</i>Выйти
                     </span>
                  </li>
               </ul>

            </li>
         </ul>
      </div>
   </nav>
</template>

<script>

export default {
   data: () => {
      return {
         date    : new Date(),
         interval: null,
         dropdown: null
      }
   },

   computed: {
      name() {
         return this.$store.getters.info.name
      }
   },
   
   methods: {
      async logout(){
         try{
            await this.$store.dispatch('logout')
         } catch(e){
            this.$router.push('/login?message=logout')
         }
      },
      
   },

   mounted(){
      this.interval = setInterval(() => {
         this.date = new Date()
      }, 1000)
      this.dropdown = M.Dropdown.init(this.$refs.dropdownUser, {
         constrainWidth: true
      })
   },

   beforeDestroy(){
      if(this.dropdown && this.dropdown.destroy){
         this.dropdown.destroy()
      }
      clearInterval(this.interval)
   }
}
</script>
