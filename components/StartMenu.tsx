import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useColorScheme, Image, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import theme from '../assets/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import { getLessons, updateLessons } from '../services/firebase';

const startMenu = ({setFirstStart, setLessons}) => {
  const [selectGroup, setSelectGroup] = useState("PI20");
  const colorSchema = useColorScheme();
  const TextTheme = colorSchema === 'light' ? styles.Text_light 
  : styles.Text_dark;
  const descriptionTheme = colorSchema === 'light' ? styles.Text_light 
  : styles.description_dark;
  
  async function buttoncontinue()
  {
    await database()
    .ref(".info/connected")
    .once("value", async status => {
      if (status.val() == true) {
        createAlertYouSure();
        console.log("connected");
      } else {
        createAlertNoInternet();
        console.log("not connected");
      }
    })
  }

  const createAlertNoInternet = () =>
  Alert.alert(
    "Помилка!",
    "Відсутнє інтернет підключення",
    [
      {
        text: "Ok",
      }
    ]
  );

  const createAlertYouSure = () => {
    let TextGroup;
    switch(selectGroup){
      case 'PI20':
        TextGroup = "ПI-20"
        break;
      case 'KN20':
        TextGroup = "КН-20"
        break;
      case 'IN20':
        TextGroup = "ІН-20"
        break;
      case 'EBI20':
        TextGroup = "ЄВІ-20"
        break;
    }

    Alert.alert(
      "Увага!",
      "Ти впевнений що группа " + TextGroup + " твоя?",
      [
        {
          text: "Ні, зараз зміню",
          style: 'cancel'
        },
        {
          text: "Так",
          style: 'default',
          onPress: async () => {
            await AsyncStorage.setItem('@group', selectGroup);
            setLessons(await getLessons());
            setFirstStart(false)
            updateLessons(setLessons)
          }
        }
      ]
    );
  }

  return (
    <View style={styles.containerMenu}>
      <View style={styles.containerLogo}>
        <Image style={styles.containerLogo_Img} source={require('../assets/icon.png')}/>
        <Text style={[styles.logoText, TextTheme]}>MEGU</Text>
      </View>
      <View style={styles.containerPicker}>
        <MaterialCommunityIcons name="account-group-outline" size={24} color={colorSchema === 'light'
          ? "#000" : "#fff"} />
        <Picker
          selectedValue={selectGroup}
          mode="dropdown"
          style={[styles.pickerGroup, TextTheme]}
          dropdownIconColor={colorSchema === 'light' ? "#000" : "#fff"}
          dropdownIconRippleColor={colorSchema === 'light' ? "#000" : "#fff"}
          onValueChange={(itemValue) =>
            setSelectGroup(itemValue)
          }>
          <Picker.Item label="ПІ-20" value="PI20" />
          <Picker.Item label="КН-20" value="KN20" />
          <Picker.Item label="ІН-20" value="IN20" />
          <Picker.Item label="ЄВІ-20" value="EBI20" />
        </Picker>
      </View>
      <View style={styles.containerButton}>
      <TouchableOpacity onPress={async () => {await buttoncontinue()}}>
        <Text style={styles.containerButton_Text}>Продовжити</Text>
      </TouchableOpacity>
      <Text style={[styles.description, descriptionTheme]}>*Щоб продовжити потрібен доступ до інтернету</Text>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  containerMenu: {
    flex: 1, 
    justifyContent: "center"
  },
  containerLogo: {
    alignItems: 'center'
  },
  containerLogo_Img: {
    width: 100, 
    height: 100, 
    marginBottom: 20
  },
  logoText: {
    ...theme.textVariants.body1,
  },
  containerPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    translateX: 7
  },
  pickerGroup: {
    width: 135
  },
  containerButton: {
    justifyContent: 'center', 
    alignSelf: 'center'
  },
  containerButton_Text: {
    ...theme.textVariants.h1, 
    color: theme.colors.blueGray, 
    backgroundColor: 'rgba(52, 79, 179, 0.1)', 
    borderRadius: 10, 
    padding: 8, 
    textAlign: 'center', 
    marginBottom: 5
  },
  description: {
    ...theme.textVariants.h3,
    width: 220
  },
  description_dark: {
    color: theme.colors.gray
  },
  Text_light: {
    color: '#000',
  },
  Text_dark: {
    color: '#fff'
  },
});

export default startMenu