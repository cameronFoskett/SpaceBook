import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';


import spaceBookLogo from '../assets/SpaceBook-logos.jpeg';
import * as CustomAsyncStorage from '../roots/CustomAsyncStorage.js'
import Tabs from '../navigation/tabs';

const Profile = () => {

  const [userData, setUserData] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [auth, setAuth] = useState('');
  const [loading, setLoading] = useState(true);

const getUserData = async () => {
  try {
    const data = await CustomAsyncStorage.getData();
    if (data !== null) {
      setAuth(data);
      try{
        const response = await fetch(`http://localhost:3333/api/1.0.0/user/${data.id}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
        });
        const tempUserData = await response.json();
        setUserData(tempUserData);
        try{
            const photoRes = await fetch(`http://localhost:3333/api/1.0.0/user/${data.id}/photo`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'image/jpeg', 'X-Authorization':data.token},
            }).then((res) => {
                return res.blob();
              }).then((resBlob) => {
              let data = URL.createObjectURL(resBlob);
              setUserPhoto(data);
              setLoading(false);
            });

        }
        catch (e) {
            console.log('An error occured please loading your profile picture try again...');
        }
      }
      catch (e) {
        console.log('An error occured please try again...');
    }
    }
  } catch (e) {
    alert('Failed to fetch the data from storage')
    console.log(e);
  }
}

useEffect(() =>{
    getUserData();
}, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.head}>
          {loading ? <Text> ...Loading </Text> :
          <>
          <Image
            source={{
              uri: userPhoto,
            }}
            style={styles.image}
          />       
          <Text style={styles.name}>{userData.first_name} {userData.last_name}</Text>
          </>
          }
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
  image:{
    width: 100,
    height: 100,
    borderRadius:"50%",
  },
  head:{
      display: 'flex',
      marginTop:"10%",
      marginLeft:"5%",
      flexDirection:"row", 
  },
  name: {
      textAlign: 'right',
      color: '#2f5476',
      paddingTop: '8%',
      paddingLeft:"10%",
      fontWeight: 'bold',
      fontSize: '2rem',
    },
});
