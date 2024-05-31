import React from 'react';

import Home from "../Tab/Home";
import Stock from "../Tab/Stock";
import Cart from "../Tab/Cart";
import History from "../Tab/History";
import Profile from "../Tab/Profile";
import AddProduct from "../Tab/AddProduct";
import EditProduct from "../Tab/EditProduct";
import HistoryDetail from '../Tab/HistoryDetail';
import Order from "../Tab/Order";

import { View, Text } from 'react-native';
import { Entypo, Feather, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
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

