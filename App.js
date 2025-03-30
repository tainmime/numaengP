import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from './src/screen/HomeScreen';
import CalendarScreen from "./src/screen/calenda";
import RegisterScreen from "./src/screen/RegisterScreen";
import RegisPhone from "./src/screen/RegisPhone";
import LoginSceen from "./src/screen/LoginSceen";
import ProfileScreen from "./src/screen/ProfileScreen";
import TodoScreen from "./src/screen/TodoScreen";
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {


  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="calenda" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="RegisPhone" component={RegisPhone} options={{ headerShown: true }}/>
          <Stack.Screen name="Login" component={LoginSceen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="todolist" component={TodoScreen} />
          <Stack.Screen name="BottomTabs" component={BottomTabNavigator} options={{ headerShown: false}} />
          <Stack.Screen name="calenda" component={CalendarScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// Bottom Tab Navigator
function BottomTabNavigator() {


  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: '#D10000',
        tabBarInactiveTintColor:'#D10000',
        tabBarStyle: {
          backgroundColor:'#fff',
        },
      }}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="game-controller" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
