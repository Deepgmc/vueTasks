import Vue from 'vue'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter.js'
import currencyFilter from '@/filters/currency.filter.js'
import tooltipDirective from '@/directives/tooltip.directive'


import messagePlugin from '@/utils/message.plugin.js'
import Loader from '@/components/app/Loader'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import 'materialize-css/dist/js/materialize.min.js'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)

Vue.directive('tooltip', tooltipDirective)

Vue.component('Loader', Loader)

var firebaseConfig = {
   apiKey           : "AIzaSyDR_8476lCW_NZljc8lyGi6dTio2v51j_Y",
   authDomain       : "vuetasksgmc.firebaseapp.com",
   databaseURL      : "https://vuetasksgmc.firebaseio.com",
   projectId        : "vuetasksgmc",
   storageBucket    : "vuetasksgmc.appspot.com",
   messagingSenderId: "777329095872",
   appId            : "1:777329095872:web:5acbd2e5b2a88ee303a925"
 };

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
   if(app !== undefined) return
app = new Vue({
   router,
   store,
   render: h => h(App)
})
.$mount('#app')
})
