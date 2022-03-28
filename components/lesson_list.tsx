import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SectionList, StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/uk';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Lessons from './data.json'

const { width, height } = Dimensions.get('screen');

export default function LissonList() {
  const ref = useRef<FlatList>(null);
  //const ref = useRef<SectionList>(null);
/*   let array = [
    {
      date: "2022-03-13T22:00:00.000Z",
      lessons: [
        {
          id: 0, 
          name: "Програмування C#",
          type: 0,
          isOnline: false,
          starttime: "10:00",
          endtime: "11:00",
          description: "Пара фігня",
          location: "Аудиторія 1402",
          teacher: "Шпортько О. В.",
        },
        {
          id: 1, name: "Програмування Java", type: 1, isOnline: false, starttime: "11:10", endtime: "12:10", description: "Мова дідів", location: "Аудиторія 1402", teacher: "Шпортько О. В.",
        },
        {
          id: 2, name: "Програмування JavaScript", type: 0, isOnline: true, starttime: "12:20", endtime: "11:20", description: "Жабаскрипт", location: "meet.google.com/yyf-ykye-kgk", teacher: "Шпортько О. В. V2",
        },
      ],
    },
    {
      date: "2022-03-14T22:00:00.000Z",
      lessons: [
        {
          id: 0, name: "Програмування C#", type: 0, isOnline: false, starttime: "10:00", endtime: "11:00", description: "Пара фігня", location: "Аудиторія 1402", teacher: "Шпортько О. В.",
        },
        {
          id: 1, name: "Програмування Java", type: 1, isOnline: false, starttime: "11:10", endtime: "12:10", description: "Мова дідів", location: "Аудиторія 1402", teacher: "Шпортько О. В.",
        },
        {
          id: 2, name: "Програмування JavaScript", type: 0, isOnline: true, starttime: "12:20", endtime: "11:20", description: "Жабаскрипт", location: "meet.google.com/yyf-ykye-kgk", teacher: "Шпортько О. В. V2",
        },
      ],
    },
    {
      date: "2022-03-15T22:00:00.000Z",
      lessons: [
        {
          id: 0, name: "Програмування C#", type: 0, isOnline: false, starttime: "10:00", endtime: "11:00", description: "Пара фігня", location: "Аудиторія 1402", teacher: "Шпортько О. В.",
        },
        {
          id: 1, name: "Програмування Java", type: 1, isOnline: false, starttime: "11:10", endtime: "12:10", description: "Мова дідів", location: "Аудиторія 1402", teacher: "Шпортько О. В.",
        },
        {
          id: 2, name: "Програмування JavaScript", type: 0, isOnline: true, starttime: "12:20", endtime: "11:20", description: "Жабаскрипт", location: "meet.google.com/yyf-ykye-kgk", teacher: "Шпортько О. В. V2",
        },
      ],
    },
    {
      date: "2022-03-16T22:00:00.000Z",
      lessons: [
        {
          id: 0, name: "Програмування C#", type: 0, isOnline: false, starttime: "10:00", endtime: "11:00", description: "Пара фігня", location: "Аудиторія 1402", teacher: "Шпортько О. В.",
        },
        {
          id: 1, name: "Програмування Java", type: 1, isOnline: false, starttime: "11:10", endtime: "12:10", description: "Мова дідів", location: "Аудиторія 1402", teacher: "Шпортько О. В.",
        },
        {
          id: 2, name: "Програмування JavaScript", type: 0, isOnline: true, starttime: "12:20", endtime: "11:20", description: "Жабаскрипт", location: "meet.google.com/yyf-ykye-kgk", teacher: "Шпортько О. В. V2",
        },
      ],
    },
    {
      date: "2022-03-17T22:00:00.000Z",
      lessons: [
        {
          id: 0, name: "Програмування C#", type: 0, isOnline: false, starttime: "10:00", endtime: "11:00", description: "Пара фігня", location: "Аудиторія 1402", teacher: "Шпортько О. В.",
        },
        {
          id: 1, name: "Програмування Java", type: 1, isOnline: false, starttime: "11:10", endtime: "12:10", description: "Мова дідів", location: "Аудиторія 1402", teacher: "Шпортько О. В.",
        },
        {
          id: 2, name: "Програмування JavaScript", type: 0, isOnline: true, starttime: "12:20", endtime: "11:20", description: "Жабаскрипт", location: "meet.google.com/yyf-ykye-kgk", teacher: "Шпортько О. В. V2",
        },
      ],
    },
  ]; */
  
 // const [index, setIndex] = useState(16);
  //console.log(LessonsToday + " " + Lessons[1].date);


  return (
    <FlatList
    initialNumToRender={1}
    initialScrollIndex={20}
    onScrollToIndexFailed={info => {
        const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(() => {
            ref.current?.scrollToIndex({ index: info.index, animated: false, viewOffset: 1 });
        });
    }}
    data={Lessons}
    keyExtractor={(item) => item.date}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{}}
    renderItem={({ item }) => {
        return (
            <FlatList
                data={item.data}
                style={{ paddingHorizontal: 15, width: width}}
                keyExtractor={(item) => item.id.toString() }
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => {
                    return (
                    <View style={styles.lessons}>
                        <View style={styles.lesson_time}>
                            <Text style={styles.lesson_time_list_text}>{item.starttime}</Text>
                            <Text style={styles.lesson_time_end_list_text}>{item.endtime}</Text>
                        </View>
                        <View style={styles.lesson_card}>
                            <Text style={styles.lesson_card_name}>{item.name}</Text>
                            <Text style={styles.lesson_card_description}>{item.description}</Text>
                            <Text style={styles.lesson_card_locate}><AntDesign name="enviromento" size={16} color="white"/>{item.location}</Text>
                            <Text style={styles.lesson_card_teacher}><Ionicons name="ios-person" size={16} color="white"/>{item.teacher}</Text>
                        </View>
                    </View>
                    );
            }}/>
        );
    }}
    />
);
}

