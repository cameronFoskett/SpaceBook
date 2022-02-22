import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import {ImagePicker, launchImageLibrary} from 'react-native-image-picker';
import { Camera } from 'expo-camera';

import spaceBookLogo from '../assets/SpaceBook-logos.jpeg';
import * as CustomAsyncStorage from '../roots/CustomAsyncStorage.js'

export default function AccountManager({navigation}) {
const [auth, setAuth] = useState('');
const [newPhoto, setNewPhoto] = useState();
const [hasPermission, setHasPermission] = useState('');
const [error, setError] = useState('');
const [type, setType] = useState(Camera.Constants.Type.back);

const getUserData = async () => {
  try {
    const data = await CustomAsyncStorage.getData();
    if (data !== null) {
      setAuth(data);
    }
  } catch (e) {
    alert('Failed to fetch the data from storage');
    console.log(e);
  }
} 
  async function handleChoosePhoto(){
    const { status } = await Camera.requestCameraPermissionsAsync();
    if(status === 'granted'){
      navigation.navigate('Camera');
    }
  }

useEffect(() =>{
    getUserData();
}, []);

  return (
    <>
      <View style={styles.container}>
        <Image source={spaceBookLogo} style={styles.image}/>
        <Text style={styles.title}>Update your account information</Text>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}> Update First Name </Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}> Update Last Name </Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}> Update Email Address </Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}> Update Password </Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText} onPress={handleChoosePhoto}> Update Profile Picture </Text></TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6c94ac",
    alignItems: "center",
  },
  image: {
    margin: 40,  
    width:'33%',
    height:'15%',
    borderRadius: '50%',
  },
  camera: {
    flex: 1,
  },
  title: {
      color: '#2f5476',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      paddingBottom:"10%",
    },
  button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#2f5476",
    color:'white',
  },
  buttonText:{
    color:'white',
    fontSize:'1.1rem',
  },
});
