<template>
  <div>
    <b-jumbotron header="Cards" lead="Example Card Components for Vue.js 2, text loaded via Axios HTTP " v-bind:text-variant="theme">
    </b-jumbotron>
    <div id="cards" class="container">
      <vue-simple-spinner size="big" message="Loading Cards..." v-if="posts.length < 1"></vue-simple-spinner>
      <div v-if="posts && posts.length" class="row">
        <b-card v-for="post of posts" v-bind:key="post.id" v-bind:text-variant="theme" bg-variant="default" :title="post.id.toString()" tag="article" class="col-sm-2 card">
          <p class="card-text">
            <strong>{{post.title | truncate(25)}}</strong>
            <br /> {{post.body | truncate(50) }}
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
import { EventBus } from "../config/myEventBus";
import { HTTP } from "../services/fakeData";
Vue.use(VueLocalStorage);
export default {
  name: "cards",
  data() {
    return {
      msg: "Welcome!",
      posts: [],
      errors: [],
      theme: Vue.localStorage.get("theme")
    };
  },
  // Fetches posts when the component is created.
  created() {
    HTTP.get(`posts`)
      .then(response => {
        this.posts = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
    this.$bus.$on("theme-changed", $event => {
      console.log(Vue.localStorage.get("theme"), $event);
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
.card {
  margin: 5px !important;
}
</style>
