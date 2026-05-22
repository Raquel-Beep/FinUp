import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function InserirScreen({ navigation }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const handleSalvar = () => {
    if (!descricao || !valor) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    Alert.alert("Sucesso", "Despesa salva com sucesso!");
    navigation.goBack(); // Volta para a tela de Despesas após salvar
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C86BFF" />

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Nova Despesa</Text>

        {/* INPUT DESCRIÇÃO */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Descrição da despesa (ex: Mercado)"
            placeholderTextColor="#8B7AA8"
            style={styles.input}
            value={descricao}
            onChangeText={(txt) => setDescricao(txt)}
          />
        </View>

        {/* INPUT VALOR */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Valor (R$)"
            placeholderTextColor="#8B7AA8"
            keyboardType="numeric"
            style={styles.input}
            value={valor}
            onChangeText={(txt) => setValor(txt)}
          />
        </View>

        {/* BOTÃO SALVAR */}
        <TouchableOpacity activeOpacity={0.8} onPress={handleSalvar}>
          <LinearGradient
            colors={["#B156F9", "#0E9EEA"]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 1.9, y: 0 }}
            style={styles.saveButton}
          >
            <Text style={styles.saveText}>Salvar Despesa</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C86BFF",
    justifyContent: "flex-end",
  },
  card: {
    flex: 0.85,
    backgroundColor: "#F6F1FB",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2B0060",
    textAlign: "center",
    marginBottom: 25,
  },
  inputContainer: {
    height: 62,
    borderWidth: 1,
    borderColor: "#E2D4F8",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#333",
  },
  saveButton: {
    height: 64,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
});