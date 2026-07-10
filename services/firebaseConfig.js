import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Importações necessárias para a persistência
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
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
