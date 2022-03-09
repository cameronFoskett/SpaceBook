import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as UserManagement from '../roots/UserManagement.js'

export default function CustomCamera({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    //checks if the app has access to camera at all times
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function takePicture(){
    //takes the picture and sets the photo to the update photo function
            const options = {
                quality: 0.5, 
                base64: true,
                onPictureSaved: (data) => updatePhoto(data)
            };
            await cameraRef.current.takePictureAsync(options);
    }

    async function updatePhoto(data){
    try {
      //converts to blob as didnt work unless doing so
      let res = await fetch(data.base64);
      let blob = await res.blob();

      //tries to update user pfp and the status replied will navigate the user or give error
      const response = await UserManagement.UPDATE_USER_PFP(blob);
      if(response.status == '200'){
        navigation.navigate("Profile");        
        return response;  
      }
      else if(response.status == '400'){
        alert(`Sorry that picture didn't work! Please try again`)
      }
      else if(response.status == '500'){
        alert(`Sorry there seems to be an issue with our server.`)
      } 
      else if(response.status == '401'){
        alert(`It seems you are not authorised to do that, try logging in first!`)
      }
    } catch (e) {
        console.log(e);
    }
    return null;
  }

  return (
    <>
    {!hasPermission ? 
      <><Text>No access to camera</Text></> : 
      <>
        <View style={styles.container}>
          <Camera 
            style={styles.camera} 
            type={Camera.Constants.Type.front}
            ref={cameraRef}
          >
          </Camera>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={takePicture}>
                <Text style={styles.text}> Take Photo </Text>
              </TouchableOpacity>
            </View>
        </View>
      </>
    }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6c94ac",
  },
  camera: {
    height:"70%",
    top: "25%",

  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: "center", 
  },
  button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    textAlign: "center",
    marginTop: "60%",
    backgroundColor: "#2f5476",
    color:'white',
  },
  text: {
    fontSize: "1.5rem",
    color: 'black',
  },
});
