import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

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
          <Text style={styles.today_day}>24</Text>
          <View style={styles.today_column}>
            <Text style={styles.today_day_week}>Четверг</Text>
            <Text style={styles.today_year}>Сентябрь 2021</Text>
          </View>
          <View style={styles.day_select_conteiner}>
            <Text style={styles.day_select_text}>Сегодня</Text>
          </View>
        </View>
        <View style={styles.date_slider}>
          <View style={styles.date_slider_day}>
            <Text style={styles.date_slider_day_week}>ПН</Text>
            <Text style={styles.date_slider_day_number}>21</Text>
          </View>
          <View style={styles.date_slider_day}>
            <Text style={styles.date_slider_day_week}>ВТ</Text>
            <Text style={styles.date_slider_day_number}>22</Text>
          </View>
          <View style={styles.date_slider_day}>
            <Text style={styles.date_slider_day_week}>СР</Text>
            <Text style={styles.date_slider_day_number}>23</Text>
          </View>
          <View style={{ backgroundColor: '#FF7648', borderRadius: 10, marginRight: 31, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 12, color: '#ffff', paddingHorizontal: 10 }}>ЧТ</Text>
            <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#ffff', paddingHorizontal: 10 }}>24</Text>
          </View>
          <View style={styles.date_slider_day}>
            <Text style={styles.date_slider_day_week}>ПТ</Text>
            <Text style={styles.date_slider_day_number}>25</Text>
          </View>
          <View style={styles.date_slider_day}>
            <Text style={styles.date_slider_day_week}>СБ</Text>
            <Text style={styles.date_slider_day_number}>26</Text>
          </View>
          <View style={styles.date_slider_day}>
            <Text style={styles.date_slider_day_week}>ВС</Text>
            <Text style={styles.date_slider_day_number}>27</Text>
          </View>
        </View>
        <View style={styles.lesson_schedule}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.lesson_time}>Время</Text>
            <Text style={styles.lessons}>Пары</Text>
            <Image source={{ uri: './assets/favicon.png' }} />

          </View>
          <View style={styles.lesson_list}>
            <Text style={styles.lesson_time_list_text}>11:35</Text>
            <Text style={styles.lesson_time_end_list_text}>13:05</Text>
            <View style={styles.lesson_card}>
              <Text style={styles.lesson_card_name}>Програмирование</Text>
              <Text style={styles.lesson_card_description}>Лекция</Text>
              <Image style={{ width: 20, height: 20, tintColor: 'Green' }} source={{ uri: 'data:assets/location.png' }} />
              <Text style={styles.lesson_card_locate}>Аудитория 1402</Text>
              <Text style={styles.lesson_card_teacher}>Шпортько О. В.</Text>
            </View>
          </View>
        </View>
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
    marginRight: 28,
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
  },
  date_slider_day: {
    marginRight: 31,
    alignItems: 'center',
  },
  date_slider_day_number: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  date_slider_day_week: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: '#BCC1CD'
  },
  lesson_schedule: {
    backgroundColor: '#FFFFFF',
    paddingTop: 7,
    paddingHorizontal: 28,
    borderTopWidth: 1,
    borderColor: '#FAF9F9',
  },
  lesson_time: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    paddingRight: 22,
  },
  lessons: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    paddingRight: 22,
  },
  lesson_time_list: {
    flexDirection: 'column',
    paddingTop: 14,
  },
  lesson_time_list_text: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
  },
  lesson_time_end_list_text: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,

  },
  lesson_card: {
    flexDirection: 'column'

  },
  lesson_card_name: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,

  },
  lesson_card_description: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,

  },
  lesson_card_locate_img: {
    width: 50,
    height: 50,
  },
  lesson_card_locate: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
  },
  lesson_card_teacher: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,

  },
});
