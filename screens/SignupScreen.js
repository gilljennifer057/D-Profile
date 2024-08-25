import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showKeyIcon, setShowKeyIcon] = useState(false);
  const navigation = useNavigation();

  const handleSignup = () => {
    // Handle signup logic here
    console.log('Signup pressed');

    // Simulate a signup process and show the key icon
    setShowKeyIcon(true);

    // Navigate to login screen after a short delay
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  };

  return (
    // <ImageBackground 
    //   source={require('../assets/lock.jpg')} // Adjusted path to the image
    //   style={styles.background}
    //   resizeMode="cover"
    // >
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSignup} style={styles.button}>
          Sign Up
        </Button>
        {showKeyIcon && (
          <Image
            source={require('../assets/ul.png')}
            style={styles.keyIcon}
          />
        )}
      </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for the form
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  keyIcon: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

export default SignupScreen;
