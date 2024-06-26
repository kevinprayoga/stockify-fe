export default{
  "expo": {
    "name": "stockify",
    "slug": "stockify",
    "scheme": "stockify",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.kevinprayoga.stockify",
      "infoPlist": {
        "NSAppTransportSecurity": {
          "NSAllowsArbitraryLoads": true
        }
      },
      "googleServicesFile": process.env.GOOGLE_SERVICES_INFOPLIST
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "android.permission.RECORD_AUDIO",
        "android.permission.INTERNET"
      ],
      "package": "com.kevinprayoga.stockify",
      "googleServicesFile": process.env.GOOGLE_SERVICES_ANDROID
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-secure-store",
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ],
      "expo-font",
      [
        "expo-build-properties",
        {
          "android": {
            "usesCleartextTraffic": true
          }
        }
      ],
      "@react-native-google-signin/google-signin"
    ],
    "extra": {
      "eas": {
        "projectId": "cdfb7fb9-8b0a-4c45-956c-e75fd4b6c143"
      }
    },
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/cdfb7fb9-8b0a-4c45-956c-e75fd4b6c143"
    }
  }
}
