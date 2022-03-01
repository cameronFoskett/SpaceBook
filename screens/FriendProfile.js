import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, View, Text, FlatList, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import * as CustomAsyncStorage from '../roots/CustomAsyncStorage.js'

const FriendProfile = ({navigation}) => {

  const [userData, setUserData] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [auth, setAuth] = useState('');
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const friend_id = route.params.friendID;

const getUserData = async () => {
  try {
    const data = await CustomAsyncStorage.getData();
    if (data !== null) {
      setAuth(data);
      try{
        const response = await fetch(`http://localhost:3333/api/1.0.0/user/${friend_id}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
        });
        const tempUserData = await response.json();
        setUserData(tempUserData);
        try{
            await fetch(`http://localhost:3333/api/1.0.0/user/${friend_id}/photo?`+Date.now(),
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
            try{
                const userPosts = await fetch(`http://localhost:3333/api/1.0.0/user/${friend_id}/post`,
                {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json', 'X-Authorization':data.token},
               });
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
}, [refresh]);

  const handleLike = async (post_id) => {
     try{
       await fetch(`http://localhost:3333/api/1.0.0/user/${friend_id}/post/${post_id}/like`,
          {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'X-Authorization':auth.token},
          }).then(async (response)=>{
            if(response.status == '400'){
              await fetch(`http://localhost:3333/api/1.0.0/user/${friend_id}/post/${post_id}/like`,
              {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'X-Authorization':auth.token},
              });
            }
          });
     }
     catch(e){
       console.log(e);
     }
    setRefresh(!refresh);
  }

  async function handleCreatePost(){
  try{
      await fetch(`http://localhost:3333/api/1.0.0/user/${friend_id}/post`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', 'X-Authorization':auth.token},
                  body: JSON.stringify({
                      text: newPost
                    })
               });
               setNewPost('');
               setRefresh(!refresh);
              getUserData();
    }
  catch(e){
    console.log("An error occurred posting!")
  }
}

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
            </>
          </View>
          <View style={styles.createPost}>
          <Text style={styles.createText}>Create new post! 
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
            </View>
          <ScrollView style={styles.body}>
            <FlatList
              data={posts}
              extraData={{refresh}}
              renderItem={({item}) => 
                <View style={styles.postBox} key={item.post_id}>
                  <Text>
                    {item.author.first_name} {item.author.last_name} Posted on: {new Date (item.timestamp).toLocaleDateString()}
                    {item.author.user_id == auth.id && 
                    <TouchableOpacity style={styles.edit} onPress={() => navigation.navigate('PostView',{postID: item.post_id, ID: userData.user_id})}>
                      <Text>Edit</Text>
                    </TouchableOpacity>
                  }
                  </Text>
                  <Text style={styles.text}>
                  {item.text}
                  </Text>
                  <Text style={styles.likes}>Likes: {item.numLikes}</Text>
                  <TouchableOpacity style={styles.button} onPress={()=>handleLike(item.post_id)}>
                    <Image source={require('../assets/like.png')} style={styles.likeImage} />
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

export default FriendProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6c94ac",    
  },
  image:{
    width: 100,
    height: 100,
    borderRadius:"50%",
    marginBottom:"5%",
  },
  likeImage:{
    width:20,
    height:20,
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
  },
  edit:{position: 'absolute',
    right: 20,},
  postButton:{  
    position: 'absolute',
    right: 20,
    backgroundColor: '#2f5476',
    color: 'white',
    padding:5,
  },
  button: {
    marginLeft: 'auto',
    marginTop: '7%',
  },
});
