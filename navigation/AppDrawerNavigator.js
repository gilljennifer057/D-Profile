import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";

// import ProfileScreen from "../screens/ProfileScreen"; // Example additional screen
import LoginScreen from "../screens/Auth/LoginScreen";

const Drawer = createDrawerNavigator();

const AppDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Diary" component={LoginScreen} />
      {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
      {/* Add more screens as needed */}
    </Drawer.Navigator>
  );
};

export default AppDrawerNavigator;
