import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Link, Stack, router } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';


const UploadImage = () => {
  const [image, setImage] = useState(null);
  const UploadImg = () => {};
  const headerHeight = useHeaderHeight(); 

  return (
    <>
    <Stack.Screen options={{
      headerTransparent: true,
      headerTitle:"Avatar",

      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} >
          <View >
            <Feather name='arrow-left' size={20}/>
          </View>
        </TouchableOpacity>
      ),
    }}  />

    <View style={[styles.container, {paddingTop: headerHeight}]}>
      <TouchableOpacity style={styles.uploadBox} onPress={UploadImg}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />) : 
          (
          <>
            <Ionicons name="cloud-upload-outline" size={22} style={styles.icon} />
            <Text style={styles.uploadText}> Téléverser une image </Text>
          </>
        )}
      </TouchableOpacity>


      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Charger</Text>
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
    borderStyle:"dashed",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40,
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
  link: {
    color: '#FF69B4',
    textDecorationLine: 'underline',
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
