import React, {useState, useEffect} from 'react';
import { StyleSheet,  View, Text, FlatList,  ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as PostManagement from '../roots/PostManagement.js'
import * as CustomAsyncStorage from '../roots/CustomAsyncStorage.js'

const Drafts = () => {

  const [auth, setAuth] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState(false);

const getUserData = async () => {
  try {
    const data = await CustomAsyncStorage.getData();
    setAuth(data);
    try{
      const draftData = await AsyncStorage.getItem('@draft-posts');
      let draftArray = draftData.split('§');
      setDrafts(true);
      setPosts(draftArray.slice(0,-1))
    }catch{
        setDrafts(false);
    }
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
    await PostManagement.CREATE_POST(post, auth.id);
    
    const a = posts.filter(p => p !== post);
    await AsyncStorage.setItem('@draft-posts',a);
    }
  catch(e){
    console.log("An error occurred posting!",e)
  }
}

async function handleDeleteDraft(post){
    const a = posts.filter(p => p !== post);
    await AsyncStorage.setItem('@draft-posts',a);
}

  return (
      <View style={styles.container}>
          {loading ? <Text> ...Loading </Text> :
          <>
          <ScrollView style={styles.body}>
          {!drafts ? <Text> You have no drafts yet! </Text> :
            <FlatList
              data={posts}
              renderItem={({item}) => 
                <View style={styles.postBox}>
                  <Text style={styles.text}>{item}</Text>
                  <View style={styles.buttons}>
                    <TouchableOpacity onPress={()=>handleCreatePost(item)} style={{marginRight:"30%"}}>
                      <Text>Post draft</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleDeleteDraft(item)}>
                      <Text style={{color:"red"}}>Delete draft</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                }
            />
          }
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
  buttons:{
    flex:4,
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "self-end"
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
