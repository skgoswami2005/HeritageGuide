import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { primaryColor, secondaryColor } from "../constants/Colors";
import { router, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@/services/firebaseConfig";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

const index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const route = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    setTimeout(async () => {
      setIsLoading(false);
      // const unsubscribe = onAuthStateChanged(auth, (user) => {
      //   if (user) {
      //     router.replace("/(tabs)/(home)");
      //   } else {
      //     router.replace("/login");
      //   }
      // });
      // return () => unsubscribe();

      try {
        //   const userData = await AsyncStorage.getItem("user");
        //   if (userData) {
        //     const { email, password } = JSON.parse(userData);
        //     if (email && password) {
        //       // ✅ Sign in automatically using Firebase
        //       const auth = getAuth();
        //       await signInWithEmailAndPassword(auth, email, password);
        //       setIsLoggedIn(true);
        //     }
        //   }

        if (isLoggedIn == true) {
          route.replace("/(tabs)/(home)");
        } else {
          route.replace("/login");
        }
      } catch (error) {
        console.log("Error checking login state:", error);
      }
    }, 2000);
  }, []);

  //   useEffect(() => {
  //     route.replace("/(auth)");
  //   }, [isLoading]);

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
};

export default index;
