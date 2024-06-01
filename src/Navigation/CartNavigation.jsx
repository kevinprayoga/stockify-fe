import React from 'react';
import Cart from "../Tab/Cart";
import Order from "../Tab/Order";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { config, closeConfig } from "../../hooks/animation";


const Stack = createNativeStackNavigator();

export default function CartNavigation() {
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
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

