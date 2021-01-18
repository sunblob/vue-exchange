import firebase from 'firebase/app';
import 'firebase/auth';
import { db } from '@/firebase';
// import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setAuthUser(state, payload) {
      state.user = payload;
    },
    setUserProfile(state, payload) {
      state.user.profile = payload;

      // Vue.set(state.user, 'profile', payload)
    },
    addExchangeToUser(state, payload) {
      state.user.profile.exchanges.push(payload);
    },
  },
  actions: {
    async signUp(_, { email, password }) {
      try {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        return user;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
    async signIn(_, { email, password }) {
      try {
        const { user } = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async signOut(state) {
      await firebase.auth().signOut();
      state.commit('setAuthUser', null);
    },
    createUserProfile(_, { uid, userProfile }) {
      return db
        .collection('profiles')
        .doc(uid)
        .set(userProfile);
    },
    storeAuthUser(state, user) {
      return db
        .collection('profiles')
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          const profile = snapshot.data();
          user.profile = profile;
          state.commit('setAuthUser', user);
          return profile;
        });
    },
    updateProfile(state, profile) {
      return db
        .collection('profiles')
        .doc(profile.user)
        .update(profile)
        .then(() => {
          state.commit('setUserProfile', profile);
        });
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    isExchangeOwner: (state) => (id) => {
      return state.user && id && state.user.uid === id;
    },
  },
};
