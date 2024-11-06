import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { useHeaderHeight } from '@react-navigation/elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Utilisation de AsyncStorage
import { Stack, router, Redirect } from 'expo-router';


const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const headerHeight = useHeaderHeight();

  const selectImage = async () => {
    // Demander la permission pour accéder à la galerie
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission refusée', 'Veuillez autoriser l\'accès à la galerie pour télécharger une image.');
      return;
    }

    // Ouvrir la galerie d'images
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Aucune image', 'Veuillez sélectionner une image avant de la télécharger.');
      return;
    }

    // Récupérer le token d'authentification depuis AsyncStorage
    const token = await AsyncStorage.getItem('userToken'); 

    if (!token) {
      Alert.alert('Erreur', 'Token d\'authentification non trouvé');
      return;
    }

    const formData = new FormData();
    const localUri = image;
    const filename = localUri.split('/').pop(); // Extraire le nom du fichier de l'URI
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image';

    formData.append('avatar', {
      uri: localUri,
      type: type,
      name: filename,
    });

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/upload_avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Passer le token dans l'en-tête de la requête
        },
      });

      setLoading(false);
      Alert.alert('Succès', response.data.message);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erreur', 'Une erreur est survenue lors du téléchargement de l\'image.');
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

        <Text style={styles.limitText}>Limite: 20MB | Formats: JPG, PNG, JPEG</Text>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={uploadImage}
          disabled={loading}
        >
          <Text style={styles.uploadButtonText}>
            {loading ? 'Chargement...' : 'Charger'}
          </Text>
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
});

export default UploadImage;
