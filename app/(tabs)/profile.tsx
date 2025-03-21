import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebaseConfig";
import { useEffect, useState } from "react";

export default function ProfileScreen() {
  const router = useRouter();

  const user = useState(auth.currentUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // get user details
    const getUserDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        setName(user.displayName ?? "");
        setEmail(user.email ?? "");
      }
    };
    getUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Name: {name || "N/A"}</Text>
          <Text style={styles.infoText}>Email: {email}</Text>
        </View>
      ) : (
        <Text style={styles.infoText}>No user data available</Text>
      )}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  infoContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    width: "100%",
  },
  infoText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#F44336",
    padding: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
