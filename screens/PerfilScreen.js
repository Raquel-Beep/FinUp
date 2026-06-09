import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import Footer from "../components/Footer";

// Perfil (informações)
export default function PerfilScreen() {
  const [user, setUser] = useState({
    name: "Luana Airosa",
    email: "luana.airosa@example.com",
    subscription: "Premium Mensal",
    status: "Ativo",
    expire: "20/06/2027",
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F5FF" />

      <Text style={styles.title}>Meu Perfil</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.text}>{user.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.text}>{user.email}</Text>

        <Text style={styles.label}>Plano</Text>
        <Text style={styles.text}>{user.subscription}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.text}>{user.status}</Text>

        <Text style={styles.label}>Expira em</Text>
        <Text style={styles.text}>{user.expire}</Text>
      </View>

      {/* Botões */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.buttonText}>Sair da Conta</Text>
      </TouchableOpacity>

      <Footer />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5FF",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D1B4E",
    marginBottom: 25,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    color: "#9D4EDD",
    marginTop: 10,
    fontWeight: "bold",
  },

  text: {
    fontSize: 18,
    color: "#2D1B4E",
    marginTop: 5,
  },

  button: {
    backgroundColor: "#9D4EDD",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  logoutButton: {
    backgroundColor: "#C77DFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});