/*
 * @copyRight by md sarwar hoshen.
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import all app routes
import AuthRoutes from './AuthRoutes';
import VoterRoutes from './VoterRoutes';
import EcoRoutes from './EcoRoutes';
//

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={AuthRoutes} />
        <Stack.Screen name="Voter" component={VoterRoutes} />
        <Stack.Screen name="Eco" component={EcoRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
