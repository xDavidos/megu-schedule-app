import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNetInfo } from "@react-native-community/netinfo";

import StartScreen from './src/screens/StartScreen';
import MainScreen from './src/screens/MainScreen';
import { Text } from './src/components/Themed';
import Theme from './src/constants/style';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';

export default function App() {
  const [isFirstStart, setIsFirstStart] = useState(false);
  const isLoadingComplete = useCachedResources(setIsFirstStart);
  const { isConnected } = useNetInfo();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const themeContainer = useColorScheme() === 'light' ? styles.container : styles.container_dark;

  useEffect(() => {
    if (!isConnected) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start();
    }
  }, [isConnected])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider style={[styles.container, themeContainer]}>
        <StatusBar style='auto' />
        <Animated.View style={[styles.noInternetNotification, {
          transform: [{
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-150, 0]
            }),
          }],
        }]}>
          <Feather name="cloud-off" size={12} color="white" />
          <Text style={styles.noInternetNotification_Text}>Немає інтернету</Text>
        </Animated.View>
        {isFirstStart == true
          ? <StartScreen setFirstStart={setIsFirstStart} isConnected={isConnected} />
          : <MainScreen />}
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f9',
  },
  container_dark: {
    backgroundColor: Theme.colors.gray2,
  },
  noInternetNotification: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#FAC239',
    paddingTop: 40,
    paddingBottom: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9999,
  },
  noInternetNotification_Text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    paddingLeft: 5,
  }
});