// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence,
  getAuth,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDV6mfs-CaGuLsqFQj-92HKwqKihoqfIOw",
  authDomain: "heritedge-f1984.firebaseapp.com",
  projectId: "heritedge-f1984",
  storageBucket: "heritedge-f1984.firebasestorage.app",
  messagingSenderId: "604075170973",
  appId: "1:604075170973:web:502c1b2c2337dccd3f4874",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize analytics
const analytics = getAnalytics(app);

export { analytics };
