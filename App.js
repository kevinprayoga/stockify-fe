import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { NavigationContainer, useNavigation, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing1 from "./src/LandingPage/Landing1";
import Landing2 from "./src/LandingPage/Landing2";
import Login from "./src/LandingPage/Login";
import Register from "./src/LandingPage/Register";
import TabNavigation from "./src/Navigation/TabNavigation";
import BusinessInfo from "./src/LandingPage/BusinessInfo";
import { config, closeConfig } from "./hooks/animation";
import useStore from './src/context/store';

const Stack = createNativeStackNavigator();

async function fetchBusinessId(userId) {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/business/${userId}`);

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
  // const { user } = useAuth();
  const userId = useStore(state => state.userId);
  const businessId = useStore(state => state.businessId);
  const [busId, setBusId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigation();

  useFocusEffect(
    useCallback(() => {
      async function getBusinessId() {
        if (userId) {
          setIsLoading(true);
          const id = await fetchBusinessId(userId);
          setBusId(id);
          setIsLoading(false);
        }
      }
      getBusinessId();
    }, [userId, busId, businessId])
  );

  useEffect(() => {
    if (!isLoading) {
      if (busId === null) {
        nav.navigate('BusinessInfo');
      } else {
        nav.navigate('TabHome');
      }
    }
  }, [busId, isLoading]);

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
      {busId ? (
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

export default function App() {
  const userId = useStore(state => state.userId);

  useEffect(() => {
    console.log('user:', userId);
  }, [userId]);

  return (
    // <AuthProvider>
      <NavigationContainer>
        {userId ? <SignedInNavigator /> : <SignedOutNavigator />}
      </NavigationContainer>
    // </AuthProvider>
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
