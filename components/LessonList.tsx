import React, { useCallback, useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, useColorScheme, ActivityIndicator, NativeSyntheticEvent, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Theme from '../constants/style';
import * as Linking from 'expo-linking';
import { FlashList } from '@shopify/flash-list';

import { Text, View } from '../components/Themed';
import { day, useLessons } from '../context/loadingLessons';

const width = Dimensions.get('screen').width;

export default function LessonsList() {
  const { data, index, offset, lessonsListRef, setIndex } = useLessons();

  const handleScroll = useCallback((ev: { nativeEvent: { contentOffset: { x: number; }; }; }) => {
    offset.value = (ev.nativeEvent.contentOffset.x / width) * 58.2;
  }, [width]);

  const handleMomentumScrollEnd = useCallback((ev: { nativeEvent: { contentOffset: { x: number; }; }; }) => {
    const newIndex = Math.floor(Math.floor(ev.nativeEvent.contentOffset.x) / Math.floor(width));
    setIndex(newIndex);
  }, []);

  if (data === undefined && index === -1) {
    return (
      <ActivityIndicator />
    )
  }

  return (
    <FlashList
      ref={lessonsListRef}
      initialScrollIndex={index}
      data={data}
      extraData={index}
      keyExtractor={item => item.date.toString()}
      estimatedItemSize={width}
      onScroll={handleScroll}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }: { item: day }) => {
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.lessons_view_heder} lightColor={Theme.colors.white} darkColor={Theme.colors.gray3}>
              <Text style={styles.lessons_view_heder_text1}>Час</Text>
              <Text style={styles.lessons_view_heder_text2}>Пари</Text>
            </View>
            {item.lessons !== undefined ? (
              item.lessons !== null ? (
                item.lessons.map((item: any) => (
                  <Lesson key={item.id} item={item} />
                ))
              ) : (
                <Text style={styles.lesson_empty} lightColor="#000" darkColor={Theme.colors.white}>Вихідний</Text>
              )
            ) : (
              <ActivityIndicator />
            )}
          </ScrollView>
        );
      }}
    />
  )
};

const Lesson = ({ item }: { item: any }) => {
  const colorSchema = useColorScheme();

  return (
    <View style={styles.lessons} lightColor="#fff" darkColor={Theme.colors.gray3}>
      <View style={[styles.lesson_time, colorSchema === 'light' ? { borderRightColor: "#f5f5f5" } :
        { borderRightColor: "#222222" }]} lightColor={Theme.colors.white} darkColor={Theme.colors.gray3}>
        <Text style={styles.lesson_time_start_text} lightColor="#000" darkColor="#fff">{item.starttime}</Text>
        <Text style={styles.lesson_time_end_text}>{item.endtime}</Text>
      </View>
      <Pressable
        disabled={!item.isOnline}
        onPress={() => {
          Linking.openURL('https://' + item.location);
        }}
        style={[styles.lesson_card, colorSchema === 'light' ? { backgroundColor: Theme.colors.blueGray } :
          { backgroundColor: Theme.colors.darkblueGray }]}>
        <Text style={styles.lesson_card_name}>{item.name}</Text>
        <Text style={styles.lesson_card_description}>
          {item.description}
        </Text>
        <View style={styles.lesson_card_bottom_view} lightColor={Theme.colors.blueGray} darkColor={Theme.colors.darkblueGray}>
          <AntDesign style={styles.lesson_card_bottom_img} name="enviromento" size={16} color="white" />
          <Text style={styles.lesson_card_bottom_text}>{item.location}</Text>
        </View>
        <View style={styles.lesson_card_bottom_view} lightColor={Theme.colors.blueGray} darkColor={Theme.colors.darkblueGray}>
          <AntDesign style={styles.lesson_card_bottom_img} name="user" size={16} color="white" />
          <Text style={styles.lesson_card_bottom_text}>{item.teacher}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  lessons_view_heder: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 8,
    marginHorizontal: 16,
  },
  lessons_view_heder_text1: {
    fontFamily: 'eUkraineMedium',
    fontSize: 14,
    color: '#BCC1CD',
    marginRight: 43,
  },
  lessons_view_heder_text2: {
    fontFamily: 'eUkraineMedium',
    flex: 1,
    fontSize: 14,
    color: '#BCC1CD',
  },
  lessons: {
    flexDirection: "row",
    paddingHorizontal: Theme.spacing.m,
    width: width,
  },
  lesson_time: {
    minWidth: 55,
    borderRightWidth: 1
  },
  lesson_time_light: {
    borderRightColor: "#f5f5f5",
  },
  lesson_time_dark: {
    borderRightColor: "#222222",
  },
  lesson_time_start_text: {
    ...Theme.textVariants.body2,
    marginBottom: 5,
  },
  lesson_time_end_text: {
    ...Theme.textVariants.body2,
    color: Theme.colors.gray,
  },
  lesson_card: {
    backgroundColor: Theme.colors.blueGray,
    marginLeft: Theme.spacing.m,
    marginBottom: Theme.spacing.m,
    borderRadius: 15,
    padding: Theme.spacing.m,
    flex: 1,
  },
  lesson_card_light: {
    backgroundColor: Theme.colors.blueGray,
  },
  lesson_card_dark: {
    backgroundColor: Theme.colors.darkblueGray,
  },
  lesson_card_name: {
    ...Theme.textVariants.h2,
    color: Theme.colors.white,
    marginBottom: 5,
  },
  lesson_card_description: {
    ...Theme.textVariants.body3,
    color: Theme.colors.white,
    marginBottom: 15
  },
  lesson_card_bottom_view: {
    flexDirection: 'row',
    marginBottom: 3
  },
  lesson_card_bottom_img: {
    marginRight: 5,
  },
  lesson_card_bottom_text: {
    ...Theme.textVariants.body5,
    color: Theme.colors.white,
    textAlignVertical: 'center'
  },
  lesson_empty: {
    ...Theme.textVariants.body1,
    width: width,
    paddingTop: 20,
    textAlign: 'center',
  }
});