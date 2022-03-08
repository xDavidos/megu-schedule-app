import React, { useState, useEffect, useMemo } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/uk';

export default function DateSlider() { 
    const _spacing = 10;
    const _colors = {
        active: `#FCD259ff`,
        inactive: `#FCD25900`,
    };

    const [datelist, setDatelist] = useState(getdays());

    useEffect(() => {
        const interval = setInterval(() => setDatelist(getdays()), 60000);
        return () => {
          clearInterval(interval);
        };
      }, []);


    function getdays() {
        const startDay = moment().subtract(1, 'week').startOf('week');
        const endDay = moment().add(1, 'week').endOf('week');
        const date = [];
        const day = startDay.clone();

        while (!day.isAfter(endDay)){
            date.push(day.clone());
            day.add(1, 'day');
        }
        return () => date;   
    }

    return (
        <FlatList
        style={{ flexGrow: 0 }}
        data={datelist}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingLeft: _spacing }}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={7}
        horizontal
        renderItem={({ item, index: fIndex }) => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <View
                style={{
                  marginRight: _spacing,
                  paddingHorizontal: _spacing,
                  borderWidth: 1,
                  //borderColor: '#FF7648',
                  borderColor: '#FFF',
                  borderRadius: 10,
                  //backgroundColor: '#FF7648',
                }}>
                <Moment element={Text} style={styles.day_array} format='dd'>{item}</Moment>
                <Moment element={Text} style={styles.day_array} format='D'>{item}</Moment>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
}

const styles = StyleSheet.create({
    day_array: {
      fontFamily: 'eUkraineBold',
      fontSize: 13, 
      textTransform: 'uppercase',
      textAlign: 'center',
      color: '#000000',
      //color: '#FFF', 
    },
  });