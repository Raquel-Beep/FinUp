import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ScrollView,
} from "react-native";
import Footer from "../components/Footer";


import LoadingScreen from "./LoadingScreen";

export default function InvestimentoScreen() {
  const [loading, setLoading] = useState(true);
  // Estado para controlar a aba ativa: 'Carteira', 'Rendimentos', 'Histórico'
  const [abaAtiva, setAbaAtiva] = useState("Carteira");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // --- DADOS DINÂMICOS PARA CADA ABA ---
  const dadosPorAba = {
    Carteira: {
      valorPrincipal: "R$ 12.450,00",
      subtituloValor: "Patrimônio Total",
      porcentagemGrafico: "65%",
      tituloSecao: "Minha Distribuição",
      itens: [
        { icon: "📈", title: "Ações Nacionais", desc: "40% da carteira", value: "R$ 4.980,00", color: "#FF8C66" },
        { icon: "🏢", title: "Fundos Imobiliários", desc: "35% da carteira", value: "R$ 4.357,50", color: "#D95BFF" },
        { icon: "💵", title: "Renda Fixa (CDB)", desc: "25% da carteira", value: "R$ 3.112,50", color: "#9B5CFF" },
      ],
    },
    Rendimentos: {
      valorPrincipal: "R$ 342,80",
      subtituloValor: "Dividendos este Mês",
      porcentagemGrafico: "+8%",
      tituloSecao: "Proventos Recebidos",
      itens: [
        { icon: "💰", title: "Dividendos -PETR4", desc: "Pago em 15 Maio", value:  "R$ 145,20", color: "#FF5F8F" },
        { icon: "🏢", title: "Rendimentos -HGLG11", desc: "Pago em 12 Maio", value: "R$ 112,60", color: "#D95BFF" },
        { icon: "🪙", title: "Juros S/C -VALE3", desc: "Pago em 05 Maio", value: "R$ 85,00", color: "#F56DFF" },
      ],
    },
    Histórico: {
      valorPrincipal: "5 Transações",
      subtituloValor: "Movimentações em 2026",
      porcentagemGrafico: "Ano",
      tituloSecao: "Últimas Operações",
      itens: [
        { icon: "🛒", title: "Compra - MXRF11", desc: "20 cotas • 18 Maio", value: "R$ 210,00", color: "#FF8C66" },
        { icon: "🛒", title: "Compra - BBDC4", desc: "15 ações • 10 Maio", value: "R$ 240,00", color: "#9B5CFF" },
        { icon: "💰", title: "Venda - ITUB4", desc: "10 ações • 28 Abril", value: "R$ 310,00", color: "#FF6489" },
      ],
    },
  };

  if (loading) {
    return <LoadingScreen />;
  }

  // Puxa os dados específicos da aba selecionada de forma automática
  const conteudoAtual = dadosPorAba[abaAtiva];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#B14DFF" />

      {/* FUNDO */}
      <ImageBackground
        source={require("../assets/fundo.png")}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Investimento</Text>

          {/* TABS DINÂMICAS */}
          <View style={styles.tabsContainer}>
            {["Carteira", "Rendimentos", "Histórico"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={abaAtiva === tab ? styles.activeTab : styles.tab}
                onPress={() => setAbaAtiva(tab)}
              >
                <Text style={abaAtiva === tab ? styles.activeTabText : styles.tabText}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CARD DO GRÁFICO / BALANÇO */}
        <View style={styles.mainCard}>
          <View style={styles.cardLeft}>
            <Text style={styles.mainValue}>{conteudoAtual.valorPrincipal}</Text>
            <Text style={styles.subTitle}>{conteudoAtual.subtituloValor}</Text>
          </View>

          {/* Círculo do gráfico simulado com a porcentagem dinâmica */}
          <View style={styles.chartCircle}>
            <View style={styles.innerCircle}>
              <Text style={styles.chartText}>{conteudoAtual.porcentagemGrafico}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* CONTEÚDO SCROLLABLE */}
      <Text style={styles.sectionTitle}>{conteudoAtual.tituloSecao}</Text>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollList}>
        {conteudoAtual.itens.map((item, index) => (
          <View key={index} style={styles.tipCard}>
            <View style={styles.tipLeft}>
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Text style={styles.tipIcon}>{item.icon}</Text>
              </View>
              <View>
                <Text style={styles.tipTitle}>{item.title}</Text>
                <Text style={styles.tipDesc}>{item.desc}</Text>
              </View>
            </View>
            <Text style={styles.tipValue}>{item.value}</Text>
          </View>
        ))}
        {/* Espaçamento extra no fim do scroll para não sumir atrás do botão */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* BOTÃO FLUTUANTE DE ADICIONAR */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6FC",
  },
  background: {
    height: 380,
    paddingHorizontal: 22,
    paddingTop: 60,
  },
  backgroundImage: {
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  header: {
    marginBottom: 35,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 24,
  },
  /* TABS */
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 24,
    padding: 6,
    justifyContent: "space-between",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  activeTabText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6E00FF",
  },
  /* MAIN CARD */
  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#6E00FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardLeft: {
    flex: 1,
  },
  mainValue: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#2E184A",
  },
  subTitle: {
    fontSize: 18,
    color: "#7B6F93",
    marginTop: 4,
  },
  /* GRÁFICO CÍRCULO */
  chartCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#6E00FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6E00FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  innerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  chartText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6E00FF",
  },
  /* CONTEÚDO */
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5A2C87",
    marginTop: 28,
    marginBottom: 18,
    marginHorizontal: 22,
  },
  scrollList: {
    flex: 1,
    paddingHorizontal: 22,
  },
  /* ITEM CARD */
 tipCard: {
    backgroundColor: "rgba(255,255,255,0.92)",
    marginBottom: 14,
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    
    // 1. MUDAR PARA "flex-end" PARA JOGAR O VALOR PARA A BASE (BAIXO) DO CARD
    alignItems: "flex-end", 
    
    justifyContent: "space-between",
    shadowColor: "#6E00FF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  tipLeft: {
    flexDirection: "row",
    
    // 2. ADICIONE AQUI TAMBÉM PARA ALINHAR O ÍCONE E TEXTOS POR BAIXO
    alignItems: "flex-end", 
    
    flex: 1, 
  },
  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  tipIcon: {
    fontSize: 26,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E184A",
  },
  tipDesc: {
    fontSize: 16,
    color: "#7B6F93",
    marginTop: 2,
  },
  tipValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E184A",
    marginLeft: 10,
  },
  /* BOTÃO FLUTUANTE */
  floatingButton: {
    position: "absolute",
    bottom: 35,
    right: 25,
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: "#B14DFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#B14DFF",
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