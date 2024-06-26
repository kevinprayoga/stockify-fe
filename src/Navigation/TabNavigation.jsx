import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, View, Text } from 'react-native';
import { Entypo, Feather, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

import Home from "../Tab/Home";
import StockNavigation from "./StockNavigation";
import ProfileNavigation from "./ProfileNavigation";
import HistoryNavigation from "./HistoryNavigation";
import CartNavigation from './CartNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#5A4DF3" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#5A4DF3",
          tabBarInactiveTintColor: "#FFFFFF",
          tabBarStyle: { 
            backgroundColor: "#5A4DF3", 
            borderTopLeftRadius: 20, 
            borderTopRightRadius: 20,
            paddingHorizontal: 10,
            height: 80,
            display: '',
          },
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <View style={focused ? styles.focusedTab : styles.defaultTab}>
                <MaterialCommunityIcons name="home-analytics" size={size} color={focused ? "#5A4DF3" : "#FFFFFF"} />
                {focused && <Text style={styles.focusedText}>Home</Text>}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="StockNavigation"
          component={StockNavigation}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <View style={focused ? styles.focusedTab : styles.defaultTab}>
                <Feather name="box" size={size} color={focused ? "#5A4DF3" : "#FFFFFF"} />
                {focused && <Text style={styles.focusedText}>Stock</Text>}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="CartNavigation"
          component={CartNavigation}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <View style={focused ? styles.focusedTab : styles.defaultTab}>
                <Entypo name="shopping-bag" size={size} color={focused ? "#5A4DF3" : "#FFFFFF"} />
                {focused && <Text style={styles.focusedText}>Cart</Text>}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="HistoryNavigation"
          component={HistoryNavigation}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <View style={focused ? styles.focusedTab : styles.defaultTab}>
                <FontAwesome5 name="clipboard-list" size={size} color={focused ? "#5A4DF3" : "#FFFFFF"} />
                {focused && <Text style={styles.focusedText}>History</Text>}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="ProfileNavigation"
          component={ProfileNavigation}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <View style={focused ? styles.focusedTab : styles.defaultTab}>
                <Ionicons name="person-circle-outline" size={size} color={focused ? "#5A4DF3" : "#FFFFFF"} />
                {focused && <Text style={styles.focusedText}>Profile</Text>}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = {
  focusedTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    height: 44,
  },
  defaultTab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    marginTop: 10,
  },
  focusedText: {
    color: '#5A4DF3',
    fontSize: 11,
    marginLeft: 5,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
};
