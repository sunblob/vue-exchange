import { firestoreAction } from 'vuexfire';
import { db } from '@/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  namespaced: true,
  state: {
    items: [],
    item: {},
  },
  mutations: {
    setExchanges(state, payload) {
      state.items = payload;
    },
    setExchange(state, payload) {
      state.item = payload;
    },
  },
  actions: {
    bindExchanges: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('items', db.collection('exchanges'));
    }),
    createExchange({ rootState }, exchange) {
      exchange.status = 'active';
      exchange.price = +exchange.price;

      const userRef = db.collection('profiles').doc(rootState.auth.user.uid);

      exchange.user = userRef;

      return db
        .collection('exchanges')
        .add(exchange)
        .then(async (docRef) => {
          const exchangeSnap = await docRef.get();
          const ex = exchangeSnap.data();
          console.log(docRef, exchangeSnap, ex);
          await userRef.update({
            exchanges: firebase.firestore.FieldValue.arrayUnion({
              id: docRef.id,
              title: ex.title,
              type: ex.type,
              price: ex.price,
            }),
          });

          // commit('auth/addExchangeToUser', docRef.id, { root: true });
        });
    },
    getExchangeById({ commit }, id) {
      commit('setExchange', {});
      return db
        .collection('exchanges')
        .doc(id)
        .get()
        .then(async (snapshot) => {
          const exchange = snapshot.data();
          exchange.id = snapshot.id;
          const userSnapshot = await exchange.user.get();
          exchange.user = userSnapshot.data();
          exchange.user.id = userSnapshot.id;
          commit('setExchange', exchange);
          return exchange;
        });
    },
  },
  getters: {
    items: (state) => state.items,
    item: (state) => (id) => state.items.find((item) => item.id === id),
  },
};
