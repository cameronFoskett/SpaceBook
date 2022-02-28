import React from 'react';
import { View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './screens/Login.js';
import CreateAccount from './screens/CreateAccount.js';
import Profile from './screens/Profile.js';
import Home from './screens/Home.js';
import Friends from './screens/Friends.js';
import CustomCamera from './screens/CustomCamera.js';
import FriendProfile from './screens/FriendProfile.js';
import FriendRequests from './screens/FriendsRequests.js';
import PostView from './screens/PostView.js';

import Tabs from './navigation/tabs';

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          title: 'Create Account', 
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FriendProfile"
        component={FriendProfile}
      />
      <Stack.Screen
        name="PostView"
        component={PostView}
      />
      <Stack.Screen
        name="Camera"
        component={CustomCamera}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FriendRequests"
        component={FriendRequests}
      />
    </Stack.Navigator> 
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

