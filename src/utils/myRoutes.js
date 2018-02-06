import cards from '../components/MyCards.vue'
import tables from '../components/MyTables.vue'
import modals from '../components/MyModals.vue'
import forms from '../components/MyForms.vue'

const Tables = {
  routes,
  render: h => h(tables)
}

const Cards = {
  //template: '#cards',
  routes,
  render: h => h(cards)
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
    path: '/cards',
    component: Cards
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
