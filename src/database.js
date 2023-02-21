import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore/lite";

function startFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyDXBiilZloYaCici4PkLSC3YR23v0wX79k",
    authDomain: "messenger-clone-c1210.firebaseapp.com",
    projectId: "messenger-clone-c1210",
    storageBucket: "messenger-clone-c1210.appspot.com",
    messagingSenderId: "424886295603",
    appId: "1:424886295603:web:6296c356665aabd46c5746",
    measurementId: "G-LQBVQMMDT4",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  //   return getDatabase(app);
  return db;
}

export default startFirebase;
