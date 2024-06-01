import React from 'react';
import History from "../Tab/History";
import HistoryDetail from '../Tab/HistoryDetail';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { config, closeConfig } from "../../hooks/animation";

const Stack = createNativeStackNavigator();

export default function HistoryNavigation() {
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

