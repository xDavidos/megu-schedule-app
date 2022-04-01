import './config/firebase';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/uk';
import DateSlider from './components/date_slider';
import LessonList from './components/lesson_list'
import AppLoading from 'expo-app-loading';
import Lessons from './components/data.json'
import theme from './assets/themes';

export default function App() {
  const [loaded] = useFonts({
    eUkraineBold: require('./assets/fonts/e-Ukraine/e-Ukraine-Bold.otf'),
    eUkraineMedium: require('./assets/fonts/e-Ukraine/e-Ukraine-Medium.otf'),
    eUkraineRegular: require('./assets/fonts/e-Ukraine/e-Ukraine-Regular.otf'),
  });
  const [index, setIndex] = useState(15);

  if (!loaded) {
    return <AppLoading/>
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.today}>
        <Moment element={Text} style={styles.today_day} format='D'></Moment>
        <View style={styles.today_column}>
          <Moment element={Text} style={styles.today_day_week} format='dddd'></Moment>
          <Moment element={Text} style={styles.today_month_year} format='MMMM YYYY'></Moment>
        </View>
        <TouchableOpacity style={styles.today_button_conteiner} onPress={() => { setIndex(7) }}>
          <Text style={styles.today_button_text}>Сьогодні</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.date_lesson_conteiner}>
        <DateSlider data={Lessons} index={index} setIndex={setIndex} />
        <LessonList data={Lessons} index={index} setIndex={setIndex} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#faf9f9',
    paddingTop: 40,
    height: '100%'
  },
  today: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    height: '11%',
    display: 'flex',
  },
  today_day: {
    ...theme.textVariants.body1,
    color: theme.colors.black,
    alignSelf: 'center',
  },
  today_column: {
    flexDirection: 'column',
    alignSelf: 'center',
    paddingLeft: 8,
  },
  today_day_week: {
    ...theme.textVariants.body4,
    textTransform: 'capitalize',
    color: theme.colors.gray,
  },
  today_month_year: {
    ...theme.textVariants.body4,
    textTransform: 'capitalize',
    color: theme.colors.gray,
  },
  today_button_conteiner: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  today_button_text: {
    ...theme.textVariants.h1,
    color: theme.colors.green,
    backgroundColor: 'rgba(77, 197, 145, 0.1)',
    borderRadius: 8,
    padding: 8,
  },
  date_lesson_conteiner: {
    height: '90%',
    marginTop: -20,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    backgroundColor: theme.colors.white
  }
});
