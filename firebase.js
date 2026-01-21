import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔥 PASTE YOUR CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyDn5GS2lr3Ia6ke84ICvvbbUIPrvOuOTb0",
  authDomain: "tradingjournal-102d3.firebaseapp.com",
  projectId: "tradingjournal-102d3",
  storageBucket: "tradingjournal-102d3.firebasestorage.app",
  messagingSenderId: "370863248782",
  appId: "1:370863248782:web:75a3efba5a17d4a96140df",
  measurementId: "G-4FEX4ML0CT"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
