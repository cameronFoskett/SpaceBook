import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput } from 'react-native';
import validator from 'validator';
import { Camera } from 'expo-camera';

import spaceBookLogo from '../assets/SpaceBook-logos.jpeg';

import * as UserManagement from '../roots/UserManagement.js';
import * as CustomAsyncStorage from '../roots/CustomAsyncStorage.js'

export default function AccountManager({navigation}) {
const [error, setError] = useState('');
const [userInfo, setUserInfo] = useState({firstname:'',lastname:'',email:'',password:''});
const [userData, setUserData] = useState([]);

const getUserData = async () => {
  try {
      const data = await CustomAsyncStorage.getData();
      const response = await UserManagement.GET_USER_DATA(data.id);
      const tempUserData = await response.json();
      setUserData(tempUserData);
    
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
    if(userInfo.firstname == ''){
        userInfo.firstname = userData.first_name;
    }
    if(userInfo.lastname == ''){
        userInfo.lastname = userData.last_name;
    }
    if(userInfo.email == ''){
        userInfo.email = userData.email;
    }
    if(userInfo.password == ''){
        userInfo.password = userData.password;
    }
    let pass = validator.isStrongPassword(userInfo.password);
    if(pass != null){
      if(validator.isEmail(userInfo.email)){
        try{
            await UserManagement.UPDATE_USER_DATA(userInfo);
            // when user updates their details theyre logged out for security 
            await UserManagement.LOGOUT();
            await CustomAsyncStorage.removeData();
            navigation.navigate("Login");
          }
        catch (e) {
            console.log(e);
        }
      }
    }else{setError('Please submit your password new or old to authenticate your update.')}
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
