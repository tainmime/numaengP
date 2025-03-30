import "react-native-gesture-handler";
import React from "react";
import { View, Text, Button, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './src/screen/HomeScreen';
import CalendarScreen from "./src/screen/calenda";
import RegisterScreen from "./src/screen/RegisterScreen";
import RegisPhone from "./src/screen/RegisPhone";

const Stack = createStackNavigator();

export default function App() {
  return (
<<<<<<< HEAD
    <NavigationContainer>
      <Stack.Navigator initialRouteName="calenda">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="calenda" component={CalendarScreen} options={{headerShown:false}}/>
      </Stack.Navigator> 
    </NavigationContainer>
=======
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="calenda" component={CalendarScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="RegisPhone" component={RegisPhone} options={{ headerShown: true }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
>>>>>>> 5c91c1b1ba3e0d06f00b54b9ecc3b02ec509144c
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
