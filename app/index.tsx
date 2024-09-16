import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Stack, router } from 'expo-router';
import Colors from "@/constants/Colors";
import Onboarding from 'react-native-onboarding-swiper';

const Done = ({ ...props }) => (
  <TouchableOpacity 
    onPress={() => router.push('/(tabs)')} 
    style={styles.DoneBtn}
  >
    <Text style={{ marginHorizontal: 8 }}> DEMARRER </Text>
  </TouchableOpacity>
);

export default function notice() {
  return (
    <>
    <Stack.Screen options={{
      headerTransparent: true,
      headerTitle:"",

      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} />
      ),

      headerRight: () => (
        <TouchableOpacity onPress={() => {}} />
      )
    }}  />

    <Onboarding
      onSkip={() => router.push("/(tabs)")}
      onDone={() => router.push("/(tabs)")}
      skipLabel={"PASSER"}
      nextLabel={"SUIVANT"}
      DoneButtonComponent={Done}
      bottomBarHighlight={false}
      imageContainerStyles={{
        paddingBottom: 30
      }}
      subTitleStyles={{
        marginHorizontal: 25, 
        fontSize:14, 
        lineHeight:23, 
      }}
      titleStyles={{
        fontSize:24,
        fontWeight:'700'
      }}
      pages={[
        {
          backgroundColor: '#f7bb64',
          image: <Image source={require('../assets/images/img2.png')} />,
          title: 'Bienvenue Notre App',
          subtitle: 'Bienvenue sur notre application Lorem Ipsum is simply dummy text of the is simply',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('../assets/images/img3.png')} />,
          title: 'Bienvenue Notre App',
          subtitle: 'Bienvenue sur notre application Lorem Ipsum is simply dummy text of the is simply',
        },
        {
            backgroundColor: '#a7f3d0',
            image: <Image source={require('../assets/images/img1.png')} />,
            title: 'Bienvenue Notre App',
            subtitle: 'Bienvenue sur notre application Lorem Ipsum is simply dummy text of the is simply',
          },
      ]}
    />
    </>
  )
}

const styles = StyleSheet.create({
  DoneBtn: {
    padding: 20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
});
