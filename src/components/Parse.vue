<template>
	<div class="parse">
		<b-tabs>
			<b-tab title="Players" active>
				<h1>Parse CSV to JSON</h1>
				<input id="fileInput" type="file" @change="upload" v-bind:variant="theme">
				<b-button @click='save' v-bind:variant="theme" download>Download</b-button>
				<div class="body">
				</div>
				<b-table striped hover :items="players" :fields="playersFields">
					<template slot="delete_btn" slot-scope="row">

						<b-button size="sm" @click.stop="players.splice(row.index, 1)" class="btn btn-danger">Remove
						</b-button>
					</template>
				</b-table>
			</b-tab>
			<b-tab title="Lineups">
				<b-card v-for="(lineup, index) in lineups" v-bind:key="index" v-bind:text-variant="theme" bg-variant="secondary" v-if="lineups.length"
				  tag="article" class="col-sm-2 card">
					{{lineup}}
				</b-card>
			</b-tab>
			<!-- <b-tab title="disabled" disabled>
						<br>Disabled tab!
					</b-tab> -->
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
				players: null,
				theme: Vue.localStorage.get("theme"),
				playersFields: [],
				positions: [],
				QBs: [],
				RBs: [],
				WRs: [],
				TEs: [],
				DSTs: [],
				lineups: []
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
							that.parseData(results.data);
						},
						error(errors) {
							console.log('error', errors)
						}
					})
				}
				reader.readAsText(fileToLoad)
			},
			parseData(data) {
				const that = this;
				JSON.parse(JSON.stringify(data));
				that.players = data;
				that.players.pop();
				that.playersFields = Object.keys(that.players[0]);
				that.playersFields.push('delete_btn');
				that.playersFields = that.playersFields.map(str => {
					return {
						key: str,
						sortable: true
					}
				});
				that.positions = that.groupBy(that.players, "Position");
				that.QBs = JSON.parse(JSON.stringify(that.positions['QB'].map(x => {
					return x
				})));
				that.RBs = JSON.parse(JSON.stringify(that.positions['RB'].map(x => {
					return x
				})));
				that.WRs = that.positions['WR'].map(x => {
					return x
				});
				that.TEs = JSON.parse(JSON.stringify(that.positions['TE'].map(x => {
					return x
				})));
				that.DSTs = JSON.parse(JSON.stringify(that.positions['DST'].map(x => {
					return x
				})));
				console.log(that.QBs);
				console.log(that.RBs);
				console.log(that.WRs);
				console.log(that.TEs);
				console.log(that.DSTs);
				for (var i = 1; i < 100; i++) that.generateLineup();

			},
			save() {
				const blob = new Blob([this.parseJSONtoCSV()], {
					type: 'text/csv'
				})
				FileSaver.saveAs(blob, 'test.csv')
			},
			parseJSONtoCSV() {
				return Papa.unparse(this.players)
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
			generateLineup() {
				const that = this;
				let lineup = {};
				const checkDupe = (index1, index2) => {
					if (lineup[index1] === lineup[index2]) {
						console.log(index2)
					};
				};
				lineup.QB = that.QBs[Math.floor(Math.random() * (that.QBs.length + 1))];
				lineup.RB = that.RBs[Math.floor(Math.random() * (that.RBs.length + 1))];
				lineup.RB2 = that.RBs[Math.floor(Math.random() * (that.RBs.length + 1))];
				lineup.WR = that.WRs[Math.floor(Math.random() * (that.WRs.length + 1))];
				lineup.WR2 = that.WRs[Math.floor(Math.random() * (that.WRs.length + 1))];
				lineup.WR3 = that.WRs[Math.floor(Math.random() * (that.WRs.length + 1))];
				lineup.TE = that.TEs[Math.floor(Math.random() * (that.TEs.length + 1))];
				lineup.FLEX = that.RBs[Math.floor(Math.random() * (that.RBs.length + 1))];
				lineup.DST = that.DSTs[Math.floor(Math.random() * (that.DSTs.length + 1))];
				checkDupe('RB', 'RB2');
				this.lineups.push(lineup);



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