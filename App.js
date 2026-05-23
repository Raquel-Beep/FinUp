import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastroScreen from "./screens/CadastroScreen";
import AssistenteScreen from "./screens/AssistenteScreen";
import DespesasScreen from "./screens/DespesasScreen";
import InvestimentosScreen from "./screens/InvestimentosScreen";
import ProScreen from "./screens/ProScreen";
import MovimentacaoScreen from "./screens/MovimentacaoScreen";

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="HomeInicial">

        <Stack.Screen
          name="HomeInicial"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
        />

        <Stack.Screen
          name="Assistente"
          component={AssistenteScreen}
        />

        <Stack.Screen
          name="Despesas"
          component={DespesasScreen}
        />

        <Stack.Screen
          name="Investimentos"
          component={InvestimentosScreen}
        />

        <Stack.Screen
          name="Premium"
          component={ProScreen}
        />

        <Stack.Screen
          name="Home"
          component={MovimentacaoScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );
}