import { Feather, Ionicons } from '@expo/vector-icons';
import { Link, Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Colors from "@/constants/Colors";
import { useHeaderHeight } from '@react-navigation/elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';


export default function oubliepwd() {
  const headerHeight = useHeaderHeight(); 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // chargement

  // États pour chaque champ du formulaire
  const [phone, setPhone] = useState('');

   // États pour gérer les erreurs
   const [errors, setErrors] = useState({ phone: ''}); 
   const [serverError, setServerError] = useState('');

   const validateForm = () => {
    let valid = true;
    let newErrors = { phone: ''}
  
    if (!phone) {
      newErrors.phone = 'Le numéro de téléphone est obligatoire..';
      valid = false;
    } else if (phone.length !== 10) {
      newErrors.phone = 'Le numero de téléphone doit etre composé de 10 chiffres.';
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true); // demarrage chargement
        const response = await axios.post('https://donate.balambio.com/api/request_reset', {
          phone,
        });

        // Récupérer le token et le stocker dans AsyncStorage
        const token = response.data.token;
        await AsyncStorage.setItem('userToken', token);

        if (response.status === 200) {
          router.push('/(auth)/validecodepwd'); // Redirection vers une autre page
        } 
        else if (response.status === 404) {
          setServerError("Utilisateur non trouvé");
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
          <Text style={styles.titre}>Mot de passe oublié </Text>
          <Text style={styles.desTitre}>
              Entrez votre numéro de téléphone pour recevoir un code de vérification. 
              Ce code vous permettra de réinitialiser vos informations.
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
              placeholder='Numéro de Téléphone' 
              placeholderTextColor='black' 
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
    marginBottom: 30,
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