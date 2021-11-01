import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/uk';

export const Day = () => {
    const [day, setDate] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setDate(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);

    return <Moment element={Text} locale='uk' format='D' >{day}</Moment>;
}

export const DayWeek = () => {
    const [dayweek, setdayweek] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setdayweek(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);
    return <Moment element={Text} locale='uk' format='dddd' >{dayweek}</Moment>;
}

export const MonthYear = () => {
    const [monthyear, setmonthyear] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setmonthyear(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);
    return <Moment element={Text} locale='uk' format='MMMM YYYY' >{monthyear}</Moment>;
}

export const StartWeekDay = () => {
    const [startweekday, setstartweekday] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setstartweekday(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);
    return { startweekday };
}