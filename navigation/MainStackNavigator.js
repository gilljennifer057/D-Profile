import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterAsPartner from "../screens/Auth/RegisterAsPartner";
import RegisterAsClient from "../screens/Auth/RegisterAsClient";
import HomeScreen from "../screens/HomeScreen"; // Assuming HomeScreen is already created
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import JobSearchScreen from "../screens/Auth/JobSearchScreen";
import Notification from "../screens/Auth/Notification";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator setup
const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
     <Drawer.Screen
      name="Notification"
      component={Notification}
      options={{ headerShown: false }}
    />
    {/* Add more drawer items here if needed */}
  </Drawer.Navigator>
);

const MainStackNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Login"}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterAsPartner"
          component={RegisterAsPartner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterAsClient"
          component={RegisterAsClient}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={DrawerNavigator} // Replace HomeScreen with DrawerNavigator
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="JobSearchScreen"
          component={JobSearchScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
