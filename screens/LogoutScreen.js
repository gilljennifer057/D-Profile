// screens/HomeScreen.js

import React from "react";
import { TextInput, Button, Text, } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logoutScreen = ({ navigation }) => {
  const handleLogout = async () => {
    // Clear the token from AsyncStorage
    await AsyncStorage.removeItem("token");
    // Navigate to the Login screen
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
      <Text>
        <Button mode="contained" onPress={handleLogout} style={styles.button}>
          Logout
        </Button>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
  },
});

export default logoutScreen;
