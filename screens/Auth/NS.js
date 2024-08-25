import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from "react-native";
import GlobalStyles from "../styles/GlobalStyles";

const Notification = ({ navigation }) => {
  // Static data for service requests
  const [serviceRequests] = useState([
    {
      id: 1,
      client_id: 101,
      partner_id: 201,
      status: 0, // 0 for Pending, 1 for Completed
      created_at: "2023-08-20T12:34:56Z",
      updated_at: "2023-08-21T15:22:33Z",
    },
    {
      id: 2,
      client_id: 102,
      partner_id: 202,
      status: 1,
      created_at: "2023-08-21T10:22:44Z",
      updated_at: "2023-08-22T09:15:12Z",
    },
    // Add more static service requests here
  ]);

  // Static data for user information
  const [userData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>ID: {item.id}</Text>
      <Text style={styles.itemText}>Client ID: {item.client_id}</Text>
      <Text style={styles.itemText}>Partner ID: {item.partner_id}</Text>
      <Text style={styles.itemText}>Status: {item.status === 0 ? "Pending" : "Completed"}</Text>
      <Text style={styles.itemText}>Created At: {new Date(item.created_at).toLocaleString()}</Text>
      <Text style={styles.itemText}>Updated At: {new Date(item.updated_at).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.titleContainer}>
        <Text style={styles.title}>Service Requests</Text>
        <Image
          source={require("./assets/icon.png")} // Adjust path as needed
          style={styles.image} // Adjust the size as needed
        />
      </View>

      {userData && (
        <View style={styles.userContainer}>
          <Text style={styles.userText}>User Information:</Text>
          <Text style={styles.userText}>Name: {userData.name}</Text>
          <Text style={styles.userText}>Email: {userData.email}</Text>
        </View>
      )}

      <FlatList
        data={serviceRequests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No service requests found.</Text>}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={GlobalStyles.linkWrapper}
      >
        <Text style={GlobalStyles.linkText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#008080",
  },
  image: {
    width: 100,
    height: 100,
  },
  userContainer: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  userText: {
    fontSize: 16,
    marginBottom: 4,
  },
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default Notification;
