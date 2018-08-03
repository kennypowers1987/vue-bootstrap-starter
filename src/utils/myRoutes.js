import cards from "../components/MyCards.vue";
import tables from "../components/MyTables.vue";
import modals from "../components/MyModals.vue";
import forms from "../components/MyForms.vue";
import parse from "../components/Parse.vue";

const Tables = {
	routes,
	render: h => h(tables)
};

const Cards = {
	//template: '#cards',
	routes,
	render: h => h(cards)
};

const Modals = {
	//template: '#modals',
	routes,
	render: h => h(modals)
};

const Forms = {
	//template: '#modals',
	routes,
	render: h => h(forms)
};

const Parse = {
	//template: '#modals',
	routes,
	render: h => h(parse)
};

const routes = [
	{
		path: "/tables",
		component: Tables
	},
	{
		path: "/cards",
		component: Cards
	},
	{
		path: "/modals",
		component: Modals
	},
	{
		path: "/forms",
		component: Forms
    },
    {
		path: "/parse",
		component: Parse
	},
	{
		path: "*",
		redirect: "/"
	}
];

export default routes;
