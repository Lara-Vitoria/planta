import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import PagInicial from './src/components/PagInicial';
import Login from './src/components/Login';
import Cadastro from './src/components/Cadastro';
import ListagemPlantas from './src/components/ListagemPlantas';
import CadastroPlantas from './src/components/CadastroPlantas';
import Planta from './src/components/Planta';
import OpcoesAdmin from './src/components/OpcoesAdmin';
import ListagemUsuarios from './src/components/ListagemUsuarios';

const Stack = createStackNavigator();

function NavegacaoStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="PagInicial"
        component={PagInicial}
        options={{ headerShown: false }} />


      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="ListagemPlantas"
        component={ListagemPlantas}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="CadastroPlantas"
        component={CadastroPlantas}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="Planta"
        component={Planta}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="OpcoesAdmin"
        component={OpcoesAdmin}
        options={{ headerShown: false }} />

      <Stack.Screen
        name="ListagemUsuarios"
        component={ListagemUsuarios}
        options={{ headerShown: false }} />
    </Stack.Navigator>

  );
}
export default function App() {
  return (
    <NavigationContainer>
      <NavegacaoStack />
    </NavigationContainer>

  );
}