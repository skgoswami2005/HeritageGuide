import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View, Text } from "react-native";
import { primaryColor, secondaryColor } from "@/constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // const userData = await AsyncStorage.getItem("user");
        // if (userData) {
        //   const { email, password } = JSON.parse(userData);
        //   if (email && password) {
        //     // ✅ Sign in automatically using Firebase
        //     const auth = getAuth();
        //     await signInWithEmailAndPassword(auth, email, password);
        //     setIsLoggedIn(true);
        //   }
        // }
      } catch (error) {
        console.log("Error checking login state:", error);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    if (loaded) {
      checkUser();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: primaryColor,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            color: "white",
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          HeritEdge
        </Text>
        <ActivityIndicator size="large" color={secondaryColor} />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
