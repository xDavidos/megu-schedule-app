import React from "react";
import { useColorScheme, TouchableOpacity, Alert, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

import { useAuth } from "../../context/auth";
import Theme from '../../constants/style';
import { Text, View } from '../../components/Themed';

export default function SignIn() {
  const { signIn } = useAuth();
  const colorSchema = useColorScheme();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [groups, setGroups] = React.useState([
    { label: 'ПІ-20', value: 'PI20' },
    { label: 'КН-20', value: 'KN20' },
    { label: 'ІН-20', value: 'IN20' },
    { label: 'ЄВІ-20', value: 'EBI20' }]);
  const [selectGroup, setSelectGroup] = React.useState(null);
  DropDownPicker.addTheme("DropDown", require('../../constants/dropDownPicker'));
  DropDownPicker.setTheme("DropDown");

  function createAlertYouSure() {
    if (selectGroup == null) {
      setOpen(true);
      return
    }

    let labelGroup = groups.find(arr => arr.value === selectGroup)?.label;

    Alert.alert(
      "",
      "Ти впевнений(на) що группа " + labelGroup + " твоя?",
      [
        {
          text: "Ні, зараз зміню",
          style: 'cancel'
        },
        {
          text: "Так",
          style: 'default',
          onPress: async () => {
            signIn(selectGroup);
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container} lightColor="#faf9f9" darkColor="#1F1F1F">
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
        <TouchableOpacity onPress={() => createAlertYouSure()}>
          <Text style={styles.containerButton_Text}>Продовжити</Text>
        </TouchableOpacity>
        <Text style={styles.description}>*Щоб продовжити потрібен доступ до інтернету</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    alignItems: 'center',
    backgroundColor: undefined,
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
    backgroundColor: undefined,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    width: 150,
    zIndex: 9999
  },
  containerButton: {
    backgroundColor: undefined,
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
