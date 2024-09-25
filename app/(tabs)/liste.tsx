import { Ionicons, Feather } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import  Colors  from "@/constants/Colors";
import {useHeaderHeight} from '@react-navigation/elements';
import CategoriesButtons from '../../components/CategoriesButton';
import List_Page from '../../components/list_page';


const Page = () => {

    const headerHeight = useHeaderHeight(); 
    return (

        <>
        <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: 'Collecte de Fonds',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <View>
                <Feather name="arrow-left" size={20} style={{marginLeft:20,}} />
              </View>
            </TouchableOpacity>
          ),
        }}
        />

        <View style={[styles.container, {paddingTop: headerHeight}]}>
            <View style={styles.textContainer}>
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
            
            <ScrollView showsVerticalScrollIndicator={false}> 

                <List_Page/>

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