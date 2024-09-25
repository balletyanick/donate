import { Feather } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { useHeaderHeight } from '@react-navigation/elements';

export default function Historique() {
  const headerHeight = useHeaderHeight();

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: 'Historique',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <View>
                <Feather name="arrow-left" size={20} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <View style={[styles.container, { paddingTop: headerHeight }]}>
        {/* Onglets avec état de commande */}

        {/* Liste défilante des commandes */}
        <ScrollView style={styles.Container}>

          <View style={styles.BoxCard}>
            <View style={styles.Card}>
              <Text style={styles.titre}> Rénnovation Ecole </Text>
              <Text style={styles.identifiant}>ID: 224568</Text>
            </View>
            <Text style={styles.createur}>Créateur: Children Of Africa</Text>
            <Text style={styles.date}>Montant: 1.000 FCFA</Text>
            <Text style={styles.date}>Date: 26 July 11 am - 12:30 pm</Text>
          </View>

          <View style={styles.BoxCard}>
            <View style={styles.Card}>
              <Text style={styles.titre}> Soins médicaux </Text>
              <Text style={styles.identifiant}>ID: 224569</Text>
            </View>
            <Text style={styles.createur}>Créateur: Ballet Yanick</Text>
            <Text style={styles.date}>Montant: 1.000 FCFA</Text>
            <Text style={styles.date}>Date: 26 July 11 am - 12:30 pm</Text>
          </View>

          <View style={styles.BoxCard}>
            <View style={styles.Card}>
              <Text style={styles.titre}> Frais Scolaire </Text>
              <Text style={styles.identifiant}>ID: 224570</Text>
            </View>
            <Text style={styles.createur}>Créateur: Ballet Yanick </Text>
            <Text style={styles.date}>Montant: 1.000 FCFA</Text>
            <Text style={styles.date}>Date: 26 July 11 am - 12:30 pm</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  Container: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  BoxCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  Card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  titre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  identifiant: {
    fontSize: 14,
    color: '#999',
  },
  createur: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  date: {
    fontSize: 14,
    color: '#555',
  },
});
