// Importar as credenciais do Firebase
//npm install firebase//
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Configuração do Firebase para seu aplicativo web
const firebaseConfig = {
  apiKey: "AIzaSyA81DTVhfQ5DszVSx7WkvcnBwDWbuo1JGM",
  authDomain: "finup-df087.firebaseapp.com",
  projectId: "finup-df087",
  storageBucket: "finup-df087.firebasestorage.app",
  messagingSenderId: "993422886998",
  appId: "1:993422886998:web:841ed93bf22d1793ed13f7"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Site de acesso ao banco de dados do firebase://
//https://console.firebase.google.com/u/0/project/finup-df087/firestore/databases/-default-/data?hl=pt-br&fb_gclid=Cj0KCQjwlLDQBhDjARIsAPlIefGaxXpmkRvBGUKnW9d-PdurA19k2xbASMYmkU0LfZUzBUW-OI0UzMQaAq-OEALw_wcB&fb_utm_campaign=Cloud-SS-DR-Firebase-FY26-global-pmax-1713590&fb_utm_content=pmax&fb_utm_medium=display&fb_utm_source=PMAX//
