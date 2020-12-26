import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '@/pages/Home';
import AboutPage from '@/pages/About';
import FaqPage from '@/pages/Faq';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about-page',
      component: AboutPage,
    },
    {
      path: '/faq',
      name: 'faq-page',
      component: FaqPage,
    },
    {
      path: '/login',
      name: 'login-page',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'register-page',
      component: RegisterPage,
    },
  ],
  mode: 'history',
});

export default router;
