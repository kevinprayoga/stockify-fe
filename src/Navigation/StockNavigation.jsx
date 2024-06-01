import React from 'react';
import Stock from "../Tab/Stock";
import AddProduct from "../Tab/AddProduct";
import EditProduct from "../Tab/EditProduct";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { config, closeConfig } from "../../hooks/animation";

const Stack = createNativeStackNavigator();

export default function StockNavigation() {
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
        name="Stock"
        component={Stock}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

