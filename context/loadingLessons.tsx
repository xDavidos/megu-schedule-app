import { useState, useEffect, createContext, useContext, useRef, SetStateAction, Dispatch } from 'react'
import { SharedValue, useSharedValue } from 'react-native-reanimated';
import FlashList from '@shopify/flash-list/dist/FlashList';

import data_json from './megu.json'
import { useAuth } from "./auth";

export interface lesson {
  id: number;
  name: string;
  description: string;
  isOnline: boolean;
  location: string;
  type: number;
  teacher: string;
  starttime: string;
  endtime: string;
}

export interface day {
  date: Date
  lessons: Array<lesson> | undefined | null;
};

interface LessonsContextType {
  data: Array<day>;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>
  lessonsListRef: React.RefObject<FlashList<day>>,
  offset: SharedValue<number>
}

const LessonsContext = createContext<LessonsContextType | null>(null);

export function useLessons() {
  const lessonsContext = useContext(LessonsContext);

  if (!lessonsContext) {
    throw new Error(
      "useLessons has to be used within <LessonsContext.Provider>"
    );
  }

  return lessonsContext;
}

function generateArrayOfDays() {
  let date = new Date();
  date.setDate(date.getDate() - date.getDay() - 8 + (date.getDay() === 0 ? -6 : 1));

  let array: Array<day> = new Array(21).fill(undefined).map(() => {
    let newDate = new Date(date.setDate(date.getDate() + 1))
    newDate.setUTCHours(10, 0, 0, 0)
    return { date: newDate, lessons: undefined };
  });

  return array
}

export function LoadingLessons(props: any) {
  const [index, setIndex] = useState(-1);
  const [data, setData] = useState<Array<day>>(() => generateArrayOfDays());
  const offset = useSharedValue(0);
  const lessonsListRef = useRef<FlashList<day>>(null)
  //const { selectGroup } = useAuth();

  useEffect(() => {
    if (data[0].lessons === undefined) {
      let array = data;
      array = array.map(elem => {
        let lessonsArray: Array<lesson> | undefined | null = data_json.PI20.find(
          elements => elements.date === elem.date.toJSON())?.lessons;

        if (lessonsArray === undefined) lessonsArray = null;

        return { date: elem.date, lessons: lessonsArray };
      })

      setData(array);
    }

    if (index === -1 && data !== undefined) {
      const date = new Date();
      date.setUTCHours(10, 0, 0, 0);
      let findIndex = data.findIndex(elem => elem.date.toUTCString() === date.toUTCString());
      setIndex(findIndex === -1 ? 0 : findIndex)
    }
  }, [data]);

  return (
    <LessonsContext.Provider
      value={{
        data,
        index,
        setIndex,
        lessonsListRef,
        offset
      }}>
      {props.children}
    </LessonsContext.Provider>
  )
}