import database from '@react-native-firebase/database';

export async function getLessons() { 
  database().setPersistenceEnabled(true);
  database().goOffline();
  let data
  await database()
  .ref('days')
  .once('value')
  .then(snapshot => {
    data = snapshot.val();
  });

  return data
}

export async function updateLessons(setLessons) { 
  database()
  .ref('days')
  .on('value', snapshot => {
    setLessons(snapshot.val());
  });
}