import { Feather, Ionicons } from '@expo/vector-icons';
import { Link, Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Colors from "@/constants/Colors";
import { useHeaderHeight } from '@react-navigation/elements';

export default function ValiderCode() {
  const headerHeight = useHeaderHeight(); 
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <Stack.Screen options={{
      headerTransparent: true,
      headerTitle:"",

      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()}   >
          <View>
            <Feather name='arrow-left' size={20}/>
          </View>
        </TouchableOpacity>
      ),

    }}  />

      <View style={[styles.container, {paddingTop: headerHeight}]}>

        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Image 
              source={require('../../assets/images/auth/lock.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>


        <View style={styles.textContainer}>
          <Text style={styles.titre}>Code de validation </Text>
          <Text style={styles.desTitre}>
            Veuillez entrer le code à 4 chiffres que vous avez reçu par 
            SMS sur votre numéro de téléphone.
          </Text>
        </View>



        <View>
          <View style={styles.inputContainer}>
            <Ionicons 
              name='phone-portrait-outline' 
              size={22} 
              color={Colors.black} 
              style={styles.icon} 
            />
            <TextInput  
              placeholder='Code' 
              placeholderTextColor='black' 
              style={styles.input}
            />
          </View>

          
          <View style={{ marginTop: 15 }}>
                <Text>
                    Vous n'avez pas recu de code ?{' '}
                    <Link href="#" style={{ fontWeight:"600"}}>
                         Renvoyer 
                    </Link> 
                </Text>
          </View>


          <TouchableOpacity style={styles.button} onPress={() =>  {router.push('/(auth)/newpwd')} }>
            <Text style={styles.buttonText}> Confirmer </Text>
          </TouchableOpacity>

        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },


  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  image: {
    width: 250,
    height: 200,
  },

  textContainer: {
    marginBottom: 25,
  },

  titre: {
    fontSize: 28,
    color: Colors.black,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  desTitre: {
    color: Colors.black,
    lineHeight: 22,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: Colors.bgColor,
  },

  icon: {
    marginLeft: 15,
  },

  input: {
    flex: 1,
    height: 30,
    paddingHorizontal: 10,
    color: Colors.black,
  },

  eyeIcon: {
    position: 'absolute',
    right: 15,
  },

  button: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },

  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});