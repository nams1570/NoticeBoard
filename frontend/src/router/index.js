import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/notices/:nname',
    name: 'eventSingle',
    component: ()=>import('../views/EventSingle.vue')
  },
  {
    path: '/addNotice',
    name: 'newNotice',
    component: ()=> import('../views/NewNotice.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: ()=> import('../views/SettingsView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: ()=> import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: ()=> import('../views/Signup.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
