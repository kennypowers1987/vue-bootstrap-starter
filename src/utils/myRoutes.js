import parse from "../components/Parse.vue";


const Parse = {
	//template: '#modals',
	routes,
	render: h => h(parse)
};

const routes = [	
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
