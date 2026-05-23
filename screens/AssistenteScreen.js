// Importa o React e alguns Hooks importantes
import React, { useEffect, useRef, useState } from "react";

// Importa componentes do React Native
import {
  View, // Estrutura visual tipo div
  Text, // Texto
  StyleSheet, // CSS do React Native
  StatusBar, // Barra superior do celular
  TextInput, // Campo de digitação
  TouchableOpacity, // Botão clicável
  ScrollView, // Área rolável
  KeyboardAvoidingView, // Faz a tela subir quando o teclado abre
  Platform, // Detecta Android/iOS
  ActivityIndicator, // Loading animado
} from "react-native";

import Footer from "../components/Footer";

// Importa o componente de vídeo do Expo
import { Video } from "expo-av";

// Tela de loading personalizada
import LoadingScreen from "./LoadingScreen";

// Função da IA Luna
import { askLuna } from "../services/groq";

// Componente principal da tela
export default function LunaScreen() {

  // Estado do loading inicial
  const [loading, setLoading] = useState(true);

  // Texto digitado no input
  const [message, setMessage] = useState("");

  // Verifica se a IA está digitando
  const [isTyping, setIsTyping] = useState(false);

  // Referência do ScrollView
  // usada para descer automaticamente o chat
  const scrollViewRef = useRef(null);

  // Função para pegar o horário atual
  // e retornar Bom dia / Boa tarde / Boa noite
  const getGreeting = () => {

    // Pega a hora atual do aparelho
    const hour = new Date().getHours();

    // Antes de 12h
    if (hour < 12) {
      return "Bom dia";
    }

    // Antes das 18h
    if (hour < 18) {
      return "Boa tarde";
    }

    // Depois das 18h
    return "Boa noite";
  };

  // Nome do usuário
  // futuramente pode vir do banco de dados
  const userName = "Usuário";

  // Estado que armazena todas mensagens do chat
  const [messages, setMessages] = useState([

    // Primeira mensagem da Luna
    {
      id: 1,
      sender: "luna",

      text:
        `${getGreeting()}, ${userName} 💜\n\n` +

        `Eu sou a Luna, sua assistente financeira.\n` +

        `Estou pronta para ajudar você a controlar seus gastos, metas e investimentos.`,
    },

  ]);

  // Executa quando a tela abre
  useEffect(() => {

    // Cria um timer de 1 segundo
    const timer = setTimeout(() => {

      // Remove loading
      setLoading(false);

    }, 1000);

    // Limpa memória do timer
    return () => clearTimeout(timer);

  }, []);

  // Faz o chat descer automaticamente
  const scrollToBottom = () => {

    setTimeout(() => {

      scrollViewRef.current?.scrollToEnd({

        animated: true,

      });

    }, 100);
  };

  // Função de enviar mensagem
  const sendMessage = async () => {

    // Impede enviar enquanto IA responde
    if (isTyping) {
      return;
    }

    // Impede mensagem vazia
    if (message.trim() === "") {
      return;
    }

    // Cria objeto da mensagem do usuário
    const userMessage = {

      id: Date.now(),

      sender: "user",

      text: message,
    };

    // Adiciona mensagem no chat
    setMessages((prev) => [...prev, userMessage]);

    // Guarda mensagem atual
    const currentMessage = message;

    // Limpa input
    setMessage("");

    // Mostra loading digitando
    setIsTyping(true);

    try {

      // Envia mensagem para IA
      const response =
        await askLuna(currentMessage);

      // Cria resposta da Luna
      const lunaMessage = {

        id: Date.now() + 1,

        sender: "luna",

        text: response,
      };

      // Adiciona resposta no chat
      setMessages((prev) => [...prev, lunaMessage]);

    } catch (error) {

      // Mostra erro no console
      console.log(error);

    } finally {

      // Remove loading digitando
      setIsTyping(false);
    }
  };

  // Enquanto carrega
  if (loading) {

    // Mostra tela de loading
    return <LoadingScreen />;
  }

  // Renderização da tela
  return (

    // Faz layout subir quando teclado abre
    <KeyboardAvoidingView

      style={styles.container}

      // iPhone usa padding
      // Android usa height
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }

      // Distância do teclado
      keyboardVerticalOffset={10}
    >

      {/* ÁREA DA LUNA */}
      <View style={styles.lunaContainer}>

        {/* Vídeo da Luna */}
        <Video

          // Caminho do vídeo
          source={require("../assets/lunaIA.mp4")}

          // Estilo do vídeo
          style={styles.video}

          // Ajuste do vídeo
          resizeMode="contain"

          // Auto play
          shouldPlay

          // Loop infinito
          isLooping

          // Velocidade 1.5x
          rate={2.0}

          // Sem som
          volume={0}

          // Remove controles
          useNativeControls={false}
        />

      </View>

      {/* CHAT */}
      <ScrollView

        // Referência
        ref={scrollViewRef}

        // Estilo
        style={styles.chatContainer}

        // Conteúdo interno
        contentContainerStyle={
          styles.chatContent
        }

        // Remove barra lateral
        showsVerticalScrollIndicator={false}

        // Permite clicar no input
        keyboardShouldPersistTaps="handled"

        // Sempre desce automaticamente
        onContentSizeChange={scrollToBottom}
      >

        {/* Percorre mensagens */}
        {messages.map((item) => (

          <View

            key={item.id}

            style={[

              styles.messageWrapper,

              // Verifica quem enviou
              item.sender === "user"

                ? styles.userWrapper

                : styles.lunaWrapper,
            ]}
          >

            <View

              style={[

                styles.messageBubble,

                item.sender === "user"

                  ? styles.userBubble

                  : styles.lunaBubble,
              ]}
            >

              {/* Texto da mensagem */}
              <Text

                style={[

                  styles.messageText,

                  item.sender === "user"

                    ? styles.userText

                    : styles.lunaText,
                ]}
              >

                {item.text}

              </Text>

            </View>

          </View>

        ))}

        {/* Loading digitando */}
        {isTyping && (

          <View style={styles.lunaWrapper}>

            <View style={styles.typingBubble}>

              <ActivityIndicator

                size="small"

                color="#C89BFF"
              />

            </View>

          </View>

        )}

      </ScrollView>

      {/* INPUT */}
      <View style={styles.inputArea}>

        <View style={styles.inputContainer}>

          {/* Campo de texto */}
          <TextInput

            placeholder="Converse com a Luna..."

            placeholderTextColor="#fdfdfd"

            style={styles.input}

            value={message}

            onChangeText={setMessage}
          />

          {/* Botão enviar */}
          <TouchableOpacity

            style={styles.sendButton}

            onPress={sendMessage}
          >

            <Text style={styles.sendText}>
              ➜
            </Text>

          </TouchableOpacity>

        </View>

      </View>
      <Footer />
    </KeyboardAvoidingView>

  );
}

