import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const LessonSchedule = (props) => {
    return (
        <View style={styles.lessons}>
            <View style={styles.lesson_time}>
                <Text style={styles.lesson_time_list_text}>{props.lesson_start_time}</Text>
                <Text style={styles.lesson_time_end_list_text}>{props.lesson_end_time}</Text>
            </View>
            <View style={styles.lesson_card}>
                <Text style={styles.lesson_card_name}>{props.lesson_name}</Text>
                <Text style={styles.lesson_card_description}>{props.lesson_description}</Text>
                <Text style={styles.lesson_card_locate}><Image source={require('../assets/room.png')} style={styles.lesson_card_locate_img} />{props.lesson_locate}</Text>
                <Text style={styles.lesson_card_teacher}><Image source={require('../assets/person.png')} style={styles.lesson_card_teacher_img} />{props.lesson_teacher}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    lessons: {
        flexDirection: 'row',
    },
    lesson_time_text: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        paddingRight: 30,
        color: '#BCC1CD',

    },
    lesson_time: {
        flexDirection: 'column',
        paddingRight: 16,
        borderRightWidth: 1,
        borderRightColor: '#FAF9F9',
    },
    lessons_text: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: '#BCC1CD',
    },
    lesson_time_list: {
        flexDirection: 'column',
        paddingTop: 14,
    },
    lesson_time_list_text: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
    },
    lesson_time_end_list_text: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
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
        paddingRight: 16,
        flex: 1,
        marginBottom: 16,
    },
    lesson_card_name: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        color: '#ffff'
    },
    lesson_card_description: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 12,
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
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        paddingTop: 15,
        color: '#ffff'
    },
    lesson_card_teacher_img: {
        height: 16,
        width: 16,
        marginRight: 50,
        tintColor: '#FFFFFF',
    },
    lesson_card_teacher: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        paddingTop: 3,
        color: '#ffff'
    },
});

export default LessonSchedule;