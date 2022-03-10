import React, { useState, useEffect, useRef } from 'react';
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

    // Перенести startDay/EndDay в useState, та переробити оновлення дат через useMemo коли StartDay змінится 
    const [datelist, setDatelist] = useState(getdays());
    const [index, setIndex] = useState(8);
    const ref = useRef<FlatList>(null);

    useEffect(() => {
      const interval = setInterval(() => setDatelist(getdays()), 60000);
      return () => clearInterval(interval);
    }, []);

    function getdays() {
      const startDay = moment().subtract(1, 'week').startOf('week')
      const endDay = moment().add(1, 'week').endOf('week')
      let date = []
      const day = startDay.clone()
      
      while (!day.isAfter(endDay)){
        date.push(day.clone())
        day.add(1, 'day')
      }

      const array = date.map(function(val, index){
        return {id:index, day:val}
      })
      
      return () => array
    }

    return (
      <FlatList
      style={{ flexGrow: 0 }}
      data={datelist}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ paddingLeft: _spacing }}
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={index}
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
              <Moment element={Text} style={styles.day_array} format='dd'>{item.day}</Moment>
              <Moment element={Text} style={styles.day_array} format='D'>{item.day}</Moment>
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