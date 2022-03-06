import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/uk';

function getday(i) {
  const [day, setday] = useState([]);
}

const startDay = moment().subtract(1, 'week').startOf('week');
const endDay = moment().add(1, 'week').endOf('week');

const data = [...Array(14).keys()].map(() => ({
  day: 21,
  weekday: 5,
}));

export default function App() {
  const [loaded] = useFonts({
    eUkraineBold: require('./assets/fonts/e-Ukraine/e-Ukraine-Bold.otf'),
    eUkraineLight: require('./assets/fonts/e-Ukraine/e-Ukraine-Light.otf'),
    eUkraineMedium: require('./assets/fonts/e-Ukraine/e-Ukraine-Medium.otf'),
    eUkraineRegular: require('./assets/fonts/e-Ukraine/e-Ukraine-Regular.otf'),
    eUkraineThin: require('./assets/fonts/e-Ukraine/e-Ukraine-Thin.otf'),
    eUkraineUltraLight: require('./assets/fonts/e-Ukraine/e-Ukraine-UltraLight.otf'),

    eUkraineHeadBold: require('./assets/fonts/e-Ukraine-Head/e-UkraineHead-Bold.otf'),
    eUkraineHeadLight: require('./assets/fonts/e-Ukraine-Head/e-UkraineHead-Light.otf'),
    eUkraineHeadLOGO: require('./assets/fonts/e-Ukraine-Head/e-UkraineHead-LOGO.otf'),
    eUkraineHeadMedium: require('./assets/fonts/e-Ukraine-Head/e-UkraineHead-Medium.otf'),
    eUkraineHeadRegular: require('./assets/fonts/e-Ukraine-Head/e-UkraineHead-Regular.otf'),
    eUkraineHeadThin: require('./assets/fonts/e-Ukraine-Head/e-UkraineHead-Thin.otf'),
    eUkraineHeadUltraLight: require('./assets/fonts/e-Ukraine-Head/e-UkraineHead-UltraLight.otf'),
  });
  
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Moment element={Text} style={styles.today_day} format='D'></Moment>
      <Moment element={Text} style={styles.today_day_week} format='dddd'></Moment>
      <Moment element={Text} style={styles.today_year} format='MMMM YYYY'></Moment>
      <Moment element={Text} >{startDay}</Moment>
      <Moment element={Text} >{endDay}</Moment>
      <Text style={{ fontFamily: 'eUkraineBold', fontSize: 50 }}>Понеділок Вівторок Середа Четвер Пятниця Субота Неділя</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  today_day: {
    fontFamily: 'eUkraineMedium',
    fontSize: 44,
    color: '#212525',
  },
  today_day_week: {
    fontFamily: 'eUkraineRegular',
    lineHeight: 21,
    color: '#BCC1CD',
  },
  today_year: {
    fontFamily: 'eUkraineRegular',
    lineHeight: 21,
    color: '#BCC1CD',
  },
});
