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
import { AuthProvider } from './src/context/AuthContext';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './src/context/AuthContext';

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
  const { origin } = useAuth();
  const nav = useNavigation();
  useEffect(() => {
    if (origin === 'register') {
      nav.navigate('BusinessInfo');
    }
  }, [origin]);
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

const GetClerkToken = () => {
  const { session } = useSession();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (session) {
        const token = await session.getToken();
        console.log('Clerk JWT:', token);
        setToken(token);
      }
    };

    fetchToken();
  }, [session]);

  return (
    <View>
      {/* {token ? (
        <Text>Your Clerk token: {token}</Text>
      ) : (
        <Text>Loading token...</Text>
      )} */}
    </View>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <SignedIn>
          <NavigationContainer>
            <SignedInNavigator />
            <GetClerkToken />
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
