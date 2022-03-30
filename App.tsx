import './config/firebase';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/uk';
import DateSlider from './components/date_slider';
import LessonList from './components/lesson_list'

export default function App() {
  const [loaded] = useFonts({
    eUkraineBold: require('./assets/fonts/e-Ukraine/e-Ukraine-Bold.otf'),
    eUkraineMedium: require('./assets/fonts/e-Ukraine/e-Ukraine-Medium.otf'),
    eUkraineRegular: require('./assets/fonts/e-Ukraine/e-Ukraine-Regular.otf'),
  });
  
  if (!loaded) {
    return <Text>Loading...</Text>
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
      </View>
      <DateSlider></DateSlider>
      <LessonList></LessonList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  today: {
    paddingLeft: 28,
    paddingBottom: 20,
    flexDirection: 'row',
    fontSize: 14,
    display: 'flex',
  },
  today_day: {
    fontFamily: 'eUkraineMedium',
    fontSize: 44,
    color: '#212525',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  today_column: {
    flexDirection: 'column',
    alignSelf: 'center',
    paddingLeft: 8,
  },
  today_day_week: {
    fontFamily: 'eUkraineRegular',
    textTransform: 'capitalize',
    lineHeight: 21,
    color: '#BCC1CD',
  },
  today_month_year: {
    fontFamily: 'eUkraineRegular',
    textTransform: 'capitalize',
    lineHeight: 21,
    color: '#BCC1CD',
  },
  day_array: {
    fontFamily: 'eUkraineBold',
    fontSize: 13, 
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#000000',
    //scolor: '#FFF', 
  },
});
