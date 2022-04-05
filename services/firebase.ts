import { lessons } from './lessonsService';
import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase();
const starCountRef = ref(db, 'days/');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  lessons(data);
});