import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import Colors from '@/constants/Colors'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

const CategoriesButtons = () => {

  const itemRef = useRef<TouchableOpacity[] | null>([]);

  return (
    <View style={{paddingHorizontal:10}}>
      <Text style={ styles.titre }>Categories</Text>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap:20,
          paddingVertical: 10,
          marginBottom: 10,
          }}>
 
        <TouchableOpacity onPress={() => {}}  style={styles.boxButton}>
          <Ionicons name='grid-outline' style={{color:Colors.white}} size={18} />
          <Text style={styles.categoriesBtnTxt}> Tous </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.categoriesBtn}>
          <Ionicons name='business-outline' size={20} />
          <Text> ONG </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.categoriesBtn}>
          <Ionicons name='school-outline' size={22} />
          <Text> Education </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.categoriesBtn}>
          <MaterialIcons name="local-hospital" size={22} />
          <Text> Soins de santé </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.categoriesBtn}>
          <MaterialIcons name="bubble-chart" size={22} />
          <Text> Art & Culture </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.categoriesBtn}>
          <Ionicons name='earth-outline' size={22} />
          <Text> Ecologie </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.categoriesBtn}>
          <Ionicons name='ellipsis-horizontal-circle-outline' size={22} />
          <Text> Autre </Text>
        </TouchableOpacity>
        
      </ScrollView>
      
    </View>
  )
}

export default CategoriesButtons

const styles = StyleSheet.create({
    titre: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.black
    },

    categoriesBtnTxt: {
      marginLeft: 5,
      color: Colors.white,
    },

    categoriesBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.white,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 10,
      shadowColor: "#333333",
      shadowOffset: {width: 1, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },

    boxButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.primaryColor,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 10,
      shadowColor: "#333333",
      shadowOffset: {width: 1, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 3,
    }

   
   

})