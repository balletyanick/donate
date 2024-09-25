


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Stack, router } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const UploadImg = () => {};
  const headerHeight = useHeaderHeight(); 
  const [open, setOpen] = useState(false); // Dropdown
  const [value, setValue] = useState(null); // Dropdown
  const [items, setItems] = useState([
    { label: 'Education', value: 'Education' },
    { label: 'ONG', value: 'ONG' },
  ]);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || 'date';
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <>
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: "Démarrer une Cagnottes",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <View>
              <Feather name='arrow-left' size={20} style={{ marginLeft: 20 }} />
            </View>
          </TouchableOpacity>
        ),
      }} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={[styles.container, { paddingTop: headerHeight }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>

            <TouchableOpacity style={styles.uploadBox} onPress={UploadImg}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <>
                  <Ionicons name="cloud-upload-outline" size={22} style={styles.icon} />
                  <Text style={styles.uploadText}> Téléverser une image </Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.boxinput}>
              <Text> Titre </Text>
              <TextInput  
                placeholder='Saisir le titre' 
                placeholderTextColor='#11182744'  
                style={styles.input}
              />
            </View>


            <View style={{ marginBottom: 40,   zIndex: 1000,  }}>
              <Text> Catégories </Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Sélectionnez une catégorie"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
              />
            </View>

            <View style={styles.boxinput}>
              <Text> Date de fin </Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text style={{ color: date ? Colors.black : '#11182744' }}>
                  {date ? date.toLocaleDateString('fr-FR') : 'Sélectionnez une date'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
            </View>

            <View style={styles.boxinput}>
              <Text> Montant </Text>
              <TextInput  
                placeholder='Saisir le montant' 
                placeholderTextColor='#11182744' 
                style={styles.input}
              />
            </View>

            <View style={styles.boxinput}>
              <Text> Description </Text>
              <TextInput  
                placeholder='Saisir la description' 
                placeholderTextColor='#11182744' 
                multiline
                numberOfLines={4}
                style={styles.inputdes}
              />
            </View>

            <View style={styles.boxinput}>
              <Text> Ville </Text>
              <TextInput  
                placeholder='Saisir la ville' 
                placeholderTextColor='#11182744' 
                style={styles.input}
              />
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  uploadBox: {
    width: "100%",
    height: 150,
    borderWidth: 2,
    borderColor: Colors.black,
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
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
  icon: {
    fontSize: 50,
    color: Colors.black,
  },
  boxinput: {
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    paddingVertical: 12,
    marginTop: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: Colors.black,
    backgroundColor: Colors.white,
    borderColor: Colors.bgColor,
    borderWidth: 1,
    justifyContent: 'center',
  },
  inputdes: {
    flex: 1,
    height: 100,
    paddingVertical: 8,
    lineHeight: 18,
    marginTop: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: Colors.black,
    backgroundColor: Colors.white,
    borderColor: Colors.bgColor,
    borderWidth: 1,
  },

 dropdown: {
  flex: 1,
  height: 40,
  paddingHorizontal: 10,
  marginTop: 6,
  color: Colors.black,
  backgroundColor: Colors.white,
  borderColor: Colors.bgColor,
  borderWidth: 1,
},
dropdownContainer: {
  backgroundColor: Colors.bgColor,
  borderColor: Colors.bgColor,
}
});