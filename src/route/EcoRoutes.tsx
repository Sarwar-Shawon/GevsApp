/*
 * @copyRight by md sarwar hoshen.
 */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/eco';
const Stack = createNativeStackNavigator();

function EcoRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EcoHome" component={Home} />
    </Stack.Navigator>
  );
}

export default EcoRoutes;
