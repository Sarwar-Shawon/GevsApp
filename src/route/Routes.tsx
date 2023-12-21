/*
 * @copyRight by md sarwar hoshen.
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import all app routes
import AuthRoutes from './AuthRoutes';
import VoterRoutes from './VoterRoutes';
import EcoRoutes from './EcoRoutes';
//
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const scheme = useColorScheme();
  //
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName="Voter"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={AuthRoutes} />
        <Stack.Screen name="Voter" component={VoterRoutes} />
        <Stack.Screen name="Eco" component={EcoRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
