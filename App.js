import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';

import User from './components/User.js'
import spaceBookLogo from './assets/SpaceBook-logos.jpeg';

export default function App() {
  // async function loadData() {
  //   try{
  //     response = await fetch("http://localhost:3333/api/1.0.0/user", {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: `{
  //       "first_name": "kjdnsa"",
  //       "last_name": "Testtttt",
  //       "email": "lllll@lol.com",
  //       "password": "msadlknasddjkln"
  //       }`,
  //     });
  //     console.log(response);
  //   }
  //   catch(e) {
  //     console.log(e);
  //   }
  // }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header:{
    width: '100%',
    height: '100px',
    backgroundColor: 'blue',
  },
  image :{
    marginBottom: 40,  
    width:'33%',
    height:'15%',
    borderRadius: '50%',
  },

   inputView: {
    backgroundColor: '#a9aba0',
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
    marginLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#777078",
    alignItems: "center",
    justifyContent: "center",
  },
});
