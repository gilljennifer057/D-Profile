import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar, IconButton, Provider } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import GlobalStyles from "./styles/GlobalStyles";

const ACCEPT = 1;
const BLOCK = 2;

const HomeScreen = ({ navigation }) => {
  const [fields, setFields] = useState(["number", "profession", "description"]);
  const [user, setUser] = useState({});
  const [oppositeUser, setOppositeUserType] = useState(null);
  const [userList, setUserList] = useState([]);
  const [sentRequests, setSentRequests] = useState({}); // New state to track sent requests

  const getUserData = async () => {
    let userObj = await AsyncStorage.getItem("user");
    let token = await AsyncStorage.getItem("token");

    if (userObj && token) {
      let { user } = JSON.parse(userObj);

      setUser(user);

      getData(user, token);
    }
  };

  const getData = async (user, token) => {
    let oppositeUserType = user.user_type === "client" ? "partner" : "client";
    setOppositeUserType(oppositeUserType);
    try {
      const { data: list } = await axios.get(
        `http://192.168.0.184:8002/api/${oppositeUserType}`,
        {
          params: {
            [`${user.user_type}_id`]: user.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserList(list.data);

      // Check sent requests for each user
      const sentRequestsStatus = {};
      for (const user of list.data) {
        const status = await AsyncStorage.getItem(`request_${user.id}`);
        if (status === "sent") {
          sentRequestsStatus[user.id] = true;
        }
      }
      setSentRequests(sentRequestsStatus);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch data");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  };

  const sendRequestService = async (partner_id) => {
    try {
      // const requestStatus = await AsyncStorage.getItem(`request_${partnerId}`);

      // if (requestStatus === "sent") {
      //   Alert.alert("Info", "You have already sent a request to this partner.");
      //   return;
      // }

      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.post(
        `http://192.168.0.184:8002/api/service-request`,
        {
          client_id: user.id,
          partner_id: partner_id,
          status: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);
      Alert.alert("Success", "Service request sent successfully.");
    } catch (error) {
      console.error("Error sending service request:", error);
      Alert.alert("Error", "Failed to send service request");
    }
  };

  const startConversation = (item) => {
    navigation.navigate("Chat", { receiver: item });
  };

  const cancelRequestService = async (service_request_id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await axios.delete(
        `http://192.168.0.184:8002/api/service-request/` + service_request_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data, "Service deleted successfully.");
      Alert.alert("Success", "Service deleted successfully.");
    } catch (error) {
      console.error("Error sending service request:", error);
      Alert.alert("Error", "Failed to send service request");
    }
  };

  const processRquestByStatusId = async (status = 1, client) => {
    console.table(client);
    // return;
    let serviceId = client.is_request.id;
    try {
      const token = await AsyncStorage.getItem("token");
      let payload = { partner_id: user.id, status, client_id: client.id };
      let url = `http://192.168.0.184:8002/api/service-request/${serviceId}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(url, payload, config);

      getUserData();

      console.log(data);
    } catch (error) {
      console.error("Error accepting request:", error);
      Alert.alert("Error", "Failed to accept request");
    }
  };

  const renderItem = ({ item }) => {
    const isRequestSent = sentRequests[item.id];

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.text}>Profession: {item.profession}</Text>
          <Text>
            Email:
            <Text style={item.email ? styles.text : styles.error}>
              {" "}
              {item.email || "no email found yet"}{" "}
            </Text>
          </Text>
          <Text style={styles.text}>Phone: {item.number}</Text>
          <Text style={styles.text}>My User Type: {user.user_type}</Text>

          <View>
            {user.user_type === "client" ? (
              <>
                {!item.partner_service_request ? (
                  <TouchableOpacity
                    style={[GlobalStyles.button]}
                    onPress={() => sendRequestService(item.id)}
                  >
                    <Text style={GlobalStyles.buttonText}>Send Request</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    {item.partner_service_request.status == 0 ? (
                      <TouchableOpacity
                        style={[GlobalStyles.button]}
                        onPress={() =>
                          cancelRequestService(item.partner_service_request.id)
                        }
                      >
                        <Text style={GlobalStyles.buttonText}>
                          Cancel Request
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                    {item.partner_service_request.status == 1 ? (
                      <View>
                        <TouchableOpacity style={[GlobalStyles.button]}>
                          <Text style={GlobalStyles.buttonText}>Accepted</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            GlobalStyles.button,
                            styles.startConversationButton,
                          ]}
                          onPress={() => startConversation(item)}
                        >
                          <Text style={GlobalStyles.buttonText}>
                            Start Conversation
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <></>
                    )}
                    {item.partner_service_request.status == 2 ? (
                      <TouchableOpacity style={[GlobalStyles.button]}>
                        <Text style={GlobalStyles.buttonText}>Blocked</Text>
                      </TouchableOpacity>
                  
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <>
                  {item.is_request && item.is_request.status == 0 ? (
                    <View style={{ flexDirection: "row", width: "100%" }}>
                      <TouchableOpacity
                        style={[
                          GlobalStyles.button,
                          { flex: 1, marginRight: 5 },
                        ]}
                        onPress={() => processRquestByStatusId(ACCEPT, item)}
                      >
                        <Text style={GlobalStyles.buttonText}>Accept</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          GlobalStyles.button,
                          { flex: 1, marginLeft: 5 },
                        ]}
                        onPress={() => processRquestByStatusId(BLOCK, item)}
                      >
                        <Text style={GlobalStyles.buttonText}>Block</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <><TouchableOpacity
                    style={[
                      GlobalStyles.button,
                      styles.startConversationButton,
                    ]}
                    onPress={() => startConversation(item)}
                  >
                    <Text style={GlobalStyles.buttonText}>
                      Start Conversation
                    </Text>
                  </TouchableOpacity></>
                  )}
                </>

                <>
                  {item.is_request && item.is_request.status == 1 ? (
                    <TouchableOpacity
                      style={[GlobalStyles.button]}
                      onPress={() => processRquestByStatusId(0, item)}
                    >
                      <Text style={GlobalStyles.buttonText}>Not Accept</Text>
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}
                </>

                <>
                  {item.is_request && item.is_request.status == 2 ? (
                    <TouchableOpacity
                      style={[GlobalStyles.button]}
                      onPress={() => processRquestByStatusId(0, item)}
                    >
                      <Text style={GlobalStyles.buttonText}>Un Block</Text>
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}
                </>
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, [])
  );

  return (
    <Provider>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            onPress={() => navigation.toggleDrawer()}
          />
          <Appbar.Content title={`Welcome, ${user.name}`} />
          <IconButton icon="logout" size={24} onPress={handleLogout} />
        </Appbar.Header>

        <FlatList
          data={userList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  card: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // This will be approximated
    elevation: 4, // Adds shadow effect on Android
  },
  name: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 5,
  },
  disabledButton: {
    backgroundColor: "grey",
  },
  disabledButtonText: {
    color: "white",
  },
});

export default HomeScreen;
