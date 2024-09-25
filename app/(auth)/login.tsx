import { Feather, Ionicons } from '@expo/vector-icons';
import { Link, Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Colors from "@/constants/Colors";
import { useHeaderHeight } from '@react-navigation/elements';

export default function Login() {
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
              source={require('../../assets/images/auth/login.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>


        <View style={styles.textContainer}>
          <Text style={styles.titre}>Connexion</Text>
          <Text style={styles.desTitre}>Connectez-vous pour continuer.</Text>
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
              placeholder='Numéro de Téléphone' 
              placeholderTextColor='black' 
              style={styles.input}
            />
          </View>

          <View style={[styles.inputContainer, { marginTop: 15 }]}>
            <Ionicons 
              name='lock-closed-outline' 
              size={22} 
              style={styles.icon} 
              color={Colors.black} 
            />
            <TextInput  
              placeholder='Mot de Passe' 
              placeholderTextColor='black' 
              secureTextEntry={!passwordVisible} 
              style={[styles.input, { paddingRight: 40 }]} 
            />

            <TouchableOpacity 
              onPress={() => setPasswordVisible(!passwordVisible)} 
              style={styles.eyeIcon}>

              <Ionicons
                name={passwordVisible ? 'eye-off' : 'eye'}
                size={24}
                color="gray" />
            </TouchableOpacity>
          </View>


          <View style={{ marginTop: 15 }}>
            <TouchableOpacity > 
                <Text style={styles.desTitre}>
                    <Link href="/(auth)/oubliepwd" style={{ color:Colors.black }}>
                        Mot de passe oublié ? 
                    </Link> 
                </Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity style={styles.button} onPress={() =>  {} } > 
            <Text style={styles.buttonText}>Se Connecter</Text>
          </TouchableOpacity>

          <View style={{alignItems:"center"}}>
            <Text style={{
                color: Colors.black,
                }}> 
                Vous n'avez pas de compte ?{' '} 
                
                <Link href="/register" style={{ fontWeight:"600" }}>
                    Créez-en un.
                </Link> 
            </Text>
          </View>
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
    width: 200,
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
    fontWeight: "600",
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
    marginRight: 10,
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
    marginTop: 25,
    marginBottom: 10,
  },

  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});