import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/print/bookings',
    name: 'PrintBookings',
    component: () => import('../views/PrintBookings.vue'),
  },
  {
    path: '/print/costumers',
    name: 'PrintCostumers',
    component: () => import('../views/PrintCostumers.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
