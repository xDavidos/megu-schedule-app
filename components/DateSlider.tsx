import { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, useColorScheme, ActivityIndicator } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { day, useLessons } from '../context/loadingLessons';
import { View, Text } from './Themed';

export default function DateSlider() {
  const { data, index, offset, lessonsListRef, setIndex } = useLessons();
  const Weekdays = ["НД", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]
  const daylistRef = useRef<FlashList<day> | null>(null);
  const colorSchema = useColorScheme();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const changeIndex = (index: number) => {
    setIndex(index)
    lessonsListRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  }

  useEffect(() => {
    if (index !== undefined) {
      daylistRef.current?.scrollToIndex({
        index: index!,
        animated: true,
        viewPosition: 0.50,
        viewOffset: 0
      })

      offset.value = withSpring(58.2 * index, { damping: 15 });
    }
  }, [index])

  if (data === undefined && index === -1) {
    return (
      <ActivityIndicator />
    )
  }

  return (
    <View style={[styles.dataslider, colorSchema === 'dark' &&
      { borderBottomColor: "#222" }]} lightColor={'#FFF'} darkColor={'#1B1B1B'}>
      <FlashList
        ref={daylistRef}
        data={data}
        extraData={index}
        estimatedItemSize={58.2}
        keyExtractor={(item) => item.date.toString()}
        initialScrollIndex={index}
        showsHorizontalScrollIndicator={false}
        horizontal
        ListHeaderComponent={<Animated.View style={[styles.box, animatedStyles]} />}
        renderItem={({ item, index: fIndex }: { item: day, index: number }) => {
          return (
            <Pressable
              style={styles.day_conteiner}
              onPress={() => changeIndex(fIndex)}>
              <Text style={[styles.day_weekday, fIndex == index && { color: '#fff' }]}>{Weekdays[item.date.getDay()]}</Text>
              <Text style={[styles.day_number, fIndex == index && { color: '#fff' }]}>{item.date.getDate()}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dataslider: {
    paddingVertical: 10,
    flexGrow: 0,
    flexShrink: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  box: {
    position: 'absolute',
    height: 60,
    width: 40,
    borderRadius: 10,
    marginHorizontal: 9,
    backgroundColor: '#344FB3',
  },
  day_conteiner: {
    height: 60,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 9,
    zindex: 1
  },
  day_weekday: {
    fontFamily: 'eUkraineBold',
    fontSize: 11,
    color: '#BCC1CD',
    paddingBottom: 5
  },
  day_number: {
    fontFamily: 'eUkraineBold',
    fontSize: 14
  },
});