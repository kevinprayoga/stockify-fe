import React from 'react';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
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
import { AuthProvider } from './src/context/AuthContext';

const tokenCache = {
  getToken(key) {
    return SecureStore.getItemAsync(key);
  },
  saveToken(key, value) {
    return SecureStore.setItemAsync(key, value);
  },
};

const Stack = createNativeStackNavigator();

function SignedInNavigator() {
  return (
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
        name="TabHome"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BusinessInfo"
        component={BusinessInfo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function SignedOutNavigator() {
  return (
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Landing2"
        component={Landing2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <SignedIn>
          <NavigationContainer>
            <SignedInNavigator />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <NavigationContainer>
            <SignedOutNavigator />
          </NavigationContainer>
        </SignedOut>
      </ClerkProvider>
    </AuthProvider>
  );
}
