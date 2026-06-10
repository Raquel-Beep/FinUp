import 'react-native-reanimated';
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
import PremiumBenefitsScreen from "./screens/PremiumBenefitsScreen";
import CardRegistrationScreen from "./screens/CardRegistrationScreen";
import MovimentacaoScreen from "./screens/MovimentacaoScreen";
import PerfilScreen from "./screens/PerfilScreen";
import PremiumBenefitsScreen from "./screens/PremiumBenefitsScreen";


const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen
          name="Home"
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
          name="Pro"
          component={ProScreen}
        />

        <Stack.Screen
          name="PremiumBenefits"
          component={PremiumBenefitsScreen}
        />

        <Stack.Screen
          name="Home"
          component={MovimentacaoScreen}
        />

        <Stack.Screen
          name="CardRegistration"
          component={CardRegistrationScreen}
          options={{ title: "Registrar Cartão" }}
        />

        <Stack.Screen
          name="Perfil"
          component={PerfilScreen}
        />

        <Stack.Screen
          name="AdicionarDespesa"
          component={AdicionarDespesaScreen}
          options={{ headerShown: false }}
       />

        <Stack.Screen
          name="AdicionarInvestimento"
          component={AdicionarInvestimentoScreen}
          options={{ headerShown: false }}
      />

      </Stack.Navigator>

    </NavigationContainer>

  );
}