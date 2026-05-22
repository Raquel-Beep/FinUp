import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function LoadingScreen() {

  return (

    <View style={styles.container}>

      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: "150%",
    height: "100%",
    resizeMode: "contain",
  },

});