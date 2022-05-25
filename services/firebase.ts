import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getLessons() {
  const group = await AsyncStorage.getItem('@group');
  let data;
  await database()
  .ref(`${group}/0/days`)
  .once('value')
  .then(snapshot => {
    data = snapshot.val();
  })

  return data
}

export async function updateLessons(setLessons) { 
  const group = await AsyncStorage.getItem('@group') 
  database()
  .ref(`${group}/0/days`)
  .on('value', snapshot => {
    setLessons(snapshot.val());
  });
}
