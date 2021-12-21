import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Moment from 'react-moment';
import 'moment/locale/uk';
//import DataSlider from './components/date_slider.js'
import Lesson from './components/lesson_schedule.js'
//import weekday from './components/require_date.js'
import moment from 'moment';
import Faker from 'faker';
Faker.locale = "ru";

const data = [...Array(14).keys()].map(() => ({
  key: Faker.datatype.uuid(),
  day: 21,
  weekday: Faker.date.weekday(),
}));

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  });
  console.log(moment().endOf('week').add(7, 'd').toDate());
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.today}>
          <Moment element={Text} locale='uk' style={styles.today_day} format='D'></Moment>
          <View style={styles.today_column}>
            <Moment element={Text} locale='uk' style={styles.today_day_week} format='dddd'></Moment>
            <Moment element={Text} locale='uk' style={styles.today_year} format='MMMM YYYY'></Moment>
          </View>
          <View style={styles.day_select_conteiner}>
            <Text style={styles.day_select_text}>Сьогодні</Text>
          </View>
        </View>
        <View style={styles.date_slider}>
          <FlatList
            style={{ flexGrow: 0 }}
            data={data}
            keyExtractor={(item) => item.key}
            contentContainerStyle={{ paddingLeft: 20 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item, index: fIndex }) => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <View
                  style={{
                    marginRight: 16,
                    paddingHorizontal: 9,
                    //borderRadius: 5,
                    //backgroundColor: `#FF7648`,
                  }}>
                  <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, /*color: '#ffff'*/ }}>{item.weekday}</Text>
                  <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, /*color: '#ffff'*/ }}>{item.day}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          />
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
                  lesson_start_time={'11:30'}
                  lesson_end_time={'12:50'}
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
    paddingTop: 50,
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
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingTop: 16,
    paddingBottom: 16,
    //paddingHorizontal: 28,
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