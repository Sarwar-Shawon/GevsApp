/*
 * @copyRight by md sarwar hoshen.
 */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn, SignUp} from '../screens/auth';
const Stack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default AuthRoutes;
