import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';

import spaceBookLogo from '../assets/SpaceBook-logos.jpeg';
import * as UserManagement from '../roots/UserManagement.js'
import * as CustomAsyncStorage from '../roots/CustomAsyncStorage.js'

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


const storeData = async (value) => {
    try {
      //stores the async storage in a seperate file 
      await CustomAsyncStorage.saveData(value);
    } catch (e) {
        console.error(error);
    }
}

  async function handleLogin(){
    try {
      //tries to log user in and if status is not successful it shows the error message
          const response = await UserManagement.LOGIN(email,password);

          if(response.status == '200'){
            //once user has logged in it will store token and id and then navigate to home
            const data = await response.json();
            storeData(data);

            navigation.navigate('Home');

            setEmail('');
            setPassword('');
            setError('');

            return response;  
          }
          else if(response.status == '400') {
            setError('The details you entered seem to be incorrect');
          }
          else if(response.status == '500') {
            setError('Something server side went astray! Try back with us later.');
          }
        
    } catch (e) {
        setError('An error occured please try again...');
    }
    return null;
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
                value={email}
            />
        </View>
        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Enter password."
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                value={password}
            />
        </View> 
        <TouchableOpacity onPress={()=>navigation.navigate('CreateAccount')}>
            <Text style={styles.newAccount}>Don't have an account?</Text>
        </TouchableOpacity> 
        {!!error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity> 
    </View>
    </>
  );
}

export default Login;

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
  image: {
    marginBottom: 40,  
    width:'33%',
    height:'15%',
    borderRadius: '50%',
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
