import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera, CameraType, CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { backgroundColor, primaryColor } from "@/constants/Colors";

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState<Boolean>(false);
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);
    if (scanned) return;

    // Format data into a valid route
    const formattedData = `/heritage/${data
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

    router.replace(formattedData as any);
  };

  if (hasPermission === null)
    return <Text>Requesting camera permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons
          // style={styles.backButton}
          name="arrow-back"
          size={24}
          color={primaryColor}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        />
        {scanned && (
          <TouchableOpacity
            style={styles.rescanButton}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.rescanText}>Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  rescanButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  rescanText: { fontSize: 16, fontWeight: "bold" },
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
    padding: 10,
    backgroundColor: backgroundColor,
    borderRadius: 10,
    backdropFilter: "blur(20px)",
    opacity: 0.9,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: primaryColor,
    textAlign: "center",
  },
});
