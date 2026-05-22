import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import LoadingScreen from "./LoadingScreen";

export default function HomeScreen() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (

    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#B14DFF"
      />

      <ImageBackground
        source={require("../assets/fundo.png")}
        style={styles.header}
        imageStyle={styles.headerImage}
      >

        <View style={styles.overlay}>

          <View style={styles.topBar}>

            <Text style={styles.welcome}>
              Olá, bem-vindo!
            </Text>

            <View style={styles.aiButton}>
              <Text style={styles.aiIcon}>✨</Text>
            </View>

          </View>

          {/* CARD SALDO */}
          <View style={styles.balanceCard}>

            <Text style={styles.balanceTitle}>
              Saldo atual
            </Text>

            <Text style={styles.balanceValue}>
              R$ 3.500,00
            </Text>

            <Text style={styles.balanceInfo}>
              📈 +12% Em relação ao mês passado
            </Text>

          </View>

        </View>

      </ImageBackground>

      {/* CONTEÚDO */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >

        {/* CARDS */}
        <View style={styles.cardsContainer}>

          <View style={[styles.smallCard, styles.greenCard]}>

            <View style={styles.cardIconBox}>
              <Text style={styles.cardIcon}>💳</Text>
            </View>

            <Text style={styles.cardTitle}>
              Receitas
            </Text>

            <Text style={styles.cardValue}>
              R$ 8.500
            </Text>

          </View>

          <View style={[styles.smallCard, styles.pinkCard]}>

            <View style={styles.cardIconBox}>
              <Text style={styles.cardIcon}>💳</Text>
            </View>

            <Text style={styles.cardTitle}>
              Despesas
            </Text>

            <Text style={styles.cardValue}>
              R$ 5.000
            </Text>

          </View>

          <View style={[styles.smallCard, styles.purpleCard]}>

            <Text style={styles.cardTitle}>
              Saldo atual
            </Text>

            <Text style={styles.cardValue}>
              R$ 3.500
            </Text>

          </View>

          <View style={[styles.smallCard, styles.blueCard]}>

            <Text style={styles.cardTitle}>
              Investido
            </Text>

            <Text style={styles.cardValue}>
              R$ 15.200
            </Text>

          </View>

        </View>

        {/* GRÁFICO */}
        <View style={styles.chartContainer}>

          <View style={styles.chart}>

            <View style={styles.chartCenter} />

          </View>

          {/* LEGENDA */}
          <View style={styles.legendContainer}>

            <View style={styles.legendItem}>

              <View style={[styles.legendColor, {
                backgroundColor: "#16A085",
              }]} />

              <Text style={styles.legendText}>
                Receitas
              </Text>

            </View>

            <View style={styles.legendItem}>

              <View style={[styles.legendColor, {
                backgroundColor: "#FF00B8",
              }]} />

              <Text style={styles.legendText}>
                Despesas
              </Text>

            </View>

            <View style={styles.legendItem}>

              <View style={[styles.legendColor, {
                backgroundColor: "#7A00FF",
              }]} />

              <Text style={styles.legendText}>
                Saldo
              </Text>

            </View>

          </View>

        </View>

      </ScrollView>

      {/* BOTÃO FLUTUANTE */}
      <TouchableOpacity style={styles.floatingButton}>

        <Text style={styles.floatingButtonText}>
          +
        </Text>

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
    height: 320,
    overflow: "hidden",
  },

  headerImage: {
    resizeMode: "cover",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(120, 0, 255, 0.15)",
    paddingHorizontal: 22,
    paddingTop: 70,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcome: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },

  aiButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#FF00E5",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,

    elevation: 8,
  },

  aiIcon: {
    fontSize: 35,
    color: "#FFF",
  },

  balanceCard: {
    marginTop: 25,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 30,
    padding: 25,
  },

  balanceTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  balanceValue: {
    color: "#FFF",
    fontSize: 52,
    fontWeight: "bold",
    marginTop: 10,
  },

  balanceInfo: {
    color: "#FFF",
    fontSize: 20,
    marginTop: 10,
  },

  cardsContainer: {
    marginTop: -50,
    paddingHorizontal: 20,

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  smallCard: {
    width: "48%",
    borderRadius: 28,
    padding: 20,
    marginBottom: 15,
  },

  greenCard: {
    backgroundColor: "#16A085",
  },

  pinkCard: {
    backgroundColor: "#FF00B8",
  },

  purpleCard: {
    backgroundColor: "#9B30FF",
  },

  blueCard: {
    backgroundColor: "#3D5AFE",
  },

  cardIconBox: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  cardIcon: {
    fontSize: 28,
    color: "#FFF",
  },

  cardTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },

  cardValue: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "bold",
  },

  chartContainer: {
    alignItems: "center",
    marginTop: 25,
  },

  chart: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#16A085",
    justifyContent: "center",
    alignItems: "center",

    borderTopColor: "#FF00B8",
    borderTopWidth: 70,

    borderRightColor: "#7A00FF",
    borderRightWidth: 70,
  },

  chartCenter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F8F2FC",
  },

  legendContainer: {
    flexDirection: "row",
    marginTop: 30,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },

  legendColor: {
    width: 18,
    height: 18,
    borderRadius: 6,
    marginRight: 8,
  },

  legendText: {
    fontSize: 18,
    color: "#4B2B75",
    fontWeight: "600",
  },

  floatingButton: {
    position: "absolute",
    right: 25,
    bottom: 40,

    width: 90,
    height: 90,
    borderRadius: 45,

    backgroundColor: "#A93EFF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 4,
    borderColor: "#E7C7FF",

    shadowColor: "#6F00FF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 12,
  },

  floatingButtonText: {
    color: "#FFFFFF",
    fontSize: 50,
    fontWeight: "300",
    marginTop: -4,
  },

});