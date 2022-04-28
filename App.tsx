//import './config/firebase';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/uk';
import DateSlider from './components/date_slider';
import LessonList from './components/lesson_list'
import Lessons_local from './components/data.json';
import theme from './assets/themes';
// import { lessons } from './services/lessonsService'
//import { firebase } from './services/firebase';

const height = Dimensions.get('screen').height;

export default function App() {
  const [loaded] = useFonts({
    eUkraineBold: require('./assets/fonts/e-Ukraine/e-Ukraine-Bold.otf'),
    eUkraineMedium: require('./assets/fonts/e-Ukraine/e-Ukraine-Medium.otf'),
    eUkraineRegular: require('./assets/fonts/e-Ukraine/e-Ukraine-Regular.otf'),
  });

//  const [lessons, setLessons] = useState(firebase());

//  console.log(lessons);

  const [index, setIndex] = useState(1);

  if (!loaded) {
    return <AppLoading/>
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto'/> 
      <View style={styles.today}>
        <Moment element={Text} style={styles.today_day} format='D'></Moment>
        <View style={styles.today_column}>
          <Moment element={Text} style={styles.today_day_week} format='dddd'></Moment>
          <Moment element={Text} style={styles.today_month_year} format='MMMM YYYY'></Moment>
        </View>
        <TouchableOpacity style={styles.today_button_conteiner} onPress={() => { setIndex(1) }}>
          <Text style={styles.today_button_text}>Сьогодні</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lesson_conteiner}>
        <DateSlider data={Lessons_local} index={index} setIndex={setIndex} />
        <LessonList data={Lessons_local} index={index} setIndex={setIndex} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#faf9f9',
    marginTop: 40,
    marginBottom: 40,
    height: height,
  },
  today: {
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  today_day: {
    ...theme.textVariants.body1,
    color: theme.colors.black,
    alignSelf: 'center',
    marginRight: 8,
  },
  today_column: {
    flexDirection: 'column',
    alignSelf: 'center',
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
    marginLeft: 'auto',
    justifyContent: 'center',
  },
  today_button_text: {
    ...theme.textVariants.h1,
    color: theme.colors.green,
    backgroundColor: 'rgba(77, 197, 145, 0.1)',
    borderRadius: 8,
    padding: 8,
  },
  lesson_conteiner: {
    borderRadius: 25,
    backgroundColor: theme.colors.black,
    marginBottom: 80,
  }
});
