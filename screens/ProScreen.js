import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";

import LoadingScreen from "./LoadingScreen";

export default function ProScreen({ navigation }) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const handleAtivarPro = () => {
    // Navegar para a tela de benefícios do premium
    navigation.navigate("PremiumBenefits");
  };

  return (

    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#B14DFF"
      />

      {/* HEADER */}
      <ImageBackground
        source={require("../assets/logo5.png")}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.overlay}>

          <Text style={styles.title}>
            Desbloqueie o pacote PRO!
          </Text>

          <Text style={styles.description}>
            Tenha as despesas do cartão de crédito
            lançadas automaticamente lendo as notificações,
            sem precisar cadastrar manualmente.
          </Text>

          <TouchableOpacity
            style={styles.proButton}
            onPress={() => navigation.navigate("PremiumBenefits")}
          >
            <Text style={styles.proButtonText}>
              Ativar PRO agora
            </Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
      {/* CONTEÚDO */}
      <View style={styles.content}>

        <Text style={styles.benefitsTitle}>
          Benefício do PRO:
        </Text>

        {/* CARD */}
        <View style={styles.card}>

          <View style={styles.cardTop}>

            <View style={styles.iconBox}>

              <Text style={styles.cardIcon}>
                💳
              </Text>

            </View>

            <View style={{ flex: 1 }}>

              <Text style={styles.cardTitle}>
                Cadastre um Cartão de Crédito
              </Text>

              <Text style={styles.cardDescription}>
                Lançamento automático de todas as
                despesas do cartão
              </Text>

            </View>

          </View>

          <View style={styles.divider} />

          <Text style={styles.price}>
            R$ 9,99 <Text style={styles.month}>/ mês</Text>
          </Text>

          <Text style={styles.cancelText}>
            Cancele a qualquer momento
          </Text>

        </View>

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8F2FC",
  },

  header: {
    height: 360,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    overflow: "hidden",
  },

  headerBackground: {
    resizeMode: "cover",
    opacity: 0.45,
  },

overlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.35)",

  justifyContent: "center",
  alignItems: "center",

  paddingHorizontal: 25,
},
  escrita: {
    marginTop:100,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 15,
  },

  description: {
    color: "#F5EFFF",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 25,
    marginBottom: 20,
  },

  proButton: {
    
    width: "100%",
    height: 65,

    backgroundColor: "#A93EFF",

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#6F00FF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,

    elevation: 8,
  },

  proButtonText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    padding: 22,
  },

  benefitsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3D1368",
    marginBottom: 18,
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 25,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 5,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  iconBox: {
    width: 55,
    height: 55,

    borderRadius: 15,

    backgroundColor: "#9D4DFF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,
  },

  cardIcon: {
    fontSize: 28,
  },

  cardTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#431B74",
    marginBottom: 6,
  },

  cardDescription: {
    fontSize: 18,
    color: "#7C6998",
    lineHeight: 26,
  },

  divider: {
    height: 1,
    backgroundColor: "#E7DAF7",
    marginVertical: 22,
  },

  price: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#4A148C",
    textAlign: "center",
  },

  month: {
    fontSize: 26,
    fontWeight: "400",
  },

  cancelText: {
    textAlign: "center",
    marginTop: 10,
    color: "#7E6B98",
    fontSize: 18,
  },

});