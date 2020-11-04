import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import info from './modules/info'

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      error: null,
      user: {
         name: '',
         bill: 0
      }
   },
   mutations: {
      setError(state, error){
         state.error = error
      },
      clearError(state){
         state.error = null
      },
      setUser(state, user){
         state.user = {
            name: user.name,
            bill: user.bill
         }
      }
   },
   getters: {
      error: s => s.error
   },
   modules: {
      auth, info
   }
})
