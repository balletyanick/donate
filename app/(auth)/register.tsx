import { Feather, Ionicons } from '@expo/vector-icons';
import { Link, Stack, router } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Colors from "@/constants/Colors";
import { useHeaderHeight } from '@react-navigation/elements';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';


export default function Register() {

  const headerHeight = useHeaderHeight();
  const [passwordVisible, setPasswordVisible] = useState(false); // État pour mot de passe invisible
  const [isLoading, setIsLoading] = useState(false); // chargement


  // États pour chaque champ du formulaire
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [accepted_terms, setAccepted_terms] = useState(false);

  // États pour gérer les erreurs
  const [errors, setErrors] = useState({ first_name: '', last_name: '', phone: '', password: '', accepted_terms: '' }); 
  const [serverError, setServerError] = useState('');

  const validateForm = () => {
    let valid = true;
    let newErrors = { first_name: '', last_name: '', phone: '', 
      password: '', accepted_terms: ''}

    if (!first_name) {
      newErrors.first_name = 'Le nom est obligatoire.';
      valid = false;
    } else if (first_name.length < 3) {
      newErrors.first_name = 'Le nom doit contenir au moins 3 caractères.';
      valid = false;
    }
  
    if (!last_name) {
      newErrors.last_name = 'Le prenom est obligatoire.';
      valid = false;
    } else if (last_name.length < 3) {
      newErrors.last_name = 'Le prenom doit contenir au moins 3 caractères.';
      valid = false;
    }
  
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
  
    if (!accepted_terms) {
      newErrors.accepted_terms = 'Acceptez les conditions générales et la politique de confidentialité.';
      valid = false;
    } 
  
    setErrors(newErrors);
    return valid;
  };


  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true); // demarrage chargement
        const response = await axios.post('https://donate.balambio.com/api/register', {
          first_name,
          last_name,
          phone,
          password,
          accepted_terms,
        });

        // Récupérer le token et le stocker dans AsyncStorage
        const token = response.data.token;
        await AsyncStorage.setItem('userToken', token);

        if (response.status === 201) {
          router.push('/(auth)/validecode'); // Redirection vers une autre page
        } 
        else if (response.status === 409) {
          setServerError("Le numéro de téléphone est déjà utilisé par un autre utilisateur.");
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
      {isLoading ? ( // Afficher l'indicateur de chargement si isLoading est true
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
          </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={() => {}}>
                <Image 
                  source={require('../../assets/images/auth/register.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>


            <View style={styles.textContainer}>
              <Text style={styles.titre}>Inscription</Text>
              <Text style={styles.desTitre}>inscrivez-vous pour continuer.</Text>
            </View>

            <View>
              <View style={styles.inputContainer}>
                <Ionicons 
                  name='person-outline' 
                  size={22} 
                  color={Colors.black} 
                  style={styles.icon} 
                />
                <TextInput  
                  placeholder='Nom' 
                  placeholderTextColor='black' 
                  style={styles.input}
                  value={first_name}
                  onChangeText={setFirst_name}
                />
              </View>
              {errors.first_name ? <Text style={styles.errorText}>{errors.first_name}</Text> : null}



              <View style={[styles.inputContainer, { marginTop: 15 }]}>
                <Ionicons 
                  name='person-outline' 
                  size={22} 
                  color={Colors.black} 
                  style={styles.icon} 
                />
                <TextInput  
                  placeholder='Prenoms' 
                  placeholderTextColor='black' 
                  style={styles.input}
                  value={last_name}
                  onChangeText={setLast_name}
                />
              </View>
              {errors.last_name ? <Text style={styles.errorText}>{errors.last_name}</Text> : null}


              <View style={[styles.inputContainer, { marginTop: 15 }]}>
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

              {/* Section Checkbox */}
              <View style={styles.checkboxContainer}>
                <Checkbox
                  value={accepted_terms}
                  onValueChange={setAccepted_terms}
                  color={accepted_terms ? Colors.primaryColor : undefined}
                />
                <Text style={styles.checkboxLabel}>
                  J'accepte les{' '}
                  <Text style={{ fontWeight: 'bold' }}>conditions générales</Text> et la{' '}
                  <Text style={{ fontWeight: 'bold' }}>politique de confidentialité</Text>.
                </Text>
              </View>
              {errors.accepted_terms ? <Text style={styles.errorText}>{errors.accepted_terms}</Text> : null}
              {serverError && (<Text style={styles.errorText}> {serverError} </Text> )}

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}> Inscription </Text>
              </TouchableOpacity>

      
              <View style={{alignItems:"center", marginBottom:50,}}>
                <Text style={{
                    color: Colors.black,
                    }}> 
                    Vous avez déja un compte ?{' '} 
                    
                    <Link href="/login" style={{ fontWeight:"600" }}>
                      Connectez-vous.
                    </Link> 
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
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

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginLeft:5,
  },

  checkboxLabel: {
    marginLeft: 10,
    color: Colors.black,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


});