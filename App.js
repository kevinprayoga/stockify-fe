import Landing1 from "./src/LandingPage/Landing1";
import Landing2 from "./src/LandingPage/Landing2";
import History from "./src/Tab/History";
import HistoryDetail from "./src/Tab/HistoryDetail";
import Order from "./src/Tab/Order";
import OrderCompleted from "./src/Tab/OrderCompleted";
import Cart from "./src/Tab/Cart";
import Login from "./src/LandingPage/Login";
import Register from "./src/LandingPage/Register";
import HelpSupport from "./src/Tab/HelpSupport";

import { config, closeConfig } from "./hooks/animation";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
        headerMode="float"
        animation="fade"
      >
        <Stack.Screen
          name="Landing1"
          component={Landing1} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Landing2"
          component={Landing2} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login} 
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
