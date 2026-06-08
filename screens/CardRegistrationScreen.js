import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import LoadingScreen from "./LoadingScreen";

// Lista de principais bancos brasileiros
const BANCOS_DISPONIVEIS = [
  { id: 1, nome: "Banco do Brasil", codigo: "001", logo: "🏢" },
  { id: 2, nome: "Caixa Econômica Federal", codigo: "104", logo: "🏠" },
  { id: 3, nome: "Bradesco", codigo: "237", logo: "📊" },
  { id: 4, nome: "Itaú", codigo: "341", logo: "💰" },
  { id: 5, nome: "Nubank", codigo: "260", logo: "🟣" },
  { id: 6, nome: "Santander", codigo: "033", logo: "🏦" },
  { id: 7, nome: "BTG Pactual", codigo: "208", logo: "📈" },
  { id: 8, nome: "XP Investimentos", codigo: "655", logo: "💹" },
  { id: 9, nome: "Inter", codigo: "077", logo: "📱" },
  { id: 10, nome: "Banrisul", codigo: "047", logo: "🏛️" },
  { id: 11, nome: "Safra", codigo: "422", logo: "💳" },
  { id: 12, nome: "Sicredi", codigo: "748", logo: "🤝" },
];

const TIPOS_CARTAO = [
  { id: 1, tipo: "Crédito", label: "Cartão de Crédito" },
  { id: 2, tipo: "Débito", label: "Cartão de Débito" },
  { id: 3, tipo: "Ambos", label: "Crédito e Débito" },
];

