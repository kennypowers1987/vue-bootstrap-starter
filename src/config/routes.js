import cards from '../vues/cards.vue'
import tables from '../vues/tables.vue'
import modals from '../vues/modals.vue'
import forms from '../vues/forms.vue'


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
