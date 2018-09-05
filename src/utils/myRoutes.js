import draftkings from "../components/DraftKingsGenerator.vue";
import fanduel  from "../components/FanDuelGenerator.vue";
import captainmode  from "../components/CaptainModeGenerator.vue";

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

const CaptainMode = {
	//template: '#modals',
	routes,
	render: h => h(captainmode)
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
		path: "/CaptainMode",
		component: CaptainMode
	},
	{
		path: "*",
		redirect: "/"
	}
];

export default routes;
