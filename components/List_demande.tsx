import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React from 'react'
import Colors from '@/constants/Colors'
import { Link, Stack, router } from 'expo-router';
import { AnimatedCircularProgress } from 'react-native-circular-progress';



const List_demand = () => {

  return (

    <View style={{paddingHorizontal:10}}>
      <ScrollView
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap:20,
          marginBottom: 10,
          }}
        >

          <TouchableOpacity style={styles.container} onPress={() => {router.push('/(details)/detail')}} > 
            <View style={styles.boxImage}>

                <Image source={require('../assets/images/etude.jpg')} style={styles.image} />
                <View style={styles.bookmark}>
                  <Ionicons name='bookmark-outline' size={20} color={Colors.white} />
                </View>

                <Text style={styles.Txt} numberOfLines={1} ellipsizeMode="tail"> Manque de livre </Text>

                <View style={styles.Locate}>
                    <View style={styles.boxLocate}>
                        <Ionicons name='cash-outline' size={16} color={Colors.primaryColor} />
                        <Text style={styles.locationTxt}> 100.000 FCFA  </Text>
                    </View>
                    <View style={styles.progressContainer}>
                      <AnimatedCircularProgress
                        size={30}
                        width={2}
                        fill={10}  
                        tintColor={Colors.primaryColor}
                        backgroundColor="#e0e0e0"
                        rotation={0}
                      >
                        {
                          (fill) => (
                            <Text style={styles.progressText}>
                              {`${Math.round(fill)}%`}
                            </Text>
                          )
                        }
                      </AnimatedCircularProgress>
                    </View>
                </View>
            </View>
          </TouchableOpacity>

        <TouchableOpacity style={styles.container} onPress={() => {}} > 
            <View style={styles.boxImage}>

              <Image source={require('../assets/images/medecin.jpg')} style={styles.image} />
              <View style={styles.bookmark}>
                <Ionicons name='bookmark-outline' size={20} color={Colors.white} />
              </View>

              <Text style={styles.Txt} numberOfLines={1} ellipsizeMode="tail"> Opération couteuse </Text>

              <View style={styles.Locate}>
                <View style={styles.boxLocate} >
                  <Ionicons name='cash-outline' size={16} color={Colors.primaryColor} />
                  <Text style={styles.locationTxt}> 2.100.000 FCFA  </Text>
                </View>
                <View style={styles.progressContainer}>
                      <AnimatedCircularProgress
                        size={30}
                        width={2}
                        fill={30}  
                        tintColor={Colors.primaryColor}
                        backgroundColor="#e0e0e0"
                        rotation={0}
                      >
                        {
                          (fill) => (
                            <Text style={styles.progressText}>
                              {`${Math.round(fill)}%`}
                            </Text>
                          )
                        }
                      </AnimatedCircularProgress>
                  </View>
              </View>
              
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.container} onPress={() => {}} > 
            <View style={styles.boxImage}>

              <Image source={require('../assets/images/ong.jpg')} style={styles.image} />
              <View style={styles.bookmark_ong}>
                <Ionicons name='bookmark-outline' size={20} color={Colors.white} />
              </View>

              <Text style={styles.Txt} numberOfLines={1} ellipsizeMode="tail"> Africa Help </Text>

              <View style={styles.Locate}>
                <View style={styles.boxLocate} >
                  <Ionicons name='cash-outline' size={16} color={Colors.primaryColor} />
                  <Text style={styles.locationTxt}> 450.000 FCFA  </Text>
                </View>
                <View style={styles.progressContainer}>
                      <AnimatedCircularProgress
                        size={30}
                        width={2}
                        fill={30}  
                        tintColor={Colors.primaryColor}
                        backgroundColor="#e0e0e0"
                        rotation={0}
                      >
                        {
                          (fill) => (
                            <Text style={styles.progressText}>
                              {`${Math.round(fill)}%`}
                            </Text>
                          )
                        }
                      </AnimatedCircularProgress>
                  </View>
              </View>
            </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}

export default List_demand


const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  boxImage: {
    padding:10, 
    backgroundColor:Colors.white,
    borderRadius:10,
  }, 


  image: {
    width:200, 
    height:200, 
    borderRadius:10,
    marginBottom:30,
  }, 

  bookmark: {
    position:'absolute',
    top: 185,
    right: 30,
    backgroundColor: Colors.blue,
    padding: 10,
    borderRadius: 30,
    borderWidth:2,
    borderColor: Colors.white,
  },

  bookmark_ong: {
    position:'absolute',
    top: 185,
    right: 30,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 30,
    borderWidth:2,
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
    flexDirection:'row',
    justifyContent:'space-between',
  },

  boxLocate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:5,
  },

  locationTxt: {
    fontSize: 12,
    marginLeft:5,
  },

  prix: {
    fontSize:12,
    fontWeight:'600',
    color: Colors.primaryColor,
  },

  progressContainer: {
    alignItems: 'center',
  },

  progressText: {
    fontSize: 8,
    fontWeight: '600',
    color: Colors.black,
  },

})