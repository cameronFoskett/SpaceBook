import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';

import * as CustomAsyncStorage from '../roots/CustomAsyncStorage.js'


export default function Friends({navigation}) {
const [auth, setAuth] = useState('');
const [friends, setFriends] = useState('');
const [loading, setLoading] = useState(true);
const [searchCriteria, setSearchCriteria] = useState('');
const [foundUsers, setFoundUsers] = useState(null);
const [showUsers, setShowUsers]= useState(false);

const getUserData = async () => {
  try {
    const data = await CustomAsyncStorage.getData();
      setAuth(data);
      if(data){
        //for some reason i couldnt use data so i had to set a new const
        const userInfo = data;
        try {
          const response = await fetch(`http://localhost:3333/api/1.0.0/user/${userInfo.id}/friends`,
          {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', 'X-Authorization':userInfo.token},
          });
          const data = await response.json();
          setFriends(data);
          setLoading(false);
          }
          catch(e){
            console.log(e);
          }
      }
  } catch (e) {
    alert('Failed to fetch the data from storage')
    console.log(e);
  }
}

async function addFriend(id){
  if(id){
    try{
        const response = await fetch(`http://localhost:3333/api/1.0.0/friendrequests/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Authorization':auth.token},
            });
    }
    catch(e){
      console.log(e);
    }
  }
}

const findUsers = async () => {
  setFoundUsers(null);
  try {
          const response = await fetch(`http://localhost:3333/api/1.0.0/search?q=${searchCriteria}`,
          {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', 'X-Authorization':auth.token},
          });
          const data = await response.json();
          setFoundUsers(data);
          
          }
          catch(e){
            console.log(e);
            setFoundUsers('');
          }
      }

useEffect(() =>{
    const unsubscribe = navigation.addListener('focus', () => {
        getUserData();
      });
      return unsubscribe;
    findUsers();
    addFriend();
}, [navigation]);
  
  const LoadFriends = () => {
    for (let i = 0; i < friends.length; i++) {
        return friends.map((f) =>
        <TouchableOpacity 
          style={styles.friendBox} 
          key={f.user_id} 
          onPress={() => navigation.navigate('FriendProfile',{friendID: f.user_id})}>
          <Text style={styles.textBox}>{f.user_givenname} {f.user_familyname}</Text>
        </TouchableOpacity>
        );
    }
  }

  const LoadSearch = () => {
    if(foundUsers !== ''){
      for (let i = 0; i < foundUsers.length; i++) {
          return foundUsers.map((f) =>
          <View style={styles.friendBox} key={f.user_id}>
            <Text style={styles.textBox}>{f.user_givenname} {f.user_familyname}</Text>
            <TouchableOpacity style={styles.button} onPress={()=>addFriend(f.user_id)}>
              <Image source={require('../assets/add-user.png')} style={styles.image} />
            </TouchableOpacity>
          </View>
          );
      }
    }
    else{
      return(
          <View style={styles.friendBox}>
            <Text style={styles.textBox}>I'm sorry there are no results for your search</Text>
          </View>
      );
    }
  }

  return (
    <>
      <ScrollView style={styles.container}>
        {loading ? <Text> ...Loading </Text> :
        <>
          <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Search for other Astronaughts..."
                placeholderTextColor="#003f5c"
                onChangeText={(searchCriteria) => setSearchCriteria(searchCriteria)}
                value={searchCriteria}
            />
            <TouchableOpacity style={styles.searchButton} onPress={()=>findUsers()}> 
              <Image source={require('../assets/search.png')} style={styles.image}/>
            </TouchableOpacity>
        </View>
        {!foundUsers ? 
          <>
            <Text style={styles.textBox}>Friends List </Text>
            <LoadFriends/> 
          </>
            :
          <>
            <Text style={styles.textBox}>Here are the results: </Text>
            <LoadSearch/>
          </>
        } 
        <TouchableOpacity style={styles.friendRequestsBtn} onPress={() => navigation.navigate('FriendRequests')}>
              <Text>Friend Requests</Text>
        </TouchableOpacity> 
        </>
        }
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6c94ac",
    paddingTop:"10%",
    paddingLeft:10,
    paddingRight:10,
    flex: 1,
  },
  friendBox: {
    padding:5,
    marginTop:10,
    marginBottom:5,
    backgroundColor: '#518abc',
    borderRadius:20,
    height:100,
    flexDirection: 'row',
    
  },
  friendRequestsBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#2f5476",
  },
  textBox:{
    fontSize:"1.5rem",

  },
  inputView: {
    backgroundColor: '#518abc',
    flexDirection:'row',
    borderRadius: 30,
    height: 45,
    marginBottom: 20,
    alignItems: "left",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
  image: {
    width:20,
    height:20,
  },
  button: {
    marginLeft: 'auto',
    marginTop: '7%',
  },
  searchButton:{
    marginLeft: 'auto',
    marginTop: '3%',
    marginRight:10,
  }
});
