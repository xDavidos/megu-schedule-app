import { date } from 'faker';
import React, { useState, useEffect } from 'react';

export function weekday() {
    const [startweekday, setstartweekday] = useState(moment().endOf('week').toDate());
    const [endweekday, setendweekday] = useState(moment().startOf('week').add(7, 'd').toDate());
    useEffect(() => {
        console.log("Use Effect");
        const day = startDay.clone();
        while (!day.isAfter(endweekday)) {
            date.day(day.clone());
            day.add(1, 'day')
        }
    }, [startweekday, endweekday]);
    console.log("useState");
    return (
        console.log("useState")
    );
}

/* export const Day = () => {
    const [day, setDate] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setDate(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, [day]);
    console.log(Day);
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
    console.log(DayWeek);
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
    console.log(MonthYear);
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
    console.log(StartWeekDay);
    return { startweekday };
} */