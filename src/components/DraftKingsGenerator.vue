<template>
  <div class="parse">
    <h1>DraftKings NFL Lineup Generator
      <b-btn letiant="danger" v-b-popover.hover="'Import the .csv for your contest (DraftKings only this week), remove players you dislike, and start generating!'"
        title="Instructions">
        ?
      </b-btn>
      <h3 class="float-right" style="padding:10px;">
        <a href="https://neocities.org/site/lineupgenerator">Donate |</a>
        <a href="https://twitter.com/keepthereporter?lang=en">Follow </a>
      </h3>
    </h1>
    <div class="alert alert-info">
      <a href="https://lineupgenerator.net/Week1/Week1MainSlateFiltered.csv">
        Download Week 1 Players (Main Slate) Here
      </a>
      <br> Then import the .csv below (If you are playing a different slate, download the .csv from DK/FanDuel)
      <br>Remove players that you don't want in your player pool
      <br>Go to the Lineups tab and start generating lineups
      <br>Export your lineups by clicking 'Download', modify the headers manually, and import them into DraftKings or FanDuel
    </div>
    <div class="alert alert-danger">
      When you download your lineups, in the downloaded .csv, change the headers to 'QB, RB, RB, WR, WR, WR, TE, FLEX, DST' or
      you won't be able to upload it to DK.
    </div>
    <label>
      <strong>
        Import Your Player Pool
      </strong>
      <br> in the same format as the .csv download from DraftKings</label>
    <br>
    <input id="fileInput" type="file" @change="upload" v-bind:letiant="theme">

    <div class="body">
    </div>
    <b-tabs v-if="playersList">
      <b-tab title="All Players" active>
        <b-button @click='savePlayersList' v-bind:letiant="theme" download>
          Download Player List
        </b-button>
        <b-button @click=''>
          Delete Selected Players
        </b-button>
        <b-button @click=''>
          Increase Selected Exposure
        </b-button>
        <label class="pull-right">Select All:
          <input class="pull-right" type="checkbox">
        </label>

        <b-table striped hover :items="playersList" :fields="playersListFields" style="font-size: small;">
          <template slot="delete_btn" slot-scope="row">
            <b-button size="sm" @click.stop="removePlayer(playersList[row.index])" class="btn btn-danger">
              Remove
            </b-button>
            <b-button size="sm" @click.stop="addPlayer(playersList[row.index])" class="btn btn-success">
              Increase Exposure
            </b-button>
            <input type="checkbox" />
          </template>
        </b-table>
      </b-tab>
      <b-tab title="Players By Team">
        <div class="alert alert-light">
          <b-btn letiant="link" size="sm" v-for="team in Object.keys(teams).sort()" @click="setTeam(team)">
            {{team}}
          </b-btn>
        </div>
        <b-table striped hover :items="team" :fields="playersListFields" v-if="team.length"></b-table>
      </b-tab>
      <b-tab title="Players By Position">
        <div class="alert alert-light">
          <b-btn letiant="link" size="sm" v-for="position in Object.keys(positions)" @click="setPosition(position)">
            {{position}}
          </b-btn>
        </div>
        <b-table striped hover :items="position" :fields="playersListFields" v-if="position.length"></b-table>
      </b-tab>
      <b-tab title="Lineups">
        <div>
          <label>Random Flex position this week</label>
        </div>
        <b-btn @click="generate()">Generate</b-btn>
        <b-button @click='save' v-bind:letiant="theme" download>
          Download {{lineups.length}} Lineups
        </b-button>
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
    Name: 'draftkings',
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
        exposure: {
          QB: [],
          RB: [],
          WR: [],
          TE: [],
          DST: [],
        },
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
        },
        stackCount: [],

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
      calculateExposures() {
        var that = this;
        let qbCount = 0;
        let rbCount = 0;
        let wrCount = 0;
        let teCount = 0;
        let dstCount = 0;
        this.playersList.forEach(function (player, index) {
          qbCount += player.Position === "QB" ? 1 : 0;
          rbCount += player.Position === "RB" ? 1 : 0;
          wrCount += player.Position === "WR" ? 1 : 0;
          teCount += player.Position === "TE" ? 1 : 0;
          dstCount += player.Position === "DST" ? 1 : 0;
        });
        this.playersList.forEach(function (player, index) {
          player.Exposure = that.playersList.reduce(function (r, a) {
            if (player.Position === "QB") {
              return r + +(a.ID === player.ID) / qbCount;
            }
            if (player.Position === "RB") {
              return r + +(a.ID === player.ID) / rbCount;
            }
            if (player.Position === "WR") {
              return r + +(a.ID === player.ID) / wrCount;
            }
            if (player.Position === "TE") {
              return r + +(a.ID === player.ID) / teCount;
            }
            if (player.Position === "DST") {
              return r + +(a.ID === player.ID) / dstCount;
            }
          }, 0);

        });
        this.playersList.forEach(function (player, index) {
          player.Exposure = player.Exposure.toFixed(3);
        }, 0);

      },
      removePlayer(player) {
        let id = player.ID

        this.playersList = this.playersList.filter(function (player) {
          return player.ID !== id;
        });
        this.drawTeams();
        this.drawPositions();
        this.calculateExposures();
      },
      addPlayer(player) {
        this.playersList.push(player);
        this.drawTeams();
        this.drawPositions();
        this.calculateExposures();
      },
      upload(e) {
        let that = this;
        const fileToLoad = event.target.files[0]
        const reader = new FileReader()
        reader.onload = fileLoadedEvent => {
          Papa.parse(fileLoadedEvent.target.result, {
            header: true,
            complete(results) {
              that.playersList = results.data;
              that.calculateExposures();
              that.playersListFields = Object.keys(that.playersList[0]).map(str => {
                return {
                  key: str,
                  sortable: false
                }
              });
              that.playersListFields.push('delete_btn');
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
        const blob = new Blob([this.parseJSONtoCSV(this.fullLineups)], {
          type: 'text/csv'
        })
        FileSaver.saveAs(blob, 'DK' + new Date() + '.csv')
        alert(
          "In the downloaded .csv, change the headers to 'QB, RB, RB, WR, WR, WR, TE, FLEX, DST' or you won't be able to upload it to DraftKings."
        )
      },
      savePlayersList() {
        const blob = new Blob([this.parseJSONtoCSV(this.playersList)], {
          type: 'text/csv'
        })
        FileSaver.saveAs(blob, 'DK' + new Date() + '.csv')

      },
      parseJSONtoCSV(table) {
        return Papa.unparse(table)
      },
      updateTheme() {
        this.theme = Vue.localStorage.get("theme");
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
        let that = this;
        let playerIds = [];
        that.stackCount = [];

        function countUnique(iterable) {
          return new Set(iterable).size;
        }

        function getQB() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['QB'].length - 1));
          //that.lineup.QB = (({ Name, Salary, Position }) => ({ Name, Salary, Position }))(that.positions['QB'][index])
          that.lineup.QB = that.positions['QB'][index];
          playerIds.push(that.lineup.QB.ID);
          that.stackCount.push(that.lineup.QB['Game Info']);
          getRB1();
        }

        function getRB1() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['RB'].length - 1));
          that.lineup.RB1 = that.positions['RB'][index];
          playerIds.push(that.lineup.RB1.ID);
          that.stackCount.push(that.lineup.RB1['Game Info']);
          getRB2();
        }

        function getRB2() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['RB'].length - 1));
          that.lineup.RB2 = that.positions['RB'][index];
          playerIds.push(that.lineup.RB2.ID);
          that.stackCount.push(that.lineup.RB2['Game Info']);
          getWR1();
        }

        function getWR1() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['WR'].length - 1));
          that.lineup.WR1 = that.positions['WR'][index];
          if (that.lineup.WR1.TeamAbbrev != that.lineup.QB.TeamAbbrev) {
            return setTimeout(() => {
              that.generate();
            }, 0);
          }


          playerIds.push(that.lineup.WR1.ID);
          that.stackCount.push(that.lineup.WR1['Game Info']);
          getWR2();
        }

        function getWR2() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['WR'].length - 1));
          that.lineup.WR2 = that.positions['WR'][index];
          if (that.lineup.WR2['Game Info'] != that.lineup.WR1['Game Info']) {
            return setTimeout(() => {
              that.generate();
            }, 0);
          }
          playerIds.push(that.lineup.WR2.ID);
          that.stackCount.push(that.lineup.WR2['Game Info']);
          getWR3();
        }

        function getWR3() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['WR'].length - 1));
          that.lineup.WR3 = that.positions['WR'][index];
          if (that.lineup.WR3['Game Info'] != that.lineup.WR2['Game Info']) {
            return setTimeout(() => {
              that.generate();
            }, 0);
          }
          playerIds.push(that.lineup.WR3.ID);
          that.stackCount.push(that.lineup.WR3['Game Info']);
          getTE();
        }

        function getTE() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['TE'].length - 1));
          that.lineup.TE = that.positions['TE'][index];
          playerIds.push(that.lineup.TE.ID);
          that.stackCount.push(that.lineup.TE['Game Info']);
          getFLEX();
        }

        function getFLEX() {
          let flextInt = 0 //Math.floor(Math.random() * 3);
          let flexText = ''
          if (flextInt === 0) {
            flexText = 'RB'
          }
          if (flextInt === 1) {
            flexText = 'WR'
          }
          if (flextInt === 2) {
            flexText = 'TE'
          }
          let index = Math.floor(Math.random() * Math.floor(that.positions[flexText].length - 1));
          that.lineup.FLEX = that.positions[flexText][index];
          //   if (that.lineup.QB['Game Info'] != that.lineup.FLEX['Game Info']) {
          //     return setTimeout(() => {
          //       that.generate();
          //     }, 0);
          //   }
          playerIds.push(that.lineup.FLEX.ID);
          that.stackCount.push(that.lineup.FLEX['Game Info']);
          getDST();
        }

        function getDST() {
          let index = Math.floor(Math.random() * Math.floor(that.positions['DST'].length - 1));
          that.lineup.DST = that.positions['DST'][index];
          playerIds.push(that.lineup.DST.ID);
          validateLineup();
        }

        function validateLineup() {
          function removeDuplicate(arr) {
            let c;
            let len = arr.length;
            let result = [];
            let obj = {};
            for (c = 0; c < len; c++) {
              obj[arr[c]] = 0;
            }
            for (c in obj) {
              result.push(c);
            }
            return result;
          }
          let checkDupes = removeDuplicate(playerIds);
          let totalSalary =
            parseInt(that.lineup.QB.Salary) +
            parseInt(that.lineup.RB1.Salary) +
            parseInt(that.lineup.RB2.Salary) +
            parseInt(that.lineup.WR1.Salary) +
            parseInt(that.lineup.WR2.Salary) +
            parseInt(that.lineup.WR3.Salary) +
            parseInt(that.lineup.TE.Salary) +
            parseInt(that.lineup.FLEX.Salary) +
            parseInt(that.lineup.DST.Salary);
          //console.log('$' + totalSalary)

          if (checkDupes.length < 9) {
            console.log('dupes exist, restarting ', checkDupes.length);
            console.log(that.lineup.QB.Name)
            return setTimeout(() => {
              that.generate();
            }, 0);

          } else if (totalSalary < 49700) {
            console.log('salary cap expectations not met ', totalSalary);
            console.log(that.lineup.QB.Name)
            return setTimeout(() => {
              that.generate();
            }, 0);
          } else if (totalSalary > 50000) {
            console.log('salary cap expectations not met ', totalSalary);
            console.log(that.lineup.QB.Name)
            return setTimeout(() => {
              that.generate();
            }, 0);
          }
          //   else if (that.lineup.QB.Name === 'Josh Allen' || that.lineup.QB.Name === 'Cam Newton') {
          //     if (countUnique(that.stackCount) >= 6) {
          //       console.log('Stacking expectations not met ', totalSalary);
          //       return setTimeout(() => {
          //         that.generate();
          //       }, 0);
          //     }
          //   } 
          else {
            console.log(countUnique(that.stackCount));
            that.lineup['Total Salary'] = totalSalary;
            let lineup = {
              'QB': that.lineup.QB.Name + " " + that.lineup.QB['TeamAbbrev'] + " " + that.lineup.QB['Salary'],
              'RB1': that.lineup.RB1.Name + " " + that.lineup.RB1['TeamAbbrev'] + " " + that.lineup.RB1['Salary'],
              'RB2': that.lineup.RB2.Name + " " + that.lineup.RB2['TeamAbbrev'] + " " + that.lineup.RB2['Salary'],
              'WR1': that.lineup.WR1.Name + " " + that.lineup.WR1['TeamAbbrev'] + " " + that.lineup.WR1['Salary'],
              'WR2': that.lineup.WR2.Name + " " + that.lineup.WR2['TeamAbbrev'] + " " + that.lineup.WR2['Salary'],
              'WR3': that.lineup.WR3.Name + " " + that.lineup.WR3['TeamAbbrev'] + " " + that.lineup.WR3['Salary'],
              'TE': that.lineup.TE.Name + " " + that.lineup.TE['TeamAbbrev'] + " " + that.lineup.TE['Salary'],
              'FLEX': that.lineup.FLEX.Name + " " + that.lineup.FLEX['TeamAbbrev'] + " " + that.lineup.FLEX[
                'Salary'],
              'DST': that.lineup.DST.Name + " " + that.lineup.DST['TeamAbbrev'] + " " + that.lineup.DST['Salary'],
              'Total Salary': totalSalary
            }

            that.lineups.unshift(lineup);
            lineup = {
              'QB': that.lineup.QB.ID,
              'RB1': that.lineup.RB1.ID,
              'RB2': that.lineup.RB2.ID,
              'WR1': that.lineup.WR1.ID,
              'WR2': that.lineup.WR2.ID,
              'WR3': that.lineup.WR3.ID,
              'TE': that.lineup.TE.ID,
              'FLEX': that.lineup.FLEX.ID,
              'DST': that.lineup.DST.ID,
            };
            that.fullLineups.unshift(lineup);

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
    margin: 3%;
  }

</style>

