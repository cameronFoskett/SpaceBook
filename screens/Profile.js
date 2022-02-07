import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import spaceBookLogo from '../assets/SpaceBook-logos.jpeg';
import Tabs from '../navigation/tabs';

const Profile = () => {

  const [userData, setUserData] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [auth, setAuth] = useState('');

  const getData = async (done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@spacebook_details');
        const data = JSON.parse(jsonValue);
        
        return done(data);
    } catch(e) {
        console.error(e);
    }
  }

  async function findUser(){
      try{
        const response = await fetch(`http://localhost:3333/api/1.0.0/user/${auth.id}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'X-Authorization':auth.token},
        });
        const tempUserData = await response.json();
        setUserData(tempUserData);
      }
      catch (e) {
        console.log('An error occured please try again...');
    }
  }

  async function getUserImage(){
      try{
            const photoRes = await fetch(`http://localhost:3333/api/1.0.0/user/${auth.id}/photo`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'image/jpeg', 'X-Authorization':auth.token},
            });
            setUserPhoto(photoRes);
        }
        catch (e) {
            console.log('An error occured please loading your profile picture try again...');
        }
  }

useEffect(() =>{
    getData((data) => {
        console.log("data", data)
        setAuth(data);
        console.log("userdata", auth)
    });
    findUser();
    getUserImage();
}, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.head}>
            <Image source={{uri: userPhoto}}/>
            <Text style={styles.name}>{userData.first_name} {userData.last_name}</Text>
        </View>
      </View>
    </>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6c94ac",    
  },
  head:{
      display: 'flex', 
  },
  name: {
      textAlign: 'right',
      color: '#2f5476',
      paddingTop: '34%',
      paddingRight: '5%',
      fontWeight: 'bold',
      fontSize: '2rem',
    },
});
