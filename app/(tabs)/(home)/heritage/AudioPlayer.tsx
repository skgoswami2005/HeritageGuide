import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { backgroundColor, primaryColor } from "@/constants/Colors";

const audioMap = {
  "Lahori Gate": require("@/assets/audios/lahori-gate.m4a"),
  "Delhi Gate": require("@/assets/audios/delhi-gate.m4a"),
  "Chatta Chowk": require("@/assets/audios/chatta-chowk.m4a"),
};

const AudioPlayer = () => {
  const { name, image } = useLocalSearchParams<{
    name: string;
    image: string;
  }>();
  const router = useRouter();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [name]);

  // Load audio
  const loadAudio = async () => {
    try {
      if (sound) await sound.unloadAsync(); // Clean up any previous sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        audioMap[name as keyof typeof audioMap],
        { shouldPlay: false }
      );
      setSound(newSound);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis || 0);
          setPosition(status.positionMillis || 0);
          setIsPlaying(status.isPlaying);
        }
      });
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  // Toggle Play/Pause
  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  };

  // Seek Audio
  const seekAudio = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  // Format Time
  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: Array.isArray(name) ? name.join(", ") : name,
          headerBackTitle: "Back",
          headerShown: false,
        }}
      />
      <SafeAreaView
        style={{ backgroundColor: backgroundColor, height: "100%" }}
      >
        <View style={styles.customHeader}>
          <Text style={styles.title}>
            {Array.isArray(name) ? name.join(", ") : name}
          </Text>
        </View>
        <Ionicons
          onPress={() => router.back()}
          style={styles.backButton}
          name="arrow-back"
          size={24}
          color={primaryColor}
        />
        <View style={styles.container}>
          <Image source={{ uri: image }} style={styles.image} />

          {/* Progress Bar */}
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onSlidingComplete={seekAudio}
            minimumTrackTintColor={primaryColor}
            maximumTrackTintColor="#ccc"
            thumbTintColor={primaryColor}
          />

          {/* Time Info */}
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>

          {/* Play/Pause Button */}
          <TouchableOpacity
            onPress={togglePlayPause}
            style={styles.controlButton}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={36}
              color={primaryColor}
            />
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          ></TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  customHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
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
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  container: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  timeText: {
    color: "#555",
    fontSize: 14,
  },
  controlButton: {
    marginVertical: 24,
  },
});

export default AudioPlayer;
