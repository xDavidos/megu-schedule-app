import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import theme from '../assets/themes';

const { width, height } = Dimensions.get('screen');

const LessonList = ({ data, index, setIndex }) => {
  const lessonsRef = React.useRef<FlatList>();

  React.useEffect(() => {
    lessonsRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
  }, [index]);

  return (
    <FlatList
      ref={lessonsRef}
      style={styles.lessons_flatlist}
      initialScrollIndex={index}
      data={data.days}
      keyExtractor={(item) => item.date}
      getItemLayout={(data, index) => ({
        length: width,
        offset: width * index,
        index,
      })}
      onMomentumScrollEnd={(ev) => {
        setIndex(Math.floor(Math.floor(ev.nativeEvent.contentOffset.x) / Math.floor(width)));
      }}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index: fIndex }) => {
        return (
          <View style={styles.lessons_view}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.lessons_view_heder}>
                <Text style={styles.lessons_view_heder_text1}>Час</Text>
                <Text style={styles.lessons_view_heder_text2}>Пари</Text>
              </View>
              {item.lessons.map((item) => (
                <Lesson key={item.id} item={item} />
              ))}
            </ScrollView>
          </View>
        );
      }}
    />
  );
}

const Lesson = ({ item }) => {
  return (
    <View style={styles.lessons}>
      <View style={styles.lesson_time}>
        <Text style={styles.lesson_time_list_text}>{item.starttime}</Text>
        <Text style={styles.lesson_time_end_list_text}>{item.endtime}</Text>
      </View>
      <View style={styles.lesson_card}>
        <Text style={styles.lesson_card_name}>{item.name}</Text>
        <Text style={styles.lesson_card_description}>{item.description}</Text>
        <Text style={styles.lesson_card_locate}>
          <AntDesign name="enviromento" size={16} color="white" />
          {item.location}
        </Text>
        <Text style={styles.lesson_card_teacher}>
          <AntDesign name="user" size={16} color="white" />
          {item.teacher}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lessons_flatlist: {
    height: "120%",
    marginTop: -30,
    transform: [{ translateY: 30 }],
  },
  lessons_view: {
    height: "99%",
  },
  lessons_view_heder: {
    flexDirection: "row",
    paddingTop: 7,
    paddingBottom: 14,
  },
  lessons_view_heder_text1: {
    ...theme.textVariants.body2,
    color: theme.colors.gray,
    paddingLeft: theme.spacing.m,
    flex: 0.14,
  },
  lessons_view_heder_text2: {
    ...theme.textVariants.body2,
    color: theme.colors.gray,
  },
  lessons: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.m,
    paddingTop: 5,
    width: width,
    //height: '100%'
  },
  lesson_time_text: {
    fontFamily: "eUkraineBold",
    fontSize: 9,
    paddingRight: 30,
    color: "#BCC1CD",
  },
  lesson_time: {
    flexDirection: "column",
    minWidth: 55,
    paddingRight: 9,
    borderRightWidth: 1,
    borderRightColor: "#FAF9F9",
  },
  lessons_text: {
    fontFamily: "eUkraineBold",
    fontSize: 9,
    color: "#BCC1CD",
  },
  lesson_time_list: {
    flexDirection: "column",
    paddingTop: 14,
  },
  lesson_time_list_text: {
    fontFamily: "eUkraineMedium",
    paddingBottom: 4,
    fontSize: 14,
  },
  lesson_time_end_list_text: {
    fontFamily: "eUkraineMedium",
    fontSize: 14,
    color: "#BCC1CD",
  },
  lesson_card: {
    flexDirection: "column",
    marginLeft: 16,
    backgroundColor: "#4DC591",
    borderRadius: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 17,
    flex: 1,
    marginBottom: 16,
  },
  lesson_card_name: {
    fontFamily: "eUkraineBold",
    fontSize: 13,
    color: "#ffff",
  },
  lesson_card_description: {
    fontFamily: "eUkraineMedium",
    fontSize: 10,
    paddingTop: 4,
    color: "#ffff",
  },
  lesson_card_locate_img: {
    height: 16,
    width: 16,
    marginRight: 50,
    tintColor: "#FFFFFF",
  },
  lesson_card_locate: {
    fontFamily: "eUkraineRegular",
    fontSize: 10,
    paddingTop: 15,
    color: "#ffff",
  },
  lesson_card_teacher: {
    fontFamily: "eUkraineRegular",
    fontSize: 10,
    paddingTop: 3,
    color: "#ffff",
  },
});

export default LessonList
