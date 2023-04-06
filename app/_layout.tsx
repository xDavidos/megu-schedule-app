import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { useColorScheme, Animated, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthProvider } from "../context/auth";
import { InternetCheker } from '../etc/InternetCheker';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...AntDesign.font,
    ...MaterialCommunityIcons.font,
    eUkraineBold: require('../assets/fonts/e-Ukraine-Bold.otf'),
    eUkraineMedium: require('../assets/fonts/e-Ukraine-Medium.otf'),
    eUkraineRegular: require('../assets/fonts/e-Ukraine-Regular.otf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <InternetCheker />
          <Animated.View
            style={[StyleSheet.absoluteFill, {
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1.2, 1]
                  })
                }
              ]
            }]}>
            <Slot />
          </Animated.View>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
}