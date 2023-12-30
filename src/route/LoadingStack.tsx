/*
 * @copyRight by md sarwar hoshen.
 */
import {
  ActivityIndicator,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from '../utils';
//StackLoader
const StackLoader = createNativeStackNavigator();
//
function LoadingStack() {
  return (
    <StackLoader.Navigator
      initialRouteName="Loader"
      screenOptions={{headerShown: false}}>
      <StackLoader.Screen name={'Loader'} component={AppLoader} />
    </StackLoader.Navigator>
  );
}
//
function AppLoader() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.background,
      }}>
      <ActivityIndicator color={Colors.primary} size="large" />
    </View>
  );
}
//
export default LoadingStack;
