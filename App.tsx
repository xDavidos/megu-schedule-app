import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/uk';
import DateSlider from './components/date_slider';

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
      <StatusBar style="auto" />
      <Moment element={Text} style={styles.today_day} format='D'></Moment>
      <Moment element={Text} style={styles.today_day_week} format='dddd'></Moment>
      <Moment element={Text} style={styles.today_month_year} format='MMMM YYYY'></Moment>
      <DateSlider></DateSlider>
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
    textTransform: 'capitalize',
    lineHeight: 21,
    color: '#BCC1CD',
  },
  today_month_year: {
    fontFamily: 'eUkraineRegular',
    textTransform: 'capitalize',
    lineHeight: 21,
    color: '#BCC1CD',
    paddingBottom: 20,
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
