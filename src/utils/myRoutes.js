import cards from '../components/MyCards.vue'
import tables from '../components/MyTables.vue'
import modals from '../components/MyModals.vue'
import forms from '../components/MyForms.vue'
import pdfs from '../components/MyPDFs.vue'

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

const PDFs = {
  //template: '#pdfs,
  routes,
  render: h => h(pdfs)
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
    path: '/pdfs',
    component: PDFs
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default routes;
