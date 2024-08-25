import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DiaryScreen from './screens/DiaryScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen'
import { Provider as PaperProvider } from 'react-native-paper';
import Data from './screens/Data'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        {/* <Stack.Screen name="Data" component={Data} /> */}
            {/* <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
          // <Stack.Screen name="Home" component={HomeScreen} /> */}
          {/* <Stack.Screen name="Diary" component={DiaryScreen} /> */}
          <Stack.Screen name="Home" component={HomeScreen} />        
        
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
