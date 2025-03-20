import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { primaryColor, secondaryColor } from "../constants/Colors";
import { router, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@/services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const route = useRouter();

  useEffect(() => {
    setTimeout(async () => {
      setIsLoading(false);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          router.replace("/(tabs)/(home)");
        } else {
          router.replace("/login");
        }
      });

      return () => unsubscribe();
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
