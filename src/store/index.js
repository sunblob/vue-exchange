/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import exchange from './modules/exchange';
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    exchange,
    auth,
  },
  mutations: {
    ...vuexfireMutations,
  },
});
