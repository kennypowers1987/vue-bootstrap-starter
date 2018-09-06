<template>
    <div class="parse">
        <h1>DraftKings 'Captain Mode' NFL Lineup Generator
            <b-btn variant="danger" v-b-popover.hover="'Import the .csv for your contest (DraftKings only this week), remove players you dislike, and start generating!'"
                title="Instructions">
                ?
            </b-btn>
            <h3 class="float-right" style="padding:10px;">
                <a href="https://neocities.org/site/lineupgenerator">Donate |</a>
                <a href="https://twitter.com/keepthereporter?lang=en">Follow </a>
            </h3>
        </h1>
        <div class="alert alert-info">
            <a href="https://lineupgenerator.net/Week1/CaptainModeEaglesFalconsFiltered.csv">
                Download Week 1 Players (Eagles Falcons) Here:
            </a>
            <br> Then import the .csv below (If you are playing a different slate, download the .csv from DK/FanDuel)
            <br>Remove players that you don't want in your player pool
            <br>Go to the Lineups tab and start generating lineups
            <br>Export your lineups by clicking 'Download', modify the headers manually, and import them into DraftKings or FanDuel
        </div>
        <div class="alert alert-danger">
            When you download your lineups, in the downloaded .csv, change the headers to 'CPT, FLEX, FLEX, FLEX, FLEX, FLEX, FLEX' or
            you won't be able to upload it to DK.
        </div>
        <label>
            <strong>
                Import Your Player Pool
            </strong>
            <br> in the same format as the .csv download from DraftKings</label>
        <br>
        <input id="fileInput" type="file" @change="upload" v-bind:variant="theme">

        <div class="body">
        </div>
        <b-tabs v-if="playersList">
            <b-tab title="All Players" active>
                <b-button @click='savePlayersList' v-bind:variant="theme" download>
                    Download Player List
                </b-button>
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
                
                <b-btn @click="generate()">Generate</b-btn>
                <b-button @click='save' v-bind:variant="theme" download>
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
        name: 'captainmode',
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
                    'CPT': null,
                    'FLEX1': null,
                    'FLEX2': null,
                    'FLEX3': null,
                    'FLEX4': null,
                    'FLEX5': null,
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
                this.positions = this.groupBy(this.playersList, "Roster Position");
            },
            removePlayer(player) {
                var id = player.ID

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
                    "In the downloaded .csv, change the headers to 'CPT, FLEX, FLEX, FLEX, FLEX, FLEX, FLEX' or you won't be able to upload it to DraftKings."
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
                var that = this;
                var playerIds = [];
                var playerNames = [];

                function getCaptain() {
                    //console.log('getting CPT')
                    let index = Math.floor(Math.random() * Math.floor(that.positions['CPT'].length - 1));
                    //that.lineup.QB = (({ Name, Salary, Position }) => ({ Name, Salary, Position }))(that.positions['QB'][index])
                    that.lineup.CPT = that.positions['CPT'][index];
                    playerIds.push(that.lineup.CPT.ID);
                    playerNames.push(that.lineup.CPT.Name);
                    getFlex1();
                }               

                function getFlex1() {
                    //console.log('getting flex1')
                    let index = Math.floor(Math.random() * Math.floor(that.positions['FLEX'].length - 1));
                    that.lineup.FLEX1 = that.positions['FLEX'][index];
                    playerIds.push(that.lineup.FLEX1.ID);
                    playerNames.push(that.lineup.FLEX1.Name);
                    console.log(that.lineup);
                    getFlex2();
                }
                function getFlex2() {
                    //console.log('getting flex2')
                    let index = Math.floor(Math.random() * Math.floor(that.positions['FLEX'].length - 1));
                    that.lineup.FLEX2 = that.positions['FLEX'][index];
                    playerIds.push(that.lineup.FLEX2.ID);
                    playerNames.push(that.lineup.FLEX2.Name);
                    console.log(that.lineup);
                    getFlex3();
                }
                function getFlex3() {
                    //console.log('getting flex3')
                    let index = Math.floor(Math.random() * Math.floor(that.positions['FLEX'].length - 1));
                    that.lineup.FLEX3 = that.positions['FLEX'][index];
                    playerIds.push(that.lineup.FLEX3.ID);
                    playerNames.push(that.lineup.FLEX3.Name);
                    console.log(that.lineup);
                    getFlex4();
                }
                function getFlex4() {
                    //console.log('getting flex4')
                    let index = Math.floor(Math.random() * Math.floor(that.positions['FLEX'].length - 1));
                    that.lineup.FLEX4 = that.positions['FLEX'][index];
                    playerIds.push(that.lineup.FLEX4.ID);
                    playerNames.push(that.lineup.FLEX4.Name);
                    console.log(that.lineup);
                    getFlex5();
                }
                function getFlex5() {
                    //console.log('getting flex5')
                    let index = Math.floor(Math.random() * Math.floor(that.positions['FLEX'].length - 1));
                    that.lineup.FLEX5 = that.positions['FLEX'][index];
                    playerIds.push(that.lineup.FLEX5.ID);
                    playerNames.push(that.lineup.FLEX5.Name);
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
                    var checkDupes = removeDuplicate(playerNames);                    
                    var totalSalary =
                        parseInt(that.lineup.CPT.Salary) +
                        parseInt(that.lineup.FLEX1.Salary) +
                        parseInt(that.lineup.FLEX2.Salary) +
                        parseInt(that.lineup.FLEX3.Salary) +
                        parseInt(that.lineup.FLEX4.Salary) +
                        parseInt(that.lineup.FLEX5.Salary) 
                        
                    console.log('$' + totalSalary)
                    if (checkDupes.length < 6) {
                        console.log('dupes exist, restarting ', checkDupes.length);
                        return setTimeout(() => {
                            that.generate();
                        }, 0);

                    } else if (totalSalary < 35000) {
                        console.log('salary cap expectations not met ', totalSalary);
                        return setTimeout(() => {
                            that.generate();
                        }, 0);
                    }  else if (totalSalary > 50000) {
                        console.log('salary cap expectations not met ', totalSalary);
                        return setTimeout(() => {
                            that.generate();
                        }, 0);
                    } else {
                        that.lineup['Total Salary'] = totalSalary;
                        let lineup = {
                            'CPT': that.lineup.CPT.Name + " " + that.lineup.CPT['TeamAbbrev'] + " " + that.lineup.CPT['Salary'],
                            'FLEX1': that.lineup.FLEX1.Name + " " + that.lineup.FLEX1['TeamAbbrev'] + " " + that.lineup.FLEX1['Salary'],
                            'FLEX2': that.lineup.FLEX2.Name + " " + that.lineup.FLEX2['TeamAbbrev'] + " " + that.lineup.FLEX2['Salary'],
                            'FLEX3': that.lineup.FLEX3.Name + " " + that.lineup.FLEX3['TeamAbbrev'] + " " + that.lineup.FLEX3['Salary'],
                            'FLEX4': that.lineup.FLEX4.Name + " " + that.lineup.FLEX4['TeamAbbrev'] + " " + that.lineup.FLEX4['Salary'],
                            'FLEX5': that.lineup.FLEX5.Name + " " + that.lineup.FLEX5['TeamAbbrev'] + " " + that.lineup.FLEX5['Salary'],
                            'Total Salary': totalSalary
                        }
                        that.lineups.unshift(lineup);
                        lineup = {
                            'CPT': that.lineup.CPT.ID,
                            'FLEX1': that.lineup.FLEX1.ID,
                            'FLEX2': that.lineup.FLEX2.ID,
                            'FLEX3': that.lineup.FLEX3.ID,
                            'FLEX4': that.lineup.FLEX4.ID,
                            'FLEX5': that.lineup.FLEX5.ID
                        };
                        that.fullLineups.unshift(lineup);

                    }
                }
                getCaptain();
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