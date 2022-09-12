import React from 'react';
import {
  StyleSheet, Dimensions, ScrollView, TouchableOpacity, FlatList
} from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Theme from '../constants/style';
import * as Linking from 'expo-linking';
import Moment from 'react-moment';
import { FlashList } from "@shopify/flash-list";

import useColorScheme from '../hooks/useColorScheme';
import { Text, View } from '../components/Themed';
import IDay from '../interface/IDay'

const width = Dimensions.get('screen').width;

export default function LessonsList({ data, index, setIndex }: { data: any; index: any; setIndex: any }) {
  const lessonsRef = React.useRef<FlatList>(null);
  const colorSchema = useColorScheme();

  React.useEffect(() => {
    lessonsRef.current?.scrollToOffset({
      offset: width * index,
      animated: true,
    });
  }, [index]);

  return (
    <FlatList
      ref={lessonsRef}
      initialScrollIndex={index}
      data={data}
      keyExtractor={item => item.date}
      getItemLayout={(data, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
      onMomentumScrollEnd={ev => {
        setIndex(
          Math.floor(Math.floor(ev.nativeEvent.contentOffset.x) / Math.floor(width),
          ),
        );
      }}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }: { item: any; index: any }) => {
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.lessons_view_heder}>
              <Text style={styles.lessons_view_heder_text1}>Час</Text>
              <Text style={styles.lessons_view_heder_text2}>Пари</Text>
            </View>
            {item.hasOwnProperty('lessons') ? (
              item.lessons.map((item: any) => (
                <Lesson key={item.id} item={item} />
              ))
            ) : (
              <Text style={styles.lesson_empty} lightColor="#000" darkColor={Theme.colors.white}>Вихідний</Text>
            )}
          </ScrollView>
        );
      }}
    />
  )

  /*   return (
      <FlatList
        ref={lessonsRef}
        initialScrollIndex={index}
        data={data}
        keyExtractor={item => item.date}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onMomentumScrollEnd={ev => {
          setIndex(
            Math.floor(Math.floor(ev.nativeEvent.contentOffset.x) / Math.floor(width),
            ),
          );
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item}: {item: any; index: any}) => {
          return (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.lessons_view_heder}>
                <Text style={styles.lessons_view_heder_text1}>Час</Text>
                <Text style={styles.lessons_view_heder_text2}>Пари</Text>
              </View>
              {item.hasOwnProperty('lessons') ? (
                item.lessons.map((item: any) => (
                  <Lesson key={item.id} item={item} />
                ))
              ) : (
                <Text style={[styles.lesson_empty, ThemeLessonEmpty]}>Вихідний</Text>
              )}
            </ScrollView>
          );
        }}
      />
    ); */
};

const Lesson = ({ item }: { item: any }) => {
  const colorSchema = useColorScheme();
  const ThemeLessonTime = colorSchema === 'light' ? styles.lesson_time_light
    : styles.lesson_time_dark;
  const ThemeLessonCard = colorSchema === 'light' ? styles.lesson_card_light
    : styles.lesson_card_dark;

  return (
    <View style={styles.lessons}>
      <View style={[styles.lesson_time, ThemeLessonTime]}>
        <Text style={styles.lesson_time_start_text} lightColor={"#000"} darkColor={"#fff"}>{item.starttime}</Text>
        <Text style={styles.lesson_time_end_text}>{item.endtime}</Text>
      </View>
      {item.isOnline == true ? (
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://' + item.location);
          }}
          style={[styles.lesson_card, ThemeLessonCard]}>
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
        </TouchableOpacity>
      ) : (
        <View style={styles.lesson_card} lightColor={Theme.colors.blueGray} darkColor={Theme.colors.darkblueGray}>
          <Text style={styles.lesson_card_name}>{item.name}</Text>
          <Text style={styles.lesson_card_description}>{item.description}</Text>
          <View style={styles.lesson_card_bottom_view} lightColor={Theme.colors.blueGray} darkColor={Theme.colors.darkblueGray}>
            <AntDesign style={styles.lesson_card_bottom_img} name="enviromento" size={16} color="white" />
            <Text style={styles.lesson_card_bottom_text}>{item.location}</Text>
          </View>
          <View style={styles.lesson_card_bottom_view} lightColor={Theme.colors.blueGray} darkColor={Theme.colors.darkblueGray}>
            <AntDesign style={styles.lesson_card_bottom_img} name="user" size={16} color="white" />
            <Text style={styles.lesson_card_bottom_text}>{item.teacher}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  lessons_view_heder: {
    flexDirection: "row",
    marginBottom: 14,
    marginTop: 8,
  },
  lessons_view_heder_text1: {
    ...Theme.textVariants.body2,
    color: Theme.colors.gray,
    paddingLeft: Theme.spacing.m,
    marginRight: 43,
  },
  lessons_view_heder_text2: {
    ...Theme.textVariants.body2,
    color: Theme.colors.gray,
  },
  lessons: {
    flexDirection: "row",
    paddingHorizontal: Theme.spacing.m,
    width: width,
  },
  lesson_time: {
    minWidth: 55,
    borderRightWidth: 1,
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