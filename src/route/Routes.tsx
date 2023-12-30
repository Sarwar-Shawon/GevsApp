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
import {useAuthContext} from '../context';

const Stack = createNativeStackNavigator();
// Auth stack
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthRoutes} />
    </Stack.Navigator>
  );
};
// App Stack
const AppStack = () => {
  const {user_type} = useAuthContext();

  return (
    <Stack.Navigator
      initialRouteName={user_type == 'voter' ? 'Voter' : 'Eco'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Voter" component={VoterRoutes} />
      <Stack.Screen name="Eco" component={EcoRoutes} />
    </Stack.Navigator>
  );
};
//
const AppNavigator = () => {
  const {isAuthenticated} = useAuthContext();

  const scheme = useColorScheme();
  //
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
