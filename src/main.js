import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "./styles/test.css";
import nav from './vues/navbar'
import router from './config/router'
import VueTruncate from 'vue-truncate-filter'
import VueLocalStorage from 'vue-localstorage'
import Vuex from 'vuex'
import Spinner from 'vue-simple-spinner'

Vue.use(BootstrapVue)
Vue.use(VueTruncate)
Vue.use(VueLocalStorage)
Vue.use(Vuex)
Vue.component('navbar', nav);
Vue.component('vue-simple-spinner', Spinner)

if (!Vue.localStorage.get('theme')) {
  Vue.localStorage.set('theme', 'primary')
};

router.replace('/modals')

const app = new Vue({
  components: nav,  
  router,
  Spinner
}).$mount('#app')
