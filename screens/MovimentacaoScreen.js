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

import FloatingButton from "../components/FloatingButton";
import Footer from "../components/Footer";
import LoadingScreen from "./LoadingScreen";
import { VictoryPie } from "victory-native";

export default function HomeScreen({ navigation }) {

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
        backgroundColor="#7B2DFF"
      />

      {/* HEADER */}
      <ImageBackground
        source={require("../assets/fundo.png")}
        style={styles.header}
        imageStyle={styles.headerImage}
      >

        <View style={styles.overlay}>

          {/* TOPO */}
          <View style={styles.topBar}>

            <View>

              <Text style={styles.welcomeSmall}>
                FinUp
              </Text>

              <Text style={styles.welcome}>
                Bem-vindo de volta ✨
              </Text>

            </View>

            {/* PERFIL */}
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate("Perfil")}
            >

              <Text style={styles.profileIcon}>
                👤
              </Text>

            </TouchableOpacity>

          </View>

          {/* CARD PRINCIPAL */}
          <View style={styles.balanceCard}>

            <Text style={styles.balanceTitle}>
              Saldo Atual
            </Text>

            <Text style={styles.balanceValue}>
              R$ 3.500,00
            </Text>

            <View style={styles.balanceInfoContainer}>

              <Text style={styles.balanceGrowth}>
                📈 +12% este mês
              </Text>

              <Text style={styles.balanceDescription}>
                comparado ao mês passado
              </Text>

            </View>

          </View>

        </View>

      </ImageBackground>

      {/* CONTEÚDO */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 160,
        }}
      >

        {/* CARDS */}
        <View style={styles.cardsContainer}>

          {/* RECEITAS */}
          <View style={[styles.smallCard, styles.greenCard]}>

            <View style={styles.iconBox}>
              <Text style={styles.icon}>
                💸
              </Text>
            </View>

            <Text style={styles.cardTitle}>
              Receitas
            </Text>

            <Text style={styles.cardValue}>
              R$ 8.500
            </Text>

          </View>

          {/* DESPESAS */}
          <View style={[styles.smallCard, styles.pinkCard]}>

            <View style={styles.iconBox}>
              <Text style={styles.icon}>
                💳
              </Text>
            </View>

            <Text style={styles.cardTitle}>
              Despesas
            </Text>

            <Text style={styles.cardValue}>
              R$ 5.000
            </Text>

          </View>

          {/* SALDO */}
          <View style={[styles.smallCard, styles.purpleCard]}>

            <View style={styles.iconBox}>
              <Text style={styles.icon}>
                💰
              </Text>
            </View>

            <Text style={styles.cardTitle}>
              Saldo
            </Text>

            <Text style={styles.cardValue}>
              R$ 3.500
            </Text>

          </View>

          {/* INVESTIMENTOS */}
          <View style={[styles.smallCard, styles.blueCard]}>

            <View style={styles.iconBox}>
              <Text style={styles.icon}>
                📈
              </Text>
            </View>

            <Text style={styles.cardTitle}>
              Investimentos
            </Text>

            <Text style={styles.cardValue}>
              R$ 15.200
            </Text>

          </View>

        </View>
        
        {/* GRÁFICO DONUT PREMIUM */}
        <View style={styles.chartContainer}>

          <Text style={styles.chartTitle}>
            Resumo Financeiro
          </Text>

          <View style={styles.donutWrapper}>

            <VictoryPie

              data={[
                { x: "Receitas", y: 8500 },
                { x: "Despesas", y: 5000 },
                { x: "Investimentos", y: 15200 },
              ]}

              width={320}
              height={320}

              innerRadius={85}

              padAngle={3}

              colorScale={[
                "#19C37D",
                "#FF00B8",
                "#7B2DFF",
              ]}

              labels={() => null}

              animate={{
                duration: 1000,
              }}

              style={{
                data: {
                  stroke: "#F7F3FF",
                  strokeWidth: 5,
                },
              }}
            />

            {/* TEXTO CENTRAL */}
            <View style={styles.chartCenterOverlay}>

              <Text style={styles.chartBalance}>
                R$ 3.500
              </Text>

              <Text style={styles.chartSubtitle}>
                saldo atual
              </Text>

            </View>

          </View>

          {/* LEGENDA */}
          <View style={styles.legendContainer}>

            <View style={styles.legendItem}>

              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: "#19C37D" }
                ]}
              />

              <Text style={styles.legendText}>
                Receitas
              </Text>

            </View>

            <View style={styles.legendItem}>

              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: "#FF00B8" }
                ]}
              />

              <Text style={styles.legendText}>
                Despesas
              </Text>

            </View>

            <View style={styles.legendItem}>

              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: "#7B2DFF" }
                ]}
              />

              <Text style={styles.legendText}>
                Investimentos
              </Text>

            </View>

          </View>

        </View>
      </ScrollView>
      {/* BOTÃO FLUTUANTE */}
      <FloatingButton />

      {/* FOOTER */}
      <Footer />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F7F3FF",
  },

  header: {
    height: 340,
  },

  headerImage: {
    resizeMode: "cover",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(120,0,255,0.12)",
    paddingTop: 70,
    paddingHorizontal: 22,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcomeSmall: {
    color: "#E5D9FF",
    fontSize: 18,
    marginBottom: 4,
  },

  welcome: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },

  profileButton: {
    width: 68,
    height: 68,
    borderRadius: 34,

    backgroundColor: "rgba(255,255,255,0.15)",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",

    shadowColor: "#C56BFF",
    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 10,
  },

  profileIcon: {
    fontSize: 32,
    color: "#FFFFFF",
  },

  balanceCard: {
    marginTop: 28,

    backgroundColor: "rgba(255,255,255,0.15)",

    borderRadius: 35,

    padding: 28,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },

  balanceTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },

  balanceValue: {
    color: "#FFFFFF",
    fontSize: 52,
    fontWeight: "bold",
    marginTop: 12,
  },

  balanceInfoContainer: {
    marginTop: 12,
  },

  balanceGrowth: {
    color: "#9CFFCB",
    fontSize: 20,
    fontWeight: "bold",
  },

  balanceDescription: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 4,
    opacity: 0.8,
  },

  cardsContainer: {
    marginTop: -45,
    paddingHorizontal: 20,

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  smallCard: {
    width: "48%",
    borderRadius: 30,
    padding: 22,
    marginBottom: 16,
  },

  greenCard: {
    backgroundColor: "#19C37D",
  },

  pinkCard: {
    backgroundColor: "#FF00B8",
  },

  purpleCard: {
    backgroundColor: "#9B30FF",
  },

  blueCard: {
    backgroundColor: "#4A6CFF",
  },

  iconBox: {
    width: 62,
    height: 62,
    borderRadius: 22,

    backgroundColor: "rgba(255,255,255,0.18)",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 18,
  },

  icon: {
    fontSize: 30,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },

  cardValue: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
  },

chartContainer: {
  marginTop: 25,
  alignItems: "center",
},

chartTitle: {
  fontSize: 26,
  color: "#4B2B75",
  fontWeight: "bold",
  marginBottom: 20,
},

donutWrapper: {
  justifyContent: "center",
  alignItems: "center",
},

chartCenterOverlay: {
  position: "absolute",
  justifyContent: "center",
  alignItems: "center",
},

chartBalance: {
  fontSize: 30,
  fontWeight: "bold",
  color: "#4B2B75",
},

chartSubtitle: {
  marginTop: 4,
  fontSize: 16,
  color: "#7E6B97",
},

legendContainer: {
  flexDirection: "row",
  marginTop: 15,
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
  fontSize: 16,
  color: "#4B2B75",
  fontWeight: "600",
},
});