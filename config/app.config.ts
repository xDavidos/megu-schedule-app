import { ExpoConfig } from '@expo/config-types';

const IS_DEV = process.env.APP_VARIANT === "development";

const config: ExpoConfig = {
  name: IS_DEV ? "Megu (dev)" : "Megu",
  slug: "megu-app",
  version: "1.0.5",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "#6486FF"
  },
  assetBundlePatterns: [
    "assets/*",
    "assets/fonts/*"
  ],
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#6486FF"
    },
    package: IS_DEV ? "com.megu.dev" : "com.megu.app",
    googleServicesFile: IS_DEV ? "./config/google-services-dev.json" : "./config/google-services.json"
  },
  plugins: [
    [
      "@react-native-firebase/app",{}
    ]
  ]
};

export default config;