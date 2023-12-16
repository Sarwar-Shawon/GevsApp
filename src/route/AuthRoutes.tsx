/*
 * @copyRight by md sarwar hoshen.
 */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SignIn, SignUp, ForgotPassword} from '../screens/auth';
//AuthStackParamType
export type AuthStackParamType = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};
//StackAuthProps
export type StackAuthProps = NativeStackScreenProps<
  AuthStackParamType,
  'SignIn' | 'SignUp' | 'ForgotPassword'
>;
//StackAuth
const StackAuth = createNativeStackNavigator<AuthStackParamType>();
//AuthRoutes
function AuthRoutes() {
  return (
    <StackAuth.Navigator
      initialRouteName="SignUp"
      screenOptions={{headerShown: false}}>
      <StackAuth.Screen name="SignIn" component={SignIn} />
      <StackAuth.Screen name="SignUp" component={SignUp} />
      <StackAuth.Screen name="ForgotPassword" component={ForgotPassword} />
    </StackAuth.Navigator>
  );
}
//
export default AuthRoutes;
