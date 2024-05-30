import React, { useState, useEffect } from 'react';
import { ClerkProvider, SignedIn, SignedOut, useSession } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Landing1 from "./src/LandingPage/Landing1";
import Landing2 from "./src/LandingPage/Landing2";
import Login from "./src/LandingPage/Login";
import Register from "./src/LandingPage/Register";
import TabNavigation from "./src/Navigation/TabNavigation";
import BusinessInfo from "./src/LandingPage/BusinessInfo";

import { config, closeConfig } from "./hooks/animation";
import MyAccount from "./src/Tab/MyAccount";

export default function App() {
  const Stack = createNativeStackNavigator();

function SignedInNavigator() {
  const { origin } = useAuth();
  const nav = useNavigation();
  useEffect(() => {
    if (origin === 'register') {
      nav.navigate('BusinessInfo');
    }
  }, [origin]);
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
