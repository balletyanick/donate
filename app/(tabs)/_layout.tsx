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
                height:70,
                elevation: 0,  // enlever une ombre sur android
                shadowOpacity: 0, // enlever une ombre sur ios
            },

            tabBarShowLabel: false,
            tabBarActiveTintColor: Colors.black,
            tabBarInactiveTintColor: '#999'
        }}>

            <Tabs.Screen 
            name='index' 
            options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="home" size={35} color={color} />
                ),
            }} />

            <Tabs.Screen 
            name='categories' 
            options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="space-dashboard" size={28} color={color} />
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
                tabBarIcon: ({ color }) => (
                    <Ionicons name='bookmark' size={28} color={color} />
                ),
            }} />


            <Tabs.Screen 
            name='profile' 
            options={{
                tabBarIcon: ({ color }) => (
                    <FontAwesome name='user' size={28} color={color} />
                ),
            }} />

        </Tabs>
    )
}