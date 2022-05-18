import React from 'react';
import { StyleSheet, Text, View, FlatList, 
  Dimensions, ScrollView, TouchableOpacity, RefreshControl, useColorScheme } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import theme from '../assets/themes';
import * as Linking from 'expo-linking';

const width = Dimensions.get('screen').width;

const LessonList = ({data, index, setIndex, onRefresh, refreshing}:
   { data: any; index: any; setIndex: any; onRefresh: any, refreshing: any }) => {
  const lessonsRef = React.useRef<FlatList>(null);

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
      renderItem={({item}: {item: any; index: any}) => {
        return (
          <ScrollView showsVerticalScrollIndicator={false} 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={styles.lessons_view_heder}>
              <Text style={styles.lessons_view_heder_text1}>Час</Text>
              <Text style={styles.lessons_view_heder_text2}>Пари</Text>
            </View>
            {item.hasOwnProperty('lessons') ? (
              item.lessons.map((item: any) => (
                <Lesson key={item.id} item={item} />
              ))
            ) : (
              <Text style={styles.lesson_empty}>Вихідний</Text>
            )}
          </ScrollView>
        );
      }}
    />
  );
};

const Lesson = ({ item } : { item: any }) => {
  const colorSchema = useColorScheme();
  const themeLessonStartTime = colorSchema === 'light' ? styles.lesson_time_start_text_light 
  : styles.lesson_time_start_text_dark;
  const themeLessonTime = colorSchema === 'light' ? styles.lesson_time_light 
  : styles.lesson_time_dark;
  const themeLessonCard = colorSchema === 'light' ? styles.lesson_card_light 
  : styles.lesson_card_dark;

  return (
    <View style={styles.lessons}>
      <View style={[styles.lesson_time, themeLessonTime]}>
        <Text style={[styles.lesson_time_start_text, themeLessonStartTime]}>{item.starttime}</Text>
        <Text style={styles.lesson_time_end_text}>{item.endtime}</Text>
      </View>
      {item.isOnline == true ? (
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://' + item.location);
          }}
          style={[styles.lesson_card, themeLessonCard]}>
            <Text style={styles.lesson_card_name}>{item.name}</Text>
            <Text style={styles.lesson_card_description}>
              {item.description}
            </Text>
            <View style={styles.lesson_card_bottom_view}>
              <AntDesign style={styles.lesson_card_bottom_img} name="enviromento" size={16} color="white" />
              <Text style={styles.lesson_card_bottom_text}>{item.location}</Text>
            </View>
            <View style={styles.lesson_card_bottom_view}>
              <AntDesign style={styles.lesson_card_bottom_img} name="user" size={16} color="white" />
              <Text style={styles.lesson_card_bottom_text}>{item.teacher}</Text>
            </View>
        </TouchableOpacity>
      ) : (
        <View style={[styles.lesson_card, themeLessonCard]}>
          <Text style={styles.lesson_card_name}>{item.name}</Text>
          <Text style={styles.lesson_card_description}>{item.description}</Text>
          <View style={styles.lesson_card_bottom_view}>
              <AntDesign style={styles.lesson_card_bottom_img} name="enviromento" size={16} color="white" />
              <Text style={styles.lesson_card_bottom_text}>{item.location}</Text>
            </View>
            <View style={styles.lesson_card_bottom_view}>
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
    ...theme.textVariants.body2,
    color: theme.colors.gray,
    paddingLeft: theme.spacing.m,
    marginRight: 43,
  },
  lessons_view_heder_text2: {
    ...theme.textVariants.body2,
    color: theme.colors.gray,
  },
  lessons: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.m,
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
    ...theme.textVariants.body2,
    marginBottom: 5,
  },
  lesson_time_start_text_light: {
    color: "#000"
  },
  lesson_time_start_text_dark: {
    color: "#fff"
  },
  lesson_time_end_text: {
    ...theme.textVariants.body2,
    color: theme.colors.gray,
  },
  lesson_card: {
    backgroundColor: theme.colors.blueGray,
    marginLeft: theme.spacing.m,
    marginBottom: theme.spacing.m,
    borderRadius: 15,
    padding: theme.spacing.m,
    flex: 1,
  },
  lesson_card_light: {
    backgroundColor: theme.colors.blueGray,
  },
  lesson_card_dark: {
    backgroundColor: theme.colors.darkblueGray,
  },
  lesson_card_name: {
    ...theme.textVariants.h2,
    color: theme.colors.white,
    marginBottom: 5,
  },
  lesson_card_description: {
    ...theme.textVariants.body3,
    color: theme.colors.white,
    marginBottom: 15
  },
  lesson_card_bottom_view: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  lesson_card_bottom_img: {
    marginRight: 5,
  },
  lesson_card_bottom_text: {
    ...theme.textVariants.body5,
    color: theme.colors.white,
    textAlignVertical: 'center'
  },
  lesson_empty: {
    ...theme.textVariants.body1,
    width: width,
    paddingTop: 20,
    textAlign: 'center',
  }
});

export default LessonList
