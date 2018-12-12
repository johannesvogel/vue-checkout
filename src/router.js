import Vue from 'vue';
import Router from 'vue-router';
import Checkout from './views/Checkout.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'checkout',
      component: Checkout,
    },
  ],
});
