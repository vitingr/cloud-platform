import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAgApWv91NidTknN55zcx6Ft9JZZY96AIA",
  authDomain: "drive-400417.firebaseapp.com",
  projectId: "drive-400417",
  storageBucket: "drive-400417.appspot.com",
  messagingSenderId: "1018114462458",
  appId: "1:1018114462458:web:25c74460c334217895af43",
  measurementId: "G-MLJWMBMYZB"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
