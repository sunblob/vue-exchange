import Vue from 'vue';
import App from './App.vue';
import Toasted from 'vue-toasted';
import firebase from 'firebase/app';
import 'firebase/auth';
import Vuelidate from 'vuelidate';

//Router
import router from './router';
//Store
import store from './store';

//Font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faStar);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Toasted);

Vue.use(Vuelidate);

Vue.config.productionTip = false;

let app;

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    await store.dispatch('auth/storeAuthUser', user);
  }

  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
