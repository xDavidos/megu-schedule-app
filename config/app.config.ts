import { ExpoConfig } from '@expo/config-types';

const IS_DEV = true;

const config: ExpoConfig = {
  name: IS_DEV ? "Megu (dev)" : "Megu",
  slug: "megu-app",
  version: "1.0.5",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  icon: "./assets/images/icon.png",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "cover",
    backgroundColor: "#6486FF"
  },
  assetBundlePatterns: [
    "assets/images/*",
    "assets/fonts/*"
  ],
  jsEngine: "hermes",
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#6486FF"
    },
    package: IS_DEV ? "com.megu.dev" : "com.megu.app",
    googleServicesFile: IS_DEV ? "./config/google-services-dev.json" : "./config/google-services.json"
  },
  plugins: [
    [
      "@react-native-firebase/app",{}
    ]
  ],
  platforms: ["android"]
};

export default config;