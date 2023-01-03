import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDRq35uCHitf5dr0QbeOd56q9L0hsRvWsI",
  authDomain: "mahanama-39a55.firebaseapp.com",
  projectId: "mahanama-39a55",
  storageBucket: "mahanama-39a55.appspot.com",
  messagingSenderId: "1037794575866",
  appId: "1:1037794575866:web:100ca0aa10f2a9020f9043"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);