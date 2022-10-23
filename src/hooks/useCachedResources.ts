import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import { getLessons, updateLessons } from '../services/firebase';

export default function useCachedResources(setIsFirstStart: any, setLessons: any) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        database().setPersistenceEnabled(true);

        const group = await AsyncStorage.getItem('@group');
        if (group == null) {
          setIsFirstStart(true);
          // Load theme
          DropDownPicker.addTheme("DropDown", require('../constants/dropDownPicker'));
          DropDownPicker.setTheme("DropDown");
        } else {
          setLessons(await getLessons());
          updateLessons(setLessons);
          setIsFirstStart(false);
        }

        // Load fonts
        await Font.loadAsync({
          ...AntDesign.font,
          ...MaterialCommunityIcons.font,
          'e-Ukraine-Bold': require('../../assets/fonts/e-Ukraine-Bold.otf'),
          'e-Ukraine-Medium': require('../../assets/fonts/e-Ukraine-Medium.otf'),
          'e-Ukraine-Regular': require('../../assets/fonts/e-Ukraine-Regular.otf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}