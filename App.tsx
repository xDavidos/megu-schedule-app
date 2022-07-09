import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import { StyleSheet, View, useColorScheme } from 'react-native';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StartMenu from './components/StartMenu';
import MainMenu from './components/MainMenu';
import { getLessons, updateLessons } from './services/firebase';
import theme from './assets/themes';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [firstStart, setFirstStart] = useState(false);
  const [lessons, setLessons] = useState();
  const colorSchema = useColorScheme();
  const themeContainer = colorSchema === 'light' ? styles.container_light 
  : styles.container_dark;


  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        database().setPersistenceEnabled(true);
        await Font.loadAsync(AntDesign.font);
        await Font.loadAsync(MaterialCommunityIcons.font);
        await Font.loadAsync({
          eUkraineBold: require('./assets/fonts/e-Ukraine/e-Ukraine-Bold.otf'),
          eUkraineMedium: require('./assets/fonts/e-Ukraine/e-Ukraine-Medium.otf'),
          eUkraineRegular: require('./assets/fonts/e-Ukraine/e-Ukraine-Regular.otf'),
        });
        const value = await AsyncStorage.getItem('@group');
        if(value == null) {
          setFirstStart(true);
        } else {
          setLessons(await getLessons());
        }
      } catch (e) {
        console.log(e)
      } finally {
        setAppIsReady(true);
      }
    } 

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      if (firstStart == false){
        updateLessons(setLessons)
      }
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={[styles.container, themeContainer]} onLayout={onLayoutRootView}>
      <StatusBar style='auto'/> 
      {firstStart == true 
      ? <StartMenu setFirstStart={setFirstStart} setLessons={setLessons} /> 
      : <MainMenu lessons={lessons} />}
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1
  },
  container_light: {
    backgroundColor: '#faf9f9',
  },
  container_dark: {
    backgroundColor: theme.colors.gray2,
  },
});
