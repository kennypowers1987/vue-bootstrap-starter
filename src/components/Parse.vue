<template>
  <div class="parse">
    <h1>Parse CSV to JSON</h1>
    <input id="fileInput" type="file" @change="upload" v-bind:variant="theme">
    <b-button @click='save' v-bind:variant="theme" download>
      Download
    </b-button>
    <div class="body">
    </div>
    <b-tabs v-if="doc">
      <b-tab title="All" active>
        <b-table striped hover :items="doc" :fields="docFields">
          <template slot="delete_btn" slot-scope="row">
            <b-button size="sm" @click.stop="doc.splice(row.index, 1)" class="btn btn-danger">
              Remove
            </b-button>
          </template>
        </b-table>
      </b-tab>
      <b-tab title="By Team">
        <div class="alert alert-light">
          <b-btn variant="link" size="sm" v-for="team in Object.keys(teams).sort()" @click="setTeam(team)">
            {{team}}
          </b-btn>
        </div>
        <b-table striped hover :items="team" :fields="docFields" v-if="team.length">
          <template slot="delete_btn" slot-scope="row">
            <b-button size="sm" @click.stop="doc.splice(row.index, 1)" class="btn btn-danger">
              Remove
            </b-button>
          </template>
        </b-table>
      </b-tab>
      <b-tab title="By Position">
          <div class="alert alert-light">
              <b-btn variant="link" size="sm" v-for="position in Object.keys(positions).sort()" @click="setPosition(position)">
                {{position}}
              </b-btn>
            </div>
            <b-table striped hover :items="position" :fields="docFields" v-if="position.length">
              <template slot="delete_btn" slot-scope="row">
                <b-button size="sm" @click.stop="doc.splice(row.index, 1)" class="btn btn-danger">
                  Remove
                </b-button>
              </template>
            </b-table>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>	
  import Vue from "vue";
  import VueLocalStorage from "vue-localstorage";
  import { EventBus } from "../utils/myEventBus";
  import { HTTP } from "../services/fakeData";
  import Papa from 'papaparse';
  import Blob from 'blob';
  import FileSaver from 'file-saver';
  Vue.use(VueLocalStorage);
  export default {
    name: 'parse',
    data() {
      return {
        doc: null,
        theme: Vue.localStorage.get("theme"),
        docFields: [],
        team: {},
        position: {}
      }
    },
    created() {
      this.$bus.$on("theme-changed", $event => {
        this.updateTheme();
      });
    },
    methods: {
      upload(e) {
        const that = this
        const fileToLoad = event.target.files[0]
        const reader = new FileReader()
        reader.onload = fileLoadedEvent => {
          Papa.parse(fileLoadedEvent.target.result, {
            header: true,
            complete(results) {
              that.doc = results.data
              that.docFields = Object.keys(that.doc[0]).map(str => {
                return {
                  key: str,
                  sortable: true
                }
              });
              that.docFields.push('delete_btn');
              that.teams = that.groupBy(that.doc, "TeamAbbrev");
              that.positions = that.groupBy(that.doc, "Position");
              console.log(that.teams);
              console.log(that.positions);

            },
            error(errors) {
              console.log('error', errors)
            }
          })
        }
        reader.readAsText(fileToLoad)
      },
      save() {
        const blob = new Blob([this.parseJSONtoCSV()], { type: 'text/csv' })
        FileSaver.saveAs(blob, 'test.csv')
      },
      parseJSONtoCSV() {
        return Papa.unparse(this.doc)
      },
      updateTheme() {
        this.theme = Vue.localStorage.get("theme");
        console.log("updating theme to : " + this.theme);
      },
      groupBy(arr, property) {
        return arr.reduce((arr, x) => {
          if (!arr[x[property]]) {
            arr[x[property]] = [];
          }
          arr[x[property]].push(x);
          return arr;
        }, {});
      },
      setTeam(team) {
        console.log(team);
        this.team = this.teams[team];
      },
      setPosition(pos){
        this.position = this.positions[pos];
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .body {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .entry {
    width: 40%;
  }

  .entry-result {
    width: 100%;
    height: 50vh;
  }

  .preview {
    width: 40%;
    text-align: left;
  }

  .parse {
    margin-top: 7vh;
  }
</style>