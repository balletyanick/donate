import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, router } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import  Colors  from "@/constants/Colors";
import {useHeaderHeight} from '@react-navigation/elements';
import CategoriesButtons from '../../components/CategoriesButton';
import List_demande from '../../components/List_demande';
import List_ong from '../../components/List_ong';


const Page = () => {

    const headerHeight = useHeaderHeight(); 
    return (

        <>
        <Stack.Screen options={{

            headerTransparent: true,
            headerTitle: "",
            headerLeft: () => (
                <TouchableOpacity onPress={() => {}}  style={{ marginLeft:20 }}>
                    {/*<Image 
                        source={require('../../assets/images/avatar.jpg')}
                        style={{width:40, height:40, borderRadius:10}}
                    />*/}
                    <Ionicons  
                        name='person-circle-outline'
                        size={22} color={Colors.black} style={styles.IconNotif}
                    />
                </TouchableOpacity>
            ),

            headerRight: () => (
                <TouchableOpacity onPress={() => {router.push('/login')}}  style={{ marginLeft:20 }}>
                    <Ionicons  
                        name='notifications-outline'
                        size={22} color={Colors.black} style={styles.IconNotif}
                    />
                </TouchableOpacity>
            ),
        }} 
        />

        <View style={[styles.container, {paddingTop: headerHeight}]}>
            <ScrollView showsVerticalScrollIndicator={false}> 

                <View style={styles.textContainer}>
                    <Text style={styles.headTxt}>
                        Donnez avec le cœur, changez des vies
                    </Text>

                    <View style={styles.boxSearch} >

                        <View style={styles.BarSearch} >
                            <Ionicons  
                                name='search' 
                                size={22} 
                                style={{ marginRight:5, position:'relative', top:2 }} 
                                color={ Colors.black } 
                                />
                            <TextInput  placeholder='Recherche ...' placeholderTextColor='gray' />
                        </View>

                        <TouchableOpacity 
                            onPress={() => {}}
                            style={ styles.filtreBtn }
                            >
                            <Ionicons name='options' color={ Colors.white } size={28}/>
                        </TouchableOpacity> 
                    </View>
                </View>

                <CategoriesButtons/>

                <List_demande/>

                <List_ong/>

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

    }

});