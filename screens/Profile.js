import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, View, Text, FlatList, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as UserManagement from '../roots/UserManagement.js'
import * as PostManagement from '../roots/PostManagement.js'
import * as CustomAsyncStorage from '../roots/CustomAsyncStorage.js'

const Profile = ({navigation}) => {

  const [userData, setUserData] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [auth, setAuth] = useState('');
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

const getUserData = async () => {
  try {
    const data = await CustomAsyncStorage.getData();
    if (data !== null) {
      setAuth(data);
      try{
        const response = await UserManagement.GET_USER_DATA(data.id);
        const tempUserData = await response.json();
        setUserData(tempUserData);
        try{
            let photo = await UserManagement.GET_USER_PFP(data.id);
            setUserPhoto(photo);
            setLoading(false);
            try{
                const userPosts = await PostManagement.GET_USER_POSTS(data.id);
                const tempUserPosts = await userPosts.json();
                setPosts(tempUserPosts);
              }
              catch (e) {
                  console.log(e);
              }
        }
        catch (e) {
            console.log(e);
        }
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

async function handleCreatePost(){
  try{
      await PostManagement.CREATE_POST(newPost, auth.id);
      setNewPost('');
      setRefresh(!refresh);
      getUserData();
    }
  catch(e){
    console.log("An error occurred posting!",e)
  }
}

const handleLike = async (post_id) => {
     try{
      const response = await PostManagement.LIKE(auth.id,post_id);
      if(response.status != '200'){
        const res = await PostManagement.DISLIKE(auth.id,post_id);
        if(res.status != '200'){
          console.log('An error occured whilst liking the post',e)
        }
      }
     }
     catch(e){
       console.log(e);
     }
    setRefresh(!refresh);
  }

async function handleDraftPost(){ 
      let drafts = await AsyncStorage.getItem('@draft-posts');
      if(drafts === null){
        await AsyncStorage.setItem('@draft-posts',newPost+'§');
      }
      else{await AsyncStorage.setItem('@draft-posts', drafts += newPost+'§'); }
      setNewPost('');
      alert('Your post has been drafted!');


}

async function handleLogout(){
  try{
      const response = await UserManagement.LOGOUT();
      if(response.status == '500') {
          alert('Something server side went astray! Try back with us later.');
      }
      else if(response.status == '400') {
          alert('Somehow youre trying to logout without being logged in... stop doing that');
      }
      else{
          await CustomAsyncStorage.removeData();
          navigation.navigate("Login");
      }
          
  }
  catch(e){
    console.log(e)
  }
}

useEffect(() =>{
    navigation.addListener('focus', () => {
        getUserData();
      });
}, [refresh, navigation]);

  return (
      <View style={styles.container}>
          {loading ? <Text> ...Loading </Text> :
          <>
          <View style={styles.head}>
            <>
            <Image
              source={{
                uri: userPhoto,
              }}
              style={styles.image}
            />       
            <Text style={styles.name}>{userData.first_name} {userData.last_name}</Text>
            <TouchableOpacity style={styles.logout} onPress={handleLogout}> 
                <Image source={require('../assets/logout.png')} style={styles.logoutImage}/>
            </TouchableOpacity> 
            </>
          </View>
          <ScrollView style={styles.body}>
          <View style={styles.createPost}>
          <Text style={styles.createText}>Create new post! 
          <TouchableOpacity style={styles.draftButton} onPress={handleDraftPost}>
              <Text>
                Draft
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postButton} onPress={handleCreatePost}>
              <Text>
                Post
              </Text>
            </TouchableOpacity>
          </Text>
          <TextInput
                style={styles.TextInput}
                placeholder="Start jotting down your out of the world thoughts..."
                placeholderTextColor="#003f5c"
                onChangeText={(newPost) => setNewPost(newPost)}
                value={newPost}
            />
            <TouchableOpacity onPress={()=>navigation.navigate('Drafts')}>
              <Text>See your drafted posts...</Text>
            </TouchableOpacity>
            </View>
            <FlatList
              data={posts}
              extraData={{refresh}}
              renderItem={({item}) => 
                <TouchableOpacity style={styles.postBox} key={item.post_id}  onPress={() => navigation.navigate('PostView',{postID: item.post_id, ID: auth.id})}>
                  <Text>
                    {item.author.first_name} {item.author.last_name} Posted on: {new Date (item.timestamp).toLocaleDateString()}
                  </Text>
                  <Text style={styles.text}>{item.text}</Text>
                  <Text style={styles.likes}>Likes: {item.numLikes}</Text>
                  {item.author.user_id != auth.id && 
                  <TouchableOpacity style={styles.button} onPress={()=>handleLike(item.post_id)}>
                    <Image source={require('../assets/like.png')} style={styles.likeImage} />
                  </TouchableOpacity>
                  }
                </TouchableOpacity>
                }
            />
          </ScrollView>
          </>
          }
      </View>
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
  createPost: {
    height: 150,
    padding: 10,
    backgroundColor: '#9FD2FF',
  },
  head:{
      display: 'flex',
      marginTop:"10%",
      marginLeft:"5%",
      flexDirection:"row", 
      position: 'relative',
  },
  logoutImage: {
    width:30,
    height:30,
  },
  logout:{
    marginLeft: 'auto',
    top: '-20%',
    marginRight:10,
  },
  name: {
      textAlign: 'right',
      color: '#2f5476',
      paddingTop: '8%',
      paddingLeft:"5%",
      fontWeight: 'bold',
      fontSize: '1.7rem',
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
    marginBottom:10,
  },
  postButton:{  
    position: 'absolute',
    right: 20,
    backgroundColor: '#2f5476',
    color: 'white',
    padding:5,
  },
  draftButton:{  
    position: 'absolute',
    right: 80,
    backgroundColor: '#2f5476',
    color: 'white',
    padding:5,
  },
  button: {
    marginLeft: 'auto',
    marginTop: '7%',
  },
  likeImage:{
    width:20,
    height:20,
  },
});
