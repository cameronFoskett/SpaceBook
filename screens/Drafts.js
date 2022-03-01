import React, {useState, useEffect} from 'react';
import { StyleSheet,  View, Text, FlatList,  ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as CustomAsyncStorage from '../roots/CustomAsyncStorage.js'

const Drafts = () => {

  const [auth, setAuth] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
               const a = posts.filter(p => p !== post);

               await AsyncStorage.setItem('@draft-posts',a);

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
