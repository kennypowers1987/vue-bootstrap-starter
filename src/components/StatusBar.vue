<template>
<div class='row'>
        <ul class="progressbar">
            <li class="active">Pre Qualified</li>
            <li>Agency Accepted</li>
            <li>Offer Submitted</li>
            <li>Offer Accepted</li>
            <li>Close Date</li>
        </ul>       
</div>
</template>

<script>
import Vue from "vue";
import VueLocalStorage from "vue-localstorage";
import { EventBus } from "../utils/myEventBus";
import { HTTP } from "../services/fakeData";
Vue.use(VueLocalStorage);
export default {
  name: 'status-bar',
  data() {
    return {
      
    };
  },
  // Fetches posts when the component is created.
  created() {
    // HTTP.get(`http://jsonplaceholder.typicode.com/posts`)
    //   .then(response => {
    //     this.posts = response.data;
    //   })
    //   .catch(e => {
    //     this.errors.push(e);
    //   });
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
  .progressbar {
        counter-reset: step;
        margin-bottom: 5%;
        width:100% !important;
    }
  .progressbar li {
            list-style-type: none;
            width: 16%;
            float: left;
            font-size: 12px;
            position: relative;
            text-align: center;
            text-transform: uppercase;
            color: #7d7d7d;
        }

            .progressbar li:before {
                width: 30px;
                height: 30px;
                content: counter(step);
                counter-increment: step;
                line-height: 30px;
                border: 2px solid #7d7d7d;
                display: block;
                text-align: center;
                margin: 0 auto 10px auto;
                border-radius: 50%;
                background-color: white;
            }

            .progressbar li:after {
                width: 100%;
                height: 2px;
                content: '';
                position: absolute;
                background-color: #7d7d7d;
                top: 15px;
                left: -50%;
                z-index: -1;
            }

            .progressbar li:first-child:after {
                content: none;
            }

            .progressbar li.active {
                color: green;
            }

                .progressbar li.active:before {
                    border-color: #55b776;
                }

                .progressbar li.active + li:after {
                    background-color: #55b776;
                }
</style>