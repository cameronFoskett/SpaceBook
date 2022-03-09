import React, { useState, useEffect } from 'react';
import { StyleSheet,  View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import * as FriendManagement from '../roots/FriendManagement.js'
import * as CustomAsyncStorage from '../roots/CustomAsyncStorage.js'


export default function Friends() {
const [friends, setFriends] = useState([]);
const [refresh, setRefresh] = useState(false);
const [loading, setLoading] = useState(true);

const getUserData = async () => {
  try {
    const data = await CustomAsyncStorage.getData();
      if(data){
        try {
          //gets all the friend requests of the user
          const response = await FriendManagement.FRIENDREQUESTS();
          const data = await response.json();
          setFriends(data);
          setLoading(false);
          }
          catch(e){
            console.log(e);
          }
      }
  } catch (e) {
    alert('Failed to fetch the data')
    console.log(e);
  }
}

const acceptRequest = async (id) => {
  try{
    //accepts the request and refreshes lisst
    await FriendManagement.ACCEPT_REQUEST(id);
    setRefresh(!refresh);
  }catch(e){
    console.log(e);
  }
}

const rejectRequest = async (id) => {
  try{
    //rejects friend request and refreshes list
    await FriendManagement.REJECT_REQUEST(id);
    setRefresh(!refresh);
  }catch(e){
    console.log(e);
  }
}


useEffect(() =>{
    getUserData();
}, [refresh]);

  return (
    <>
      <ScrollView style={styles.container}>
        {loading ? <Text> ...Loading </Text> :
        <FlatList
              data={friends}
              extraData={{refresh}} 
              renderItem={({item}) =>
                <View style={styles.postBox} key={item.user_id}>
                  <Text>
                    {item.first_name} {item.last_name}
                  </Text>
                  <TouchableOpacity onPress={()=>acceptRequest(item.user_id)}>
                    <Text>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>rejectRequest(item.user_id)}>
                    <Text>Reject</Text>
                  </TouchableOpacity>
                </View>
                }
            />
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
  postBox: {
    padding:5,
    margin:10,
    backgroundColor: '#9FD2FF',
    borderRadius:20,
    height:120,
  },
});
