import { useEffect, useRef } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { Animated, StyleSheet, Text } from "react-native";
import Feather from "@expo/vector-icons/build/Feather";


export function InternetCheker() {
  const { isConnected } = useNetInfo();
  const slideAnim = useRef(new Animated.Value(0)).current;

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

  return (
    <Animated.View style={[styles.OfflineMode, {
      transform: [{
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-150, 0]
        }),
      }],
    }]}>
      <Feather name="cloud-off" size={12} color="white" />
      <Text style={styles.OfflineModeText}>Немає інтернету</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  OfflineMode: {
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
  OfflineModeText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    paddingLeft: 5,
  }
});