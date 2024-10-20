import { Feather, Ionicons } from '@expo/vector-icons';
import { Link, Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Colors from "@/constants/Colors";
import { useHeaderHeight } from '@react-navigation/elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';


export default function Login() {
  const headerHeight = useHeaderHeight(); // Hauteur Header
  const [passwordVisible, setPasswordVisible] = useState(false); // État pour mot de passe invisible
  const [isLoading, setIsLoading] = useState(false); // chargement

  // États pour chaque champ du formulaire
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // États pour gérer les erreurs
  const [errors, setErrors] = useState({ phone: '', password: '' }); 
  const [serverError, setServerError] = useState('');

  const validateForm = () => {
    let valid = true;
    let newErrors = { phone: '', password: ''}
  
    if (!phone) {
      newErrors.phone = 'Le numéro de téléphone est obligatoire..';
      valid = false;
    } else if (phone.length !== 10) {
      newErrors.phone = 'Le numero de téléphone doit etre composé de 10 chiffres.';
      valid = false;
    }
  
    if (!password) {
      newErrors.password = 'Le mot de passe est obligatoire.';
      valid = false;
    } else if (password.length < 3) {
      newErrors.password = 'Le mot de passe doit contenir au moins 3 caractères.';
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };


  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true); // demarrage chargement
        const response = await axios.post('https://donate.balambio.com/api/login', {
          phone,
          password,
        });

        // Récupérer le token et le stocker dans AsyncStorage
        const token = response.data.token;
        await AsyncStorage.setItem('userToken', token);

        if (response.status === 200) {
          router.push('/(auth)/validecode'); 
        } 
        else if (response.status === 401) {
          setServerError("Numéro de téléphone ou mot de passe incorrect");
          return;
        } 
      }
      
      catch (error) {
        setServerError('Problème de connexion internet');
      }

      finally {
        setIsLoading(false); // Arrête le chargement après la requête
      }
    }
  };



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


      <KeyboardAvoidingView style={[styles.container, { paddingTop: headerHeight }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
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
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
              {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}


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
                  value={password}
                  onChangeText={setPassword}
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
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
              {serverError && (<Text style={styles.errorText}> {serverError} </Text> )} 

              <View style={{ marginTop: 15 }}>
                <TouchableOpacity > 
                    <Text style={styles.desTitre}>
                        <Link href="/(auth)/oubliepwd" style={{ color:Colors.black }}>
                            Mot de passe oublié ? 
                        </Link> 
                    </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
                {
                  isLoading ? ( <ActivityIndicator size="small" color={Colors.white} />) : ( 
                  <Text style={styles.buttonText}>Se Connecter</Text>  )
                }
              </TouchableOpacity>

              <View style={{alignItems:"center", marginBottom:50,}}>
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
        </ScrollView>
      </KeyboardAvoidingView>
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

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});