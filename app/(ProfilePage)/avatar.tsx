import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { useHeaderHeight } from '@react-navigation/elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Utilisation de AsyncStorage
import { Stack, router, Redirect } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { ActivityIndicator } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import React, { useEffect, useState, useContext } from 'react';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const headerHeight = useHeaderHeight();

  // Verification Auth
  const authContext = useContext(AuthContext);
  const { isAuthenticated, checkAuthStatus, logout } = authContext;
  if (!isAuthenticated) return <Redirect href="/(tabs)/" />;

  useEffect(() => {
    // Vérifie l'état de connexion à chaque chargement
    checkAuthStatus();
  }, []);

  // État pour gérer l'erreur
  const [error, setError] = useState(''); 
  const [serverError, setServerError] = useState('');

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

  const upload = async () => {
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

    formData.append('avatar', {
      uri: localUri,
      type: type,
      name: fileName,
    });

    try {
      setLoading(true);
      const response = await axios.post('http://10.0.2.2:8000/api/upload_avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      setLoading(false);
      if (response.status === 200) {
        router.push('/(tabs)/setting'); 
      } 
    } 
    
    catch (error) {
      setError('Problème de connexion internet'); 
    }

    finally {
      setLoading(false); // Arrête le chargement après la requête
    }
  };

  return (
    <>
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: "Avatar",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} />
          </TouchableOpacity>
        ),
      }} />

      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <TouchableOpacity style={styles.uploadBox} onPress={selectImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={22} style={styles.icon} />
              <Text style={styles.uploadText}>Téléverser une image</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.limitText}>Limite: 10MB | Formats: JPG, PNG, JPEG</Text>

        {/* Affichage de l'erreur en texte rouge */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.uploadButton}onPress={upload} disabled={loading}>
          {
            loading ?  ( <ActivityIndicator size="small" color={Colors.white} />) : ( 
            <Text style={styles.uploadButtonText}> Charger </Text> )
          }
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  uploadBox: {
    width: 300,
    height: 200,
    borderWidth: 2,
    borderColor: Colors.black,
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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
  limitText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 50,
    color: Colors.black,
  },
  errorText: {
    color: 'red', // Texte rouge pour l'erreur
    fontSize: 12,
    marginBottom: 5,
  },
});

export default UploadImage;
