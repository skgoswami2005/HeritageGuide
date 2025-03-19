import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useRouter } from "expo-router";
import { primaryColor, secondaryColor } from "@/constants/Colors";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[primaryColor, secondaryColor]}
      style={styles.container}
    >
      <Text style={styles.title}>Heritage Site Guide</Text>
      <Text style={styles.subtitle}>
        Explore heritage sites by scanning QR codes
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/scanner")}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
    opacity: 0.8,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#740938",
  },
});
