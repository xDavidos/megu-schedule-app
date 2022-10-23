import React, { useEffect } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, useColorScheme } from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/uk';
//import { FlashList } from "@shopify/flash-list";

import Theme from '../constants/style';

const DateSlider = ({ data, index, setIndex }: { data: any, index: any, setIndex: any }) => {
  const sliderRef = React.useRef<FlatList>(null);
  const colorSchema = useColorScheme();
  const themeDatasliderText = colorSchema === 'light' ? styles.day_flatlist_day_light
    : styles.day_flatlist_day_dark;
  const themeDatasliderTextSelect = colorSchema === 'light' ? styles.day_flatlist_day_select_light
    : styles.day_flatlist_day_select_dark;

  useEffect(() => {
    if (data.lessons != undefined) {
      sliderRef.current?.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.40,
        viewOffset: Theme.spacing.data_slidel
      })
    }
  }, [index])

  return (
    <FlatList
      ref={sliderRef}
      style={[styles.dataslider, colorSchema === 'light' ? { borderBottomColor: '#f5f5f5' } : { borderBottomColor: "#222" }]}
      data={data.lessons}
      keyExtractor={(item) => item.id}
      initialScrollIndex={index}
      getItemLayout={(data, index) => (
        { length: 54, offset: 54 * index, index }
      )}
      contentContainerStyle={{ paddingLeft: Theme.spacing.data_slidel }}
      showsHorizontalScrollIndicator={false}
      horizontal
      renderItem={({ item, index: fIndex }) => {
        return (
          <TouchableOpacity
            onPress={() => { setIndex(fIndex); }}
            style={{
              marginRight: Theme.spacing.data_slidel,
              borderRadius: 10,
              paddingVertical: 8,
              width: 40,
              backgroundColor:
                fIndex == index ? Theme.colors.blue : colorSchema === 'light' ? '#fff' : Theme.colors.gray3,
            }}>
            <Moment element={Text} style={fIndex == index ? styles.day_flatlist_weekday_select
              : styles.day_flatlist_weekday} format="dd">{item.date}</Moment>
            <Moment element={Text} style={fIndex == index ? themeDatasliderTextSelect
              : themeDatasliderText} format="D">{item.date}</Moment>
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
  day_flatlist_weekday: {
    ...Theme.textVariants.h2,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: Theme.colors.gray,
    paddingBottom: 5,
  },
  day_flatlist_weekday_select: {
    ...Theme.textVariants.h2,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
    paddingBottom: 5,
  },
  day_flatlist_day_light: {
    ...Theme.textVariants.h1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#000',
  },
  day_flatlist_day_dark: {
    ...Theme.textVariants.h1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
  },
  day_flatlist_day_select_light: {
    ...Theme.textVariants.h1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
  },
  day_flatlist_day_select_dark: {
    ...Theme.textVariants.h1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
  }
});

export default DateSlider