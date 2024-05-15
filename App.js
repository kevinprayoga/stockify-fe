import Landing1 from "./src/LandingPage/Landing1";
import Landing2 from "./src/LandingPage/Landing2";
import Order from "./src/Tab/Order";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { config, closeConfig } from "./hooks/animation";

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
        {/* <Stack.Screen
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
        /> */}
        <Stack.Screen
          name="Order"
          component={Order} 
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
