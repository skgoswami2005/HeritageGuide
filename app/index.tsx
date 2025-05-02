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
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  const route = useRouter();

  useEffect(() => {
    setTimeout(async () => {
      const initialize = async () => {
        const checkUser = async () => {
          try {
            let user = await AsyncStorage.getItem("user");

            if (user !== null) user = await JSON.parse(user ? user : "");

            if (user) {
              router.replace("/(tabs)/(home)");
            } else {
              router.replace("/login");
            }
          } catch (error) {
            console.log("Error checking login state:", error);
          }
        };

        checkUser();
      };
      initialize();
    }, 1000);
  }, []);

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
