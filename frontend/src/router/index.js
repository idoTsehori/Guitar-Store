import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from './../views/AboutView.vue'
import GuitarIndex from './../views/GuitarIndex.vue'
import GuitarDetails from '../components/GuitarDetails.vue'
import GuitarEdit from '../components/GuitarEdit.vue'

import ChartView from './../views/ChartView.vue'
import MapView from './../views/MapView.vue'
import userMsg from './../views/userMsg.vue'

import UserDetails from './../views/UserDetails.vue'
import ReviewIndex from './../views/ReviewIndex.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/guitar',
      name: 'guitar',
      component: GuitarIndex,
    },
    {
      path: '/review',
      name: 'ReviewIndex',
      component: ReviewIndex,
    },
    {
      path: '/guitar/:guitarId',
      name: 'details',
      component: GuitarDetails,
    },
    {
      path: '/guitar/edit/:guitarId?',
      name: 'edit',
      component: GuitarEdit,
    },

    {
      path: '/chart',
      name: 'chat',
      component: ChartView,
    },

    {
      path: '/map',
      name: 'map',
      component: MapView,
    },

    {
      path: '/guitar/:guitarId/msg',
      name: 'userMsg',
      component: userMsg,
    },
    {
      path: '/user/:id',
      name: 'UserDetails',
      component: UserDetails,
    },
  ],
})

export default router
