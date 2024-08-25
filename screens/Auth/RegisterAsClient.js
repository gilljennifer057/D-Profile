import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  PanResponder,
  Animated,
  Image, // Import Image component
} from "react-native";
import axios from "axios";
import GlobalStyles from "../styles/GlobalStyles";

const RegistrationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    password: "",
    password_confirmation: "",
    profession: "",
    description: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    facebook: "",
    user_type: "client",
  });

  const [focusedInput, setFocusedInput] = useState(null); // Track focused input

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        // Optional: Add functionality when releasing the drag
      },
    })
  ).current;

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
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.titleContainer}>
      <Image
          source={require("./assets/icon.png")} // Replace with your logo path
          style={{ width: 100, height: 100 }} // Adjust the size as needed
        />
      </View>

      <TextInput
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
        onFocus={() => setFocusedInput("name")}
        onBlur={() => setFocusedInput(null)}
        style={[
          GlobalStyles.input,
          focusedInput === "name" && GlobalStyles.inputFocused,
        ]}
      />

      <TextInput
        placeholder="Number"
        value={formData.number}
        onChangeText={(text) => handleChange("number", text)}
        onFocus={() => setFocusedInput("number")}
        onBlur={() => setFocusedInput(null)}
        style={[
          GlobalStyles.input,
          focusedInput === "number" && GlobalStyles.inputFocused,
        ]}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Profession"
        value={formData.profession}
        onChangeText={(text) => handleChange("profession", text)}
        onFocus={() => setFocusedInput("profession")}
        onBlur={() => setFocusedInput(null)}
        style={[
          GlobalStyles.input,
          focusedInput === "profession" && GlobalStyles.inputFocused,
        ]}
      />
      <TextInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
        onFocus={() => setFocusedInput("password")}
        onBlur={() => setFocusedInput(null)}
        style={[
          GlobalStyles.input,
          focusedInput === "password" && GlobalStyles.inputFocused,
        ]}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        value={formData.password_confirmation}
        onChangeText={(text) => handleChange("password_confirmation", text)}
        onFocus={() => setFocusedInput("password_confirmation")}
        onBlur={() => setFocusedInput(null)}
        style={[
          GlobalStyles.input,
          focusedInput === "password_confirmation" && GlobalStyles.inputFocused,
        ]}
        secureTextEntry
      />
      
      <View style={GlobalStyles.buttonWrapper}>
        <TouchableOpacity onPress={handleSubmit} style={GlobalStyles.button}>
          <Text style={GlobalStyles.buttonText}>Register As Client</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={GlobalStyles.linkWrapper}
        >
          <Text style={{ textAlign: "center" }}>
            Already Registered? <Text style={{ fontWeight: "bold" , color: "#008080"}}>Click here</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegistrationScreen;
