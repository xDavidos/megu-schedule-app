import { StyleSheet, Pressable } from 'react-native'
import React from 'react'

import { Text, View } from './Themed';
import { useLessons } from '../context/loadingLessons';
import selectToday from '../etc/selectToday';

export default function Today() {
  const { setIndex, data } = useLessons();
  const Weekdays = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];
  const Months = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень"
  ];
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    setInterval(() => setDate(new Date()), 30000);
  }, []);

  return (
    <Pressable onPress={() => setIndex(selectToday(data!))} style={styles.today}>
      <Text style={styles.today_day}>{date.getDate()}</Text>
      <View style={{ flexDirection: 'column', alignSelf: 'center' }} darkColor={'#1F1F1F'}>
        <Text style={styles.today_day_week}>{Weekdays[date.getDay()]}</Text>
        <Text style={styles.today_month_year}>{Months[date.getMonth()]} {date.getFullYear()}</Text>
      </View>
    </Pressable>
  )
}



const styles = StyleSheet.create({
  today: {
    flexDirection: 'row',
    flex: 1,
  },
  today_day: {
    fontFamily: 'eUkraineMedium',
    fontSize: 44,
    marginRight: 8,
  },
  today_day_week: {
    fontFamily: 'eUkraineRegular',
    fontSize: 14,
    color: '#BCC1CD',
  },
  today_month_year: {
    fontFamily: 'eUkraineRegular',
    fontSize: 14,
    color: '#BCC1CD',
  }
});