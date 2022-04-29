import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import theme from '../assets/themes';
import * as Linking from 'expo-linking';

const width = Dimensions.get('screen').width;

const LessonList = ({data, index, setIndex,}: { data: any; index: any; setIndex: any; }) => {
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
      data={data.days}
      //style={{flexGrow: 2}}
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
            {(item.lessons.length == 0) ? (
              <Text style={styles.lesson_empty}>Вихідний</Text>
            ) : (
              item.lessons.map((item: any) => (
                <Lesson key={item.id} item={item} />
              ))
            )}
          </ScrollView>
        );
      }}
    />
  );
};

const Lesson = ({ item } : { item: any }) => {
  return (
    <View style={styles.lessons}>
      <View style={styles.lesson_time}>
        <Text style={styles.lesson_time_start_text}>{item.starttime}</Text>
        <Text style={styles.lesson_time_end_text}>{item.endtime}</Text>
      </View>
      {item.isOnline == true ? (
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://' + item.location);
          }}
          style={styles.lesson_card}>
            <Text style={styles.lesson_card_name}>{item.name}</Text>
            <Text style={styles.lesson_card_description}>
              {item.description}
            </Text>
            <Text style={styles.lesson_card_locate}>
              <AntDesign name="enviromento" size={16} color="white" />
              {item.location}
            </Text>
            <Text style={styles.lesson_card_teacher}>
              <AntDesign name="user" size={16} color="white" />
              {item.teacher}
            </Text>
        </TouchableOpacity>
      ) : (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
/*   lessons_flatlist: {
    height: "120%",
    marginTop: -45,
    transform: [{ translateY: 45 }],
  }, */
   lessons_view: {
    //flex: 1
  },
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
    borderRightColor: "#f5f5f5",
  },
  lesson_time_start_text: {
    ...theme.textVariants.body2,
    marginBottom: 5,
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
  lesson_card_locate: {
    ...theme.textVariants.body5,
    color: theme.colors.white,
    marginBottom: 3,
  },
  lesson_card_teacher: {
    ...theme.textVariants.body5,
    color: theme.colors.white,
  },
  lesson_empty: {
    ...theme.textVariants.body1,
    width: width,
    paddingTop: 20,
    textAlign: 'center',
  }
});

export default LessonList
