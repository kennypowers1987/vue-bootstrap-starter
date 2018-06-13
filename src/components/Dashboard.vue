<template>
   <div>
      <!-- <b-jumbotron :header="header" 
         :lead="lead" v-bind:text-variant="theme">
         </b-jumbotron>     -->
      <div id="cards" class="container container-fluid">
        <div>
               <b-dropdown id="ddown1" v-bind:variant="theme" style="margin-left:-1vw">
               <b-dropdown-item>Buyers</b-dropdown-item>
               <b-dropdown-item>Agents</b-dropdown-item>
               <b-dropdown-item>Loan Officers</b-dropdown-item>
               <b-dropdown-item>Lenders</b-dropdown-item>
               <b-dropdown-item>Brokers</b-dropdown-item>               
               <b-dropdown-divider></b-dropdown-divider>
               <b-dropdown-item>Reports</b-dropdown-item>
               <b-dropdown-item disabled>Upgrade</b-dropdown-item>
            </b-dropdown>
            </div>
         <vue-simple-spinner size="big" message="Loading Cards..." v-if="contactCards.length < 1"></vue-simple-spinner>
         <div v-if="contactCards && contactCards.length" class="row card-container">            
            <b-card v-for="card of contactCards" 
               img-src='https://image.flaticon.com/icons/svg/149/149066.svg'
               img-alt="Image"
               img-top 
               v-bind:key="card.cardType" 
               v-bind:text-variant="theme" 
               v-bind:bg-variant="theme" 
               :title="card.name" 
               tag="article" 
               class="col-sm-12 col-md-4 card">
               
               <div class="card-text">
                  <label>{{card.phone}}</label>            
               </div>
               <div class="card-text">           
                  <label>{{card.email}}</label>
                  <br /> {{card.address}}
               </div>
            </b-card>
         </div>
         <ul v-if="errors && errors.length">
            <li v-for="error of errors" v-bind:key="error.id">
               {{error.message}}
            </li>
         </ul>
      </div>
   </div>
</template>

<script>
import Vue from "vue";
import VueLocalStorage from "vue-localstorage";
import { EventBus } from "../utils/myEventBus";
import { HTTP } from "../services/fakeData";
Vue.use(VueLocalStorage);
export default {
  name: "dashboard",
  data() {
    return {
      msg: "Welcome!",
      posts: [],
      contactCards: [],
      errors: [],
      theme: Vue.localStorage.get("theme"),
      header: "Dashboard",
      //lead: "Example Card Components for Vue.js 2"
    };
  },
  // Fetches posts when the component is created.
  created() {
    HTTP.get(`src/services/contactCards.json`)
      .then(response => {
        this.contactCards = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
    this.$bus.$on("theme-changed", $event => {
      this.updateTheme();
    });
  },
  methods: {
    updateTheme() {
      this.theme = Vue.localStorage.get("theme");
      console.log("updating theme to : " + this.theme);
    }
  }
};
</script>

<style lang="scss" scoped>
img{
  padding:15%;
  width:85%;
}
</style>
