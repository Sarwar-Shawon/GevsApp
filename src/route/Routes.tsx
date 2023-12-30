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
// Voter stack
const VoterStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Voter" component={VoterRoutes} />
    </Stack.Navigator>
  );
};
// Eco stack
const EcoStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Eco" component={EcoRoutes} />
    </Stack.Navigator>
  );
};
// App Stack
const AppStack = () => {
  const {user_type} = useAuthContext();
  return user_type == 'voter' ? <VoterStack /> : <EcoStack />;
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
