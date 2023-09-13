import 'react-native-gesture-handler';
import AuthContextProvider from './utils/auth-Context';
import Index from './components/Index';
import LoginScreen from './components/LoginScreen';
import Home from './components/Home';
import DpUpload from './components/DpUpload';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
      <AuthContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Index' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Index' component={Index} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='DpUpload' component={DpUpload} />
            <Stack.Screen name='Home' component={Home} initialParams={{component: 'Collection'}} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContextProvider>
  );
}

