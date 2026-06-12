import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Importações necessárias para a persistência
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDNHmZ4P-TjzX3N4pgfuTSwMmJ_n7Rnsog",
  authDomain: "finup-466cd.firebaseapp.com",
  projectId: "finup-466cd",
  storageBucket: "finup-466cd.firebasestorage.app",
  messagingSenderId: "741140858788",
  appId: "1:741140858788:web:4a2bedb02822ca2a602331"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Inicializa o Auth com persistência configurada para React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Inicializa o banco de dados
const db = getFirestore(app);

export { auth, db };