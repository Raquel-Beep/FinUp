import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ImageBackground,
} from "react-native";

import LoadingScreen from "./LoadingScreen";

// Adicionado { navigation } para permitir o redirecionamento
export default function DespesasScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  // Estado para controlar o filtro selecionado: 'Hoje', 'Semana', 'Mês', 'Ano'
  const [filtro, setFiltro] = useState("Mês");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Base de dados simulada com datas reais no formato YYYY-MM-DD para permitir cálculos
  const todasDespesas = [
    {
      icon: "🍴",
      title: "Restaurante",
      date: "2026-05-21", // Hoje
      value: "R$ 230,00",
      color: "#FF8C66",
    },
    {
      icon: "🛒",
      title: "Mercado",
      date: "2026-05-19", // Esta semana
      value: "R$ 480,00",
      color: "#D95BFF",
    },
    {
      icon: "🏋️",
      title: "Academia",
      date: "2026-05-17", // Esta semana
      value: "R$ 120,00",
      color: "#FF5F8F",
    },
    {
      icon: "🚌",
      title: "Transporte",
      date: "2026-05-10", // Deste mês
      value: "R$ 27,00",
      color: "#9B5CFF",
    },
    {
      icon: "💊",
      title: "Farmácia",
      date: "2026-04-15", // Outro mês, mas mesmo ano
      value: "R$ 95,00",
      color: "#F56DFF",
    },
    {
      icon: "🏠",
      title: "Moradia",
      date: "2026-01-10", // Outro mês, mesmo ano
      value: "R$ 2.000,00",
      color: "#FF6489",
    },
  ];

  if (loading) {
    return <LoadingScreen />;
  }

  // --- LÓGICA DE FILTRAGEM DE DATAS REORGANIZADA ---
  const obterDespesasFiltradas = () => {
    const hoje = new Date();
    const hojeInicio = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

    return todasDespesas.filter((item) => {
      const dataItem = new Date(item.date + "T00:00:00");

      switch (filtro) {
        case "Hoje": {
          return dataItem.getTime() === hojeInicio.getTime();
        }
        case "Semana": {
          const diaSemana = hoje.getDay();
          const domingoAtual = new Date(hojeInicio);
          domingoAtual.setDate(hojeInicio.getDate() - diaSemana);
          return dataItem >= domingoAtual && dataItem <= hojeInicio;
        }
        case "Mês": {
          return (
            dataItem.getMonth() === hoje.getMonth() &&
            dataItem.getFullYear() === hoje.getFullYear()
          );
        }
        case "Ano": {
          return dataItem.getFullYear() === hoje.getFullYear();
        }
        default: {
          return true;
        }
      }
    });
  };

  const despesasFiltradas = obterDespesasFiltradas();

  // --- LÓGICA DE CÁLCULO DO TOTAL ---
  const calcularTotal = () => {
    const total = despesasFiltradas.reduce((acc, item) => {
      const valorLimpo = parseFloat(
        item.value.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()
      );
      return acc + valorLimpo;
    }, 0);

    return total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Auxiliar para exibir a data amigável na lista (ex: "21 Mai")
  const formatarDataExibicao = (dataStr) => {
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const data = new Date(dataStr + "T00:00:00");
    return `${data.getDate()} ${meses[data.getMonth()]}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9B35FF" />

      {/* HEADER */}
      <ImageBackground
        source={require("../assets/fundo.png")}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Despesas</Text>

          {/* FILTROS */}
          <View style={styles.filterContainer}>
            {["Hoje", "Semana", "Mês", "Ano"].map((tipo) => (
              <TouchableOpacity
                key={tipo}
                style={filtro === tipo ? styles.activeFilter : styles.filterButton}
                onPress={() => setFiltro(tipo)}
              >
                <Text style={filtro === tipo ? styles.activeFilterText : styles.filterText}>
                  {tipo}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ImageBackground>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Transações Recentes</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {despesasFiltradas.length === 0 ? (
            <Text style={styles.noDataText}>Nenhuma despesa neste período.</Text>
          ) : (
            despesasFiltradas.map((item, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.leftCard}>
                  <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                    <Text style={styles.icon}>{item.icon}</Text>
                  </View>

                  <View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDate}>
                      {formatarDataExibicao(item.date)}
                    </Text>
                  </View>
                </View>

                <Text style={styles.value}>{item.value}</Text>
              </View>
            ))
          )}

          {/* TOTAL DINÂMICO */}
          <View style={styles.totalCard}>
            <Text style={styles.totalText}>Total ({filtro})</Text>
            <Text style={styles.totalValue}>{calcularTotal()}</Text>
          </View>
        </ScrollView>
      </View>

      {/* BOTÃO FLUTUANTE VINCULADO À PÁGINA INSERIR */}
      <TouchableOpacity 
        style={styles.floatingButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("inserir")}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F2FC",
  },
  header: {
    height: 230,
    overflow: "hidden",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(110, 0, 255, 0.20)",
    paddingTop: 70,
    paddingHorizontal: 22,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 30,
  },
  /* FILTROS */
  filterContainer: {
    height: 70,
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  filterText: {
    color: "#2E184A",
    fontSize: 22,
  },
  activeFilter: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 18,
  },
  activeFilterText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2A143F",
  },
  /* CONTENT */
  content: {
    flex: 1,
    paddingHorizontal: 18,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#24132F",
    marginBottom: 18,
  },
  noDataText: {
    fontSize: 18,
    color: "#6F6780",
    textAlign: "center",
    marginVertical: 30,
    fontStyle: "italic",
  },
  /* CARD */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 5,
  },
  leftCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 62,
    height: 62,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  icon: {
    fontSize: 28,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#24132F",
  },
  cardDate: {
    color: "#6F6780",
    fontSize: 18,
    marginTop: 3,
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#24132F",
  },
  /* TOTAL */
  totalCard: {
    backgroundColor: "#E9D8FF",
    borderRadius: 22,
    padding: 20,
    marginTop: 10,
    marginBottom: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E184A",
  },
  totalValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6F00FF",
  },
  /* BOTÃO FLUTUANTE */
  floatingButton: {
    position: "absolute",
    bottom: 35,
    right: 25,
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: "#A63DFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6F00FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 12,
  },
  floatingButtonText: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "300",
    marginTop: -2,
  },
});