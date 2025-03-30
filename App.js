import "react-native-gesture-handler";
import React from "react";
import { View, Text, Button, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './src/screen/HomeScreen';
import CalendarScreen from "./src/screen/calenda";
import RegisterScreen from "./src/screen/RegisterScreen";
import RegisPhone from "./src/screen/RegisPhone";
<<<<<<< HEAD
import LoginSceen from "./src/screen/LoginSceen";
import ProfileScreen from "./src/screen/ProfileScreen";
=======
import TodoScreen from "./src/screen/TodoScreen";
>>>>>>> c0f842e0823fc28f5cdcf3cc836fcfc9c35c02a2

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="calenda" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="calenda" component={CalendarScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
<<<<<<< HEAD
          <Stack.Screen name="RegisPhone" component={RegisPhone} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={LoginSceen} options={{ headerShown: false }}/>
          <Stack.Screen name="Profile" component={ProfileScreen}/>
=======
          <Stack.Screen name="RegisPhone" component={RegisPhone} options={{ headerShown: true }}/>
          <Stack.Screen name="todolist" component={TodoScreen} options={{ headerShown: true }}/>
>>>>>>> c0f842e0823fc28f5cdcf3cc836fcfc9c35c02a2
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
