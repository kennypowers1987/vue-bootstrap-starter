<template>
	<div>
		<b-jumbotron header="Forms" lead="Example Form Components for Vue.js 2" v-bind:text-variant="theme"></b-jumbotron>
		<div class="container card">
			<b-form @submit="onSubmit" @reset="onReset" v-if="show">
				<b-form-group id="exampleInputGroup1" label="Email address:" description="We'll never share your email with anyone else.">
					<b-form-input id="exampleInput1" type="email" v-model="form.email" required placeholder="Enter email">
					</b-form-input>
				</b-form-group>
				<b-form-group id="exampleInputGroup2" label="Your Name:">
					<b-form-input id="exampleInput2" type="text" v-model="form.name" required placeholder="Enter name">
					</b-form-input>
				</b-form-group>
				<b-form-group id="exampleInputGroup3" label="Food:">
					<b-form-select id="exampleInput3" :options="foods" required v-model="form.food">
					</b-form-select>
				</b-form-group>
				<b-form-group id="exampleGroup4">
					<b-form-checkbox v-model="form.checked" id="exampleInput4">
						Check me out
					</b-form-checkbox>
				</b-form-group>
				<b-button type="submit" v-bind:variant="theme" class="float-right">Submit</b-button>
			</b-form>
		</div>
	</div>
</template>
<script>
	import Vue from "vue";
	import VueLocalStorage from "vue-localstorage";
	import {
		EventBus
	} from "../utils/myEventBus";
	export default {
		data: function () {
			return {
				theme: Vue.localStorage.get("theme"),
				form: {
					email: "",
					name: "",
					food: null,
					checked: false
				},
				foods: [{
					text: "Select One",
					value: null
				},
					"Carrots",
					"Beans",
					"Tomatoes",
					"Corn"
				],
				show: true
			};
		},
		created() {
			this.$bus.$on("theme-changed", $event => {
				this.updateTheme();
			});
		},
		methods: {
			updateTheme() {
				this.theme = Vue.localStorage.get("theme");
				console.log("updating theme to : " + this.theme);
			},
			onSubmit(evt) {
				evt.preventDefault();
				alert(JSON.stringify(this.form));
			},
			onReset(evt) {
				evt.preventDefault();
				// Reset our form values
				this.form.email = "";
				this.form.name = "";
				this.form.food = null;
				this.form.checked = false;
				// Trick to reset/clear native browser form validation state
				this.show = false;
				this.$nextTick(() => {
					this.show = true;
				});
			}
		}
	};

</script>

<style>
	.card {
		padding: 5px;
	}
</style>