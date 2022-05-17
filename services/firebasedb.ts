import { getDatabase, ref, get } from "firebase/database";

export async function getLessons() { 
  const snapshot = await get(ref(getDatabase(), 'days'))
  return snapshot.val();
}