import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Stack, router, Redirect } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import * as FileSystem from 'expo-file-system';
import { ActivityIndicator } from 'react-native';


export default function UploadImage() {
  const headerHeight = useHeaderHeight(); 
  const [open, setOpen] = useState(false); // Dropdown
  const [value, setValue] = useState(null); // Dropdown
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Verification Auth
  const authContext = useContext(AuthContext);
  const { isAuthenticated, checkAuthStatus, logout } = authContext;
  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;

  useEffect(() => {
    // Vérifie l'état de connexion à chaque chargement
    checkAuthStatus();
  }, []);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  // États pour chaque champ du formulaire
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState([
    { label: 'Education', value: 'Education' }, { label: 'ONG', value: 'ONG' },
    { label: 'Soins de santé', value: 'Soins de santé' }, { label: 'Art & Culture', value: 'Art & Culture' },
    { label: 'Autre', value: 'Autre' },
  ]);
  const [amount, setAmount] = useState('');
  const [city, setCity] = useState('');
  const [link_justify, setLink_justify] = useState('');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);  // chargement


  // États pour gérer les erreurs
  const [errors, setErrors] = useState({ image: '', title: '', description: '', 
  category: '', amount: '', city: '', link_justify:'', date:''});
  const [serverError, setServerError] = useState('');
  const [error, setError] = useState(''); 



  const validateForm = () => {
    const today = new Date();
    let valid = true;
    let newErrors = { image: '', title: '', description: '', 
      category: '', amount: '', city: '', link_justify:'', date:''}
  
    if (!image) {
      newErrors.image = 'Veuillez téléverser une image.';
      valid = false;
    }
  
    if (!title) {
      newErrors.title = 'Le title est obligatoire.';
      valid = false;
    } else if (title.length < 3) {
      newErrors.title = 'Le title doit contenir au moins 3 caractères.';
      valid = false;
    }
  
    if (!description) {
      newErrors.description = 'La description est obligatoire.';
      valid = false;
    } else if (description.length < 3) {
      newErrors.description = 'La description doit contenir au moins 3 caractères.';
      valid = false;
    }
  
    if (!value) {
      newErrors.category = 'Veuillez sélectionner une catégorie.';
      valid = false;
    }

    if (!amount) {
      newErrors.amount = 'Le montant est obligatoire.';
      valid = false;
    } else if (amount.length < 4) {
      newErrors.amount = 'Le montant doit contenir au moins 4 caractères.';
      valid = false;
    }
  
    if (!city) {
      newErrors.city = 'La localisation est obligatoire.';
      valid = false;
    } else if (city.length < 3) {
      newErrors.city = 'La localisation doit contenir au moins 3 caractères.';
      valid = false;
    }

    if (date <= today) {
      newErrors.date = 'La date de fin doit être supérieure à aujourd\'hui.';
      valid = false;
    } else if (!date) {
      newErrors.date = 'Veuillez sélectionner une date';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const selectImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted) {
            openImagePicker();
        } else {
            Alert.alert('Permission refusée', 'Veuillez autoriser l\'accès à la galerie pour télécharger une image.');
        }
    } else {
        openImagePicker();
    }
  };  

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
  };

  const resetForm = () => {
    setImage(null);
    setTitle('');
    setDescription('');
    setAmount('');
    setCity('');
    setValue(null);
    setDate(new Date());
  };

  const handleSubmit = async () => {
    if (validateForm()) {

      if (!image) {
        setError('Veuillez sélectionner une image avant de la télécharger.'); 
        return;
      }

      const fileInfo = await FileSystem.getInfoAsync(image);
      const fileSizeInMB = fileInfo.size / (1024 * 1024); 

      if (fileSizeInMB > 10) {
        setError('La taille de l\'image ne doit pas dépasser 10 Mo.'); 
        return;
      }

      const filename = image.split('/').pop();
      const match = /\.(jpg|jpeg|png)$/i.exec(filename || '');
      if (!match) {
        setError('Seuls les images de type JPG, PNG et JPEG sont autorisés.'); 
        return;
      }

      const token = await AsyncStorage.getItem('userToken');

      const formData = new FormData();
      const localUri = image;
      const fileName = localUri.split('/').pop();
      const type = `image/${match[1].toLowerCase()}`;
  
      formData.append('picture', {
        uri: localUri,
        type: type,
        name: fileName,
      });
  
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', value);
      formData.append('amount', amount);
      formData.append('city', city);
      formData.append('link_justify', link_justify);
      formData.append('date_end', date.toISOString().split('T')[0]);

      try {
        setLoading(true);
        const response = await axios.post('http://10.0.2.2:8000/api/add_cagnotte', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 201) {
          resetForm();
          router.push('/(tabs)/'); // exemple de redirection
        }
      } 
      
      catch (error) {
        setServerError("Problème de connexion internet");
      }

      finally {
        setLoading(false); // Arrête le chargement après la requête
      }
    }
  };
 

  return (
    <>
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: "Démarrer une cagnottes",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <View>
              <Feather name='arrow-left' size={20} style={{ marginLeft: 20 }} />
            </View>
          </TouchableOpacity>
        ),
      }} />

        <KeyboardAvoidingView style={[styles.container, { paddingTop: headerHeight }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <TouchableOpacity style={image ? styles.uploadBoxSelected : styles.uploadBox} onPress={selectImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <>
                  <Ionicons name="cloud-upload-outline" size={22} style={styles.icon} />
                  <Text style={styles.uploadText}> Téléverser une image </Text>
                </>
              )}
              {errors.image ? <Text style={styles.errorText}>{errors.image}</Text> : null}
            </TouchableOpacity>

            <View style={styles.boxinput}>
              <Text> Titre </Text>
              <TextInput  
                placeholder='Saisir le title' 
                placeholderTextColor='#11182744'  
                style={styles.input}
                value={title}
                onChangeText={setTitle}
              />
            {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}
            </View>

            <View style={styles.boxinput}>
              <Text> Description </Text>
              <TextInput  
                placeholder='Saisir la description' 
                placeholderTextColor='#11182744' 
                multiline
                numberOfLines={4}
                style={styles.inputdes}
                value={description}
                onChangeText={setDescription}
              />
              {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}
            </View>

            <View style={{ marginBottom: 25,   zIndex: 1000,  }}>
              <Text> Catégories </Text>
              <DropDownPicker
                open={open}
                value={value}
                items={category}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setCategory}
                placeholder="Sélectionnez une catégorie"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
              />
              {errors.category ? <Text style={{  color: 'red',fontSize: 12,marginTop: 15,}}>{errors.category}</Text> : null}
            </View>

            <View style={styles.boxinput}>
              <Text> Montant </Text>
              <TextInput  
                placeholder='Saisir le montant' 
                placeholderTextColor='#11182744' 
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            {errors.amount ? <Text style={styles.errorText}>{errors.amount}</Text> : null}
            </View>

            <View style={styles.boxinput}>
              <Text> Ville </Text>
              <TextInput  
                placeholder='Saisir la ville' 
                placeholderTextColor='#11182744' 
                style={styles.input}
                value={city}
                onChangeText={setCity}
              />
            {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
            </View>

            <View style={styles.boxinput}>
              <Text> Date de fin </Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text style={{ color: date ? Colors.black : '#11182744' }}>
                  {date ? date.toLocaleDateString('fr-FR') : 'Sélectionnez une date'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="calendar"
                  onChange={onChangeDate}
                />
              )}
              {errors.date ? <Text style={styles.errorText}>{errors.date}</Text> : null}
            </View>

            <View style={styles.boxinput}>
              <Text> Lien <Text style={styles.facultatif}> (Facultatif)</Text> </Text>
              <TextInput  
                placeholder='Lien pour confirmer vos affirmations ' 
                placeholderTextColor='#11182744' 
                style={styles.input}
                value={link_justify}
                onChangeText={setLink_justify}
              />
              {serverError && (<Text style={styles.errorText}> {serverError} </Text> )}
            </View>

            <TouchableOpacity style={styles.button}  onPress={handleSubmit} disabled={loading}>
              {
                loading ? ( <ActivityIndicator size="small" color={Colors.white} />) : ( 
                <Text style={styles.buttonText}> Enregistrer </Text> )
              }
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  uploadBox: {
    width: "100%",
    height: 180,
    borderWidth: 2,
    borderColor: Colors.black,
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
  },

  uploadBoxSelected: {
    width: "100%",
    height: 180,
    borderWidth: 2,
    borderColor: Colors.bgColor,
    borderStyle: "solid",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
  },

  uploadText: {
    color: Colors.black,
    marginTop: 10,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  icon: {
    fontSize: 50,
    color: Colors.black,
  },
  boxinput: {
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    paddingVertical: 12,
    marginTop: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: Colors.black,
    backgroundColor: Colors.white,
    borderColor: Colors.bgColor,
    borderWidth: 1,
    justifyContent: 'center',
  },
  inputdes: {
    flex: 1,
    height: 100,
    paddingVertical: 8,
    lineHeight: 18,
    marginTop: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: Colors.black,
    backgroundColor: Colors.white,
    borderColor: Colors.bgColor,
    borderWidth: 1,
  },

 dropdown: {
  flex: 1,
  height: 40,
  paddingHorizontal: 10,
  marginTop: 6,
  color: Colors.black,
  backgroundColor: Colors.white,
  borderColor: Colors.bgColor,
  borderWidth: 1,
},
dropdownContainer: {
  backgroundColor: Colors.bgColor,
  borderColor: Colors.bgColor,
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

facultatif: {
  fontSize: 12,
},


});