export default function CardRegistrationScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [bancoSelecionado, setBancoSelecionado] = useState(null);
  const [tipoCartaoSelecionado, setTipoCartaoSelecionado] = useState(null);
  const [nomeCartao, setNomeCartao] = useState("");
  const [ultimosDigitos, setUltimosDigitos] = useState("");
  const [modalBancos, setModalBancos] = useState(false);
  const [modalTipos, setModalTipos] = useState(false);
  const [filtrarBancos, setFiltrarBancos] = useState("");

  const handleRegistrarCartao = () => {
    // Validações
    if (!bancoSelecionado) {
      Alert.alert("Atenção", "Por favor, selecione um banco");
      return;
    }

    if (!tipoCartaoSelecionado) {
      Alert.alert("Atenção", "Por favor, selecione o tipo de cartão");
      return;
    }

    if (!nomeCartao.trim()) {
      Alert.alert("Atenção", "Por favor, insira um nome para o cartão");
      return;
    }

    if (!ultimosDigitos.trim() || ultimosDigitos.length < 4) {
      Alert.alert("Atenção", "Por favor, insira os últimos 4 dígitos do cartão");
      return;
    }

    setLoading(true);

    // Aqui você faria a chamada à API/Firebase para registrar o cartão
    // Por enquanto, simulamos um atraso
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Sucesso!",
        `Cartão "${nomeCartao}" do ${bancoSelecionado.nome} registrado com sucesso!`,
        [
          {
            text: "OK",
            onPress: () => {
              // Volta para Home ou tela de Cartões
              navigation.popToTop();
            },
          },
        ]
      );
    }, 1500);
  };

  const bancosFiltrados = BANCOS_DISPONIVEIS.filter((banco) =>
    banco.nome.toLowerCase().includes(filtrarBancos.toLowerCase())
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#B14DFF" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Registrar Cartão</Text>
          <Text style={styles.headerDescription}>
            Complete os dados do seu cartão para sincronizá-lo
          </Text>
        </View>

        {/* CONTEÚDO */}
        <View style={styles.content}>
          {/* SEÇÃO BANCO */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Banco *</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setModalBancos(true)}
            >
              <Text style={[
                styles.selectButtonText,
                !bancoSelecionado && styles.placeholderText,
              ]}>
                {bancoSelecionado
                  ? `${bancoSelecionado.logo} ${bancoSelecionado.nome}`
                  : "Selecione seu banco"}
              </Text>
              <Text style={styles.selectIcon}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* SEÇÃO TIPO DE CARTÃO */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Tipo de Cartão *</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setModalTipos(true)}
            >
              <Text style={[
                styles.selectButtonText,
                !tipoCartaoSelecionado && styles.placeholderText,
              ]}>
                {tipoCartaoSelecionado
                  ? tipoCartaoSelecionado.label
                  : "Selecione o tipo"}
              </Text>
              <Text style={styles.selectIcon}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* SEÇÃO NOME DO CARTÃO */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Nome do Cartão *</Text>
            <TextInput
              placeholder="Ex: Cartão do Brasil, Crédito Nubank"
              placeholderTextColor="#B0B0B0"
              style={styles.input}
              value={nomeCartao}
              onChangeText={setNomeCartao}
            />
            <Text style={styles.inputHint}>
              Dê um nome fácil para identificar seu cartão
            </Text>
          </View>

          {/* SEÇÃO ÚLTIMOS DÍGITOS */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Últimos 4 Dígitos *</Text>
            <TextInput
              placeholder="Ex: 1234"
              placeholderTextColor="#B0B0B0"
              style={styles.input}
              value={ultimosDigitos}
              onChangeText={(text) => setUltimosDigitos(text.replace(/\D/g, "").slice(-4))}
              keyboardType="numeric"
              maxLength={4}
            />
            <Text style={styles.inputHint}>
              Digite apenas os últimos 4 dígitos do cartão
            </Text>
          </View>

          {/* PREVIEW DO CARTÃO */}
          {bancoSelecionado && tipoCartaoSelecionado && (
            <View style={styles.previewContainer}>
              <Text style={styles.previewLabel}>Prévia do Cartão</Text>
              <LinearGradient
                colors={["#A93EFF", "#7B2FF7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardPreview}
              >
                <View style={styles.cardContent}>
                  <View style={styles.cardTop}>
                    <Text style={styles.cardBank}>
                      {bancoSelecionado.logo} {bancoSelecionado.nome}
                    </Text>
                    <Text style={styles.cardType}>{tipoCartaoSelecionado.label}</Text>
                  </View>

                  <View style={styles.cardMiddle}>
                    <Text style={styles.cardName}>{nomeCartao || "Seu Cartão"}</Text>
                  </View>

                  <View style={styles.cardBottom}>
                    <Text style={styles.cardLabel}>Últimos Dígitos</Text>
                    <Text style={styles.cardDigits}>
                      •••• •••• •••• {ultimosDigitos || "0000"}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* INFORMAÇÕES ADICIONAIS */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>🔒 Seus dados estão seguros</Text>
            <Text style={styles.infoText}>
              Não armazenamos informações completas do cartão. Apenas os últimos
              4 dígitos são registrados para identificação.
            </Text>
          </View>

          {/* BOTÕES */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleRegistrarCartao}
            style={styles.registerButtonWrapper}
          >
            <LinearGradient
              colors={["#A93EFF", "#7B2FF7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.registerButton}
            >
              <Text style={styles.registerButtonText}>
                Registrar Cartão
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MODAL BANCOS */}
      <Modal
        visible={modalBancos}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalBancos(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione seu banco</Text>
              <TouchableOpacity onPress={() => setModalBancos(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Buscar banco..."
              placeholderTextColor="#B0B0B0"
              style={styles.modalSearchInput}
              value={filtrarBancos}
              onChangeText={setFiltrarBancos}
            />

            <ScrollView style={styles.modalList}>
              {bancosFiltrados.map((banco) => (
                <TouchableOpacity
                  key={banco.id}
                  style={[
                    styles.modalItem,
                    bancoSelecionado?.id === banco.id &&
                      styles.modalItemSelected,
                  ]}
                  onPress={() => {
                    setBancoSelecionado(banco);
                    setModalBancos(false);
                    setFiltrarBancos("");
                  }}
                >
                  <Text style={styles.modalItemLogo}>{banco.logo}</Text>
                  <View style={styles.modalItemContent}>
                    <Text style={styles.modalItemName}>{banco.nome}</Text>
                    <Text style={styles.modalItemCode}>Código: {banco.codigo}</Text>
                  </View>
                  {bancoSelecionado?.id === banco.id && (
                    <Text style={styles.modalItemCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL TIPOS DE CARTÃO */}
      <Modal
        visible={modalTipos}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalTipos(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tipo de Cartão</Text>
              <TouchableOpacity onPress={() => setModalTipos(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalList}>
              {TIPOS_CARTAO.map((tipo) => (
                <TouchableOpacity
                  key={tipo.id}
                  style={[
                    styles.modalItem,
                    tipoCartaoSelecionado?.id === tipo.id &&
                      styles.modalItemSelected,
                  ]}
                  onPress={() => {
                    setTipoCartaoSelecionado(tipo);
                    setModalTipos(false);
                  }}
                >
                  <Text style={styles.modalItemLogo}>
                    {tipo.tipo === "Crédito" ? "💳" : tipo.tipo === "Débito" ? "💰" : "🔄"}
                  </Text>
                  <View style={styles.modalItemContent}>
                    <Text style={styles.modalItemName}>{tipo.label}</Text>
                  </View>
                  {tipoCartaoSelecionado?.id === tipo.id && (
                    <Text style={styles.modalItemCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#B14DFF",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },

  headerDescription: {
    fontSize: 14,
    color: "#E8D5FF",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  section: {
    marginBottom: 24,
  },

  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 10,
  },

  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E0D5FF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 50,
  },

  selectButtonText: {
    fontSize: 15,
    color: "#1A1A1A",
    fontWeight: "500",
    flex: 1,
  },

  placeholderText: {
    color: "#B0B0B0",
  },

  selectIcon: {
    fontSize: 12,
    color: "#A93EFF",
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E0D5FF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1A1A1A",
  },

  inputHint: {
    fontSize: 12,
    color: "#999999",
    marginTop: 8,
    marginLeft: 4,
    fontStyle: "italic",
  },

  previewContainer: {
    marginVertical: 24,
  },

  previewLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
  },

  cardPreview: {
    borderRadius: 16,
    padding: 20,
    minHeight: 200,
    justifyContent: "space-between",
    shadowColor: "#A93EFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  cardBank: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  cardType: {
    fontSize: 12,
    color: "#E8D5FF",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  cardMiddle: {
    paddingVertical: 20,
  },

  cardName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 1,
  },

  cardBottom: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.3)",
    paddingTop: 12,
  },

  cardLabel: {
    fontSize: 11,
    color: "#E8D5FF",
    marginBottom: 4,
  },

  cardDigits: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
  },

  infoBox: {
    backgroundColor: "#F0E6FF",
    borderLeftWidth: 4,
    borderLeftColor: "#A93EFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 24,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 8,
  },

  infoText: {
    fontSize: 13,
    color: "#555555",
    lineHeight: 20,
  },

  registerButtonWrapper: {
    marginBottom: 12,
  },

  registerButton: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#A93EFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  registerButtonText: {
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

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "80%",
    paddingBottom: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
  },

  modalClose: {
    fontSize: 24,
    color: "#999999",
    fontWeight: "bold",
  },

  modalSearchInput: {
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    fontSize: 14,
    color: "#1A1A1A",
  },

  modalList: {
    paddingHorizontal: 20,
  },

  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  modalItemSelected: {
    backgroundColor: "#F9F7FF",
  },

  modalItemLogo: {
    fontSize: 24,
    marginRight: 14,
  },

  modalItemContent: {
    flex: 1,
  },

  modalItemName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 2,
  },

  modalItemCode: {
    fontSize: 12,
    color: "#999999",
  },

  modalItemCheck: {
    fontSize: 20,
    color: "#A93EFF",
    fontWeight: "bold",
  },
});
