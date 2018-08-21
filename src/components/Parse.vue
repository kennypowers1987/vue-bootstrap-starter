<template>
  <div class="parse">
    <h1>Parse CSV to JSON</h1>
    <input id="fileInput" type="file" @change="upload" v-bind:variant="theme">
    <b-button @click='save' v-bind:variant="theme" download>
      Download
    </b-button>
    <div class="body">
    </div>
    <b-tabs v-if="playersList">
      <b-tab title="All Players" active>
        <b-table striped hover :items="playersList" :fields="playersListFields">
          <template slot="delete_btn" slot-scope="row">
            <b-button size="sm" @click.stop="removePlayer(playersList[row.index])" class="btn btn-danger">
              Remove
            </b-button>
          </template>
        </b-table>
      </b-tab>
      <b-tab title="Players By Team">
        <div class="alert alert-light">
          <b-btn variant="link" size="sm" v-for="team in Object.keys(teams).sort()" @click="setTeam(team)">
            {{team}}
          </b-btn>
        </div>
        <b-table striped hover :items="team" :fields="playersListFields" v-if="team.length"></b-table>
      </b-tab>
      <b-tab title="Players By Position">
        <div class="alert alert-light">
          <b-btn variant="link" size="sm" v-for="position in Object.keys(positions)" @click="setPosition(position)">
            {{position}}
          </b-btn>
        </div>
        <b-table striped hover :items="position" :fields="playersListFields" v-if="position.length"></b-table>
      </b-tab>
      <b-tab title="Lineups">
        <div>
          <label>Select Flex Position:</label>
          <select v-model="selectedFlex">
            <option>RB</option>
            <option>WR</option>
            <option>TE</option>
          </select>
        </div>
        <b-btn @click="generate()">Generate</b-btn>
        <b-table striped hover :items="lineups" v-if="lineups.length"></b-table>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
  import Vue from "vue";
  import VueLocalStorage from "vue-localstorage";
  import {
    EventBus
  } from "../utils/myEventBus";
  import {
    HTTP
  } from "../services/fakeData";
  import Papa from 'papaparse';
  import Blob from 'blob';
  import FileSaver from 'file-saver';
  Vue.use(VueLocalStorage);
  export default {
    name: 'parse',
    data() {
      return {
        selectedFlex: 'RB',
        playersList: null,
        theme: Vue.localStorage.get("theme"),
        playersListFields: [],
        team: {},
        teams: {},
        position: {},
        positions: {},
        lineups: [],
        fullLineups: [],
        lineup: {
          'QB': null,
          'RB1': null,
          'RB2': null,
          'WR1': null,
          'WR2': null,
          'WR3': null,
          'TE': null,
          'FLEX': null,
          'DST': null,
          'Total Salary': null
        }
      }
    },
    created() {
      this.$bus.$on("theme-changed", $event => {
        this.updateTheme();
      });
    },
    methods: {
      drawTeams() {
        this.teams = this.groupBy(this.playersList, "TeamAbbrev");
      },
      drawPositions() {
        this.positions = this.groupBy(this.playersList, "Position");
      },
      removePlayer(player) {
        var id = player.ID
        console.log(this.playersList);
        this.playersList = this.playersList.filter(function (player) {
          return player.ID !== id;
        });
        this.drawTeams();
        this.drawPositions();
      },
      upload(e) {
        var that = this;
        const fileToLoad = event.target.files[0]
        const reader = new FileReader()
        reader.onload = fileLoadedEvent => {
          Papa.parse(fileLoadedEvent.target.result, {
            header: true,
            complete(results) {
              that.playersList = results.data
              that.playersListFields = Object.keys(that.playersList[0]).map(str => {
                return {
                  key: str,
                  sortable: true
                }
              });
              that.playersListFields.push('delete_btn');
              console.log(that.teams);
              console.log(that.positions);
              that.drawTeams();
              that.drawPositions();
            },
            error(errors) {
              console.log('error', errors)
            }
          })
        }
        reader.readAsText(fileToLoad)
      },
      save() {
        const blob = new Blob([this.parseJSONtoCSV()], {
          type: 'text/csv'
        })
        FileSaver.saveAs(blob, 'test.csv')
      },
      parseJSONtoCSV() {
        return Papa.unparse(this.fullLineups)
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
        this.team = this.teams[team];
      },
      setPosition(pos) {
        this.position = this.positions[pos];
      },
      generate() {
        var that = this;
        var playerIds = [];

        function getQB() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['QB'].length - 1));
          console.log(index);
          //that.lineup.QB = (({ Name, Salary, Position }) => ({ Name, Salary, Position }))(that.positions['QB'][index])
          that.lineup.QB = that.positions['QB'][index];
          playerIds.push(that.lineup.QB.ID);
          getRB1();
        }

        function getRB1() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['RB'].length - 1));
          console.log(index);
          that.lineup.RB1 = that.positions['RB'][index];
          playerIds.push(that.lineup.RB1.ID);
          getRB2();
        }

        function getRB2() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['RB'].length - 1));
          console.log(index);
          that.lineup.RB2 = that.positions['RB'][index];
          playerIds.push(that.lineup.RB2.ID);
          getWR1();
        }

        function getWR1() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['WR'].length - 1));
          console.log(index);
          that.lineup.WR1 = that.positions['WR'][index];
          playerIds.push(that.lineup.WR1.ID);
          getWR2();
        }

        function getWR2() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['WR'].length - 1));
          console.log(index);
          that.lineup.WR2 = that.positions['WR'][index];
          playerIds.push(that.lineup.WR2.ID);
          getWR3();
        }

        function getWR3() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['WR'].length - 1));
          console.log(index);
          that.lineup.WR3 = that.positions['WR'][index];
          playerIds.push(that.lineup.WR3.ID);
          getTE();
        }

        function getTE() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['TE'].length - 1));
          console.log(index);
          that.lineup.TE = that.positions['TE'][index];
          playerIds.push(that.lineup.TE.ID);
          getFLEX();
        }

        function getFLEX() {
          let index = Math.floor(Math.random() * Math.floor(that.positions[that.selectedFlex].length - 1));
          console.log(index);
          that.lineup.FLEX = that.positions[that.selectedFlex][index];
          playerIds.push(that.lineup.FLEX.ID);
          getDST();
        }

        function getDST() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['DST'].length - 1));
          console.log(index);
          that.lineup.DST = that.positions['DST'][index];
          playerIds.push(that.lineup.DST.ID);
          console.log(that.lineup);
          validateLineup();
        }

        function validateLineup() {
          function removeDuplicate(arr) {
            var c;
            var len = arr.length;
            var result = [];
            var obj = {};
            for (c = 0; c < len; c++) {
              obj[arr[c]] = 0;
            }
            for (c in obj) {
              result.push(c);
            }
            return result;
          }
          var checkDupes = removeDuplicate(playerIds);
          var totalSalary =
            parseInt(that.lineup.QB.Salary) +
            parseInt(that.lineup.RB1.Salary) +
            parseInt(that.lineup.RB2.Salary) +
            parseInt(that.lineup.WR1.Salary) +
            parseInt(that.lineup.WR2.Salary) +
            parseInt(that.lineup.WR3.Salary) +
            parseInt(that.lineup.TE.Salary) +
            parseInt(that.lineup.FLEX.Salary) +
            parseInt(that.lineup.DST.Salary);
          console.log('$' + totalSalary)
          if (checkDupes.length < 9) {
            console.log('dupes exist, restarting ', checkDupes.length);
            getQB();
          } else if (totalSalary > 50000) {
            console.log('salary cap expectations not met ', totalSalary);
            getQB();
          } else {
            that.lineup['Total Salary'] = totalSalary;
            that.fullLineups.unshift(that.lineup);
            var lineup = {
              'QB': that.lineup.QB.Name + " " + that.lineup.QB['TeamAbbrev'] + " " + that.lineup.QB['Salary'],
              'RB1': that.lineup.RB1.Name + " " + that.lineup.RB1['TeamAbbrev'] + " " + that.lineup.RB1['Salary'],
              'RB2': that.lineup.RB2.Name + " " + that.lineup.RB2['TeamAbbrev'] + " " + that.lineup.RB2['Salary'],
              'WR1': that.lineup.WR1.Name + " " + that.lineup.WR1['TeamAbbrev'] + " " + that.lineup.WR1['Salary'],
              'WR2': that.lineup.WR2.Name + " " + that.lineup.WR2['TeamAbbrev'] + " " + that.lineup.WR2['Salary'],
              'WR3': that.lineup.WR3.Name + " " + that.lineup.WR3['TeamAbbrev'] + " " + that.lineup.WR3['Salary'],
              'TE': that.lineup.TE.Name + " " + that.lineup.TE['TeamAbbrev'] + " " + that.lineup.TE['Salary'],
              'FLEX': that.lineup.FLEX.Name + " " + that.lineup.FLEX['TeamAbbrev'] + " " + that.lineup.FLEX['Salary'],
              'DST': that.lineup.DST.Name + " " + that.lineup.DST['TeamAbbrev'] + " " + that.lineup.DST['Salary'],
              'Total Salary': totalSalary
            }            
            that.lineups.unshift(lineup);
            
          }
        }
        getQB();
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

