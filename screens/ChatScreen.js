import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Appbar } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatScreen = ({ route, navigation }) => {
  useEffect(() => {
    getUserData()
      .then((res) => console.log("done"))
      .catch((err) => console.log(err));

      getMessages();
    // Fetch existing messages when the component mounts
   
  }, []);

  const getMessages = ()=>{
    axios
      .get(`http://192.168.0.184:8002/api/conversations`, {
        params: {
          user_type: "client",
          user_id: 10,
        },
      })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error);
      });
    }
  const [user, setUser] = useState({});

  const { receiver } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const getUserData = async () => {
    let userObj = await AsyncStorage.getItem("user");
    let token = await AsyncStorage.getItem("token");

    if (userObj && token) {
      let { user } = JSON.parse(userObj);
      setUser(user);
    }
  };

  const sendMessage = () => {
      const newMessage = {
          sender_id: user.id,
          receiver_id: receiver.id,
          message:messageText
      };

      axios
        .post("http://192.168.0.184:8002/api/conversations", newMessage, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Response from backend:", response.data); 
          getMessages();// Log the response data
          // setMessages([...messages, response.data.data]);
          // setMessageText("");
        })
        .catch((error) => {
          console.error("Failed to send message:", error);
          console.error(
            "Error details:",
            error.response?.data || error.message
          ); // Log detailed error
        });
    
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender_id === user.id ? styles.myMessage : styles.partnerMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.created_at).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={`Chat with ${receiver.name,receiver.id}`} />
      </Appbar.Header>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  chatContainer: {
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: "80%",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#148C94",
  },
  partnerMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
  },
  messageText: {
    color: "#000",
  },
  timestamp: {
    fontSize: 10,
    color: "#aaa",
    marginTop: 5,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#148C94",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ChatScreen;
