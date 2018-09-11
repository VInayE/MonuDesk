import Vue from 'vue'
import Router from 'vue-router'
import {BASE_URL} from '../util/constants.js'

Vue.use(Router)

// route-level code splitting
const MonumentList = () => import('../views/monumentList.vue')
const MonumentDetails = () => import('../views/monumentDetails.vue')
const NoResultFound = () => import('../views/404Page.vue')
const ASIConfirmation = () => import('../views/asiConfirmation.vue')
const ASIPaymentStatus = () => import('../views/asiPaymentStatus.vue')
const ReviewMonuments = () => import('../views/reviewMonuments.vue')
const HealthCheck = () => import('../views/healthCheck.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({  }),
    routes: [
      { path: `${BASE_URL}/list`,name:'MonumentList', component: MonumentList },
      { path: `${BASE_URL}/review`,name:'ReviewMonument', component: ReviewMonuments },
      { path: `${BASE_URL}/details`, component: MonumentDetails },
      { path: `${BASE_URL}/404`, name: '404NotFound',component: NoResultFound },
      { path: `${BASE_URL}/confirmation`,component: ASIConfirmation },
      { path : `${BASE_URL}/payments/status`,component:ASIPaymentStatus},
      { path : `${BASE_URL}/healthCheck`,component:HealthCheck},
      { path: '/', redirect: `${BASE_URL}/list`},
      { path: '*', redirect: '/' }
    ]
  })
}
