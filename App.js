import Landing1 from "./src/LandingPage/Landing1";
import Landing2 from "./src/LandingPage/Landing2";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { config, closeConfig } from "./hooks/animation";
import MyAccount from "./src/Tab/MyAccount";

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
          name="MyAccount"
          component={MyAccount} 
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
