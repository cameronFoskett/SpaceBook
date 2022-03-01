import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput } from 'react-native';
import {ImagePicker, launchImageLibrary} from 'react-native-image-picker';
import validator from 'validator';
import { Camera } from 'expo-camera';

import spaceBookLogo from '../assets/SpaceBook-logos.jpeg';
import * as CustomAsyncStorage from '../roots/CustomAsyncStorage.js'

export default function AccountManager({navigation}) {
const [auth, setAuth] = useState('');
const [newPhoto, setNewPhoto] = useState();
const [hasPermission, setHasPermission] = useState('');
const [error, setError] = useState('');
const [userInfo, setUserInfo] = useState({firstname:'',lastname:'',email:'',password:''});
const [type, setType] = useState(Camera.Constants.Type.back);
const [userData, setUserData] = useState([]);

const getUserData = async () => {
  try {
    const data = await CustomAsyncStorage.getData();
    if (data !== null) {
      setAuth(data);
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${data.id}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
        });
        const tempUserData = await response.json();
        setUserData(tempUserData);
    }
  } catch (e) {
    alert('Failed to fetch the data from storage');
    console.log(e);
  }
} 

  const changeHandler = (e, name) => {
    setUserInfo({...userInfo, [name]: e.target.value})
  }
  
  async function handleChoosePhoto(){
    const { status } = await Camera.requestCameraPermissionsAsync();
    if(status === 'granted'){
      navigation.navigate('Camera');
    }else{setError('You need to allow camera access for this feature')}
  }

  async function handleUpdateUserInfo(){
    let body = [];
    if(userInfo.firstname === ''){
        userInfo.firstname = userData.first_name;
    }
    if(userInfo.lastname === ''){
        userInfo.lastname = userData.last_name;
    }
    if(validator.isStrongPassword(userInfo.password)){
      if(validator.isEmail(userInfo.email)){
        if(userInfo.email === ''){
            userInfo.email = userData.email;
        }
        if(userInfo.password === ''){
            userInfo.password = userData.password;
        }
        try{
            const updateUser = await fetch(`http://localhost:3333/api/1.0.0/user/${auth.id}`,
              {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'X-Authorization':auth.token},
                body: JSON.stringify({
                  first_name: userInfo.firstname,
                  last_name: userInfo.lastname,
                  email: userInfo.email,
                  password: userInfo.password
                })
              });

              // when user updates their details theyre logged out for security 
              await fetch(`http://localhost:3333/api/1.0.0/logout`,
              {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', 'X-Authorization':auth.token},
              });
              await CustomAsyncStorage.removeData();
              navigation.navigate("Login");
              }
        catch (e) {
            console.log(e);
        }
      }
    }else{setError('Please try again, your password/ email needs to be changed')}
  }

useEffect(() =>{
    getUserData();
}, []);

  return (
    <>
      <View style={styles.container}>
        <Image source={spaceBookLogo} style={styles.image}/>
        <Text style={styles.title}>Update your account information</Text>
        <TextInput
                style={styles.TextInput}
                name='firstname'
                placeholder="Update First Name"
                placeholderTextColor="#003f5c"
                onChange={e => changeHandler(e,'firstname')}
        />
        <TextInput
                style={styles.TextInput}
                name='lastname'
                placeholder="Update Last Name"
                placeholderTextColor="#003f5c"
                onChange={e => changeHandler(e,'lastname')}
        />
        <TextInput
                style={styles.TextInput}
                name='email'
                placeholder="Update Email Address"
                placeholderTextColor="#003f5c"
                onChange={e => changeHandler(e,'email')}
        />
        <TextInput
                style={styles.TextInput}
                name='password'
                placeholder="Update Password"
                placeholderTextColor="#003f5c"
                onChange={e => changeHandler(e,'password')}
        />
        {!!error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText} onPress={handleUpdateUserInfo}> Update your details </Text></TouchableOpacity>
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
  TextInput: {
    height: 50,
    padding: 10,
    margin:10,
    width: "80%",
    borderRadius: 25,
    backgroundColor:"#518abc",
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
  error:{
    color:'red',
  },
});
