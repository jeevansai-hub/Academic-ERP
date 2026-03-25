import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, enableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAWHyyHQQ8KxJkpuQX_nVrlJ7qwP1ZFYLE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ecap-viit.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ecap-viit",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ecap-viit.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "786774233989",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:786774233989:web:26ad53719e4e1524ef2aec",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-EJ58DXYP7K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Use a configuration that is ROBUST for flaky networks
// We EXPLICITLY disable persistent cache here because it was likely causing the 'offline' false-positives
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, 
});

// Force network connection
if (typeof window !== 'undefined') {
  enableNetwork(db).catch(err => console.error("Enable network failed:", err));
}

export const storage = getStorage(app);

let analyticsInstance = null;
if (typeof window !== 'undefined') {
  try {
    analyticsInstance = getAnalytics(app);
  } catch (err) {
    console.warn("Firebase Analytics could not be initialized:", err);
  }
}

export const analytics = analyticsInstance;
