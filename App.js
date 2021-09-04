import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
        <View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#faf9f9',
    paddingTop: 55,
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
});
