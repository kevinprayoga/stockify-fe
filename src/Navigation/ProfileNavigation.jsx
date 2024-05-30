import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AboutApp from "../Tab/AboutApp";
import HelpSupport from "../Tab/HelpSupport";
import MyAccount from "../Tab/MyAccount";

import { View, Text } from 'react-native';
import { Entypo, Feather, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { config, closeConfig } from "../../hooks/animation";
import Profile from '../Tab/Profile';

const Stack = createNativeStackNavigator();

export default function ProfileNavigation() {
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
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AboutApp"
        component={AboutApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HelpSupport"
        component={HelpSupport}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

