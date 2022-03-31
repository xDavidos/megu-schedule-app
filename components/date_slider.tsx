import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/uk';
import theme from '../assets/themes/index';

const DateSlider = ({ data, index, setIndex }) => {
  const sliderRef = React.useRef<FlatList>();

  React.useEffect(() => {
    sliderRef.current?.scrollToIndex({
      index: index,
      animated: true,
      viewPosition: 0,
      viewOffset: theme.spacing.data_slidel
    })
  }, [index])
  
  return (
    <FlatList
    ref={sliderRef}
    initialNumToRender={8}
    initialScrollIndex={index}
    getItemLayout={(data, index) => (
      {length: 54.5, offset: 54.5 * index, index}
    )}
    data={data.days}
    keyExtractor={(item) => item.date}
    contentContainerStyle={{ paddingLeft: theme.spacing.data_slidel, paddingBottom: theme.spacing.m }}
    showsHorizontalScrollIndicator={false}
    horizontal
    renderItem={({ item, index: fIndex }) => {
      return (
        <TouchableOpacity onPress={() => { setIndex(fIndex);}}>
          <View
            style={{
              marginRight: theme.spacing.data_slidel,
              borderRadius: 10,
              backgroundColor:
                fIndex == index ? theme.colors.orange : theme.colors.white,
              width: 43,
            }}><Moment element={Text} style={ fIndex == index
                ? styles.day_flatlist_select
                : styles.day_flatlist
              } format="dd">{item.date}</Moment>
            <Moment element={Text} style={ fIndex == index
                ? styles.day_flatlist_select
                : styles.day_flatlist
              } format="D">{item.date}</Moment>
          </View>
        </TouchableOpacity>
      );
    }}
  />
  );
}

const styles = StyleSheet.create({
  day_flatlist: {
    ...theme.textVariants.h1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#000',
  },
  day_flatlist_select: {
    ...theme.textVariants.h1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#FFF',
  },
});

export default DateSlider