import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../context/AuthContext";

import Home from "../Tab/Home";
import Stock from "../Tab/Stock";
import Cart from "../Tab/Cart";
import History from "../Tab/History";
import Profile from "../Tab/Profile";

import { View, Text } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const { origin, setOrigin } = useAuth();
  const nav = useNavigation();

  useEffect(() => {
    if (origin === 'register') {
      nav.navigate('BusinessInfo');
      setOrigin(null); 
    }
  }, [origin]);

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
              <Entypo name="home" size={size} color={focused ? "#5A4DF3" : "#FFFFFF"} />
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
              <MaterialIcons name="inventory" size={size} color={focused ? "#5A4DF3" : "#FFFFFF"} />
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
              <MaterialIcons name="shopping-cart" size={size} color={focused ? "#5A4DF3" : "#FFFFFF"} />
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
              <MaterialIcons name="history" size={size} color={focused ? "#5A4DF3" : "#FFFFFF"} />
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
              <MaterialIcons name="person" size={size} color={focused ? "#5A4DF3" : "#FFFFFF"} />
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 30,
    height: 45,
  },
  defaultTab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginTop: 30,
  },
  focusedText: {
    color: '#5A4DF3',
    fontSize: 12,
    marginLeft: 5,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
};
