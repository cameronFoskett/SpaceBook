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
const[isCameraOpen, setCameraOpen] = useState(false);
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
  // const handleChoosePhoto = async () => {
    // console.log("here");
    // setCameraOpen(true);
    // const { status } = await Camera.requestCameraPermissionsAsync();
    // if(status === 'granted'){
    //   setHasPermission(status);

    // }else{
    //   setError("You need to allow access to the devices camera for this feature.")
    // }
  // };

  
  async function handleChoosePhoto(){

    console.log("camera");
    const { status } = await Camera.requestCameraPermissionsAsync();
    if(status === 'granted'){
      // setCameraOpen(true);
      navigation.navigate('Camera');
    }
    
      }
    // setCameraOpen(true);
    // if(status === 'granted'){
    //   setHasPermission(status);

    // }else{
    //   setError("You need to allow access to the devices camera for this feature.")
    // }
  

async function updatePhoto(){
    try {
        const response = await fetch(`http://localhost:3333/api/1.0.0/user/${auth.id}/photo`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'image/png'},
            body: photo,
        });
        const data = await response.json();
        console.log(data);
        return response;    
    } catch (e) {
        console.log(e);
    }

    return null;
  }

useEffect(() =>{
    getUserData();
}, []);

if(isCameraOpen){
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Camera 
        style={styles.camera} 
      >
      </Camera>
    </View>
  )
}else{
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
