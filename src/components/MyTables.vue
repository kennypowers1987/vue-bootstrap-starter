<template id="tables">
	<div>
		<b-jumbotron header="Tables" lead="Example Table Component for Vue.js 2" v-bind:text-variant="theme"></b-jumbotron>
		<div class="container">
			<b-card v-bind:text-variant="theme" title="Basic">
				<div class="white">
					<b-table striped hover :items="items" bordered="bordered"></b-table>

				</div>
			</b-card>
			<br>
			<ul v-if="errors && errors.length">
				<li v-for="error of errors" v-bind:key="error.id">{{error.message}}</li>
			</ul>
			<b-card v-bind:text-variant="theme" title="Pagination w/ data loaded via HTTP">
				<br>
				<vue-simple-spinner size="big" message="Loading Table..." v-if="posts.length < 1"></vue-simple-spinner>
				<div class="white scroll" v-if="posts && posts.length">
					<div>
						<strong class="label">Per Page:</strong>
						<b-form-select :options="pageOptions" v-model="perPage" />
					</div>
					<b-table striped hover v-bind:items="posts" v-bind:current-page="currentPage" v-bind:per-page="perPage" bordered="bordered">
					</b-table>
					<div class="pagination" v-bind:class="theme">
						<b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pagination" />
					</div>
				</div>
			</b-card>
		</div>
	</div>
</template>

<script>
	const items = [
		{ isActive: true, age: 40, first_name: "Dickerson", last_name: "Macdonald" },
		{ isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
		{ isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
		{ isActive: true, age: 38, first_name: "Jami", last_name: "Carney" }
	];

	import Vue from "vue";
	import VueLocalStorage from "vue-localstorage";
	import { EventBus } from "../utils/myEventBus";
	import { HTTP } from "../services/fakeData";
	Vue.use(VueLocalStorage);

	export default {
		data() {
			return {
				theme: Vue.localStorage.get("theme"),
				items: items,
				posts: [],
				errors: [],
				name: "tables",
				currentPage: 1,
				perPage: 10,
				totalRows: 1,
				pageOptions: [5, 10, 15, 20, 25, 50, 100],
				sortBy: null,
				sortDesc: false,
				filter: null
			};
		},
		created() {
			HTTP.get(`http://jsonplaceholder.typicode.com/posts`)
				.then(response => {
					this.posts = response.data;
					this.totalRows = this.posts.length;
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
<style>
	.white {
		background-color: white;
	}

	.scroll {
		overflow: scroll;
	}

	.pagination {
		margin-top: 10px;
		margin-bottom: 20px !important;
	}

	.label {
		padding: 5px;
	}
</style>