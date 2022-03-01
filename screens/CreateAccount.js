import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import validator from 'validator';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';

import spaceBookLogo from '../assets/SpaceBook-logos.jpeg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');

  const [error, setError] = useState('');

  async function handleLogin(){
    if(email == '' || password == '' || firstname == '' || surname == ''){setError('Please fill in each field.')}
      else{
      if(validator.isEmail(email)){
        if(validator.isStrongPassword(password)){
          const response = await fetch("http://localhost:3333/api/1.0.0/user",
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              first_name: firstname,
              last_name: surname,
              email: email,
              password: password
            })
          })
          .catch((error) => {
            console.error("error");
            setError(error);
          });
          const data = await response.json();
          console.log(data);
          if(!data){
              setError('An error occured please try again...');
          }
          else {
              return response;
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
          />
        </View> 
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your surname."
            placeholderTextColor="#003f5c"
            onChangeText={(surname) => setSurname(surname)}
          />
        </View> 
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>  
        {!!error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>SIGN UP</Text>
        </TouchableOpacity> 
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100px',
    backgroundColor: 'blue',
  },
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
