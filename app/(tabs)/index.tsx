import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import  Colors  from "@/constants/Colors";
import {useHeaderHeight} from '@react-navigation/elements';
import CategoriesButtons from '../../components/CategoriesButton';
import List_demande from '../../components/List_demande';
import List_ong from '../../components/List_ong';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { Stack, router, Redirect } from 'expo-router';

 
const Page: React.FC = () => {
    const headerHeight = useHeaderHeight(); 
    const authContext = useContext(AuthContext);
    const { isAuthenticated, userData, checkAuthStatus } = authContext; // Récupérer userData

    useEffect(() => {
      // Vérifie l'état de connexion et récupère les données utilisateur à chaque chargement
      checkAuthStatus();
    }, []);

    return (
        <>
        <Stack.Screen options={{
            headerTransparent: true,
            headerTitle: "",
            headerLeft: () => (
                <TouchableOpacity onPress={() => {}} style={{ marginLeft: 20 }}>
                    {isAuthenticated && userData ? (
                        <Image
                            source={{ uri: userData.data.avatar ? `http://10.0.2.2:8000/storage/${userData.data.avatar}` : 'https://via.placeholder.com/40' }}
                            style={{ width: 40, height: 40, borderRadius: 10 }}
                        />
                    ) : (
                        <Ionicons
                            name='person-circle-outline'
                            size={25}
                            color={Colors.black}
                            style={styles.IconNotif}
                        />
                    )}
                </TouchableOpacity>
            ),

            headerRight: () => (
                <TouchableOpacity onPress={() => { router.push('/login') }} style={{ marginLeft: 20 }}>
                    <Ionicons
                        name='notifications-outline'
                        size={22}
                        color={Colors.black}
                        style={styles.IconNotif}
                    />
                </TouchableOpacity>
            ),
        }} 
        />

        <View style={[styles.container, { paddingTop: headerHeight }]}>
            <ScrollView showsVerticalScrollIndicator={false}> 

                <View style={styles.textContainer}>
                    {isAuthenticated && userData ? (
                        <>
                            <Text style={styles.headTxt}>
                            {userData.data.first_name} donnez avec le cœur et changez des vies.. 
                            </Text>
                        </>
                    ) : (
                        <Text style={styles.headTxt}>
                            Donnez avec le cœur, changez des vies.
                        </Text>
                    )}
                    <View style={styles.boxSearch}>
                        <View style={styles.BarSearch}>
                            <Ionicons
                                name='search'
                                size={22}
                                style={{ marginRight: 5, position: 'relative', top: 2 }}
                                color={Colors.black}
                            />
                            <TextInput placeholder='Recherche ...' placeholderTextColor='gray' />
                        </View>

                        <TouchableOpacity
                            onPress={() => {}}
                            style={styles.filtreBtn}
                        >
                            <Ionicons name='options' color={Colors.white} size={28} />
                        </TouchableOpacity>
                    </View>
                </View>
                

                <CategoriesButtons />
                <List_demande />
                <List_ong />

            </ScrollView>
        </View>
        </>
    );
};





export default Page;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.bgColor,
        paddingHorizontal: 10,
    },

    IconNotif: {
        marginRight:25,
        backgroundColor: Colors.white,
        padding:10,
        borderRadius:10,
        shadowColor: "#171717",
        shadowOffset: { width:2, height:4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        overflow: 'hidden',
    },

    textContainer: {
        paddingHorizontal: 10,
    },

    headTxt: {
        fontSize:28,
        fontWeight: '800',
        color: Colors.black,
        paddingTop:10,
        lineHeight:35,
    },

    boxSearch: {
        flexDirection: 'row',
        marginVertical: 10,

    },

    BarSearch: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        padding: 13,
        borderRadius: 10,
    },

    filtreBtn: {
        backgroundColor: Colors.primaryColor,
        padding: 13,   
        borderRadius: 10,
        marginLeft: 20,
    },

});