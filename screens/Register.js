import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React,{ useState,useEffect }  from "react";
import { Text,View ,Button,TextInput, } from "react-native";


export default register=() =>{ 
const [name,setName]= useState("");
const [password,setPassword]= useState("");
const [email,setEmail]= useState("");
const [error,setError]= useState("");
const [token,setToken]= useState(null);



const handleRegister = async ()=>{
    try  {
const response = await axios.post( "http://127.0.0.1:8000/api/login",
    {
        name,
        email,
        password,
      }
);
if(response.data.token) {
    await AsyncStorage.setItem('token',response.data.token)
    Navigation.navigate('Home')
}else {
    setError(response.data.message);
  }
}
  catch (err) {
    setError("Login failed. Please check your credentials and try again.");
  }

 } 


    return(
        <View style={styles.container}>
            <Text>Register Form</Text>
            <TextInput placeholder="name" onChangeText={(text)=>setName(text)} />
            <TextInput placeholder="password" onChangeText={(text)=>setPassword(text)} />
            <TextInput placeholder="email" onChangeText={(text)=>setEmail(text)} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title="submit" onPress={handleRegister}  />
        </View>
    )
 }
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },
    input: {
      marginBottom: 10,
    },
    error: {
      color: "red",
      marginBottom: 10,
    },
  });