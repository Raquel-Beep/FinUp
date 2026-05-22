import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import LoadingScreen from "./LoadingScreen";

// Adicionado o { navigation } aqui para permitir a navegação entre as telas
export default function LoginScreen({ navigation }) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);

  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (

    <View style={styles.container}>
      
      {/* TOPO */}
      <View style={styles.topContainer}>

        <Image
          source={require("../assets/logo2.png")}
          style={styles.logo}
          resizeMode="contain"
        />

      </View>

      {/* CARD LOGIN */}
      <View style={styles.card}>

        <Text style={styles.title}>
          Acessar sua conta
        </Text>

        {/* EMAIL */}
        <View style={styles.inputContainer}>

          <Image
            source={require("../assets/email.png")}
            style={styles.email}
            resizeMode="contain"
          />

          <TextInput
            placeholder="Seu email"
            placeholderTextColor="#8D8D8D"
            style={styles.input}
          />

        </View>

        {/* SENHA */}
        <View style={styles.inputContainer}>

          <Image
            source={require("../assets/senha.png")}
            style={styles.senha}
            resizeMode="contain"
          />

          <TextInput
            placeholder="Sua senha"
            placeholderTextColor="#8D8D8D"
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity>
            <Text style={styles.forgot}>
              Esqueceu?
            </Text>
          </TouchableOpacity>

        </View>

        {/* BOTÃO LOGIN */}
        <TouchableOpacity activeOpacity={0.8}>

          <LinearGradient
            colors={["#B156F9", "#0E9EEA"]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 1.9, y: 0 }}
            style={styles.loginButton}
          >

            <Text style={styles.loginText}>
              Entrar
            </Text>

          </LinearGradient>

        </TouchableOpacity>

        {/* DIVISOR */}
        <View style={styles.dividerContainer}>

          <View style={styles.line} />

          <Text style={styles.or}>
            ou
          </Text>

          <View style={styles.line} />

        </View>

        {/* GOOGLE */}
        <TouchableOpacity style={styles.googleButton}>

          <Image
            source={require("../assets/google.png")}
            style={styles.googleImg}
            resizeMode="contain"
          />

        </TouchableOpacity>

        {/* CRIAR CONTA */}
        <View style={styles.footer}>

          <Text style={styles.footerText}>
            Ainda não tem uma conta?
          </Text>

          {/* Adicionado o onPress para navegar para a tela de Cadastro */}
          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>

            <Text style={styles.createAccount}>
              Criar conta
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#C86BFF",
  },

  topContainer: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    marginTop: 15,
    width: "200%",
    height: "520%",
  },

  card: {
    flex: 0.65,
    backgroundColor: "#F5F0FA",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#22005B",
    textAlign: "center",
    marginBottom: 15,
  },

  inputContainer: {
    height: 60,
    borderWidth: 1,
    borderColor: "#E2D5F5",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },

  icon: {
    fontSize: 18,
    marginRight: 10,
    color: "#7B2CFF",
  },

  input: {
    flex: 1,
    fontSize: 17,
    color: "#333",
  },

  forgot: {
    color: "#6C2BFF",
    fontWeight: "600",
  },

  loginButton: {
    height: 62,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,

    shadowColor: "#B156F9",

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.35,
    shadowRadius: 8,

    elevation: 8,
  },

  loginText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D8C8EC",
  },

  or: {
    marginHorizontal: 12,
    fontSize: 18,
    color: "#6B5D7A",
    fontWeight: "600",
  },

  googleButton: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 4,
  },

  googleImg: {
    width: 800,
    height: 200,
    marginTop: 15,
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
  },

  footerText: {
    fontSize: 18,
    color: "#777",
    marginBottom: 10,
  },

  createAccount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5A00FF",
  },

  email: {
    width: 35,
    height: 35,
    marginRight: 10,
  },

  senha: {
    width: 35,
    height: 35,
    marginRight: 10,
  }

});