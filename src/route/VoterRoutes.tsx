/*
 * @copyRight by md sarwar hoshen.
 */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/voter';
const Stack = createNativeStackNavigator();

function VoterRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="VoterHome" component={Home} />
    </Stack.Navigator>
  );
}

export default VoterRoutes;
