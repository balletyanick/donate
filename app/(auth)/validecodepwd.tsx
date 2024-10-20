import { Feather, Ionicons } from '@expo/vector-icons';
import { Link, Stack, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Colors from "@/constants/Colors";
import { useHeaderHeight } from '@react-navigation/elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';


export default function ValiderCode() {
  const headerHeight = useHeaderHeight(); 
  const [user, setUser] = useState(null);   // États pour stocker les infos de l'utilisateur
  const [verification_code, setVerification_code] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); // chargement
  const [timeLeft, setTimeLeft] = useState(600); //decompte

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timer); // Nettoie le timer lorsque le composant se démonte ou le temps est modifié
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };


  // États pour gérer les erreurs
  const [errors, setErrors] = useState({verification_code: ''}); 
  const [serverError, setServerError] = useState('');

  const validateForm = () => {
    let valid = true;
    let newErrors = { verification_code: ''}
  
    if (!verification_code) {
      newErrors.verification_code = 'Le code est obligatoire..';
      valid = false;
    } else if (verification_code.length !== 4) {
      newErrors.verification_code = 'Le code doit etre composé de 4 chiffres.';
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
          'https://donate.balambio.com/api/verifie_code',{ verification_code },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          router.push('/(auth)/newpwd');
        } 
        else if (response.status === 404) {
          setServerError("Utilisateur non trouvé");
          return;
        } 
        
        else if (response.status === 400) {
          setServerError("Code invalide ou expiré");
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

  const CodeSubmit = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Récupérer le token depuis AsyncStorage
  
        if (!token) {
          setServerError("Erreur d'authentification, veuillez réessayer.");
          return;
        }
  
        // Envoyer le code de vérification au serveur
        const response = await axios.post(
          'http://localhost:8000/api/resend_code', 
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          router.push('/validecode');
        } 
        else if (response.status === 404) {
          setServerError("Utilisateur non trouvé");
          return;
        } 
      } 

      catch (error) {
        setServerError("Problème de connexion internet");
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
            Le code est valide pendant: <Text style={styles.timer}> {formatTime(timeLeft)} </Text>
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
              value={verification_code}
              onChangeText={setVerification_code}
            />
          </View>
          {errors.verification_code ? <Text style={styles.errorText}>{errors.verification_code}</Text> : null}
          {serverError && (<Text style={styles.errorText}> {serverError} </Text> )}
          
          <View style={{ marginTop: 15 }}>
                <Text >
                    Vous n'avez pas recu de code ?{' '}
                    <Text onPress={CodeSubmit} style={{ fontWeight:"700"}}>
                         Renvoyer 
                    </Text> 
                </Text>
          </View>


          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
          {
          isLoading ? ( <ActivityIndicator size="small" color={Colors.white} />) : (
            <Text style={styles.buttonText}> Confirmer </Text> )
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

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },

  timer: {
    color: Colors.black,
    fontWeight: '700',
  },
});