import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, useColorScheme } from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/uk';
import theme from '../assets/themes/index';

const DateSlider = ({ data, index, setIndex } : { data: any, index: any, setIndex: any }) => {
  const sliderRef = React.useRef<FlatList>(null);
  const colorSchema = useColorScheme();
  const themeDataslider = colorSchema === 'light' ? styles.dataslider_light 
  : styles.dataslider_dark;
  const themeDatasliderBox = colorSchema === 'light' ? theme.colors.white 
  : theme.colors.gray3;
  const themeDatasliderText = colorSchema === 'light' ? styles.day_flatlist_day_light 
  : styles.day_flatlist_day_dark;
  const themeDatasliderTextSelect = colorSchema === 'light' ? styles.day_flatlist_day_select_light 
  : styles.day_flatlist_day_select_dark;

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
    style ={[styles.dataslider, themeDataslider]}
    initialNumToRender={8}
    initialScrollIndex={index}
    getItemLayout={(data, index) => (
      {length: 54, offset: 54 * index, index}
    )}
    data={data}
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
            fIndex == index ? theme.colors.blue : themeDatasliderBox,
        }}>
          <Moment element={Text} style={ fIndex == index
            ? styles.day_flatlist_weekday_select
            : styles.day_flatlist_weekday
          } format="dd">{item.date}</Moment>
          <Moment element={Text} style={ fIndex == index
            ? themeDatasliderTextSelect
            : themeDatasliderText
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
    paddingVertical: 10,
    flexGrow: 0,
    flexShrink: 0,
  },
  dataslider_light: {
    borderBottomColor: "#f5f5f5",
  },
  dataslider_dark: {
    borderBottomColor: "#222222",
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
  day_flatlist_day_light: {
    ...theme.textVariants.h1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#000',
  },
  day_flatlist_day_dark: {
    ...theme.textVariants.h1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
  },
  day_flatlist_day_select_light: {
    ...theme.textVariants.h1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#FFF',
  },
  day_flatlist_day_select_dark: {
    ...theme.textVariants.h1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
  }
});

export default DateSlider