import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCPW6Km1VQa0E-QDhMj0zs-2_Iu3WCMHgE',
  authDomain: 'exchangeio.firebaseapp.com',
  projectId: 'exchangeio',
  storageBucket: 'exchangeio.appspot.com',
  messagingSenderId: '182277883970',
  appId: '1:182277883970:web:9973216062d5de8aec85db',
  measurementId: 'G-FBRDSWTSR1',
};
// Get a Firestore instance
export const db = firebase.initializeApp(firebaseConfig).firestore();

// firebase.analytics();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };
