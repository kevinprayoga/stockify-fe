import React from 'react';

import Home from "../Tab/Home";
import Stock from "../Tab/Stock";
import Cart from "../Tab/Cart";
import History from "../Tab/History";
import Profile from "../Tab/Profile";
import AddProduct from "../Tab/AddProduct";
import EditProduct from "../Tab/EditProduct";
import HistoryDetail from '../Tab/HistoryDetail';

import { View, Text } from 'react-native';
import { Entypo, Feather, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
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
        name="History"
        component={History}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HistoryDetail"
        component={HistoryDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
