import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import DataSlider from './components/date_slider.js'
import Lesson from './components/lesson_schedule.js'
import { Day, DayWeek, MonthYear } from './components/require_date.js'

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.today}>
          <Text style={styles.today_day}><Day></Day></Text>
          <View style={styles.today_column}>
            <Text style={styles.today_day_week}><DayWeek></DayWeek></Text>
            <Text style={styles.today_year}><MonthYear></MonthYear></Text>
          </View>
          <View style={styles.day_select_conteiner}>
            <Text style={styles.day_select_text}>Сьогодні</Text>
          </View>
        </View>
        <View style={styles.date_slider}>
          <DataSlider day_week={'ПН'} day_number={'22'} />
          <DataSlider day_week={'ВТ'} day_number={'22'} select={true} />
          <DataSlider day_week={'СР'} day_number={'23'} />
          <DataSlider day_week={'ЧТ'} day_number={'24'} />
          <DataSlider day_week={'ПТ'} day_number={'25'} />
          <DataSlider day_week={'СБ'} day_number={'26'} />
          <DataSlider day_week={'НД'} day_number={'27'} />
        </View>
        <ScrollView>
          <View style={styles.lesson_schedule}>

            <View>

              <View style={styles.lessons}>
                <Text style={styles.lesson_text}>Час</Text>
                <Text style={styles.lesson_text}>Пари</Text>
              </View>
              <View>
                <Lesson
                  lesson_start_time={'11:35'}
                  lesson_end_time={'13:05'}
                  lesson_name={'Програмування'}
                  lesson_description={'Лекція'}
                  lesson_locate={'Аудиторія 1402'}
                  lesson_teacher={'Шпортько О. В.'} />
                <Lesson
                  lesson_start_time={'11:35'}
                  lesson_end_time={'13:05'}
                  lesson_name={'Програмування'}
                  lesson_description={'Лекція'}
                  lesson_locate={'Аудиторія 1402'}
                  lesson_teacher={'Шпортько О. В.'} />
                <Lesson
                  lesson_start_time={'11:35'}
                  lesson_end_time={'13:05'}
                  lesson_name={'Програмування'}
                  lesson_description={'Лекція'}
                  lesson_locate={'Аудиторія 1402'}
                  lesson_teacher={'Шпортько О. В.'} />
                <Lesson
                  lesson_start_time={'11:35'}
                  lesson_end_time={'13:05'}
                  lesson_name={'Програмування'}
                  lesson_description={'Лекція'}
                  lesson_locate={'Аудиторія 1402'}
                  lesson_teacher={'Шпортько О. В.'} />
                <Lesson
                  lesson_start_time={'11:35'}
                  lesson_end_time={'13:05'}
                  lesson_name={'Програмування'}
                  lesson_description={'Лекція'}
                  lesson_locate={'Аудиторія 1402'}
                  lesson_teacher={'Шпортько О. В.'} />
                <Lesson
                  lesson_start_time={'11:35'}
                  lesson_end_time={'13:05'}
                  lesson_name={'Програмування'}
                  lesson_description={'Лекція'}
                  lesson_locate={'Аудиторія 1402'}
                  lesson_teacher={'Шпортько О. В.'} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#faf9f9',
    paddingTop: 30,
  },
  today: {
    paddingLeft: 28,
    flexDirection: 'row',
    fontSize: 14,
    display: 'flex',
  },
  today_day: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 44,
    color: '#212525',
  },
  today_column: {
    flexDirection: 'column',
    alignSelf: 'center',
    paddingLeft: 8,
    bottom: 4,
  },
  today_day_week: {
    fontFamily: 'Poppins_400Regular',
    lineHeight: 21,
    color: '#BCC1CD',
  },
  today_year: {
    fontFamily: 'Poppins_400Regular',
    lineHeight: 21,
    color: '#BCC1CD',
  },
  day_select_conteiner: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 28,
  },
  day_select_text: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#4DC591',
    backgroundColor: 'rgba(77, 197, 145, 0.1)',
    borderRadius: 8,
    padding: 8,
  },
  date_slider: {
    backgroundColor: '#FFFFFF',
    borderTopEndRadius: 32,
    borderTopStartRadius: 32,
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 19,
    paddingHorizontal: 28,
    borderColor: '#FAF9F9',
    borderBottomWidth: 1,
  },
  lesson_schedule: {
    backgroundColor: '#FFFFFF',
    paddingTop: 7,
    paddingHorizontal: 28,
    borderColor: '#FAF9F9',
  },
  lessons: {
    flexDirection: 'row',
  },
  lesson_text: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    paddingRight: 47,
    color: '#BCC1CD',
  },
});