import firebase from 'firebase/app';
import 'firebase/auth';
import { db } from '@/firebase';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setAuthUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async signUp(_, { email, password }) {
      try {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        // .catch((error) => {
        //   console.log(error);
        // });

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
    createUserProfile(_, { uid, userProfile }) {
      return db
        .collection('profiles')
        .doc(uid)
        .set(userProfile);
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
};