// CSS da tela
const styles = StyleSheet.create({

  // Tela inteira
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  /* LUNA */

  // Área do vídeo
  lunaContainer: {

    width: "100%",

    height: 200,

    justifyContent: "center",

    alignItems: "center",

  },

  // Vídeo da Luna
  video: {

    width: 240,

    height: 240,

    borderRadius: 250,
  },

  /* CHAT */

  // Área do chat
  chatContainer: {

    flex: 1,

    width: "100%",
    height: "50%",
  },

  // Conteúdo do chat
  chatContent: {

    flexGrow: 1,

    justifyContent: "flex-end",

    paddingHorizontal: 20,

    paddingTop: 20,

    paddingBottom: 100,
  },

  // Wrapper das mensagens
  messageWrapper: {

    marginBottom: 15,

    flexDirection: "row",
  },

  // Mensagem da Luna
  lunaWrapper: {

    justifyContent: "flex-start",
  },

  // Mensagem do usuário
  userWrapper: {

    justifyContent: "flex-end",
  },

  // Caixa das mensagens
  messageBubble: {

    maxWidth: "100%",

    paddingHorizontal: 20,

    paddingVertical: 20,

    borderRadius: 25,
  },

  // Caixa da Luna
  lunaBubble: {

    backgroundColor:
      "rgba(148, 69, 255, 0.20)",
  },

  // Caixa do usuário
  userBubble: {

    backgroundColor: "#8F45FF",
  },

  // Texto da mensagem
  messageText: {

    fontSize: 15,

    lineHeight: 22,
  },

  // Texto da Luna
  lunaText: {

    color: "#000000",
  },

  // Texto do usuário
  userText: {

    color: "#FFFFFF",
  },

  /* DIGITANDO */

  // Bubble digitando
  typingBubble: {

    width: 70,

    height: 100,

    borderRadius: 15,

    backgroundColor:
      "rgba(255, 255, 255, 0.2)",

    justifyContent: "center",

    alignItems: "center",
  },

  /* INPUT */

  // Área do input
  inputArea: {


    bottom: 100,

    width: "100%",

    paddingHorizontal: 15,

    paddingBottom:
      Platform.OS === "ios"
        ? 20
        : 0,
  },

  // Caixa do input
  inputContainer: {

    flexDirection: "row",

    alignItems: "center",

    backgroundColor:
      "#8f45ffaf",

    borderRadius: 25,

    paddingLeft: 20,

    paddingRight: 8,

    paddingVertical: 8,
  },

  // Campo de texto
  input: {

    flex: 1,

    color: "#ffffff",

    fontSize: 16,
  },

  // Botão enviar
  sendButton: {

    width: 48,

    height: 48,

    borderRadius: 50,

    backgroundColor: "#ffffff",

    justifyContent: "center",

    alignItems: "center",
  },

  // Texto do botão
  sendText: {

    color: "#000000",

    fontSize: 22,

    marginLeft: 2,
  },

});