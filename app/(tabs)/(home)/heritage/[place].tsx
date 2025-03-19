import { router, Stack, useLocalSearchParams } from "expo-router";
import { heritageData } from "@/data/heritageData";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import Markdown from "react-native-markdown-display";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { backgroundColor, primaryColor } from "@/constants/Colors";

export default function DetailScreen() {
  const { place } = useLocalSearchParams<{ place: string }>();
  const placeData = heritageData[place ?? ""];

  if (!placeData) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Not Found",
            headerBackTitle: "Back",
          }}
        />
        <View style={styles.container}>
          <Text style={styles.errorText}>
            No details available for this place.
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={{ backgroundColor: backgroundColor }}>
        <StatusBar style="auto" backgroundColor={backgroundColor} />
        <View style={styles.customHeader}>
          <Text style={styles.title}>{placeData.title}</Text>
        </View>
        <Ionicons
          onPress={() => router.back()}
          style={styles.backButton}
          name="arrow-back"
          size={24}
          color={primaryColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.container}
        >
          <Image source={{ uri: placeData.image }} style={styles.image} />
          <TouchableOpacity
            style={styles.listenButton}
            onPress={() => {
              router.push({
                pathname: "/(tabs)/(home)/heritage/AudioPlayer",
                params: {
                  name: encodeURIComponent(placeData.title),
                  image: placeData.image,
                },
              });
            }}
          >
            <Text style={styles.listenButtonText}>🎧 Listen</Text>
          </TouchableOpacity>
          <Markdown style={markdownStyles}>{placeData.description}</Markdown>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export const styles = StyleSheet.create({
  customHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: backgroundColor,
    elevation: 1,
    shadowColor: "gray",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    zIndex: 100,
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 70,
    zIndex: 100,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 80,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: primaryColor,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  listenButton: {
    marginTop: 20,
    backgroundColor: primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  listenButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

const markdownStyles = StyleSheet.create({
  heading1: {
    fontWeight: "bold",
    color: "#1e90ff",
    marginBottom: 8,
    marginTop: 12,
    fontSize: 26,
  },
  heading2: {
    fontWeight: "bold",
    color: "#ff6347",
    marginBottom: 6,
    marginTop: 10,
    fontSize: 25,
  },
  heading3: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008000",
    marginBottom: 4,
    marginTop: 8,
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 13,
  },
  heading6: {
    fontSize: 11,
  },
  text: {
    fontSize: 18,
    textAlign: "justify",
    lineHeight: 24,
    color: "#444",
  },
  list_item: {
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 10,
  },
  // make bullet points larger
  bullet_list_icon: {
    marginTop: -26,
    fontSize: 60,
    color: "black",
  },
  link: {
    color: "#1e90ff",
    textDecorationLine: "underline" as "underline",
  },
});
