import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/uk';
import { getLessons, updateLessons } from '../services/firebase';

import { View, Text } from '../components/Themed';
import Theme from '../constants/style';
import DateSlider from '../components/DateSlider';
import LessonList from '../components/LessonList';
import useColorScheme from '../hooks/useColorScheme';
import { lessonsToday } from '../services/lessons';

export default function MainScreen() {
  const [index, setIndex] = useState(0);
  const [lessons, setLessons] = useState();
  const colorSchema = useColorScheme();

  useEffect(() => {
    async function db() {
      try {
        setLessons(await getLessons());
        updateLessons(setLessons);
      } catch (e) {
        console.log(e);
      }
    }
    db();
    setIndex(lessonsToday(lessons));
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.today}>
        <Moment element={Text} style={colorSchema === 'light'
          ? styles.today_day_light
          : styles.today_day_dark} format='D'></Moment>
        <View style={styles.today_column}>
          <Moment element={Text} style={styles.today_day_week} format='dddd'></Moment>
          <Moment element={Text} style={styles.today_month_year} format='MMMM YYYY'></Moment>
        </View>
        <TouchableOpacity style={styles.today_button_conteiner} onPress={() => setIndex(lessonsToday(lessons))}>
          <Text style={styles.today_button_text}>Сьогодні</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lesson_conteiner} lightColor={Theme.colors.white} darkColor={Theme.colors.gray3}>
        {lessons == undefined ? <ActivityIndicator style={styles.lesson_indicator} size="large" /> : <DateSlider data={lessons} index={index} setIndex={setIndex} />}
        {lessons == undefined ? null : <LessonList data={lessons} index={index} setIndex={setIndex} />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  today: {
    margin: 20,
    flexDirection: 'row',
  },
  today_day_light: {
    ...Theme.textVariants.body1,
    alignSelf: 'center',
    marginRight: 8,
    color: '#000'
  },
  today_day_dark: {
    ...Theme.textVariants.body1,
    alignSelf: 'center',
    marginRight: 8,
    color: '#fff'
  },
  today_column: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  today_day_week: {
    ...Theme.textVariants.body4,
    textTransform: 'capitalize',
    color: Theme.colors.gray,
  },
  today_month_year: {
    ...Theme.textVariants.body4,
    textTransform: 'capitalize',
    color: Theme.colors.gray,
  },
  today_button_conteiner: {
    marginLeft: 'auto',
    justifyContent: 'center',
  },
  today_button_text: {
    ...Theme.textVariants.h1,
    color: Theme.colors.blueGray,
    backgroundColor: 'rgba(52, 79, 179, 0.1)',
    borderRadius: 10,
    padding: 8,
  },
  lesson_conteiner: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
  },
  lesson_indicator: {
    paddingTop: 25
  }
});