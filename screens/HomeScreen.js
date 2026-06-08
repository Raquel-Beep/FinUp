import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

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
        title="Investimentos"
        onPress={() => navigation.navigate("Investimentos")}
      />

      <Button
        title="Pro"
        onPress={() => navigation.navigate("Pro")}
      />

      <Button
        title="Movimentação"
        onPress={() => navigation.navigate("Movimentação")}
      />
      
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