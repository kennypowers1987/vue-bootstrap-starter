import dashboard from '../components/Dashboard.vue'
import tables from '../components/MyTables.vue'
import modals from '../components/MyModals.vue'
import forms from '../components/MyForms.vue'


const Tables = {
  routes,
  render: h => h(tables)
}

const Dashboard = {
  //template: '#dashboard',
  routes,
  render: h => h(dashboard)
}

const Modals = {
  //template: '#modals',
  routes,
  render: h => h(modals)
}

const Forms = {
  //template: '#modals',
  routes,
  render: h => h(forms)
}

const routes = [{
    path: '/tables',
    component: Tables
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/modals',
    component: Modals
  },
  {
    path: '/forms',
    component: Forms
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default routes;
