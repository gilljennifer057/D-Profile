import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  PanResponder,
  Animated,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    user_type: "partner",
  });

  const [focusedInput, setFocusedInput] = useState(null);
  const [errorResponse, setErrorResponse] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {},
    })
  ).current;

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, number, password, password_confirmation, profession } =
      formData;

    if (
      !name ||
      !number ||
      !password ||
      !password_confirmation ||
      !profession
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return false;
    }

    if (password !== password_confirmation) {
      Alert.alert("Error", "Passwords do not match.");
      return false;
    }

    if (number.length < 11) {
      Alert.alert("Error", "Please enter a valid phone number.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    // if (!validateForm()) return;

    try {
      const { data } = await axios.post(
        "http://192.168.0.184:8002/api/user",
        formData
      );
      console.log("Success", "Partner registered successfully.");
      navigation.navigate("Login");
    } catch (err) {
      setErrorResponse(err.response.data.message);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      Alert.alert("Permission Denied", "Permission to access gallery is required!");
      return;
    }

    let imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!imageResult.canceled) {
      const imageUri = imageResult.assets[0].uri;
      setProfileImage(imageUri);
      await AsyncStorage.setItem("profileImage", imageUri); // Save to AsyncStorage
    }
  };

  useEffect(() => {
    const loadProfileImage = async () => {
      const savedImageUri = await AsyncStorage.getItem("profileImage");
      if (savedImageUri) {
        setProfileImage(savedImageUri);
      }
    };

    loadProfileImage();
  }, []);

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
      {/* <TouchableOpacity onPress={pickImage} style={{ alignItems: "", marginBottom: 20 }}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        ) : (
          <Text style={{ color: "#008080", marginTop: 10 }}>Upload Profile Picture</Text>
        )}
      </TouchableOpacity> */}
      <Text style={{ textAlign: "center", color: "red" ,margin:10}}>
        {errorResponse}
      </Text>

      <View style={GlobalStyles.buttonWrapper}>
        <TouchableOpacity onPress={handleSubmit} style={GlobalStyles.button}>
          <Text style={GlobalStyles.buttonText}>Register As Partner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={GlobalStyles.linkWrapper}
        >
          <Text style={{ textAlign: "center" }}>
            Already Registered?{" "}
            <Text style={{ fontWeight: "bold", color: "#008080" }}>
              Click here
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegistrationScreen;
