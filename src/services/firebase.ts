import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getLessons() {
  const group = await AsyncStorage.getItem('@group');
  let data;
  await database()
    .ref(`${group}`)
    .once('value')
    .then(snapshot => {
      data = snapshot.val();
    })
  return data;
}

export async function updateLessons(setLessons: any) {
  const group = await AsyncStorage.getItem('@group')
  database()
    .ref(`${group}`)
    .on('value', snapshot => {
      setLessons(snapshot.val());
    });
}