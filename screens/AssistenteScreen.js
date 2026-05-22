import React, { useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";

import { Video } from "expo-av";

import LoadingScreen from "./LoadingScreen";

import { askLuna } from "../services/gemini";

export default function LunaScreen() {

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  const scrollViewRef = useRef(null);

  const getGreeting = () => {

    const hour = new Date().getHours();

    if (hour < 12) {
      return "Bom dia";
    }

    if (hour < 18) {
      return "Boa tarde";
    }

    return "Boa noite";
  };

  const userName = "Crystyan";

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "luna",
      text:
        `${getGreeting()}, ${userName} 💜\n\n` +
        `Eu sou a Luna, sua assistente financeira.\n` +
        `Estou pronta para ajudar você a controlar seus gastos, metas e investimentos.`,
    },
  ]);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);

  }, []);

  const scrollToBottom = () => {

    setTimeout(() => {

      scrollViewRef.current?.scrollToEnd({
        animated: true,
      });

    }, 100);
  };

    const sendMessage = async () => {

      if (isTyping) {
        return;
      }

      if (message.trim() === "") {
        return;
      }

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");

    scrollToBottom();

    setIsTyping(true);

    try {

      const response = await askLuna(currentMessage);

      const lunaMessage = {
        id: Date.now() + 1,
        sender: "luna",
        text: response,
      };

      setMessages((prev) => [...prev, lunaMessage]);

      scrollToBottom();

    } catch (error) {

      console.log(error);

    } finally {

      setIsTyping(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >

      <StatusBar
        barStyle="light-content"
        backgroundColor="#13061F"
      />

      {/* LUNA */}
      <View style={styles.lunaContainer}>

        <View style={styles.glow} />

        <Video
          source={require("../assets/lunaIA.mp4")}
          style={styles.video}
          resizeMode="contain"
          shouldPlay
          isLooping
          rate={1.5}
          volume={0}
          useNativeControls={false}
        />

      </View>

      {/* CHAT */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >

        {messages.map((item) => (

          <View
            key={item.id}
            style={[
              styles.messageWrapper,
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

        {isTyping && (

          <View style={styles.lunaWrapper}>

            <View style={styles.typingBubble}>

              <ActivityIndicator size="small" color="#C89BFF" />

            </View>

          </View>

        )}

      </ScrollView>

      {/* INPUT */}
      <View style={styles.inputArea}>

        <View style={styles.inputContainer}>

          <TextInput
            placeholder="Converse com a Luna..."
            placeholderTextColor="#9A7CC9"
            style={styles.input}
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
          >

            <Text style={styles.sendText}>
              ✈
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#13061F",
  },

  /* LUNA */

  lunaContainer: {
    width: "100%",
    height: 260,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 40,
  },

  glow: {
    position: "absolute",

    width: 230,
    height: 230,

    borderRadius: 200,

    backgroundColor: "rgba(153, 0, 255, 0.25)",

    shadowColor: "#B266FF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 40,

    elevation: 20,
  },

  video: {
    width: 270,
    height: 270,
  },

  /* CHAT */

  chatContainer: {
    flex: 1,
  },

  chatContent: {
    paddingHorizontal: 20,
    paddingBottom: 130,
  },

  messageWrapper: {
    marginBottom: 18,
    flexDirection: "row",
  },

  lunaWrapper: {
    justifyContent: "flex-start",
  },

  userWrapper: {
    justifyContent: "flex-end",
  },

  messageBubble: {
    maxWidth: "82%",

    paddingHorizontal: 18,
    paddingVertical: 15,

    borderRadius: 24,
  },

  lunaBubble: {
    backgroundColor: "rgba(148, 69, 255, 0.22)",

    borderWidth: 1,
    borderColor: "rgba(196, 155, 255, 0.18)",
  },

  userBubble: {
    backgroundColor: "#8F45FF",
  },

  messageText: {
    fontSize: 16,
    lineHeight: 25,
  },

  lunaText: {
    color: "#F3E8FF",
  },

  userText: {
    color: "#FFFFFF",
  },

  /* TYPING */

  typingBubble: {

    width: 70,
    height: 50,

    borderRadius: 20,

    backgroundColor: "rgba(148, 69, 255, 0.22)",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "rgba(196, 155, 255, 0.18)",
  },

  /* INPUT */

  inputArea: {
    position: "absolute",
    bottom: 35,

    width: "100%",

    paddingHorizontal: 20,
  },

  inputContainer: {

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "rgba(255,255,255,0.08)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    borderRadius: 25,

    paddingLeft: 20,
    paddingRight: 8,
    paddingVertical: 8,

    shadowColor: "#9F5FFF",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,

    elevation: 10,
  },

  input: {
    flex: 1,

    color: "#FFFFFF",

    fontSize: 16,
  },

  sendButton: {

    width: 48,
    height: 48,

    borderRadius: 50,

    backgroundColor: "#9A4DFF",

    justifyContent: "center",
    alignItems: "center",
  },

  sendText: {
    color: "#FFFFFF",
    fontSize: 22,
    marginLeft: 2,
  },

});