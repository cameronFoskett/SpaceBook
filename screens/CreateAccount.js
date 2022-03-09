import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import validator from 'validator';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';

import * as UserManagement from '../roots/UserManagement.js'

import spaceBookLogo from '../assets/SpaceBook-logos.jpeg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleCreateUser(){
    //checks if any of the fields are empty and sets error
    if(email == '' || password == '' || firstname == '' || surname == ''){setError('Please fill in each field.')}
      else{
      //checks if email provided is valid and password is strong
      if(validator.isEmail(email)){
        if(validator.isStrongPassword(password)){
          //sends data to api call
          const data = await UserManagement.CREATE(firstname, surname, email, password);
          if(!data){
              setError('An error occured please try again...');
          }
          else {
            //if successful it clears the fields and shows a success message
              setEmail('')
              setPassword('')
              setFirstname('')
              setSurname('')
              setSuccess(true)              
              setError('Account created successfully!');

              return data;
          }
        }
        else{setError('Please provide a stronger password');}
      }
      else{setError('Please provide a valid email');}
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
            placeholder="Enter your firstname."
            placeholderTextColor="#003f5c"
            onChangeText={(firstname) => setFirstname(firstname)}
            value={firstname}
          />
        </View> 
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your surname."
            placeholderTextColor="#003f5c"
            onChangeText={(surname) => setSurname(surname)}
            value={surname}
          />
        </View> 
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            value={password}
          />
        </View>  
        {!!error && <Text style={{color: success ? "green" : "red"}}>{error}</Text>}
        <TouchableOpacity style={styles.createUserBtn} onPress={handleCreateUser}>
          <Text style={styles.loginText}>SIGN UP</Text>
        </TouchableOpacity> 
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  createUserBtn: {
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
