import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';


import React from 'react'
import Colors from '@/constants/Colors'

const List_ong = () => {

  return (

    <View style={{paddingHorizontal:10}}>

      <Text style={ styles.titre }>Institutions </Text>

      <ScrollView
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap:20,
          marginBottom: 20,
          }}
        >

        <TouchableOpacity style={styles.container} onPress={() => {}} > 
          <View style={styles.boxImage}>

            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={require('../assets/images/image3.jpg')} style={styles.image} />

              <View> 
                  <Text style={styles.Txt}> UNICEF  </Text>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Ionicons name='star' size={20} color={Colors.primaryColor} />
                    <Text style={styles.text}> 4.2 </Text>
                    <Text style={styles.text2}> (195) </Text>
                  </View>
              </View>

            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.container} onPress={() => {}} > 
          <View style={styles.boxImage}>

            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={require('../assets/images/image2.jpg')} style={styles.image} />

              <View> 
                  <Text style={styles.Txt}> Children of Africa</Text>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Ionicons name='star' size={20} color={Colors.primaryColor} />
                    <Text style={styles.text}> 3.9 </Text>
                    <Text style={styles.text2}> (45) </Text>
                  </View>
               </View>
            </View>
            
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.container} onPress={() => {}} > 
          <View style={styles.boxImage}>

            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={require('../assets/images/image1.jpg')} style={styles.image} />
              <View> 
                  <Text style={styles.Txt}> UCAPI  </Text>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Ionicons name='star' size={20} color={Colors.primaryColor} />
                    <Text style={styles.text}> 4.9 </Text>
                    <Text style={styles.text2}> (12) </Text>
                  </View>
              </View>
            </View>
               
          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}

export default List_ong

const styles = StyleSheet.create({

  titre: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.black,
    marginVertical: 15,
  },

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
    width:120, 
    height:100, 
    borderRadius:10,
    marginRight:10,
  }, 

  Txt: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black,
    marginBottom:5,
  },

  text: {
    fontSize:14,
    fontWeight: '600',
    color: Colors.black,
  },

  text2: {
    fontSize:14,
    color:'#999',
  },
})