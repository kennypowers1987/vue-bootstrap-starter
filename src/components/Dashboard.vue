<template>
  <div>
    <b-jumbotron :header="header" 
                 :lead="lead" v-bind:text-variant="theme">
    </b-jumbotron>    
    <div id="cards" class="container">
      <status-bar></status-bar>
      <vue-simple-spinner size="big" message="Loading Cards..." v-if="contactCards.length < 1"></vue-simple-spinner>
      <div v-if="contactCards && contactCards.length" class="row card-container">
        <b-card v-for="card of contactCards" 
                img-src='https://image.flaticon.com/icons/svg/149/149066.svg'
                img-alt="Image"
                img-top 
                v-bind:key="card.cardType" 
                v-bind:text-variant="theme" 
                bg-variant="default" 
                :title="card.name" 
                tag="article" 
                class="col-sm-3 card">
          <p class="card-text">
            <strong>{{card.phone}}</strong>
            <strong>{{card.email}}</strong>
            <br /> {{card.address}}
          </p>
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
.card-container{
  margin:5%
}
.card {
  margin: 5px;
}
</style>
