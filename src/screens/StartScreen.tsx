import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

import { View, Text } from '../components/Themed'
import Theme from '../constants/style';
import useColorScheme from '../hooks/useColorScheme';
import { getLessons, updateLessons } from '../services/firebase';



export default function StartScreen({ setFirstStart, isConnected, setLessons }: { setFirstStart: any, isConnected: any, setLessons: any }) {
  const colorSchema = useColorScheme();
  const [selectGroup, setSelectGroup] = useState(null);
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([
    { label: 'ПІ-20', value: 'PI20' },
    { label: 'КН-20', value: 'KN20' },
    { label: 'ІН-20', value: 'IN20' },
    { label: 'ЄВІ-20', value: 'EBI20' }]);

  function createAlertYouSure() {
    if (selectGroup == null) {
      return
    }
    let TextGroup;
    switch (selectGroup) {
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
      "",
      "Ти впевнений(на) що группа " + TextGroup + " твоя?",
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
            updateLessons(setLessons);
            setFirstStart(false);
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.logoImg} source={require('../../assets/images/icon.png')} />
        <Text style={styles.logoText}>MEGU</Text>
      </View>
      <View style={styles.picker}>
        <MaterialCommunityIcons name="account-group-outline" size={24}
          color={colorSchema === 'light' ? '#000' : '#fff'} />
        <DropDownPicker
          open={open}
          value={selectGroup}
          items={groups}
          setOpen={setOpen}
          setValue={setSelectGroup}
          setItems={setGroups}
          textStyle={{ color: colorSchema === 'light' ? '#000' : '#fff' }}
          dropDownContainerStyle={{ backgroundColor: colorSchema === 'light' ? '#fff' : Theme.colors.gray3 }}
          searchTextInputStyle={{ color: colorSchema === 'light' ? '#000' : Theme.colors.gray }}
          listItemLabelStyle={{ color: colorSchema === 'light' ? '#000' : '#fff' }}
          ArrowDownIconComponent={() => <AntDesign name="down" size={15} color={colorSchema === 'light' ? 'black' : 'white'} />}
          ArrowUpIconComponent={() => <AntDesign name="up" size={15} color={colorSchema === 'light' ? 'black' : 'white'} />}
          TickIconComponent={() => <AntDesign name="check" size={15} color={colorSchema === 'light' ? 'black' : 'white'} />}
          searchable={true}
          searchPlaceholder={'Пошук'}
          dropDownDirection={'BOTTOM'}
          placeholder={'Вибери свою группу'}
          translation={{
            NOTHING_TO_SHOW: "Нічого не найшов"
          }}
        />
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity disabled={!isConnected} onPress={() => createAlertYouSure()}>
          <Text style={styles.containerButton_Text}>Продовжити</Text>
        </TouchableOpacity>
        <Text style={styles.description} darkColor={Theme.colors.gray}>*Щоб продовжити потрібен доступ до інтернету</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  logo: {
    alignItems: 'center'
  },
  logoImg: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  logoText: {
    ...Theme.textVariants.body1,
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    width: 150,
    zIndex: 9999
  },
  containerButton: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  containerButton_Text: {
    ...Theme.textVariants.h1,
    color: Theme.colors.blueGray,
    backgroundColor: 'rgba(52, 79, 179, 0.1)',
    borderRadius: 10,
    padding: 8,
    textAlign: 'center',
    marginBottom: 5
  },
  description: {
    ...Theme.textVariants.h3,
    width: 220
  }
});