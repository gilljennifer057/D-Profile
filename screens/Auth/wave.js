// RegistrationScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import WavyShape from './WavyShape';

const { height } = Dimensions.get('window');

const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <WavyShape top />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register</Text>
        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <WavyShape />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: -50, // Overlap wavy shapes
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegistrationScreen;
