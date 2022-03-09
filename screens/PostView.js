import React, {useState, useEffect} from 'react';
import { StyleSheet,  View, Text,  TextInput, ScrollView, TouchableOpacity } from 'react-native';

import * as PostManagement from '../roots/PostManagement.js'
import * as CustomAsyncStorage from '../roots/CustomAsyncStorage.js'

const PostView = (route) => {

  const [userData, setUserData] = useState('');
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [allow,setAllow] = useState(false);
  //gets these from the route, as this is the same page that is shown from profile and friend profile
  const post_id = route.route.params.postID;
  const user_id = route.route.params.ID;

const getPostData = async () => {
  try {
    const data = await CustomAsyncStorage.getData();
    if (data !== null) {
      try{
        //gets post data with user info and post info
        const response = await PostManagement.GET_POST_DATA(user_id,post_id);
        const tempUserData = await response.json();
        setUserData(tempUserData);
        setLoading(false);
      }
      catch (e) {
        console.log('An error occured please try again...',e);
      }
    }
  } catch (e) {
    alert('Failed to fetch the data from storage')
    console.log(e);
  }
}

useEffect(() =>{
    getPostData();
}, []);

async function handleEditPost(){
  try{
    //edits the post
    await PostManagement.UPDATE_POST(user_id,post_id,newPost);
    setNewPost('');
    }
  catch(e){
    console.log("An error occurred posting!")
  }
}

async function handleDeletePost(){
  try{
    //deletes the post
      await PostManagement.DELETE_POST(user_id,post_id);
      setNewPost('');
      setAllow(!allow);
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
              <View style={styles.postBox} key={post_id}>
                <Text>
                  {userData.first_name} {userData.last_name}
                </Text>
                <Text style={styles.text}>{userData.text}</Text>
                <Text style={styles.likes}>Likes: {userData.numLikes}</Text>
              </View>  
            <View style={styles.createPost}>
              <Text style={styles.createText}>Edit your post..
                <TouchableOpacity disabled={allow} style={[styles.postButton, allow && styles.pressed]} onPress={handleEditPost}>
                  <Text>
                    Update your post
                  </Text>
                </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePost}>
                <Text>
                  Delete
                </Text>
              </TouchableOpacity>
              </Text>
              <TextInput
                    style={styles.TextInput}
                    placeholder={userData.text}
                    placeholderTextColor="#003f5c"
                    onChangeText={(newPost) => setNewPost(newPost)}
                    value={newPost}
                />
            </View>  
          </ScrollView>
          </>
          }
      </View>
  );
}

export default PostView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6c94ac",    
  },
  createPost: {
    height: 150,
    padding: 10,
    backgroundColor: '#9FD2FF',
  },
  body:{
    flex: 1,
  },
  postBox: {
    padding:5,
    margin:10,
    backgroundColor: '#9FD2FF',
    borderRadius:20,
    height:120,
  },
  createText:{
    paddingBottom:"5%",
    fontSize:"1.1rem",
    flexDirection: 'row',
  },
  text:{
    paddingTop:"5%",
    paddingBottom:"inherit",
    fontSize:"1.1rem",
  },
  TextInput:{
    height:100,
    backgroundColor: 'white',
    borderRadius:10,
    padding:10,
  },
  postButton:{  
    position: 'absolute',
    right: 20,
    backgroundColor: '#2f5476',
    color: 'white',
    padding:5,
  },
  pressed:{
    backgroundColor: '#000',
},
  deleteButton:{  
    backgroundColor: 'red',
    color: 'white',
    padding:5,
    left:"7%",
  },
  button: {
    marginLeft: 'auto',
    marginTop: '7%',
  },
});
