import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/uk';

const { width } = Dimensions.get('screen');

export default function DateSlider() { 
  const _spacing = 11;
  const _colors = {
      active: `#FF7648`,
      inactive: `#fff`,
  };
  const [startday, setstartday] = useState(updatestartday());
  const ref = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => setstartday(updatestartday()), 60000);
    return () => clearInterval(interval);
  }, []);

  function updatestartday() {
    console.log('Update Start Week Day');
    return moment().subtract(1, 'week').startOf('week');
  }

  const generatedayslist = useMemo(() => {
    let date = []
    let day = startday.clone()
    let i = 0;

    while (i++ < 21){
      date.push(day.clone())
      day.add(1, 'day')
    }
    
    return date
  }, [startday])

  const [index, setIndex] = useState(setindexday());

  function setindexday() {
    let i = 0;

    while (i++ < 21){
      if (moment(generatedayslist[i]).date() == moment().date())
        break;
    }
    
    return i
  }

  useEffect(() => {
    ref.current?.scrollToIndex({
      index: index,
      animated: true,
      viewPosition: 0,
      viewOffset: _spacing
    })
  }, [index])
  
  return (
    <FlatList
    ref={ref}
    initialNumToRender={8}
    initialScrollIndex={index}
    getItemLayout={(data, index) => (
      {length: 54.5, offset: 54.5 * index, index}
    )}
    data={generatedayslist}
    keyExtractor={(item) => item}
    contentContainerStyle={{ paddingLeft: _spacing, paddingBottom: 25 }}
    showsHorizontalScrollIndicator={false}
    horizontal
    renderItem={({ item, index: fIndex }) => {
      return (
        <TouchableOpacity onPress={() => { setIndex(fIndex) }}>
          <View
            style={{
              marginRight: _spacing,
              borderRadius: 10,
              backgroundColor: 
              fIndex == index ? _colors.active : _colors.inactive,
              width: 43
            }}>
            <Moment element={Text} style={fIndex == index ? styles.day_flatlist_select 
              : styles.day_flatlist} format='dd'>{item}</Moment>
            <Moment element={Text} style={fIndex == index ? styles.day_flatlist_select 
              : styles.day_flatlist} format='D'>{item}</Moment>
          </View>
        </TouchableOpacity>
      );
    }}
  />
  );
}

const styles = StyleSheet.create({
  day_flatlist: {
    fontFamily: 'eUkraineBold',
    fontSize: 13, 
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#000',
  },
  day_flatlist_select: {
    fontFamily: 'eUkraineBold',
    fontSize: 13, 
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#FFF',
  },
});