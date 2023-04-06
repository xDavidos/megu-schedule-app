import { StyleSheet, useColorScheme } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { View } from '../../components/Themed';
import Today from '../../components/Today';
import DateSlider from '../../components/DateSlider';
import LessonList from '../../components/LessonList';

export default function MainScreen() {
  const colorSchema = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Today />
        <Entypo name='dots-three-vertical' size={28} color={colorSchema === "dark" ? "#fff" : "#000"} />
      </View>
      <View style={styles.lesson_conteiner} lightColor={'#FFF'} darkColor={'#1B1B1B'}>
        <DateSlider />
        <View style={{ flex: 1, flexDirection: 'row' }} lightColor={'#FFF'} darkColor={'#1B1B1B'}>
          <LessonList />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 28,
    marginBottom: 10
  },
  lesson_conteiner: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  lesson_indicator: {
    paddingTop: 25
  }
});
