import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/services/firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { makeRedirectUri } from "expo-auth-session";

export default function LoginScreen() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "604075170973-pp3edqr3cjhi97rctr12r6v36m24fc0e.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@anonymous/HeritageGuide",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("User signed in:", userCredential.user);
        })
        .catch((error) => {
          console.error("Authentication error:", error);
        });
    }
  }, [response]);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    try {
      Alert.alert("Loading...");

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      logEvent(analytics, "login", {
        method: "email",
      });

      const user = userCredential.user;

      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );

      router.replace("/(tabs)/(home)");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Error", "User not found");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "Incorrect password");
      } else if (error.code === "auth/invalid-credential") {
        Alert.alert("Error", "Invalid credentials");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/signup")}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>
          Don't have an account?{" "}
          <Text style={styles.linkHighlight}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: 18,
          paddingTop: 15,
          paddingBottom: 15,
        }}
      >
        or
      </Text>
      {/* Google Sign-In Button */}
      <TouchableOpacity
        disabled={!request}
        onPress={() => promptAsync()}
        style={{
          backgroundColor: "#4285F4",
          padding: 12,
          borderRadius: 8,
          marginHorizontal: "auto",
          flexDirection: "row",
          alignItems: "center",
          width: "80%",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Image
          source={require("@/assets/images/google.png")}
          style={{ width: 24, height: 24, marginRight: 8 }}
        />
        <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 16 }}>
          Sign In with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  button: {
    backgroundColor: "#2E8B57",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#2E8B57",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  linkContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#555",
  },
  linkHighlight: {
    color: "#2E8B57",
    fontWeight: "bold",
  },
});
