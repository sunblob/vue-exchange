import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '@/pages/Home';
import AboutPage from '@/pages/About';
import FaqPage from '@/pages/Faq';
import LoginPage from '@/pages/Login';
import RegisterPage from '@/pages/Register';
import ProfilePage from '@/pages/Profile';
import CreateExchangePage from '@/pages/CreateExchange';
import ExchangeDetailPage from '@/pages/ExchangeDetail';

import firebase from 'firebase/app';
import 'firebase/auth';

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
      meta: {
        onlyGuestUser: true,
      },
    },
    {
      path: '/register',
      name: 'register-page',
      component: RegisterPage,
      meta: {
        onlyGuestUser: true,
      },
    },
    {
      path: '/users/me',
      name: 'profile-page',
      component: ProfilePage,
      meta: {
        onlyAuthUser: true,
      },
    },
    {
      path: '/exchanges/new',
      name: 'create-exchange-page',
      component: CreateExchangePage,
      meta: {
        onlyAuthUser: true,
      },
    },
    {
      path: '/exchanges/:id',
      name: 'exchange-detail-page',
      component: ExchangeDetailPage,
    },
  ],
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const authenticatedUser = firebase.auth().currentUser;

  if (to.meta.onlyAuthUser) {
    if (authenticatedUser) {
      next();
    } else {
      next({ name: 'login-page' });
    }
  } else if (to.meta.onlyGuestUser) {
    if (authenticatedUser) {
      next({ name: 'home-page' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
