import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );

      console.log("====================================");
      console.log("User", user);
      console.log("====================================");

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
