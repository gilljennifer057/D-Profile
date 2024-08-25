// screens/LoginScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyles from "../styles/GlobalStyles";

const LoginScreen = ({ navigation }) => {
  // parter login
  // 0554501483
  // 87654321

  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.navigate("Home");
      }
    };

    checkToken();
  }, []);

  const handleLogin = async () => {
    try {
      let payload = {
        number,
        password,
      };
      const { data } = await axios.post(
        `http://192.168.0.184:8002/api/login`,
        payload
      );

      if (data) {
        // Handle successful login (e.g., navigate to another screen, store token)
        await AsyncStorage.setItem("token", data);

        setError("");

        getUserData(data);
      } else {
        setError("Login failed");
      }
    } catch (e) {
      setError(e.response.data || "error occured");
    }
  };

  const getUserData = async (token) => {
    try {
      const { data: user } = await axios.get(
        "http://192.168.0.184:8002/api/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await AsyncStorage.setItem("user", JSON.stringify(user));

      navigation.navigate("Home"); // Example navigation
    } catch (error) {
      console.error("Error fetching diary entries:", error);
      Alert.alert("Error", "Failed to fetch diary entries");
    }
  };

  const handleRegisterAsPartner = () => {
    navigation.navigate("RegisterAsPartner"); // Example navigation
  };

  const handleRegisterAsClient = () => {
    navigation.navigate("RegisterAsClient"); // Example navigation
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.titleContainer}>
        {/* <Text style={GlobalStyles.titleText}>Login</Text> */}
        <Image
          source={require("./assets/icon.png")} // Replace with your logo path
          style={{ width: 100, height: 100 }} // Adjust the size as needed
        />
      </View>
      <TextInput
        name="my_number"
        id="my_number"
        placeholder="Number"
        value={number}
        onChangeText={(text) => setNumber(text)}
        style={[GlobalStyles.input]}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={[GlobalStyles.input]}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("ForgotPassword")}
        style={GlobalStyles.linkWrapper}
      >
        <Text style={{ textAlign: "right", margin: 15 }}>Forgot Password?</Text>
      </TouchableOpacity>
      {error ? <Text style={GlobalStyles.error}>{error}</Text> : null}
      <TouchableOpacity style={GlobalStyles.button} onPress={handleLogin}>
        <Text style={GlobalStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={GlobalStyles.button}
        onPress={handleRegisterAsPartner}
      >
        <Text style={GlobalStyles.buttonText}>Register As Partner</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={GlobalStyles.button}
        onPress={handleRegisterAsClient}
      >
        <Text style={GlobalStyles.buttonText}>Register As Client</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("JobSearchScreen")}
        style={GlobalStyles.linkWrapper}
      >
        <Text style={{ textAlign: "right", margin: 15 }}>
          job search screen
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
