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

import { LinearGradient } from "expo-linear-gradient";
import LoadingScreen from "../../FinUp-main/screens/LoadingScreen";

export default function PremiumBenefitsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const handleAcceptPremium = () => {
    // Aqui você vai levar o usuário para a tela de cadastro de cartão
    // ou para pagamento, dependendo do fluxo desejado
    navigation.navigate("CardRegistration");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#B14DFF" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER COM IMAGEM */}
        <ImageBackground
          source={require("../assets/logo5.png")}
          style={styles.header}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.headerTitle}>Desbloqueie o PREMIUM!</Text>
            <Text style={styles.headerDescription}>
              Gerencie múltiplos cartões e tenha sugestões ilimitadas da Luna
            </Text>
          </View>
        </ImageBackground>

        {/* CONTEÚDO PRINCIPAL */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Por que PREMIUM?</Text>

          {/* CARD BENEFÍCIO 1 */}
          <View style={styles.benefitCard}>
            <View style={styles.benefitHeader}>
              <View style={styles.iconCircle}>
                <Text style={styles.benefitIcon}>💳</Text>
              </View>
              <View style={styles.benefitTextContainer}>
                <Text style={styles.benefitTitle}>
                  Múltiplos Cartões
                </Text>
                <Text style={styles.benefitDescription}>
                  Adicione e gerencie quantos cartões desejar
                </Text>
              </View>
            </View>
            <View style={styles.benefitDivider} />
            <Text style={styles.benefitDetail}>
              ✓ Controle completo de despesas por cartão
            </Text>
            <Text style={styles.benefitDetail}>
              ✓ Acompanhe limite disponível em tempo real
            </Text>
            <Text style={styles.benefitDetail}>
              ✓ Sincronize cartões de diferentes bancos
            </Text>
          </View>

          {/* CARD BENEFÍCIO 2 */}
          <View style={styles.benefitCard}>
            <View style={styles.benefitHeader}>
              <View style={styles.iconCircle}>
                <Text style={styles.benefitIcon}>🤖</Text>
              </View>
              <View style={styles.benefitTextContainer}>
                <Text style={styles.benefitTitle}>
                  Sugestões Ilimitadas da Luna
                </Text>
                <Text style={styles.benefitDescription}>
                  Acesso total à sua assistente financeira
                </Text>
              </View>
            </View>
            <View style={styles.benefitDivider} />
            <Text style={styles.benefitDetail}>
              ✓ Conversas ilimitadas com Luna 💜
            </Text>
            <Text style={styles.benefitDetail}>
              ✓ Dicas personalizadas de economia
            </Text>
            <Text style={styles.benefitDetail}>
              ✓ Análise detalhada de seus gastos
            </Text>
          </View>

          {/* CARD BENEFÍCIO 3 */}
          <View style={styles.benefitCard}>
            <View style={styles.benefitHeader}>
              <View style={styles.iconCircle}>
                <Text style={styles.benefitIcon}>⚡</Text>
              </View>
              <View style={styles.benefitTextContainer}>
                <Text style={styles.benefitTitle}>
                  Lançamento Automático
                </Text>
                <Text style={styles.benefitDescription}>
                  Despesas do cartão registradas automaticamente
                </Text>
              </View>
            </View>
            <View style={styles.benefitDivider} />
            <Text style={styles.benefitDetail}>
              ✓ Ler notificações de transações
            </Text>
            <Text style={styles.benefitDetail}>
              ✓ Economia de tempo no cadastro manual
            </Text>
            <Text style={styles.benefitDetail}>
              ✓ Histórico completo sincronizado
            </Text>
          </View>

          {/* COMPARATIVA */}
          <View style={styles.comparisonContainer}>
            <Text style={styles.comparisonTitle}>Plano Gratuito vs PREMIUM</Text>

            <View style={styles.comparisonTable}>
              <View style={styles.comparisonRow}>
                <Text style={styles.comparisonFeature}>Cartões</Text>
                <Text style={styles.comparisonFreeValue}>1</Text>
                <Text style={styles.comparisonPremiumValue}>∞</Text>
              </View>
              <View style={styles.comparisonDivider} />
              <View style={styles.comparisonRow}>
                <Text style={styles.comparisonFeature}>Sugestões Luna</Text>
                <Text style={styles.comparisonFreeValue}>Limitadas</Text>
                <Text style={styles.comparisonPremiumValue}>Ilimitadas</Text>
              </View>
              <View style={styles.comparisonDivider} />
              <View style={styles.comparisonRow}>
                <Text style={styles.comparisonFeature}>Lançamento Automático</Text>
                <Text style={styles.comparisonFreeValue}>❌</Text>
                <Text style={styles.comparisonPremiumValue}>✓</Text>
              </View>
            </View>
          </View>

          {/* PREÇO */}
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              R$ <Text style={styles.priceValue}>9,99</Text>
            </Text>
            <Text style={styles.priceMonth}>/mês</Text>
            <Text style={styles.priceCancel}>Cancele a qualquer momento</Text>
          </View>

          {/* BOTÕES */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleAcceptPremium}
          >
            <LinearGradient
              colors={["#A93EFF", "#7B2FF7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.acceptButton}
            >
              <Text style={styles.acceptButtonText}>
                Ativar PREMIUM Agora
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>
              Continuar sem PREMIUM
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F2FC",
  },

  scrollContent: {
    flexGrow: 1,
  },

  header: {
    height: 280,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    overflow: "hidden",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },

  headerDescription: {
    fontSize: 15,
    color: "#F5EFFF",
    textAlign: "center",
    lineHeight: 22,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 20,
    marginTop: 10,
  },

  benefitCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  benefitHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F0E6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  benefitIcon: {
    fontSize: 28,
  },

  benefitTextContainer: {
    flex: 1,
  },

  benefitTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 4,
  },

  benefitDescription: {
    fontSize: 13,
    color: "#666666",
  },

  benefitDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginBottom: 12,
    marginTop: 12,
  },

  benefitDetail: {
    fontSize: 13,
    color: "#555555",
    marginBottom: 6,
    paddingLeft: 8,
  },

  comparisonContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  comparisonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 16,
    textAlign: "center",
  },

  comparisonTable: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 8,
    overflow: "hidden",
  },

  comparisonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  comparisonFeature: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    color: "#1A1A1A",
  },

  comparisonFreeValue: {
    flex: 1,
    fontSize: 13,
    color: "#999999",
    textAlign: "center",
  },

  comparisonPremiumValue: {
    flex: 1,
    fontSize: 13,
    fontWeight: "bold",
    color: "#A93EFF",
    textAlign: "center",
  },

  comparisonDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },

  priceContainer: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#F9F7FF",
    borderRadius: 16,
    paddingVertical: 20,
  },

  priceText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#A93EFF",
  },

  priceValue: {
    fontSize: 36,
    fontWeight: "bold",
  },

  priceMonth: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },

  priceCancel: {
    fontSize: 12,
    color: "#999999",
    marginTop: 8,
    fontStyle: "italic",
  },

  acceptButton: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#A93EFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  acceptButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  cancelButtonText: {
    color: "#A93EFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 12,
  },
});
