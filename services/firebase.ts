import { initializeApp } from "firebase/app";
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.FIREBASE_API_KEY,
  authDomain: Constants.manifest.extra.FIREBASE_AUTH_DOMAIN,
  databaseURL: Constants.manifest.extra.FIREBASE_DATABASE_URL,
  projectId: Constants.manifest.extra.FIREBASE_PROJECT_ID,
  storageBucket: Constants.manifest.extra.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.manifest.extra.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.manifest.extra.FIREBASE_APP_ID,
  measurementId: Constants.manifest.extra.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export default app;