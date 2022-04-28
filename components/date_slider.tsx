import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/uk';
import theme from '../assets/themes/index';

const DateSlider = ({ data, index, setIndex } : { data: any, index: any, setIndex: any }) => {
  const sliderRef = React.useRef<FlatList>(null);

  React.useEffect(() => {
    sliderRef.current?.scrollToIndex({
      index: index,
      animated: true,
      viewPosition: 0.40,
      viewOffset: theme.spacing.data_slidel
    })
  }, [index])
  
  return (
    <FlatList
    ref={sliderRef}
    style ={styles.dataslider}
    initialNumToRender={8}
    initialScrollIndex={index}
    getItemLayout={(data, index) => (
      {length: 54, offset: 54 * index, index}
    )}
    data={data.days}
    keyExtractor={(item) => item.date}
    contentContainerStyle={{ paddingLeft: theme.spacing.data_slidel }}
    showsHorizontalScrollIndicator={false}
    horizontal
    renderItem={({ item, index: fIndex }) => {
      return (
        <TouchableOpacity 
        onPress={() => { setIndex(fIndex);}}
        style={{
          marginRight: theme.spacing.data_slidel,
          borderRadius: 10,
          paddingVertical: 8,
          width: 40,
          backgroundColor:
            fIndex == index ? theme.colors.orange : theme.colors.white,
        }}>
          <Moment element={Text} style={ fIndex == index
            ? styles.day_flatlist_weekday_select
            : styles.day_flatlist_weekday
          } format="dd">{item.date}</Moment>
          <Moment element={Text} style={ fIndex == index
            ? styles.day_flatlist_day_select
            : styles.day_flatlist_day
          } format="D">{item.date}</Moment>
        </TouchableOpacity>
      );
    }}
  />
  );
}

const styles = StyleSheet.create({
  dataslider: {
    borderBottomWidth: 1,
    borderBottomColor: "#FAF9F9",
    paddingVertical: 10,
  },
  day_flatlist_weekday: {
    ...theme.textVariants.h2,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: theme.colors.gray,
    paddingBottom: 5,
  },
  day_flatlist_weekday_select: {
    ...theme.textVariants.h2,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#FFF',
    paddingBottom: 5,
  },
  day_flatlist_day: {
    ...theme.textVariants.h1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#000',
  },
  day_flatlist_day_select: {
    ...theme.textVariants.h1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#FFF',
  }
});

export default DateSlider