const styles = StyleSheet.create({
    lessons: {
        flexDirection: 'row',
        //paddingLeft: 20,
    },
    lesson_time_text: {
        fontFamily: 'eUkraineBold',
        fontSize: 9,
        paddingRight: 30,
        color: '#BCC1CD',
    },
    lesson_time: {
        flexDirection: 'column',
        paddingRight: 9,
        borderRightWidth: 1,
        borderRightColor: '#FAF9F9',
    },
    lessons_text: {
        fontFamily: 'eUkraineBold',
        fontSize: 9,
        color: '#BCC1CD',
    },
    lesson_time_list: {
        flexDirection: 'column',
        paddingTop: 14,
    },
    lesson_time_list_text: {
        fontFamily: 'eUkraineMedium',
        fontSize: 14,
    },
    lesson_time_end_list_text: {
        fontFamily: 'eUkraineMedium',
        fontSize: 14,
        color: '#BCC1CD',
    },
    lesson_card: {
        flexDirection: 'column',
        marginLeft: 16,
        backgroundColor: '#4DC591',
        borderRadius: 16,
        paddingTop: 16,
        paddingLeft: 16,
        paddingBottom: 17,
        flex: 1,
        marginBottom: 16,
    },
    lesson_card_name: {
        fontFamily: 'eUkraineBold',
        fontSize: 13,
        color: '#ffff'
    },
    lesson_card_description: {
        fontFamily: 'eUkraineMedium',
        fontSize: 10,
        paddingTop: 4,
        color: '#ffff'

    },
    lesson_card_locate_img: {
        height: 16,
        width: 16,
        marginRight: 50,
        tintColor: '#FFFFFF',
    },
    lesson_card_locate: {
        fontFamily: 'eUkraineRegular',
        fontSize: 10,
        paddingTop: 15,
        color: '#ffff'
    },
    lesson_card_teacher_img: {
        //marginRight: 500,
    },
    lesson_card_teacher: {
        fontFamily: 'eUkraineRegular',
        fontSize: 10,
        paddingTop: 3,
        color: '#ffff'
    },
});
