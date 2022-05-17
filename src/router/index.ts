import { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from '@ionic/vue-router';

import HomePage from '@/views/HomePage.vue';
import StrategyPage from '@/views/StrategyPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/strategy',
    name: 'strategy',
    component: StrategyPage
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
