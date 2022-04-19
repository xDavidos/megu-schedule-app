import { getDatabase, ref, onValue } from "firebase/database";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

export function firebasedb() {
  const db = getDatabase();
  const LessonsRef = ref(db, 'days');
  onValue(LessonsRef, (snapshot) => {
    const data = snapshot.toJSON();
    console.log(data)
  });
}