import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth/react-native";
import { LogBox } from 'react-native';
import { useEffect, useState } from "react";
import { lessons } from "./lessonsService";

LogBox.ignoreLogs(['Setting a timer for a long period of time'])
LogBox.ignoreLogs(['AsyncStorage'])

export function firebase() {
  const auth = getAuth();
  const db = getDatabase();
  const LessonsRef = ref(db, 'days');
  const [lesson, setLesson] = useState({})
  const [lessons, setLessons] = useState([])

  signInAnonymously(auth)
  .then(() => {
    console.log('Авторизація 👍')
  })
  .catch((error) => {
    console.log(error.code + "\n" + error.message);
  });

  useEffect(() => {
    onValue(LessonsRef, (snapshot) => {
      const data = snapshot.val();
      if(data !== null) {
        Object.values(data).map((lesson) => {
          setLessons((oldArray) => [...oldArray, lesson]);
        });
      }
    });
  }, [])
  return lesson
}