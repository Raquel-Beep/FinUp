import { db } from "./firebaseConfig"; // Importa seu banco
import { collection, addDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const salvarDespesa = async (valor, descricao, tipo) => {
  try {
    // Busca o email que salvamos no passo 2
    const userEmail = await AsyncStorage.getItem('userEmail');
    
    // Salva na coleção 'despesas'
    await addDoc(collection(db, "despesas"), {
      usuario: userEmail, // O mesmo ID do usuário
      valor: parseFloat(valor),
      descricao: descricao,
      tipo: tipo,
      dataHora: new Date().toISOString()
    });
    
    return true; // Deu certo!
  } catch (error) {
    console.error("Erro ao salvar:", error);
    return false;
  }
};