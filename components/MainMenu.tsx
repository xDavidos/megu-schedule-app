import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useColorScheme } from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/uk';
import theme from '../assets/themes';
import DateSlider from './DateSlider';
import LessonList from './LessonList';
import { lessonsToday } from '../services/lessons';

const MainMenu = (lessons: any) => {
  const [index, setIndex] = useState(0);
  const colorSchema = useColorScheme();
  const themeLesssonsContainer = colorSchema === 'light' ? styles.lesson_conteiner_light 
    : styles.lesson_conteiner_dark;

  useEffect(() => {
    setIndex(lessonsToday(lessons))
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.today}>
        <Moment element={Text} style={ colorSchema === 'light' 
          ? styles.today_day_light 
          : styles.today_day_dark } format='D'></Moment>
        <View style={styles.today_column}>
          <Moment element={Text} style={styles.today_day_week} format='dddd'></Moment>
          <Moment element={Text} style={styles.today_month_year} format='MMMM YYYY'></Moment>
        </View>
        <TouchableOpacity style={styles.today_button_conteiner} onPress={() => { setIndex(lessonsToday(lessons)) }}>
          <Text style={styles.today_button_text}>Сьогодні</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.lesson_conteiner, themeLesssonsContainer]}>
        <DateSlider data={lessons} index={index} setIndex={setIndex} />
        <LessonList data={lessons} index={index} setIndex={setIndex} />
      </View>
    </View>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    container_light: {
      backgroundColor: '#faf9f9',
    },
    container_dark: {
      backgroundColor: theme.colors.gray2,
    },
    today: {
      margin: 20,
      flexDirection: 'row',
    },
    today_day_light: {
      ...theme.textVariants.body1,
      alignSelf: 'center',
      marginRight: 8,
      color: '#000'
    },
    today_day_dark: {
      ...theme.textVariants.body1,
      alignSelf: 'center',
      marginRight: 8,
      color: '#fff'
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
      color: theme.colors.blueGray,
      backgroundColor: 'rgba(52, 79, 179, 0.1)',
      borderRadius: 10,
      padding: 8,
    },
    lesson_conteiner: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      flex: 1,
    },
    lesson_conteiner_light: {
      backgroundColor: theme.colors.white,
    },  
    lesson_conteiner_dark: {
      backgroundColor: theme.colors.gray3,
    }
  });
  
  export default MainMenu