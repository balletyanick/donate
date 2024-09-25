import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Link, Stack, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

const {width} = Dimensions.get('window');
const IMG_HEIGHT = 300

const Detail = () => {
  return (
    <>
    <Stack.Screen options={{
      headerTransparent: true,
      headerTitle:"",

      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()}  style={styles.headerLBox}>
          <View style={styles.headerL}>
            <Feather name='arrow-left' size={20}/>
          </View>
        </TouchableOpacity>
      ),

      headerRight: () => (
        <TouchableOpacity onPress={() => {}}  style={styles.headerRBox} >
          <View style={styles.headerL}>
            <Ionicons name='bookmark-outline' size={20}/>
          </View>
        </TouchableOpacity>
      )
    }}  />
    

    <View>

      <ScrollView style={{backgroundColor: Colors.white}} contentContainerStyle={{paddingBottom: 20}}> 
        <Image 
          source={require('../../assets/images/etude.jpg')}
          style={styles.image}
        />

        <View style={styles.container}>
          
          <Text style={styles.Txt1}> Manque de livre  </Text>
          <View style={styles.boxContainer}>
            <View style={styles.box1}>
              <FontAwesome5 name="map-marker-alt" size= {18} color={Colors.primaryColor}/>
              <Text style={styles.locate}> Abidjan </Text>
            </View>
            <View style={styles.box1}>
              <Ionicons name='apps' size={16} color={Colors.primaryColor} />
              <Text style={styles.locate}> Education </Text>
            </View>
            <View style={styles.box1}>
              <Ionicons name='logo-facebook' size={18} color={Colors.primaryColor} />
              <Text style={styles.locate}> Contact </Text>
            </View>
          </View>

          <View style={styles.detail}>
            <View style={{flexDirection:'row'}}>
              <View style={styles.detailIcone}>
                <Ionicons name='time' size={18} color={Colors.primaryColor}/>
              </View>

              <View>
                <Text style={styles.detailTxt}> Durée </Text>
                <Text style={styles.detailTxt2}> Aucune </Text>
              </View>
            </View>

            <View style={{flexDirection:'row'}}>
              <View style={styles.detailIcone}>
                <Ionicons name='person' size={18} color={Colors.primaryColor}/>
              </View>

              <View>
                <Text style={styles.detailTxt}> Dons </Text>
                <Text style={styles.detailTxt2}> 5 </Text>
              </View>
            </View>

            <View style={{flexDirection:'row'}}>
              <View style={styles.detailIcone}>
                <Ionicons name='checkmark-circle' size={18} color={Colors.primaryColor}/>
              </View>

              <View>
                <Text style={styles.detailTxt}> Objectif </Text>
                <Text style={styles.detailTxt2}> 80% </Text>
              </View>
            </View>
          </View>

          <Text style={styles.Description}>
              <Text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Voluptate voluptatibus dolor asperiores ipsa. {"\n"}{"\n"}
                Nous avons recoltés la somme de <Text style={styles.textEnd}> 
                100.000 FCFA </Text> sur les <Text style={styles.textEnd}> 1.000.000 FCFA </Text>
              </Text>
          </Text>
        </View>
      </ScrollView>
      
    </View>


    <View style={styles.footer}>
      <TouchableOpacity onPress={() => {}} style={[styles.footerBtn, styles.footerAcheter]}> 
        <Text style={styles.footerBtnTxt}> FAIRE UN DON </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}} style={styles.footerBtn}> 
        <Text style={styles.footerBtnTxt}> 100 FCFA </Text>
      </TouchableOpacity>
    </View>

    </>
  )
}

export default Detail 

const styles = StyleSheet.create({

  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },

  image: {
    width: width,
    height: IMG_HEIGHT,
  },

  headerLBox: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius:10,
    padding: 4,
  },

  headerRBox: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius:10,
    padding: 4,
  },

  headerL: {
    backgroundColor: Colors.white,
    padding: 6,
    borderRadius: 10, 
  },

  boxContainer: {
    flexDirection:'row',
    marginTop: 5,
    marginBottom: 10,
  }, 

  Txt1: {
    fontSize: 24,
    fontWeight: "500",
    color: Colors.black,
    letterSpacing: 0.5,
    marginLeft: -10,
  },

  locate: {
    fontSize: 14,
    marginLeft: 5,
    color: Colors.black,
  },

  detail: {
    flexDirection:'row',
    marginBottom: 20,
    marginTop:10,
    justifyContent:'space-between'
  },

  box1: {
    flexDirection:'row',
    marginTop: 20,
    justifyContent:'space-between',
    padding:10, 
    borderRadius:10, 
    marginRight:10,
    backgroundColor:'#F4F4F4'
  },

  detailIcone: {
    backgroundColor:'#F4F4F4',
    paddingHorizontal: 8,
    height:35,
    borderRadius: 8,
    marginRight:5,
    alignItems:'center',
    justifyContent: 'center',
  },

  detailTxt: {
    fontSize:12,
    color:'#999'
  },


  detailTxt2: {
    fontSize:14,
    fontWeight:'600',
  },

  Description: {
    fontSize:16,
    color: Colors.black,
    lineHeight: 25,
    letterSpacing: 0.5,
  },

  footer: {
    flexDirection:'row',
    position:'absolute',
    bottom: 0,
    padding: 20,
    paddingBottom: 30,
  },

  footerBtn: {
    flex:1,
    backgroundColor: Colors.black,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

  footerAcheter: {
    flex:1,
    backgroundColor: Colors.primaryColor,
    marginRight: 20,
  },

  footerBtnTxt: {
    color: Colors.white,
    fontSize:16,
    fontWeight:'600',
    textTransform: 'uppercase',
  },

  textEnd: {
    color: Colors.primaryColor,
    fontWeight:'700',    
  }
  
})