import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  ImageBackground,
} from "react-native";

import Footer from "../components/Footer";

export default function AdicionarInvestimentoScreen({ navigation }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [tipoSelecionado, setTipoSelecionado] = useState("Entrada");

  const categorias = [
    { nome: "Ações", icon: "📈", color: "#FF8C66" },
    { nome: "Fundos de Investimento", icon: "🕒", color: "#FF1493" },
    { nome: "Fundo Imobiliário", icon: "🏢", color: "#4A6BFF" },
    { nome: "Renda Fixa", icon: "💵", color: "#8A2BE2" },
    { nome: "Tesouro Direto", icon: "📜", color: "#48D597" },
    { nome: "Criptomoedas", icon: "₿", color: "#FF5B1A" },
    { nome: "Outros", icon: "•••", color: "#8A56FF" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#B14DFF" />

      <ImageBackground
        source={require("../assets/fundo.png")}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backText}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Adicionar investimento</Text>

            <View style={styles.iconButton}>
              <Text style={styles.iconHeader}>📈</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.label}>Valor</Text>
          <Text style={styles.valor}>R$ 0,00</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Categoria</Text>

          <View style={styles.grid}>
            {categorias.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryCard,
                  categoriaSelecionada === item.nome &&
                    styles.categorySelected,
                ]}
                onPress={() => setCategoriaSelecionada(item.nome)}
              >
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: item.color },
                  ]}
                >
                  <Text style={styles.icon}>{item.icon}</Text>
                </View>

                <Text style={styles.categoryText}>{item.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Descrição (opcional)</Text>

          <TextInput
            placeholder="Ex: Investimento de longo prazo"
            placeholderTextColor="#B7A8CC"
            style={styles.input}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Data</Text>

          <TouchableOpacity style={styles.dateInput}>
            <Text style={styles.calendar}>📅</Text>
            <Text style={styles.dateText}>24/05/2024</Text>
            <Text style={styles.arrow}>⌄</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Tipo</Text>

          <View style={styles.tipoContainer}>
            <TouchableOpacity
              style={[
                styles.tipoButton,
                tipoSelecionado === "Entrada" && styles.tipoAtivo,
              ]}
              onPress={() => setTipoSelecionado("Entrada")}
            >
              <Text style={styles.tipoIcon}>⬆</Text>
              <View>
                <Text style={styles.tipoTitulo}>Entrada</Text>
                <Text style={styles.tipoDesc}>
                  Adicionar ao total investido
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tipoButton,
                tipoSelecionado === "Resgate" && styles.tipoAtivo,
              ]}
              onPress={() => setTipoSelecionado("Resgate")}
            >
              <Text style={styles.tipoIcon}>⬇</Text>
              <View>
                <Text style={styles.tipoTitulo}>Resgate</Text>
                <Text style={styles.tipoDesc}>
                  Retirar do investimento
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Conta / Corretora (opcional)</Text>

          <TextInput
            placeholder="Ex: XP, Rico, NuInvest..."
            placeholderTextColor="#B7A8CC"
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Atualizar investimento</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F2FC",
  },

  header: {
    height: 170,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    overflow: "hidden",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(110,0,255,0.15)",
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    color: "#FFF",
    fontSize: 40,
    marginTop: -6,
  },

  title: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  iconButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#FF39B7",
    justifyContent: "center",
    alignItems: "center",
  },

  iconHeader: {
    fontSize: 22,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -20,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#24132F",
    marginBottom: 12,
  },

  valor: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#6E00FF",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  categoryCard: {
    width: "30%",
    alignItems: "center",
    marginBottom: 18,
  },

  categorySelected: {
    transform: [{ scale: 1.05 }],
  },

  iconBox: {
    width: 68,
    height: 68,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  icon: {
    fontSize: 28,
  },

  categoryText: {
    fontSize: 13,
    color: "#2E184A",
    textAlign: "center",
  },

  input: {
    height: 54,
    backgroundColor: "#FAF7FD",
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#24132F",
  },

  dateInput: {
    height: 58,
    backgroundColor: "#FAF7FD",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  calendar: {
    fontSize: 20,
  },

  dateText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#24132F",
  },

  arrow: {
    fontSize: 22,
    color: "#8D7BA7",
  },

  tipoContainer: {
    gap: 12,
  },

  tipoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF7FD",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "transparent",
  },

  tipoAtivo: {
    borderColor: "#8A2BE2",
  },

  tipoIcon: {
    fontSize: 24,
    marginRight: 12,
  },

  tipoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#24132F",
  },

  tipoDesc: {
    fontSize: 13,
    color: "#7B6F93",
  },

  button: {
    height: 62,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    backgroundColor: "#9B35FF",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});