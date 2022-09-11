import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, useColorScheme } from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/uk';
import { FlashList } from "@shopify/flash-list";

import Theme from '../constants/style';

const DateSlider = ({ data, index, setIndex }: { data: any, index: any, setIndex: any }) => {
  const sliderRef = React.useRef<FlashList<number> | null>(null);
  const colorSchema = useColorScheme();
  const themeDataslider = colorSchema === 'light' ? styles.dataslider_light
    : styles.dataslider_dark;
  const themeDatasliderBox = colorSchema === 'light' ? Theme.colors.white
    : Theme.colors.gray3;
  const themeDatasliderText = colorSchema === 'light' ? styles.day_flatlist_day_light
    : styles.day_flatlist_day_dark;
  const themeDatasliderTextSelect = colorSchema === 'light' ? styles.day_flatlist_day_select_light
    : styles.day_flatlist_day_select_dark;

  React.useEffect(() => {
    sliderRef.current?.scrollToIndex({
      index: index,
      animated: true,
      viewPosition: 0.40,
      viewOffset: Theme.spacing.data_slidel
    })
  }, [index])

  return (
    <FlashList
      ref={sliderRef}
      style={[styles.dataslider, themeDataslider]}
      initialScrollIndex={index}
      data={data}
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
                fIndex == index ? Theme.colors.blue : themeDatasliderBox,
            }}>
            <Moment element={Text} unix={true} style={fIndex == index
              ? styles.day_flatlist_weekday_select
              : styles.day_flatlist_weekday
            } format="dd">{item.date}</Moment>
            <Moment element={Text} unix={true} style={fIndex == index
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
    color: '#FFF',
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
    color: '#FFF',
  },
  day_flatlist_day_select_dark: {
    ...Theme.textVariants.h1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
  }
});

export default DateSlider