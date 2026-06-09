import React from "react";
import {
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

import Footer from "../components/Footer";

export default function HomeScreen({ navigation }) {

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>
        FinUp
      </Text>

      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
      />

      <Button
        title="Cadastro"
        onPress={() => navigation.navigate("Cadastro")}
      />

      <Button
        title="Assistente"
        onPress={() => navigation.navigate("Assistente")}
      />

      <Button
        title="Despesas"
        onPress={() => navigation.navigate("Despesas")}
      />

      <Button
        title="Adicionar Despesa"
        onPress={() => navigation.navigate("AdicionarDespesa")}
      />

      <Button
        title="Investimentos"
        onPress={() => navigation.navigate("Investimentos")}
      />

      <Button
        title="Adicionar Investimento"
        onPress={() => navigation.navigate("AdicionarInvestimento")}
      />

      <Button
        title="Premium"
        onPress={() => navigation.navigate("Premium")}
      />

      <Button
        title="Movimentação"
        onPress={() => navigation.navigate("Home")}
      />

      <Button
        title="Painel Admin"
        onPress={() => navigation.navigate("Admin")}
      />

      <Footer />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

});