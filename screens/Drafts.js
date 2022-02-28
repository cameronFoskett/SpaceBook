import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Image, View, Text, FlatList, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';


import spaceBookLogo from '../assets/SpaceBook-logos.jpeg';
import * as CustomAsyncStorage from '../roots/CustomAsyncStorage.js'
import Tabs from '../navigation/tabs';

const Drafts = ({navigation}) => {

  const [userData, setUserData] = useState('');
  const [auth, setAuth] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

const getUserData = async () => {
  try {
    const data = await CustomAsyncStorage.getData();
    setAuth(data);
    const draftData = await AsyncStorage.getItem('@draft-posts');
    let draftArray = draftData.split('§');
    setPosts(draftArray.slice(0,-1))
    setLoading(false);
    
  } catch (e) {
    alert('Failed to fetch the data from storage')
    console.log(e);
  }
  }

useEffect(() =>{
    getUserData();
}, []);

async function handleCreatePost(post){
  try{
      await fetch(`http://localhost:3333/api/1.0.0/user/${auth.id}/post`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', 'X-Authorization':auth.token},
                  body: JSON.stringify({
                      text: post
                    })
               });
               const i = posts.indexOf(post);
               console.log(i)
               setPosts(posts.filter(p => p !== post));
               console.log(posts)
               await AsyncStorage.setItem('@draft-posts',posts);

    }
  catch(e){
    console.log("An error occurred posting!")
  }
}

  return (
      <View style={styles.container}>
          {loading ? <Text> ...Loading </Text> :
          <>
          <ScrollView style={styles.body}>
            <FlatList
              data={posts}
              renderItem={({item}) => 
                <View style={styles.postBox}>
                  <Text style={styles.text}>{item}</Text>
                  <TouchableOpacity onPress={()=>handleCreatePost(item)}>
                    <Text>Post draft</Text>
                  </TouchableOpacity>
                </View>
                }
            />
          </ScrollView>
          </>
          }
      </View>
  );
}

export default Drafts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6c94ac",    
  },
  head:{
      display: 'flex',
      marginTop:"10%",
      marginLeft:"5%",
      flexDirection:"row", 
      position: 'relative',
  },
 
  body:{
    paddingTop:"10%",
    flex: 1,
  },
  postBox: {
    padding:5,
    margin:10,
    backgroundColor: '#9FD2FF',
    borderRadius:20,
    height:120,
  },
  likes:{
    position:'absolute',
    bottom:10,
  },
  text:{
    paddingTop:"5%",
    paddingBottom:"inherit",
    fontSize:"1.1rem",
  },
});
