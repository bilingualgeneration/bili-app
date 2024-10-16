import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { generateClassroomDashboard } from "./classroom/analytics";

const app = initializeApp({
  apiKey: "AIzaSyBtVePRnh3rPR_z1swB5zdUYqVYHtzP-p0",
  authDomain: "bilingual-generation-dev.firebaseapp.com",
  databaseURL: "https://bilingual-generation-dev-default-rtdb.firebaseio.com",
  projectId: "bilingual-generation-dev",
  storageBucket: "bilingual-generation-dev.appspot.com",
  messagingSenderId: "875883515921",
  appId: "1:875883515921:web:5c9bc198a2106e749361b0",
  measurementId: "G-K8295WVTFC",
});

const db = getDatabase(app);
const firestore = getFirestore(app);
generateClassroomDashboard(db, firestore).then(() => {
  console.log("done");
});
