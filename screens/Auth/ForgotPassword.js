import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert ,Image} from "react-native";
import axios from "axios";
import GlobalStyles from "../styles/GlobalStyles";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    try {
      const response = await axios.post(
        `http://192.168.0.184:8002/api/password-reset`,
        { email }
      );
      Alert.alert("Success", "A password reset link has been sent to your email.");
      navigation.navigate("Login"); // Redirect to Login after successful request
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.titleContainer}>
        {/* <Text style={{ fontSize: 24, fontWeight: "bold", color: "#008080" }}>
          Forgot Password
        </Text> */}
         <Image
          source={require("./assets/icon.png")} // Replace with your logo path
          style={{ width: 100, height: 100 }} // Adjust the size as needed
        />
      </View>

      <TextInput
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
        style={GlobalStyles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={GlobalStyles.buttonWrapper}>
        <TouchableOpacity onPress={handleResetPassword} style={GlobalStyles.button}>
          <Text style={GlobalStyles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={GlobalStyles.linkWrapper}
        >
          <Text style={{ textAlign: "center", color: "#008080" }}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
