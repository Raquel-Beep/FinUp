import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Footer() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home" size={25} color="#8B5CF6" />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Despesas")}
      >
        <Ionicons name="wallet" size={25} color="#8B5CF6" />
        <Text style={styles.text}>Despesas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Investimentos")}
      >
        <Ionicons name="trending-up" size={25} color="#8B5CF6" />
        <Text style={styles.text}>Investimentos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Premium")}
      >
        <MaterialCommunityIcons
          name="diamond-stone"
          size={25}
          color="#8B5CF6"
        />
        <Text style={styles.proText}>Premium</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 5,
    right: 5,

    height: 75,

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: "#F6EEFF",

    borderRadius: 25,

    borderWidth: 1,
    borderColor: "#E9D5FF",

    shadowColor: "#A855F7",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.18,
    shadowRadius: 20,

    elevation: 10,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    marginTop: 4,
    fontSize: 12,
    color: "#8B5CF6",
    fontWeight: "500",
  },

  proText: {
    marginTop: 4,
    fontSize: 12,
    color: "#7C3AED",
    fontWeight: "700",
  },
});