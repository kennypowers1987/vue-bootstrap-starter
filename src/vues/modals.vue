<template id="modals">
<div>
<b-jumbotron header="Modals" lead="Example Modal Components for Vue.js 2" v-bind:text-variant="theme">  
  <b-btn v-b-modal.myModal v-bind:variant="theme">Show Basic Modal</b-btn>
  <b-btn v-b-modal.modalPrevent v-bind:variant="theme">Show Form Modal</b-btn>
    <!-- Main UI -->
    
    <!-- Modal Component -->
    <b-modal id="modalPrevent"
             ref="modal"
             title="Submit your name"
             @ok="handleOk"
             @shown="clearName"
             :header-bg-variant="theme" :ok-variant="theme"
             >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input type="text"
                      placeholder="Enter your name"
                      v-model="name"></b-form-input>
      </form>
    </b-modal>
    <div class="mt-3 mb-3">
      Submitted Names:      
        <b-alert v-bind:key="n" v-for="n in names" :variant="theme" show class="mt-1 mb-1 centered">{{n}}</b-alert>
</div>
</b-jumbotron>
<b-modal id="myModal" :header-bg-variant="theme" :ok-variant="theme">
    Hello From My Modal!
</b-modal>

</div>
</template>

<script>
import Vue from "vue";
import VueLocalStorage from "vue-localstorage";
import { EventBus } from "../config/bus";
Vue.use(VueLocalStorage);

export default {
  name: "modals",
  data() {
    return {
      theme: Vue.localStorage.get("theme"),
      name: "",
      names: []
    };
  },
  created() {
    this.$bus.$on("theme-changed", $event => {
      console.log(Vue.localStorage.get("theme"), $event);
      this.updateTheme();
    });
  },
  methods: {
    updateTheme() {
      this.theme = Vue.localStorage.get("theme");
      console.log("updating theme to : " + this.theme);
    },
    clearName() {
      this.name = "";
    },
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.name) {
        alert("Please enter your name");
      } else {
        this.handleSubmit();
      }
    },
    handleSubmit() {
      this.names.push(this.name);
      this.clearName();
      this.$refs.modal.hide();
    }
  }
};
</script>
<style>

</style>