import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tela para inserir uma nova receita
const TIPOS_RECEITA = [
  { nome: "Salário", icon: "💼", color: "#4CD964" },
  { nome: "Freelance", icon: "💻", color: "#9B5CFF" },
  { nome: "Investimento", icon: "📈", color: "#FF8C66" },
  { nome: "Aluguel", icon: "🏠", color: "#4A6BFF" },
  { nome: "Presente", icon: "🎁", color: "#FF5F8F" },
  { nome: "Outros", icon: "•••", color: "#8A56FF" },
];

export default function InserirReceitaScreen({ navigation }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState(null);

  const handleSalvar = async () => {
    if (!descricao || !valor || !tipoSelecionado) {
      Alert.alert("Erro", "Por favor, preencha todos os campos e selecione um tipo.");
      return;
    }

    try {
      const userId = await AsyncStorage.getItem("userUid");
      const userName = await AsyncStorage.getItem("userName");

      if (!userId) {
        Alert.alert("Erro", "Usuário não encontrado. Faça login novamente.");
        return;
      }

      await addDoc(collection(db, "receitas"), {
        receitaId: "",          // será substituído pelo ID gerado (ver abaixo)
        usuarioId: userId,
        usuarioNome: userName || "Usuário",
        descricao: descricao,
        valor: parseFloat(valor.replace(",", ".")),
        tipo: tipoSelecionado,
        dataHora: new Date().toISOString(),
      });

      Alert.alert("Sucesso", "Receita salva com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error("Erro ao salvar receita:", error);
      Alert.alert("Erro", "Não foi possível salvar a receita.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#19C37D" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Receita</Text>
        <View style={styles.headerIcon}>
          <Text style={styles.headerIconText}>💰</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* VALOR */}
        <View style={styles.card}>
          <Text style={styles.label}>Valor (R$)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="0,00"
              placeholderTextColor="#B7A8CC"
              keyboardType="numeric"
              style={styles.input}
              value={valor}
              onChangeText={setValor}
            />
          </View>
        </View>

        {/* TIPO */}
        <View style={styles.card}>
          <Text style={styles.label}>Tipo</Text>
          <View style={styles.grid}>
            {TIPOS_RECEITA.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryCard,
                  tipoSelecionado === item.nome && styles.categorySelected,
                ]}
                onPress={() => setTipoSelecionado(item.nome)}
              >
                <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                  <Text style={styles.icon}>{item.icon}</Text>
                </View>
                <Text style={styles.categoryText}>{item.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* DESCRIÇÃO */}
        <View style={styles.card}>
          <Text style={styles.label}>Descrição</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Ex: Salário do mês de junho"
              placeholderTextColor="#B7A8CC"
              style={styles.input}
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>
        </View>

        {/* DATA (informativo) */}
        <View style={styles.card}>
          <Text style={styles.label}>Data e Hora</Text>
          <View style={styles.dateDisplay}>
            <Text style={styles.dateIcon}>📅</Text>
            <Text style={styles.dateText}>
              {new Date().toLocaleString("pt-BR")}
            </Text>
          </View>
          <Text style={styles.dateHint}>Registrado automaticamente no momento do salvamento</Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} onPress={handleSalvar}>
          <LinearGradient
            colors={["#19C37D", "#0EA868"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveButton}
          >
            <Text style={styles.saveText}>Salvar Receita</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F2FC",
  },
  header: {
    height: 120,
    backgroundColor: "#19C37D",
    paddingTop: 55,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  backText: {
    color: "#FFF",
    fontSize: 36,
    marginTop: -4,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerIconText: {
    fontSize: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#24132F",
    marginBottom: 12,
  },
  inputContainer: {
    height: 54,
    backgroundColor: "#FAF7FD",
    borderRadius: 14,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
    color: "#24132F",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "30%",
    alignItems: "center",
    marginBottom: 16,
  },
  categorySelected: {
    transform: [{ scale: 1.08 }],
  },
  iconBox: {
    width: 62,
    height: 62,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  icon: {
    fontSize: 26,
  },
  categoryText: {
    fontSize: 13,
    color: "#2E184A",
    textAlign: "center",
  },
  dateDisplay: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF7FD",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
  },
  dateIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  dateText: {
    fontSize: 15,
    color: "#24132F",
  },
  dateHint: {
    fontSize: 12,
    color: "#9B8BB0",
    marginTop: 4,
    paddingLeft: 4,
  },
  saveButton: {
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    elevation: 5,
  },
  saveText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});