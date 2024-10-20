import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import Colors from '@/constants/Colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';


const Page = () => {
  const headerHeight = useHeaderHeight();
  const [user, setUser] = useState(null); // État pour stocker les informations de l'utilisateur 

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUser(null); // Réinitialiser l'état de l'utilisateur
      // Rediriger vers la page de login si nécessaire
      router.push('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion : ', error);
    }
  };


  return (
    <>
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: "Paramètre",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} >
            <Feather style={{ paddingLeft: 20 }} name='arrow-left' size={20} />
          </TouchableOpacity>
        ),
      }} />

      <View style={[styles.container, { paddingTop: headerHeight }]}>
        {/* Profil Section */}
        <View style={styles.profileCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image 
              source={require('../../assets/images/avatar.jpg')} 
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.nom}>Ballet Yanick  </Text>
              <Text style={styles.role}>Donnateur  </Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.block}>
            <TouchableOpacity onPress={() => {router.push('/avatar')}} > 
              <View style={styles.menuItem}>
                <Ionicons name="camera-outline" size={24} color="#333" />
                <Text style={styles.menuText}> Avatar </Text>
                <Feather name="chevron-right" size={20} color="#333" style={styles.chevronIcon} />
              </View>
              <View style={styles.ligne} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {router.push('/compte')}} > 
              <View style={styles.menuItem}>
                <Ionicons name="person-outline" size={22} color="#333" />
                <Text style={styles.menuText}> Compte  </Text>
                <Feather name="chevron-right" size={20} color="#333" style={styles.chevronIcon} />
              </View>
              <View style={styles.ligne} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {router.push('/historique')}} > 
              <View style={styles.menuItem}>
                <Ionicons name="list-circle-outline" size={24} color="#333" />
                <Text style={styles.menuText}> Historique </Text>
                <Feather name="chevron-right" size={20} color="#333" style={styles.chevronIcon} />
              </View>
              <View style={styles.ligne} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {router.push('/historique')}} > 
              <View style={styles.menuItem}>
                <Ionicons name="bookmark-outline" size={22} color="#333" />
                <Text style={styles.menuText}> Enregistrées </Text>
                <Feather name="chevron-right" size={20} color="#333" style={styles.chevronIcon} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.block}>
            <TouchableOpacity onPress={() => {router.push('/mescagnotte')}} > 
              <View style={styles.menuItem}>
                <Ionicons name="list-circle-outline" size={24} color="#333" />
                <Text style={styles.menuText}> Mes Cagnottes </Text>
                <Feather name="chevron-right" size={20} color="#333" style={styles.chevronIcon} />
              </View>
              <View style={styles.ligne} />
            </TouchableOpacity>

            <View style={styles.menuItem}>
              <Ionicons name="lock-closed-outline" size={24} color="#333" />
              <Text style={styles.menuText}>Confidentialité </Text>
              <Feather name="chevron-right" size={20} color="#333" style={styles.chevronIcon} />
            </View>
            <View style={styles.ligne} />

            <View style={styles.menuItem}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
              <Text style={styles.menuText}> Notifications  </Text>
              <Feather name="chevron-right" size={20} color="#333" style={styles.chevronIcon} />
            </View>
          </View>

          <View style={styles.block2}>
            <View style={styles.menuItem}>
              <Ionicons name="share-outline" size={24} color="#333" />
              <Text style={styles.menuText}> Partager  </Text>
              <Feather name="chevron-right" size={20} color="#333" style={styles.chevronIcon} />
            </View>
            <View style={styles.ligne} />

            <View style={styles.menuItem}>
              <Ionicons name="information-circle-outline" size={24} color="#333" />
              <Text style={styles.menuText}> A Propos </Text>
              <Feather name="chevron-right" size={20} color="#333" style={styles.chevronIcon} />
            </View>
          </View>

          <View style={styles.boxLogout}>
            <TouchableOpacity onPress={logout}>
              <Text style={styles.TxtLogout}> Deconnexion </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },

   block: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical:5,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  block2: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical:5,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  textContainer: {
    marginLeft: 15,
  },

  nom: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  role: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },

  ligne: {
    height: 1,
    backgroundColor: '#ddd',
    width:"82%",
    marginLeft:"auto"
  },

  chevronIcon: {
    opacity: 0.7,
  },

  boxLogout: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },

  TxtLogout: {
    color: "red",
    fontSize: 16,
  },
});
