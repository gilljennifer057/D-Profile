import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import WavyShape from './WavyShape'; // Import the SVG shape component

const RegistrationScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <WavyShape />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
        />
        {/* Add your registration button and other components here */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
});

export default RegistrationScreen;
