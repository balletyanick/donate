import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import axios from 'axios'; // Assure-toi d'avoir installé axios avec `npm install axios` ou `yarn add axios`
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import { ActivityIndicator } from 'react-native';


const List_demand = () => {
  const [cagnottes, setCagnottes] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // chargement   

  useEffect(() => {
    // Fonction pour récupérer les cagnottes
    const fetchCagnottes = async () => {
      try {
        setIsLoading(true); // demarrage chargement
        const response = await axios.get('https://donate.balambio.com/api/afficher_all_cagnotte_active'); 

        if (response.status === 200) {
          setCagnottes(response.data.data);
        }
      } 
      
      catch (error) {
        console.error('Erreur lors de la récupération des cagnottes:', error);
      }

      finally {
        setIsLoading(false); // Arrête le chargement après la requête
      }
    };

    fetchCagnottes();
  }, []);

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 20,
          marginBottom: 10,
        }}
      >
        { !isLoading ? (
          cagnottes.map((cagnotte, index) => (
            <TouchableOpacity
              key={index}
              style={styles.container}
              onPress={() => {
                router.push(`/(details)/${cagnotte.id}`); // Rediriger vers une page de détails
              }}
            >
              <View style={styles.boxImage}>
                <Image
                  source={{ uri: cagnotte.picture ? `http://localhost:8000/storage/${cagnotte.picture}` : 'https://via.placeholder.com/40' }}
                  style={styles.image}
                />
                <View style={styles.bookmark}>
                  <Ionicons name="bookmark-outline" size={20} color={Colors.white} />
                </View>

                <Text style={styles.Txt} numberOfLines={1} ellipsizeMode="tail">
                  {cagnotte.title.charAt(0).toUpperCase() + cagnotte.title.slice(1).toLowerCase()}
                </Text>

                <View style={styles.Locate}>
                  <View style={styles.boxLocate}>
                    <Ionicons name="cash-outline" size={16} color={Colors.primaryColor} />
                    <Text style={styles.locationTxt}> {Number(cagnotte.amount).toLocaleString('fr-FR')} FCFA </Text>
                  </View>
                  <View style={styles.progressContainer}>
                    <AnimatedCircularProgress
                      size={30}
                      width={2}
                      fill={50} // pourcentage de progression
                      tintColor={Colors.primaryColor}
                      backgroundColor="#e0e0e0"
                      rotation={0}
                    >
                      {(fill) => <Text style={styles.progressText}>{`${Math.round(fill)}%`}</Text>}
                    </AnimatedCircularProgress>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <ActivityIndicator size="small" color={Colors.primaryColor} />
        )}
      </ScrollView>
    </View>
  );
};

export default List_demand;

// Styles inchangés
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  boxImage: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 30,
  },
  bookmark: {
    position: 'absolute',
    top: 185,
    right: 30,
    backgroundColor: Colors.blue,
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  Txt: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 5,
    width: 200,
  },
  Locate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxLocate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTxt: {
    fontSize: 12,
    marginLeft: 5,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 8,
    fontWeight: '600',
    color: Colors.black,
  },
});
