import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import  Colors  from "@/constants/Colors";

export default function  Layout() {

    return(
        <Tabs screenOptions={{
            
            tabBarStyle: {
                backgroundColor: Colors.bgColor,
                borderTopWidth: 0,
                height:80,
                elevation: 0,  // enlever une ombre sur android
                shadowOpacity: 0, // enlever une ombre sur ios
                paddingTop:15,
            },

            tabBarShowLabel: false,
            tabBarActiveTintColor: Colors.black,
            tabBarInactiveTintColor: '#999'
        }}>

            <Tabs.Screen 
            name='index' 
            options={{
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name={focused ? 'home' : 'home-outline'}
                    size={24}
                    color={focused ? Colors.primaryColor : 'black'}
                  />
                ),
            }} />

            <Tabs.Screen 
            name='categories' 
            options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons 
                    name={focused ? 'business' : 'business-outline'}
                    size={24} 
                    color={focused ? Colors.primaryColor : 'black'}
                />
                ),
            }} />

            <Tabs.Screen 
            name='ajouter' 
            options={{
                tabBarIcon: ({ color }) => ( 
                    <View 
                        style={{ 
                            backgroundColor:Colors.primaryColor, 
                            paddingHorizontal:16, 
                            paddingVertical:12, 
                            borderRadius:10,
                            height:50,   
                            }}>
                        <Ionicons name='add-outline' size={24} color={Colors.white} />
                    </View>
                ),
            }} />

            <Tabs.Screen 
            name='liste' 
            options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons 
                    name={focused ? 'list-circle' : 'list-circle-outline'}
                    size={28} 
                    color={focused ? Colors.primaryColor : 'black'}
                    />
                ),
            }} />


            <Tabs.Screen 
            name='setting' 
            options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons 
                    name={focused ? 'settings' : 'settings-outline'}
                    size={24} 
                    color={focused ? Colors.primaryColor : 'black'} 
                    />
                ),
            }} />

        </Tabs>
    )
}