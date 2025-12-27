import pkg from "./package.json";

export default {
  expo: {
    name: "Impostor Game App",
    slug: "impostor-game-app-4rytorn",
    version: pkg.version,
    orientation: "portrait",
    icon: "./assets/images/spy-icon.png",
    scheme: "rork-app",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/spy-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: false,
      bundleIdentifier: "app.rork.impostor-game-app-4rytorn",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/spy-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "app.rork.impostor_game_app_4rytorn",
    },
    web: {
      favicon: "./assets/images/spy-icon.png",
    },
    plugins: [
      [
        "expo-router",
        {
          origin: "https://rork.com/",
        },
      ],
      "expo-font",
      "expo-web-browser",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: "https://rork.com/",
      },
      eas: {
        projectId: "189e2311-7621-42af-8b6b-c933eed4f03b",
      },
    },
  },
};
