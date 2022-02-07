import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, Image, TouchableOppacity} from 'react-native';

import Login from '../screens/Login';
import Friends from '../screens/Friends';
import Profile from '../screens/Profile';



const Tab = createBottomTabNavigator();


const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle:{
                    position: 'absolute',
                    bottom:25,
                    left:20,
                    right:20,
                    elevation:0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                },
            }}
        >
            <Tab.Screen name="Login" component={Login} options={{
                tabBarIcon: ({focused}) =>(
                    <View style={{alignItems:'center', justifyContent:'center', top:10}}>
                    <Image 
                    source={require('../assets/home.png')}
                    resizeMode = 'contain'
                    style={{
                        width:25,
                        height:25,
                        tintColor: focused ? '#e32f45' : '#748c94',
                        }}
                    />
                    {focused &&
                    <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize:12}}>Home</Text>}
                    </View>
                ),
            }}/>
            <Tab.Screen name="Friends" component={Friends} options={{
                tabBarIcon: ({focused}) =>(
                    <View style={{alignItems:'center', justifyContent:'center', top:10}}>
                    <Image 
                    source={require('../assets/friends.png')}
                    resizeMode = 'contain'
                    style={{
                        width:25,
                        height:25,
                        tintColor: focused ? '#e32f45' : '#748c94',
                        }}
                    />
                    {focused &&
                    <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize:12}}>Tickets</Text>}
                    </View>
                ),
            }}/>
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({focused}) =>(
                    <View style={{alignItems:'center', justifyContent:'center', top:10}}>
                    <Image 
                    source={require('../assets/user.png')}
                    resizeMode = 'contain'
                    style={{
                        width:25,
                        height:25,
                        tintColor: focused ? '#e32f45' : '#748c94',
                        }}
                    />
                    {focused &&
                    <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize:12}}>Support</Text>}
                    </View>
                ),
            }}/>

        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow:{
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width:0,
            height:10,
        },
        shadowOppacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
});

export default Tabs;