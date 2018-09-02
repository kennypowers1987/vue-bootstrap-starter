import draftkings from "../components/DraftKingsGenerator.vue";
import fanduel  from "../components/FanDuelGenerator.vue";

const DraftKings = {
	//template: '#modals',
	routes,
	render: h => h(draftkings)
};


const FanDuel = {
	//template: '#modals',
	routes,
	render: h => h(fanduel)
};

const routes = [	
    {
		path: "/DraftKings",
		component: DraftKings
	},
	{
		path: "/FanDuel",
		component: FanDuel
	},
	{
		path: "*",
		redirect: "/"
	}
];

export default routes;
