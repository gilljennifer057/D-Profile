import React, { useState } from "react";
import { View, TextInput, StyleSheet, ScrollView, Text, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import axios from "axios";

const RegistrationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    password: "",
    password_confirmation: "",
    profession: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("Form Data:", formData);

    try {
      const { data } = await axios.post(
        `http://192.168.0.184:8002/api/user`,
        formData
      );

      navigation.navigate("Login");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground 
        source={require('./assets/BG.ptng')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.formContainer}>
          <Text style={styles.title}>Register</Text>
          <TextInput
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Number"
            value={formData.number}
            onChangeText={(text) => handleChange("number", text)}
            style={styles.input}
            keyboardType="phone-pad"
          />
          <TextInput
            placeholder="Profession"
            value={formData.profession}
            onChangeText={(text) => handleChange("profession", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChangeText={(text) => handleChange("password_confirmation", text)}
            style={styles.input}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: height,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  
  },
  formContainer: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "royalblue",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "royalblue",
    marginBottom: 16,
    width: "80%",
  },
  button: {
    backgroundColor: "",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    width: "80%",
  },
  buttonText: {
    color: "royalblue",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegistrationScreen;
