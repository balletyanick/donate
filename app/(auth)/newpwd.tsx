import { Feather, Ionicons } from '@expo/vector-icons';
import { Link, Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Colors from "@/constants/Colors";
import { useHeaderHeight } from '@react-navigation/elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

export default function NewPassword() {
  const headerHeight = useHeaderHeight(); 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // chargement

    // États pour chaque champ du formulaire
    const [password, setPassword] = useState('');
  
    // États pour gérer les erreurs
    const [errors, setErrors] = useState({ password: '' }); 
    const [serverError, setServerError] = useState('');

    const validateForm = () => {
      let valid = true;
      let newErrors = { password: ''}
    
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
          const token = await AsyncStorage.getItem('userToken'); // Récupérer le token depuis AsyncStorage
    
          if (!token) {
            setServerError("Erreur d'authentification, veuillez réessayer.");
            return;
          }
    
          // Envoyer le code de vérification au serveur
          const response = await axios.post(
            'https://donate.balambio.com/api/password_reset',{ password },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.status === 200) {
            router.push('/(tabs)/');
          } 
          else if (response.status === 404) {
            setServerError("Utilisateur non trouvé");
            return;
          } 
        } 
  
        catch (error) {
          setServerError("Problème de connexion internet");
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

      headerLeft: () => (+
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
              source={require('../../assets/images/auth/NewPwd.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titre}>Nouveau mot de passe </Text>
          <Text style={styles.desTitre}>
          Veuillez entrer un nouveau mot de passe pour votre compte. 
          Assurez-vous de choisir un mot de passe sécurisé et de le confirmer ci-dessous.
          </Text>
        </View>

        <View>
          <View style={styles.inputContainer}>
            <Ionicons 
              name='lock-closed-outline' 
              size={22} 
              style={styles.icon} 
              color={Colors.black} 
            />
            <TextInput  
              placeholder='Nouveau Mot de Passe' 
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

          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
          {
            isLoading ? ( <ActivityIndicator size="small" color={Colors.white} />) : ( 
            <Text style={styles.buttonText}> Confirmer </Text>  )
          }
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

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});