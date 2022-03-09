import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Text, View, Image} from 'react-native';

import AccountManager from '../screens/AccountManager'
import Friends from '../screens/Friends';
import Profile from '../screens/Profile';



const Tab = createBottomTabNavigator();


const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                //I had to use styling here as I couldnt get the stylesheet to work with this tab navigator
                tabBarStyle:{
                    position: 'absolute',
                    bottom:25,
                    left:20,
                    right:20,
                    elevation:0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90,
                },
            }}
        >
            <Tab.Screen name="Profile" component={Profile} options={{
                //Each tab passes in focused to check if the tab is active and if so it changes colour of the icon 
                tabBarIcon: ({focused}) =>(
                    <View style={{alignItems:'center', justifyContent:'center', top:10}}>
                    <Image 
                    source={require('../assets/home.png')}
                    style={{
                        width:25,
                        height:25,
                        tintColor: focused ? '#e32f45' : '#748c94',
                        }}
                    />
                    {focused &&
                    <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize:12}}>Profile</Text>}
                    </View>
                ),
            }}/>
            <Tab.Screen name="Friends" component={Friends} options={{
                tabBarIcon: ({focused}) =>(
                    <View style={{alignItems:'center', justifyContent:'center', top:10}}>
                    <Image 
                    source={require('../assets/friends.png')}
                    style={{
                        width:25,
                        height:25,
                        tintColor: focused ? '#e32f45' : '#748c94',
                        }}
                    />
                    {focused &&
                    <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize:12}}>Friends</Text>}
                    </View>
                ),
            }}/>
            <Tab.Screen name="Account Manager" component={AccountManager} options={{
                tabBarIcon: ({focused}) =>(
                    <View style={{alignItems:'center', justifyContent:'center', top:10}}>
                    <Image 
                    source={require('../assets/user.png')}
                    style={{
                        width:25,
                        height:25,
                        tintColor: focused ? '#e32f45' : '#748c94',
                        }}
                    />
                    {focused &&
                    <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize:12}}>Settings</Text>}
                    </View>
                ),
            }}/>

        </Tab.Navigator>
    );
}
export default Tabs;