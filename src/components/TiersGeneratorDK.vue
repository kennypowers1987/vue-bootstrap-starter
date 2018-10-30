<template>
    <div class="parse">
        <h5>DraftKings 'Tiers' NFL Lineup Generator
            <b-btn variant="danger" v-b-popover.hover="'Import the .csv for your contest , remove players you dislike, and start generating!'"
                title="Instructions">
                ?
            </b-btn>
            <h5 class="float-right" style="padding:10px;">
                <a href="https://neocities.org/site/lineupgenerator">Donate if you win </a>
            </h5>
        </h5>
        <div class="alert alert-info">            
            <br>Import the player list .csv for your contest below (download the .csv from DK/FanDuel)
            <br>Remove players that you don't want in your player pool (exposure coming soon, for now, modify the .csv to increase exposure to players you like)
            <br>Go to the Lineups tab and start generating lineups
            <br>Export your lineups by clicking 'Download', modify the headers manually, and import them into DraftKings or FanDuel
        </div>
        <div class="alert alert-danger">
            When you download your lineups, in the downloaded .csv, change the headers to 'T1, T2, T3, T4, T5, T6, T7' or
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
        name: 'tiers',
        data() {
            return {                
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
                    'T1': null,
                    'T2': null,
                    'T3': null,
                    'T4': null,
                    'T5': null,
                    'T6': null,
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
                    "In the downloaded .csv, change the headers to 'T1, T2, T3, T4, T5, T6, T7' or you won't be able to upload it to DraftKings."
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
                function getT1() {
                    //console.log('getting T1')
                    let index = Math.floor(Math.random() * Math.floor(that.positions['T1'].length - 1));
                    //that.lineup.QB = (({ Name, Salary, Position }) => ({ Name, Salary, Position }))(that.positions['QB'][index])
                    that.lineup.T1 = that.positions['T1'][index];
                    playerIds.push(that.lineup.T1.ID);
                    playerNames.push(that.lineup.T1.Name);
                    getT2();
                }

                function getT2() {
                    //console.log('getting T2')
                    let index = Math.floor(Math.random() * Math.floor(that.positions['T2'].length - 1));
                    that.lineup.T2 = that.positions['T2'][index];
                    playerIds.push(that.lineup.T2.ID);
                    playerNames.push(that.lineup.T2.Name);
                    console.log(that.lineup);
                    getT3();
                }
                function getT3() {
                    //console.log('getting T3')
                    let index = Math.floor(Math.random() * Math.floor(that.positions['T3'].length - 1));
                    that.lineup.T3 = that.positions['T3'][index];
                    playerIds.push(that.lineup.T3.ID);
                    playerNames.push(that.lineup.T3.Name);
                    console.log(that.lineup);
                    getT4();
                }
                function getT4() {
                    //console.log('getting T4')
                    let index = Math.floor(Math.random() * Math.floor(that.positions['T4'].length - 1));
                    that.lineup.T4 = that.positions['T4'][index];
                    playerIds.push(that.lineup.T4.ID);
                    playerNames.push(that.lineup.T4.Name);
                    console.log(that.lineup);
                    getT5();
                }
                function getT5() {
                    //console.log('getting T5')
                    let index = Math.floor(Math.random() * Math.floor(that.positions['T5'].length - 1));
                    that.lineup.T5 = that.positions['T5'][index];
                    playerIds.push(that.lineup.T5.ID);
                    playerNames.push(that.lineup.T5.Name);
                    console.log(that.lineup);
                    getT6();
                }
                function getT6() {
                    //console.log('getting T6')
                    let index = Math.floor(Math.random() * Math.floor(that.positions['T6'].length - 1));
                    that.lineup.T6 = that.positions['T6'][index];
                    playerIds.push(that.lineup.T6.ID);
                    playerNames.push(that.lineup.T6.Name);
                    console.log(that.lineup);
                    validateLineup();
                }
                function getT7() {
                    //console.log('getting T7')
                    let index = Math.floor(Math.random() * Math.floor(that.positions['T7'].length - 1));
                    that.lineup.T7 = that.positions['T7'][index];
                    playerIds.push(that.lineup.T7.ID);
                    playerNames.push(that.lineup.T7.Name);
                    console.log(that.lineup);
                    validateLineup();
                }
                function getT8() {
                    //console.log('getting T7')
                    let index = Math.floor(Math.random() * Math.floor(that.positions['T8'].length - 1));
                    that.lineup.T8 = that.positions['T8'][index];
                    playerIds.push(that.lineup.T8.ID);
                    playerNames.push(that.lineup.T8.Name);
                    console.log(that.lineup);
                    validateLineup();
                }

                function validateLineup() {                                      
                        let lineup = {
                            'T1': that.lineup.T1.Name + " " + that.lineup.T1['TeamAbbrev'] + " " + that.lineup.T1['Salary'],
                            'T2': that.lineup.T2.Name + " " + that.lineup.T2['TeamAbbrev'] + " " + that.lineup.T2['Salary'],
                            'T3': that.lineup.T3.Name + " " + that.lineup.T3['TeamAbbrev'] + " " + that.lineup.T3['Salary'],
                            'T4': that.lineup.T4.Name + " " + that.lineup.T4['TeamAbbrev'] + " " + that.lineup.T4['Salary'],
                            'T5': that.lineup.T5.Name + " " + that.lineup.T5['TeamAbbrev'] + " " + that.lineup.T5['Salary'],
                            'T6': that.lineup.T6.Name + " " + that.lineup.T6['TeamAbbrev'] + " " + that.lineup.T6['Salary'],
                            'Total Salary': totalSalary
                        }
                        that.lineups.unshift(lineup);
                        lineup = {
                            'T1': that.lineup.T1.ID,
                            'T2': that.lineup.T2.ID,
                            'T3': that.lineup.T3.ID,
                            'T4': that.lineup.T4.ID,
                            'T5': that.lineup.T5.ID,
                            'T6': that.lineup.T6.ID
                        };
                        that.fullLineups.unshift(lineup);
                }                
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