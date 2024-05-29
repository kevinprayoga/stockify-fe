import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "../Tab/Home";
import Stock from "../Tab/Stock";
import Cart from "../Tab/Cart";
import History from "../Tab/History";
import Profile from "../Tab/Profile";

import { View, Text } from 'react-native';
import { Entypo, Feather, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5A4DF3",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarStyle: { 
          backgroundColor: "#5A4DF3", 
          height: 70, 
          borderTopLeftRadius: 20, 
          borderTopRightRadius: 20,
          paddingHorizontal: 10,
          height: 80,
        },
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
        name="Stock"
        component={Stock}
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
        name="Cart"
        component={Cart}
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
        name="History"
        component={History}
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
        name="Profile"
        component={Profile}
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
    marginTop: 20,
    height: 44,
  },
  defaultTab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    marginTop: 20,
  },
  focusedText: {
    color: '#5A4DF3',
    fontSize: 11,
    marginLeft: 5,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
};
