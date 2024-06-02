import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { ClerkProvider, SignedIn, SignedOut, useSession, useUser } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";
import { NavigationContainer, useNavigation, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Landing1 from "./src/LandingPage/Landing1";
import Landing2 from "./src/LandingPage/Landing2";
import Login from "./src/LandingPage/Login";
import Register from "./src/LandingPage/Register";
import TabNavigation from "./src/Navigation/TabNavigation";
import BusinessInfo from "./src/LandingPage/BusinessInfo";

import { config, closeConfig } from "./hooks/animation";
import { AuthProvider, useAuth } from './src/context/AuthContext';

const tokenCache = {
  getToken(key) {
    return SecureStore.getItemAsync(key);
  },
  saveToken(key, value) {
    return SecureStore.setItemAsync(key, value);
  },
};

const Stack = createNativeStackNavigator();

async function fetchBusinessId(session, user) {
  try {
    const token = await session.getToken();
    const response = await fetch(`${process.env.API_URL}:${process.env.PORT}/business/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data bisnis");
    }

    const result = await response.json();
    return result.data[0].businessId;
  } catch (error) {
    console.error("Error fetching business info", error);
    return null;
  }
}

function SignedInNavigator() {
  const { origin, setOrigin } = useAuth();
  const { session } = useSession();
  const { user } = useUser();
  const [businessId, setBusinessId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigation();

  useFocusEffect(
    useCallback(() => {
      async function getBusinessId() {
        setIsLoading(true);
        const id = await fetchBusinessId(session, user);
        setBusinessId(id);
        setIsLoading(false);
      }

      getBusinessId();
    }, [session, user])
  );

  useFocusEffect(
    useCallback(() => {
      if (isLoading) return;
      if (businessId === null) {
        setOrigin('register');
        nav.navigate('BusinessInfo');
      } else {
        setOrigin('login');
        nav.navigate('TabHome');
      }
    }, [origin, businessId, isLoading, nav, setOrigin])
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

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
      {businessId ? (
        <Stack.Screen
          name="TabHome"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="BusinessInfo"
          component={BusinessInfo}
          options={{ headerShown: false }}
        />
      )}
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
            {/* <GetClerkToken /> */}
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    textAlign: 'center',
  },
});
