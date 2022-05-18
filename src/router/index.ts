import { createRouter, createWebHistory } from '@ionic/vue-router';
import useAuthStore from '@/store/auth';

import HomePage from '@/views/HomePage.vue';
import StrategyPage from '@/views/StrategyPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/strategy',
    name: 'strategy',
    component: StrategyPage,
    meta: {
      requiresAuth: true
    }
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

router.beforeEach((to, from, next) => {
  // If the user is not logged in, and he tries to access a page that requires login...
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'login' });
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  // If the user is logged in, and he tries to visit the login page...
  const authStore = useAuthStore();
  if (to.name === 'login' && authStore.isLoggedIn) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
