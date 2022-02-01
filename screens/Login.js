import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';

import spaceBookLogo from '../assets/SpaceBook-logos.jpeg';
import CreateAccount from '../screens/CreateAccount.js';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');


  async function handleLogin(){
    let history = useHistory();

    const response = await fetch("http://localhost:3333/api/1.0.0/login",
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .catch((error) => {
      console.error("error");
    });
    const data = await response.json();
    console.log(data);
    if(!data){
        setError('An error occured please try again...');
    }
    else {
        setToken(data.token);
        return response;
    }
  }

  return (
    <>
    <View style={styles.container}>
        <Image source={spaceBookLogo} style={styles.image}/>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Enter email"
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}
            />
        </View>
        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Enter password."
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
            />
        </View> 
        <TouchableOpacity onPress={()=>navigation.navigate('CreateAccount')}>
            <Text style={styles.newAccount}>Don't have an account?</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity> 
    </View>
    </>
  );
}

export default Login;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100px',
    backgroundColor: 'blue',
  },
  image: {
    marginBottom: 40,  
    width:'33%',
    height:'15%',
    borderRadius: '50%',
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
   inputView: {
    backgroundColor: '#518abc',
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#2f5476",
  },
  container: {
    flex: 1,
    backgroundColor: "#6c94ac",
    alignItems: "center",
    justifyContent: "center",
  },
});
